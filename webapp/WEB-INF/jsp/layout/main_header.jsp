<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<header style="padding: 0;">

  <div class="uk-container uk-container-expand">
    <div uk-navbar>

      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li style="width: 220px; height: 60px; background-color: rgb(12, 46, 134);">
            <a href="/om/main" style="width: 100%; height: 22px; display: inline-block; justify-content: center;
                               margin: 0 auto; background: url('/images/logo.png') center center no-repeat;">
              <h1 class="skip">자동차리콜센터 로고</h1>
            </a>
          </li>
          <li class="uk-active"><a href="#">결함정보</a></li>
          <li><a href="#">자동차 리콜센터</a></li>
          <li><a href="#">제작자 제출자료</a></li>
          <li><a href="#">통계관리</a></li>
          <li><a href="#">접속현황</a></li>
        </ul>
      </div>

      <div class="uk-navbar-right">
        ${userNm}님 접속중
        <span>2019년 4월 23일 09:11:06</span>
        <button class="uk-button uk-button-default uk-button-small" onclick="window.location.href='editProfile.html'">개인정보변경</button>
        <form name="logoutFrm" id="logoutFrm" action="${contextPath}/logout" method="POST">
          <sec:csrfInput/>
          <button class="uk-button uk-button-default uk-button-small" >로그아웃</button>
        </form>
      </div>

    </div>
  </div>
</header>