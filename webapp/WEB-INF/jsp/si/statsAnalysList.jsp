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

                    <a href="#" class="uk-button uk-button-default board-select" id="selectBoxName"> 분석시스템 <span uk-icon="chevron-down"></span></a>
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
									<input type="hidden" id="useType" name="useType" value="AS" />
                                </form>
                                <hr>
              
                                <table class="uk-table uk-table-divider board-list">
                                    <caption>통계 목록</caption>
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
	                                            <td class="subject uk-text-left"><a href="#" onclick="$statsInfo.event.analysDetailView('<c:out value="${data.statsUrl}"/>','<c:out value="${data.statsTitl}"/>'); return false;"><c:out value="${data.statsTitl}"/></a></td>            
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