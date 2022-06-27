(function(W, D, $) {
	  // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$addProfile = W.$addProfile || {};
	
	var dataSource = null;
	
	$(document).ready(function() {
		$addProfile.event.setUIEvent();
	});
	
	$addProfile.ui = {
			
			
	}
	
	$addProfile.event = {
			/**
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2019. 12. 09  
			 * @author	     : 
			 */	
			setUIEvent : function(e) {
				$("#addProfile").on('click', $addProfile.event.profileSave);		    //변경 버튼
				$("#cancelBtn").on('click', $addProfile.event.cancel);					//목록 버튼
			},
			
			/**
			 * @name		: profileSave
			 * @description	: 비밀번호 변경 이벤트
			 * @date		: 2019. 12. 09
			 * @author		: 이성훈
			 */
			profileSave : function() {
				var params = {};
				
				var regex = /^.*(?=^.{9,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/; 	//정규식
				var passwordCheck = $("#mbPw").val().replace(/ /gi, "");		//모든 공백 제거하기
				
				params.userId = $("#mbId").val();					//로그인한 사람의 아이디
				params.userPw = $("#mbPw").val();					//기존 패스워드
				params.userPwNew = $("#userPw).val();			//새 비밀번호
				
				//기존패스워드, 새비밀번호, 새 비밀번호 확인 이 3개 중 하나라도 값이 없을 경우 비밀번호 입력하라고 문구 뜬다.
				if(params.userPw == "" ) {
					alert("비밀번호를 입력해주세요.");
					return;
				} 
				
				//정규식 체크 
				if(regex.test(passwordCheck) == false && passwordCheck != "") {
					alert("비밀번호는  9~15자 영문 숫자 특수문자 혼용만 가능합니다.");
					$("#mbPw").focus();
					return;
				}
				
				
				
				if(confirm("회원정보를 등록 하시겠습니까?!")) {
						ajax(true, contextPath + '/om/passwordChk.do', 'body', '처리중입니다.', params, function(result) {
							if(result < 1) {
								alert("기존 비밀번호가 다릅니다.");
								return;
							}
						
						ajax(true, contextPath + '/om/process/update.do', 'body', '처리중입니다', params, function(result) {
						if(result > 0) {
								alert("비밀번호가 변경되었습니다.");
								postToURL(contextPath + "/om/main.do");
							} else {
								alert("비밀번호 변경이 실패하였습니다.");
							}
						});
					});
				}
			},
	
			/**
			 * @name		: cancel
			 * @description	: 목록버튼 누르기
			 * @date		: 2019. 12. 09
			 * @author		: 이성훈
			 */
			cancel : function() {
				postToURL(contextPath + "/om/login");
			}
	}
}(window, document, jQuery));