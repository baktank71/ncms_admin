<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="requestUri" value="${requestScope['javax.servlet.forward.request_uri']}"/>
<c:set var="requestUrlArr" value="${fn:split(requestUri,'/') }" />
<c:set var="urlA" value="${requestUrlArr[0]}" />
<c:set var="urlB" value="${requestUrlArr[1]}" />


<nav>
    <div class="sidebar uk-background-default uk-light">
        <div class="logo">
			<a href="/om/main"><h1 class="skip">자동차리콜센터로고</h1></a>
        </div>
        <h2 class="skip">좌측메뉴</h2>
        <ul class="uk-nav-parent-icon" uk-nav>
            <li class="uk-parent <c:if test='${urlA eq "cr" || urlA eq "om"}'>uk-open</c:if>"><!-- 메뉴가 펼쳐졌을땐 .uk-open -->
                <a href="#">자동차리콜센터</a>
                <ul class="uk-nav-sub">
                    <li <c:if test='${(urlA eq "cr" && urlB eq "ntt") || urlB eq "main"}'>class="active"</c:if>><a href="/cr/ntt/listView">게시물관리</a></li>
                    <li <c:if test='${urlA eq "cr" && urlB eq "cntnts"}'>class="active"</c:if>><a href="/cr/cntnts/listView">컨텐츠관리</a></li>
                    <li <c:if test='${urlA eq "cr" && urlB eq "recallNtcn"}'>class="active"</c:if>><a href="/cr/recallNtcn/listView">리콜알리미</a></li>
                </ul>
            </li>
            <li class="uk-parent <c:if test='${urlA eq "mp"}'>uk-open</c:if>">
                <a href="#">제작자 제출자료</a>
                <ul class="uk-nav-sub">
                    <li <c:if test='${urlA eq "mp" && (urlB eq "ntt" || urlB eq "qna")}'>class="active"</c:if>><a href="/mp/ntt/listView">게시물관리</a></li>
                    <!-- <li><a href="#">컨텐츠관리</a></li> -->
                </ul>
            </li>
            <li class="uk-parent <c:if test='${urlA eq "si"}'>uk-open</c:if>">
                <a href="#">통계관리</a>
                <ul class="uk-nav-sub">
                    <li <c:if test='${urlA eq "si" && urlB eq "statsInfo"}'>class="active"</c:if>><a href="/si/statsInfo/listView">통계정보</a></li>
                </ul>
            </li>
            <li class="uk-parent <c:if test='${urlA eq "cs"}'>uk-open</c:if>">
                <a href="#">접속현황</a>
                <ul class="uk-nav-sub">
                    <li <c:if test='${urlA eq "cs" && urlB eq "pdStat"}'>class="active"</c:if>><a href="/cs/pdStat/listView">기간별 접속통계</a></li>
                    <li <c:if test='${urlA eq "cs" && urlB eq "menuStat"}'>class="active"</c:if>><a href="/cs/menuStat/listView">메뉴별 통계</a></li>
                </ul>
            </li>
            <li class="uk-parent <c:if test='${urlA eq "cs"}'>uk-open</c:if>">
                <a href="#">출금계좌등록/변경</a>
            </li>            
            <li class="uk-parent <c:if test='${urlA eq "cs"}'>uk-open</c:if>">
                <a href="#">입금내역</a>
            </li>            
            <li class="uk-parent <c:if test='${urlA eq "cs"}'>uk-open</c:if>">
                <a href="#">출금내역</a>
            </li>            
            <li class="uk-parent <c:if test='${urlA eq "cs"}'>uk-open</c:if>">
                <a href="#">출금신청/정지금액</a>
            </li>            
            <li class="uk-parent <c:if test='${urlA eq "cs"}'>uk-open</c:if>">
                <a href="#">계좌발행내역</a>
            </li>            
            <li class="uk-parent <c:if test='${urlA eq "cs"}'>uk-open</c:if>">
                <a href="#">지급관리</a>
            </li>            
            <li class="uk-parent <c:if test='${urlA eq "cs"}'>uk-open</c:if>">
                <a href="#">반환내역</a>
            </li>            
            <li class="uk-parent <c:if test='${urlA eq "cs"}'>uk-open</c:if>">
                <a href="#">시스템</a>
                <ul class="uk-nav-sub">
                    <li <c:if test='${urlA eq "cs" && urlB eq "pdStat"}'>class="active"</c:if>><a href="#">파트너관리</a></li>
                    <li <c:if test='${urlA eq "cs" && urlB eq "pdStat"}'>class="active"</c:if>><a href="#">회원관리</a></li>
                </ul>
            </li>            
        </ul>
    </div>
</nav>