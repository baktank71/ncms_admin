<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- <script type="text/javascript" src="${contextPath}/ext/Chart.js-2.9.3/Chart.min.js"></script> -->

<script type="text/javascript" src="${contextPath}/js/si/statsInfo.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>통계정보</h3>

                    <a href="#" class="uk-button uk-button-default board-select" id="selectBoxName"> 리콜통계 <span uk-icon="chevron-down"></span></a>
                    <div uk-dropdown="pos: bottom-right; mode: click; offset: 0;">
                       <ul class="uk-nav uk-navbar-dropdown-nav nav-list">
                           <li value="1"><a href="#" onClick="return false;">리콜통계</a></li>
                           <li value="2"><a href="#" onClick="return false;">분석시스템</a></li>
                       </ul>
                    </div>

                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <form id="searchFrm" name="searchFrm" method="POST" onsubmit="return false;" action="" class="search-condition">
                                	<input type="hidden" id="useType" name="useType" value="HP" />
									<%--     <legend>검색조건</legend>
                                    <div class="uk-form-controls">
                                        <select id="searchGb" name="searchGb" class="uk-select w-100">
                                            <option value="1" <c:if test="${params.searchGb eq 1 }">selected</c:if>>unique</option>
                                            <option value="2" <c:if test="${params.searchGb eq 2 }">selected</c:if>>non unique</option>
                                        </select>                                    
                                        <select id="searchType" name="searchType" class="uk-select w-100">
                                            <option value="1" <c:if test="${params.searchType eq 1 }">selected</c:if>>년도별</option>
                                            <option value="2" <c:if test="${params.searchType eq 2 }">selected</c:if>>월별</option>
                                            <option value="3" <c:if test="${params.searchType eq 3 }">selected</c:if>>일별</option>
                                        </select>
                                    </div>
                                    <div class="uk-form-controls">
                                        <label class="uk-form-label">날짜</label>
                                        <input type="text" id="searchFromDate" name="searchFromDate" value="${params.searchFromDate }" maxLength="8" class="uk-input uk-width-small" placeholder="검색일자"><!-- 달력위치 -->
                                         ~ <input type="text" id="searchToDate" name="searchToDate" value="${params.searchToDate }" maxLength="8" class="uk-input uk-width-small" placeholder="검색일자">                                            
                                    </div>
                                    <button type="submit" id="searchBtn" class="uk-button uk-button-secondary">검색</button>
                                 --%>
                                </form>
                                <hr>
              
                                <table class="uk-table uk-table-divider board-list">
                                    <caption>게시물 목록</caption>
                                    <colgroup>
                                        <col style="width: 50px;">
                                        <col class="subject">
                                        <col style="width: 140px;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th class="num"><input class="uk-checkbox" type="checkbox" id="checkAll"></th>
                                            <th>통계명</th>
                                            <th>공개상태</th>
                                        </tr>
                                    </thead>
                                    <tbody class="list">
                                    	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
	                                        	<td><input class="uk-checkbox" type="checkbox" id="ckId" name="ckIdsArg" value="${data.statsManageNo}"></td>
	                                            <td class="subject uk-text-left"><a href="#" onclick="$statsInfo.event.detailView('<c:out value="${data.statsUrl}"/>'); return false;"><c:out value="${data.statsTitl}"/></a></td>            
				                                <c:if test="${data.isOpen eq 'Y'}">
				        	                    	<td><span class="uk-text-primary">공개</span></td>
				                                </c:if>
			    	                            <c:if test="${data.isOpen eq 'N'}">
				    	                             <td><span class="uk-text-muted">비공개</span></td>
			                	                </c:if>
	                	                	</tr>
		                                </c:forEach>
                                    </tbody>
                                </table>
                                
                                <div class="btn-write">
                                    <div class="uk-text-left">
                                        <button type="button" class="uk-button uk-button-default" id="isOpenY" onclick="$statsInfo.event.isOpenClick('Y')">공개</button>
                                        <button type="button" class="uk-button uk-button-default" id="isOpenN" onclick="$statsInfo.event.isOpenClick('N')">비공개</button>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>		
	</section>
</article>