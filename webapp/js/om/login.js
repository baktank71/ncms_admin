(function(W, D, $) {
  // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
  'use strict';
  
  W.$login = W.$login || {};
  
  $(document).ready(function() {
    $login.ui.pageLoad();
    $login.event.setUIEvent();
  });
  
  // jQuery custom function
  // 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
  // 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭
  $login.ui = {
    pageLoad: function() {
      if(errorMsg != ''){
    	  UIkit.modal('#modal-center').show();
      }
      var inputCpfmsHaUserId = getCookie("inputCpfmsHaUserId");
      $("#userId").val(inputCpfmsHaUserId);
      
      if(inputCpfmsHaUserId != ""){
    	  $("#idSaveCheck").attr("checked", true);
		  $("#userPw").focus();
      }
      
      $("#idSaveCheck").change(function(){
    	  if($("#idSaveCheck").is(":checked")){
    		  var newIdVal =  $("#userId").val();
    		  setCookie("inputCpfmsHaUserId", newIdVal);
    	  }else{
    		  console.log("off");
    		  deleteCookie("inputCpfmsHaUserId");
    	  }
      });
      
      $("#userId").keyup(function(){
    	  if($("#idSaveCheck").is(":checked")){
    		  var newIdVal = $("#userId").val();
    		  console.log("on:"+newIdVal);
    		  setCookie("inputCpfmsHaUserId", newIdVal);
    	  }
      });
      
    }
  };
  
  // 이벤트 정의
  $login.event = {
    setUIEvent: function(e) {
      // $('#btnSearch').on('click', $login.event.btnSearchClickHandler); // 검색
    },
    
    login: function() {
    
    },
    
    
  };
  
}(window, document, jQuery));

function setCookie(cookieName, value, exdays){
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var cookieValue = escape(value) + ((exdays==null)?"":"; expires=" + exdate.toGMTString());
	document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName){
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() -1 );
	document.cookie = cookieName +"= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName){
	cookieName = cookieName + "=";
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cookieName);
	var cookieValue = '';
	
	if(start != -1){
		start += cookieName.length;
		var end = cookieData.indexOf(';', start);
		if(end == -1) end = cookieData.length;
		cookieValue = cookieData.substring(start, end);
	}
	return unescape(cookieValue);	
}