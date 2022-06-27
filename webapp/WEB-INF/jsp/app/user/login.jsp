<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">

	function doLogin() {
		if($.trim($("#userid").val()) == ""){
			alertPopup("아이디를 입력해주세요.");
			//$("#userid").focus();
			return;
		}
		if($.trim($("#userpwd").val()) == "") {
			alertPopup("비밀번호를 입력해주세요.");
			//$("#userpwd").focus();
			return;
		}

		$("#frm").attr("method", "post");
		
		if(navigator.userAgent.indexOf("Android") != -1) {
			window.Android.setUserId( $("#userid").val() );
			$("#frm").submit();
		} else {
			window.location="jscall://setIOSUserId," + $("#userid").val();
			setInterval(function(){$("#frm").submit();},200); //0.2초 후 submit
		}

		
	}
	
	
	function setIOSUserId(userId) {
		return userId;
	}
	
	<c:if test="${err eq '1'}">
	alertPopup("아이디/비밀번호를 다시 확인해주세요!");
	</c:if>
</script>
	<form id="frm" name="frm">
        <div id="header">
            <div class="header_box">
                <div class="header_top">
                    <span class="header_left"><a href="javascript:goBack();" class="btn_back"></a></span>
                    <span class="header_title">로그인</span>
                    <span class="header_right"></span>
                </div>
            </div>
        </div>
        
        <div id="container">
            <div class="content_sub">
                <div class="login_area">
                    <span class="mbs"><input type="text" id="userid" name="userid" placeholder="아이디" /></span>
                    <span class="mbs"><input type="password" id="userpwd" name="userpwd" placeholder="비밀번호" /></span>
                    <input type="button" value="로그인" onclick="doLogin()" class="btn_login" />
                    <span class="check_box"><input type="checkbox" id="autoLoginYn" name="autoLoginYn" value="Y" checked /><label for="autoLoginYn">자동로그인</label>
						<a href="/app/user/write.do"><span class="icon_join"></span>회원가입</a>
					</span>		
                </div>
            </div>
        </div>
	</form>


    