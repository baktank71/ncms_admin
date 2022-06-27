<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<header>
  <div class="uk-container uk-container-expand">
    <div uk-navbar>

      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="uk-active"><a href="#">&nbsp;</a></li>
        </ul>
      </div>

      <div class="uk-navbar-right">
        ${userNm}님 접속중
        <span>${currTime }</span>
        	<button class="uk-button uk-button-default uk-button-small" id="loginProfile" onclick="location.href='/om/editProfile.do'"> 개인정보변경 </button>
        <form name="logoutFrm" id="logoutFrm" action="${contextPath}/logout" method="POST">
          <sec:csrfInput/>
          <button class="uk-button uk-button-default uk-button-small" >로그아웃</button>
        </form>
        
      </div>

    </div>
  </div>
</header>