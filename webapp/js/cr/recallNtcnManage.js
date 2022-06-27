(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$recallNtcn = W.$recallNtcn || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	var gridSubMap = {};					//달력 그리드 설정
	
	$(document).ready(function(){
		
		$recallNtcn.event.setUIEvent();			//이벤트 SetUiEvent
		$recallNtcn.ui.pageLoad();				//최초 페이지 로드할 시 벌어지는 이벤트
		
	});
	
	$recallNtcn.ui = {
			
			/**
			 * @name		: pageLoad
			 * @description	: 페이지를 불러오면 벌어지는 이벤트
			 * @date		: 2019. 11. 13.
			 * @author		: 박소희
			 */
			pageLoad : function() {
				
				//공통 그리드 달력 호출하기
				searchFormDatePeriod('date', 'recallNtcnDate', gridSubMap);
				
			},
						
	}
	
	//Event 정의
	$recallNtcn.event = {
			
		/**
		* @name         : setUIEvent
		* @description  : 이벤트 세팅
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		setUIEvent : function(e) {
			$("#searchBtn").on('click', $recallNtcn.event.fn_search);		//게시판 검색 

			$("#applicationBtn").on('click', $recallNtcn.event.isDelete);	//해지신청저장
			$("#pswResetBtn").on('click', $recallNtcn.event.changePw);		//패스워드변경
			
			$("#listBtn").on('click', $recallNtcn.event.goList);			//목록으로
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
			
			var searchStr = $("#searchStr").val();			
			$("#searchStr").val(searchStr.replace(/ /gi, ""));
			
			var data = fn_getFormData($("#searchFrm"));
			
			postToURL(contextPath + "/cr/recallNtcn/listView.do", data);
		},
		
		/**
		* @name         : goList
		* @description  : 목록으로 이동한다
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		goList : function() {
			var params =  fn_getFormData($("#searchFrm"));
			postToURL(contextPath + "/cr/recallNtcn/listView.do", params);
		},
		
		/**
		* @name         : detailView
		* @description  : 게시글 상세보기
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		detailView : function(result) {
			var data = fn_getFormData($("#searchFrm"));
			data.subscribeNo = result;
			postToURL(contextPath + "/cr/recallNtcn/detailView.do", data);
		},

		/**
		* @name         : isDelete
		* @description  : 해지신청
		* @date         : 2019. 11. 24. 
		* @author	    : 박소희
		*/
		isDelete : function() {
			var params = fn_getFormData($("#searchFrm"));
			
			if(confirm("리콜알리미를 해지하시겠습니까?")) {
				ajax(true, contextPath + "/cr/recallNtcn/process/deleteUser.do", 'body', '변경중입니다.', params, function(result){
					
					if(!isNull(result)){
						alert("해지에 "+result.resultMsg+"하였습니다.");
						postToURL(contextPath + "/cr/recallNtcn/listView.do", params);
						
					}
					
				});
			}
		},

		/**
		* @name         : changePw
		* @description  : 신청자 주민번호 앞 6자리로 패스워드초기화
		* @date         : 2019. 11. 25. 
		* @author	    : 박소희
		*/
		changePw : function() {

			if(confirm("비밀번호를 신청자 주민번호 앞 6자리로 초기화 하시겠습니까?")) {
				var params = fn_getFormData($("#searchFrm"));
				params.newPw = $("#residentId").val().substring(0,6);
				
				ajax(true, contextPath + "/cr/recallNtcn/process/resetPassword.do", 'body', '변경중입니다.', params, function(result){
					
					if(!isNull(result)){
						alert("비밀번호 초기화에 "+result.resultMsg+"하였습니다.");
					}
					
				});
			}
		},

	}
}(window,document, jQuery));