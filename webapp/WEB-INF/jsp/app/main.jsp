<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <div id="header">
            <div class="header_top">
                <span class="header_left"><a href="#" class="btn_menu" id="menu_open"></a></span>
                <span class="header_title">광역알뜰교통카드 마일리지</span>
                <span class="header_right"><a href="/app/notice/list.do" class="btn_notice on"></a></span>
            </div>
        </div>
        <div id="container">
            <div class="content">
                <div class="main_img"></div>
                <div class="main_mileage">
                    <ul>
                        <li><span class="subject t_blue">마일리지</span><c:if test="${info == null }">0</c:if><fmt:formatNumber value="${info.mileage }" pattern="#,###" />원</li>
                        <li><span class="subject t_org">알뜰카드 잔여 횟수</span><c:if test="${info == null }">0</c:if><fmt:formatNumber value="${info.remain }" pattern="#,###" />회</li>
                    </ul>
                </div>
                <div class="main_btn">
                    <a href="/app/idea/write.do" class="btn_suggest"></a>
                    <a href="/app/mileage/write.do" class="btn_save"></a>
                </div>
            </div>
        </div>
        <div class="main_bg"></div>
