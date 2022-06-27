(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$menuStatSet = W.$menuStatSet || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	var gridSubMap = {};					//달력 그리드 설정
	
	$(document).ready(function(){

		$menuStatSet.event.selectValue();			//오른쪽 SelectBox 이벤트
		$menuStatSet.event.setUIEvent();			//이벤트 SetUiEvent
		$menuStatSet.ui.pageLoad();				//최초 페이지 로드할 시 벌어지는 이벤트

	});
	
	$menuStatSet.ui = {
			
		/**
		 * @name		: pageLoad
		 * @description	: 페이지를 불러오면 벌어지는 이벤트
		 * @date		: 2019. 11. 07.
		 * @author		: 박소희
		 */
		pageLoad : function() {

		},

	}
	
	//Event 정의
	$menuStatSet.event = {
			
		/**
		* @name         : setUIEvent
		* @description  : 이벤트 세팅
		* @date         : 2019. 11. 07.
		* @author	    : 박소희
		*/
		setUIEvent : function(e) {
			$("#searchBtn").on('click', $menuStatSet.event.fn_search);		//게시판 검색 			
			$("#checkAll").on('click', $menuStatSet.event.checkBoxAll);		//테이블 헤더 체크박스  이벤트

			$("#enrollBtn").on('click', $menuStatSet.event.goRegist);			//등록 및 수정버튼 클릭 이벤트

			$("#registBtn").on('click', $menuStatSet.event.registInfo);		//등록 및 수정버튼 클릭 처리 이벤트
			$("#cancelBtn").on('click', $menuStatSet.event.goList);			//목록으로
		},
		
		/**
		* @name         : fn_search
		* @description  : 메뉴 검색하기
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		fn_search_menu : function(pageNo) {
			if(isNull(pageNo)) {
				pageNo = 1;
			}
			$("#currentPageNo").val(pageNo);
			
			var data = fn_getFormData($("#searchFrm"));	//검색폼
			
			postToURL(contextPath + "/cs/menuStat/listView.do", data);
		},
				
		/**
		* @name         : goList
		* @description  : 목록으로 이동
		* @date         : 2019. 10. 18. 
		* @author	    : 박소희
		*/
		goList : function() {
			var params = fn_getFormData($("#searchFrm"));
			
			postToURL(contextPath + "/cs/menuStat/listView.do", params);
		},
		
		/**
		* @name         : goDetail
		* @description  : 게시글 상세(수정)보기
		* @date         : 2019. 10. 18. 
		* @author	    : 박소희
		*/
		goDetail : function(result) {
			var data = fn_getFormData($("#searchFrm"));
			data.seq = result;

			postToURL(contextPath + "/cs/menuStat/regist.do", data);
		},
		
		/**
		 * @name		: selectValue
		 * @description	: 게시판 목록의 오른쪽 상단의 selectValue의 값에 따른 이벤트
		 * @date		: 2019. 11. 14.
		 * @author		: 박소희
		 */
		selectValue : function(result) {
			var params = {};
			
			$('.nav-list li').click(function(){
				
				$('.nav-list li.uk-active').removeClass('uk-active');
				
				var activeNo = $(this).addClass('uk-active');
				var category = activeNo[0].value;

				if(category == 1){
					params.category = 'STAT';
				}else{
					params.category = 'SET';
				}
				
				postToURL(contextPath + "/cs/menuStat/listView.do", params);
			});
		},

		/**
		* @name         : goRegist
		* @description  : 등록페이지 이동
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		goRegist : function() {
			var data = fn_getFormData($("#searchFrm"));
			data.contentsId = "";
			postToURL(contextPath + "/cs/menuStat/regist.do", data);
		},

		/**
		* @name         : checkboxAll
		* @description  : <th>태그에 체크박스 클릭할 시, 체크박스 모두 활성화 되는 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		checkBoxAll : function() {
			if($("#checkAll").prop("checked")) {
				$("input[type=checkbox]").prop("checked", true);
			} else {
				$("input[type=checkbox]").prop("checked", false);
			}
		},
		
		/**
		* @name         : isOpenClick
		* @description  : 게시판 여부 변경 버튼 클릭 [라디오버튼 아님]
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		isOpenClick : function(result) {
			var params = fn_getFormData($("#searchFrm"));
			
			params.isOpen = result;
			
			var checkCnt = $('input:checkbox[id="checkId"]:checked').length;
			
			//console.log("체크박스 수량 :" + checkCnt);  			//테스트 완료
			
			if(checkCnt == 0) {
				alert("선택된 항목이 없습니다.");
				return;
			}
			
			var contentsIdGroup = [];
			
			$('input:checkbox[id="checkId"]:checked').each(function(index) {
				contentsIdGroup.push($(this).val());
			});
			
			params.contentsIdList = contentsIdGroup;
			
			//console.log("체크 대상 확인... : " + contentsIdGroup);
			
			//=====================================
			if(confirm("집계상태를 변경하시겠습니까?")) {
				ajax(true, contextPath + "/cs/menuStat/process/updateOpenYn.do", 'body', '변경중입니다.', params, function(result){
					params.isOpen = "";
					postToURL(contextPath + "/cs/menuStat/listView.do", params);
					
				});
			}
		},
		
		/**
		* @name         : goModify
		* @description  : 수정하기 버튼 클릭
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		goModify : function(result) {
			var data = fn_getFormData($("#searchFrm"));				
			postToURL(contextPath + "/cs/menuStat/regist.do", data);
			
		},
		
		/**
		* @name         : goDelete
		* @description  : 삭제 버튼 클릭
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		goDelete : function(result) {
			var params = fn_getFormData($("#searchFrm"));
			
			flagVal = "삭제";
			targetUrl = "/cs/menuStat/process/delete.do";
			
			if(confirm(flagVal + " 하시겠습니까?!")) {
				ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', params, function(result){
					postToURL(contextPath + "/cs/menuStat/listView.do", params);
				});
			}
		},
		
		/**
		* @name         : registInfo
		* @description  : 등록, 수정 버튼 클릭에 따른 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		registInfo : function() {
			var data = fn_getFormData($("#insertForm"));
			data.useYn = $('input[name="useYn"]:checked').val();

			if(data.seq == "") {
				flagVal = "등록";
				targetUrl = "/cs/menuStat/process/insert.do";
				
				if(data.useYn == null) {
					alert("집계여부를 체크하여 주세요.");
					return;
				}
			} else {
				flagVal = "수정";
				targetUrl = "/cs/menuStat/process/update.do";
			}

			if(confirm(flagVal + " 하시겠습니까?")) {
				ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', data, function(result) {
					
					if(result.resultMsg != "") {
						alert(flagVal + "에 " + resultMsg + " 하였습니다.");
						$crNtt.event.goList();
					}
				});
			}
		},
		
	}
}(window,document, jQuery));