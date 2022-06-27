(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$crNttGrts = W.$crNttGrts || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	var gridSubMap = {};					//달력 그리드 설정
	
	$(document).ready(function(){
		
		$crNttGrts.event.selectValue();			//오른쪽 상단 위 SelectBox 이벤트
		$crNttGrts.event.setUIEvent();			//이벤트 SetUiEvent
		$crNttGrts.ui.pageLoad();					//최초 페이지 로드할 시 벌어지는 이벤트
		
	});
	
	$crNttGrts.ui = {
			
			/**
			 * @name		: pageLoad
			 * @description	: 페이지를 불러오면 벌어지는 이벤트
			 * @date		: 2019. 11. 13.
			 * @author		: 박소희
			 */
			pageLoad : function() {
				
				//공통 그리드 달력 호출하기
				searchFormDatePeriod('date', 'crctGrtsDate', gridSubMap);
			},
						
	}
	
	//Event 정의
	$crNttGrts.event = {
			
		/**
		* @name         : setUIEvent
		* @description  : 이벤트 세팅
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		setUIEvent : function(e) {
			$("#searchBtn").on('click', $crNttGrts.event.fn_search);		//게시판 검색 
			$("#checkAll").on('click', $crNttGrts.event.checkboxAll);		//테이블 헤더 체크박스  이벤트
			
			$("#cancelBtn").on('click', $crNttGrts.event.goList);			//목록으로
		},
		
		/**
		* @name         : fn_search
		* @description  : 검색하기
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		fn_search : function(pageNo) {
			if(isNull(pageNo)) {
				pageNo = 1;
			}
			
			$("#currentPageNo").val(pageNo);
			
			var data = fn_getFormData($("#searchFrm"));
			
			postToURL(contextPath + "/cr/ntt/listView.do", data);
		},
		
		/**
		* @name         : selectValue
		* @description  : 위 상단 목록을 선택할 떄마다 해당 목록에 맞는 데이터들 보여주는 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		selectValue : function(data) {
			
			var params = {}; 
			
			//목록 버튼 클릭
			$('.nav-list li').click(function() {
				
				$('.nav-list li.uk-active').removeClass('uk-active');
				var activeNo = $(this).addClass("uk-active");	;
				
				var diviCode = leadingZeros(activeNo[0].value, 4);
				params.divisionCode = diviCode;

		        postToURL(contextPath + "/cr/ntt/listView.do", params); 
			});
		},
		
		/**
		* @name         : detailView
		* @description  : 게시글 상세보기
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		detailView : function(result, result2) {
			var data = fn_getFormData($("#searchFrm"));
			data.gratischeckId = result;
			data.divisionCode = result2;
			postToURL(contextPath + "/cr/ntt/detailView.do", data);
		},
		
		/**
		* @name         : checkboxAll
		* @description  : <th>태그에 체크박스 클릭할 시, 체크박스 모두 활성화 되는 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		checkboxAll : function() {
			if($("#checkAll").prop("checked")) {
				$("input[type=checkbox]").prop("checked", true);
			} else {
				$("input[type=checkbox]").prop("checked", false);
			}
		},
		
		/**
		* @name         : isOpenClick
		* @description  : 공개 비공게 변경버튼 클릭
		* @date         : 2019. 10. 18. 
		* @author	    : 박소희
		*/
		isOpenClick : function(clickFlag) {
			var params = fn_getFormData($("#searchFrm"));
			
			params.isOpen = clickFlag;
			
			var ckCnt = $('input:checkbox[id="ckId"]:checked').length;
			
			if(ckCnt == 0){
				alert("선택한 항목이 없습니다.");
				return;
			}
			
			var contentsIdGroup = [];
			
			$('input:checkbox[id="ckId"]:checked').each(function(idx){
				contentsIdGroup.push($(this).val());
			});
			params.contentsIdList = contentsIdGroup;
			
			if(confirm("공개상태를 변경하시겠습니까?")) {
				ajax(true, contextPath + "/cr/ntt/process/updateOpenYn.do", 'body', '변경중입니다.', params, function(result){

					if(!isNull(result)){
						alert("변경에 "+result.resultMsg+"하였습니다.");
						postToURL(contextPath + "/cr/ntt/listView.do", params);
						
					}
				});
			}
		},
		
		isOpenOne : function(clickFlag) {
			var params = fn_getFormData($("#searchFrm"));
			
			params.isOpen = clickFlag;
			var contentsIdGroup = [];
			contentsIdGroup.push($("#gratischeckId").val());
			params.contentsIdList = contentsIdGroup;
			
			if(confirm("공개상태를 변경하시겠습니까?")) {
				ajax(true, contextPath + "/cr/ntt/process/updateOpenYn.do", 'body', '변경중입니다.', params, function(result){
					
					if(!isNull(result)){
						alert("변경에 "+result.resultMsg+"하였습니다.");
						postToURL(contextPath + "/cr/ntt/detailView.do", params);
						
					}
					
				});
			}
		},

		/**
		* @name         : snsOpenClick
		* @description  : SNS 공유 비공유 변경버튼 클릭
		* @date         : 2019. 10. 18. 
		* @author	    : 박소희
		*/
		snsOpenClick : function(clickFlag) {
			var params = fn_getFormData($("#searchFrm"));
			
			params.isOpen = clickFlag;
			
			var ckCnt = $('input:checkbox[id="ckId"]:checked').length;
			
			if(ckCnt == 0){
				alert("선택한 항목이 없습니다.");
				return;
			}
			
			var contentsIdGroup = [];
			
			$('input:checkbox[id="ckId"]:checked').each(function(idx){
				contentsIdGroup.push($(this).val());
			});
			params.contentsIdList = contentsIdGroup;
			
			if(confirm("SNS공유상태를 변경하시겠습니까?")) {
				ajax(true, contextPath + "/cr/ntt/process/updateSnsYn.do", 'body', '변경중입니다.', params, function(result){

					if(!isNull(result)){
						alert("변경에 "+result.resultMsg+"하였습니다.");
						postToURL(contextPath + "/cr/ntt/listView.do", params);
						
					}
				});
			}
		},
		
		snsOpenOne : function(clickFlag) {
			var params = fn_getFormData($("#searchFrm"));
			
			params.isOpen = clickFlag;
			var contentsIdGroup = [];
			contentsIdGroup.push($("#gratischeckId").val());
			params.contentsIdList = contentsIdGroup;
			
			if(confirm("SNS공유상태를 변경하시겠습니까?")) {
				ajax(true, contextPath + "/cr/ntt/process/updateSnsYn.do", 'body', '변경중입니다.', params, function(result){
					
					if(!isNull(result)){
						alert("변경에 "+result.resultMsg+"하였습니다.");
						postToURL(contextPath + "/cr/ntt/detailView.do", params);
						
					}
					
				});
			}
		},
		
		/**
		* @name         : goList
		* @description  : 목록으로 이동한다
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		goList : function() {
			var params =  fn_getFormData($("#searchFrm"));
			postToURL(contextPath + "/cr/ntt/listView.do", params);
		},

	}
}(window,document, jQuery));