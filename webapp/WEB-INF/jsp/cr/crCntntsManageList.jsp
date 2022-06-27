<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crCntntsManage.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>컨텐츠 관리</h3>
                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <form id="searchFrm" name="searchFrm" method="POST" onsubmit="return false;" action="" class="search-condition">
                                	<input type="hidden" id="divisionCode" name="divisionCode" value="${params.divisionCode }" />
                                	<input type="hidden" id="currentPageNo" name="currentPageNo" value="${params.currentPageNo }" />
                                	<input type="hidden" id="contentsId" name="contentsId" value="" />
									
                                    <legend>검색조건</legend>
                                    <div class="uk-form-controls">
                                        <select id="searchId" name="searchId" class="uk-select w-100">
                                            <option value="">전체</option>
                                            <option value="1" <c:if test="${params.searchId eq 1 }">selected</c:if>>메뉴명</option>
                                            <option value="2" <c:if test="${params.searchId eq 2 }">selected</c:if>>내용</option>
                                        </select>
                                        <input type="text" name="searchStr" id="searchStr" value="${params.searchStr }" class="uk-input w-200">
                                    </div>

								  <!-- 달력입니다. -->
				                  <%-- <div class="uk-form-controls">
				                    <div class="" data-ax5picker="crtntsDate" style="width: 292px; display: inline-table; vertical-align: middle; margin-bottom:2px;">
				                      <input id="searchFromDate" name="searchFromDate" type="text" class="form-control date-picker-input" placeholder="검색일자" value="${params.searchFromDate }">
				                      <span class="input-group-addon date-picker-span"><i class="fa fa-calculator"></i></span>
				                      <span class="input-group-addon read-only" style="padding: 0 2px;">~</span>
				                      <input id="searchToDate"  name="searchToDate" type="text" class="form-control date-picker-input" placeholder="검색일자" value="${params.searchToDate }">
				                      <span class="input-group-addon date-picker-span"><i class="fa fa-calculator"></i></span>
				                    </div>
				                  </div> --%>
                                    <div class="uk-form-controls uk-margin-small-left">
									<!-- <label class="uk-form-label">공개여부</label> -->
		                            	<div class="uk-form-controls">
		                            		<select id="searchOpenYn" name="searchOpenYn" class="uk-select w-100">
		                            			<option value="">공유여부</option>
		                            			<option value="Y" <c:if test="${params.searchOpenYn eq 'Y'}">selected </c:if>>허용</option>
		                            			<option value="N" <c:if test="${params.searchOpenYn eq 'N'}">selected </c:if>>제외</option>
		                            		</select>
		                            	</div>
		                            </div>
                                    
                                    <button type="submit" id="searchBtn" class="uk-button uk-button-secondary">검색</button>
                                </form>

                                <hr>

								<c:if test="${not empty paginationInfo }">
                                	<p class="count-result">전체 <span class="uk-text-primary">${paginationInfo.totalRecordCount }</span>건 (페이지 <span class="uk-text-primary">${paginationInfo.currentPageNo }/${paginationInfo.totalPageCount }</span>)</p>
                                </c:if>                                
                                <table class="uk-table uk-table-divider board-list">
                                    <caption>게시물 목록</caption>
                                    <colgroup>
                                        <col style="width: 50px;">
                                        <col class="num">
                                        <col class="subject">
                                        <col class="date">
                                        <col style="width: 140px;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th><input class="uk-checkbox" type="checkbox" id="checkAll"></th>
                                            <th class="num">순번</th>
                                            <th class="subject">메뉴명</th>
                                            <th>메뉴ID</th>
                                            <th>공유여부</th>
                                        </tr>
                                    </thead>
                                    <tbody class="list">
                                     	<c:choose> 
                                     		<c:when test = "${empty result || result[0].totalCount == 0 }"> 
                                     			<tr> 
                                     				<td colspan="5">검색 내역이 없습니다.</td> 
                                     			</tr> 
                                     		</c:when> 
                                     		<c:otherwise> 
                                        	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
		                                        	<td><input class="uk-checkbox" type="checkbox" id="ckId" name="ckIdsArg" value="${data.contentsId}"></td>
		                                        	<td class="num"><c:out value="${data.cno}"/></td>
		                                            <td class="subject uk-text-left"><a href="javascript:void(0);" onclick="$.crCntnts.event.detailView('<c:out value="${data.contentsId}"/>');"><c:out value="${data.title}"/></a></td>            
		                                            <td><c:out value="${data.jbsource}"/></td>
					                                <c:if test="${data.isOpen eq 'Y'}">
					        	                    	<td><span class="uk-text-primary">허용</span></td>
					                                </c:if>
				    	                            <c:if test="${data.isOpen eq 'N'}">
					    	                             <td><span class="uk-text-muted">제외</span></td>
				                	                </c:if>
	                	                  </tr>
		                                  </c:forEach>
	                                      </c:otherwise>
	                                   	</c:choose>
                                    </tbody>
                                </table>
                                <div class="btn-write">
                                    <div class="uk-text-left">
                                        <button type="button" class="uk-button uk-button-default" id="isOpenY" onclick="$.crCntnts.event.isOpenClick('Y')">공유</button>
                                        <button type="button" class="uk-button uk-button-default" id="isOpenN" onclick="$.crCntnts.event.isOpenClick('N')">비공유</button>
                                    </div>
                                    <!-- <button type="button" class="uk-button uk-button-primary" id="enrollBtn">글쓰기</button> -->
                                </div>

                                <ul class="uk-pagination uk-flex-center pagination" uk-margin>
                                	<c:if test="${not empty paginationInfo}"> 
                                		<ui:pagination paginationInfo="${paginationInfo}" type="custom" jsFunction="$.crCntnts.event.fn_search"/>
                                    </c:if> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>		
	</section>
</article>