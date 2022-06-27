<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<script type="text/javascript" src="${contextPath}/js/om/login.js"></script>

<script type="text/javascript">
  var errorMsg = '<%=request.getAttribute("error")%>';
</script>

<article>
  <section>
    <div class="uk-section uk-flex uk-flex-middle uk-animation-fade login">
      <div class="uk-container">
        <div class="uk-grid-margin uk-grid uk-grid-stack uk-position-center uk-grid">
          <div class="uk-width-1-1">
          <!-- 
            <div class="uk-text-center logo"><img src="/images/logo_login.png" alt="로고"></div>
          -->            
            <div class="uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body">
              <div class="uk-card-title uk-text-center">관리자 로그인</div>
              <p class="uk-text-center uk-margin-medium-bottom">관리자시스템에 오신 것을 환영합니다.</p>

              <form name="loginFrm" id="loginFrm" action="${contextPath}/loginProcess" method="POST">
                <sec:csrfInput/>

                <div class="uk-margin">
                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                    <input class="uk-input uk-form-large" type="text"
                           id="mbId" name="mbId" placeholder="아이디" value="admin"
                           required="required" autofocus="autofocus" tabindex=1>
                  </div>
                </div>

                <div class="uk-margin">
                  <div class="uk-inline uk-width-1-1">
                    <span class="uk-form-icon" uk-icon="icon: lock"></span>
                    <input class="uk-input uk-form-large" type="password" placeholder="비밀번호"
                           id="mbPw" name="mbPw" required="required"  value="13579"
                           onkeydown='if(event.keyCode==13) $login.event.login();' tabindex=2>
                  </div>
                </div>

                <div class="uk-text-left">
                  <label><input class="uk-checkbox" id="idSaveCheck" type="checkbox"> 아이디저장</label>
                </div>

                <div class="uk-margin">
                  <%--<button type="submit" class="uk-button uk-button-primary uk-button-large uk-width-1-1" uk-toggle="target: #modal-center" uk-toggle>로그인</button>--%>
                    <button type="submit" class="uk-button uk-button-primary uk-button-large uk-width-1-1">로그인</button>
                </div>

                <div class="uk-text-center join">
                  <a href="#" class="uk-margin-medium-right">파트너신청</a>
                  <a href="#" class="uk-margin-medium-right" onclick="location.href='/om/addProfile.do'" >회원가입</a>
                  <!--
                  <a href="#">아이디/비밀번호 찾기</a>
                  -->
                </div>
                
              </form>

            </div>
          </div>


        </div>
      </div>
    </div>
  </section>
</article>

<!-- 로그인 알럿 -->
<div id="modal-center" class="uk-flex-top login-alert" uk-modal>
  <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
    <button class="uk-modal-close-default" type="button" uk-close></button>
    <span uk-icon="icon: warning; ratio: 3"></span>
    <%--<p>비밀번호를 5회 이상 잘못 입력하셨습니다.<br>관리자에게 문의해주세요.</p>--%>
    <p>'<%=request.getAttribute("error")%>'</p>
    <p class="uk-text-center">
      <button class="uk-button uk-button-primary uk-modal-close" type="button">확인</button>
    </p>
  </div>
</div>
