(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$rcInfo = W.$rcInfo || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	var gridSubMap = {};					//달력 그리드 설정
	
	$(document).ready(function(){
		
		$rcInfo.event.selectValue();			//오른쪽 상단 위 SelectBox 이벤트
		$rcInfo.event.setUIEvent();			//이벤트 SetUiEvent
		$rcInfo.ui.pageLoad();					//최초 페이지 로드할 시 벌어지는 이벤트
		
	});
	
	$rcInfo.ui = {
			
			/**
			 * @name		: pageLoad
			 * @description	: 페이지를 불러오면 벌어지는 이벤트
			 * @date		: 2019. 11. 13.
			 * @author		: 박소희
			 */
			pageLoad : function() {
				
				//공통 그리드 달력 호출하기
				searchFormDatePeriod('date', 'crNttRecallDate', gridSubMap);
				
			},
						
	}
	
	//Event 정의
	$rcInfo.event = {
			
		/**
		* @name         : setUIEvent
		* @description  : 이벤트 세팅
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		setUIEvent : function(e) {
			$("#searchBtn").on('click', $rcInfo.event.fn_search);		//게시판 검색 
			$("#checkAll").on('click', $rcInfo.event.checkboxAll);		//테이블 헤더 체크박스  이벤트
			
			$("#cancelBtn").on('click', $rcInfo.event.goList);			//목록으로

			$("#ctype").change($rcInfo.event.ctypeChangeEvent);			//목록으로
			
		},

		/**
		* @name         : ctypeChangeEvent
		* @description  : 자동차 <<>> 건설기계 리스트 변경
		* @date         : 2019. 12. 24. 
		* @author	    : 박소희
		*/
		ctypeChangeEvent: function(e) {
			$("#searchStr").val("");
			$("#searchFromDate").val("");
			$("#searchToDate").val("");
			$("#currentPageNo").val(1);
			$rcInfo.event.goList();
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
		detailView : function(result, result2, result3) {
			var data = fn_getFormData($("#searchFrm"));
			data.recallId = result;
			data.divisionCode = result2;
			data.ctype = result3;
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
			
			var contentsIdGroupO = [];
			var contentsIdGroup = [];
			var contentsIdGroupC = [];
			
			$('input:checkbox[id="ckId"]:checked').each(function(idx){
				//contentsIdGroup.push($(this).val());
				var str = $(this).val().split(",");
				if(str[1] == 'O'){
					contentsIdGroupO.push(str[0]);
				}else if(str[1] == 'C'){
					contentsIdGroupC.push(str[0]);					
				}else{
					contentsIdGroup.push(str[0]);					
				}
			});
			params.contentsIdListO = contentsIdGroupO;
			params.contentsIdList = contentsIdGroup;
			params.contentsIdListC = contentsIdGroupC;
			
			console.log(params.contentsIdListO);
			console.log(params.contentsIdList);
			console.log(params.contentsIdListC);
			
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
			contentsIdGroup.push($("#recallId").val());
			
			var ctype = $("#ctype").val();

			if(ctype == 'O'){
				params.contentsIdListO = contentsIdGroup;
			}else if(ctype == 'C'){
				params.contentsIdListC = contentsIdGroup;					
			}else{
				params.contentsIdList = contentsIdGroup;				
			}
			
			
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
		* @description  : sns공유 비공유 변경버튼 클릭
		* @date         : 2020. 02. 06. 
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
			
			var contentsIdGroupO = [];
			var contentsIdGroup = [];
			var contentsIdGroupC = [];
			
			$('input:checkbox[id="ckId"]:checked').each(function(idx){
				//contentsIdGroup.push($(this).val());
				var str = $(this).val().split(",");
				if(str[1] == 'O'){
					contentsIdGroupO.push(str[0]);
				}else if(str[1] == 'C'){
					contentsIdGroupC.push(str[0]);					
				}else{
					contentsIdGroup.push(str[0]);					
				}
			});
			params.contentsIdListO = contentsIdGroupO;
			params.contentsIdList = contentsIdGroup;
			params.contentsIdListC = contentsIdGroupC;
			
			console.log(params.contentsIdListO);
			console.log(params.contentsIdList);
			console.log(params.contentsIdListC);
			
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
			contentsIdGroup.push($("#recallId").val());
			
			var ctype = $("#ctype").val();

			if(ctype == 'O'){
				params.contentsIdListO = contentsIdGroup;
			}else if(ctype == 'C'){
				params.contentsIdListC = contentsIdGroup;					
			}else{
				params.contentsIdList = contentsIdGroup;				
			}
			
			
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