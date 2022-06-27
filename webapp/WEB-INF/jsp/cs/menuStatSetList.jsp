<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<script type="text/javascript" src="${contextPath}/js/cs/menuStatSet.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>메뉴별 통계</h3>
                    
                    <a href="#" class="uk-button uk-button-default board-select" id="selectBoxName"> 메뉴명 설정 <span uk-icon="chevron-down"></span></a>
                    <div uk-dropdown="pos: bottom-right; mode: click; offset: 0;">
                       <ul class="uk-nav uk-navbar-dropdown-nav nav-list">
                           <li value="1"><a href="#" onClick="return false;">메뉴별 통계</a></li>
                           <li value="2"><a href="#" onClick="return false;">메뉴명 설정</a></li>
                       </ul>
                    </div>

                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <form id="searchFrm" name="searchFrm" method="POST" onsubmit="return false;" action="" class="search-condition">
                                    <input type="hidden" id="seq" name="seq" value="${params.seq }" />
                                	<input type="hidden" id="currentPageNo" name="currentPageNo" value="${params.currentPageNo }" />
                                	<input type="hidden" id="isOpen" name="isOpen" value="${params.isOpen }" />
                                    
                                    <legend>검색조건</legend>
                                    <div class="uk-form-controls">
                                        <select id="searchId" name="searchId" class="uk-select w-100">
                                            <option value="">전체</option>
                                            <option value="1" <c:if test="${params.searchId eq 1 }">selected</c:if>>제목</option>
                                            <option value="2" <c:if test="${params.searchId eq 2 }">selected</c:if>>경로</option>
                                        </select>
                                        <input type="text" name="searchStr" id="searchStr" value="${params.searchStr }" class="uk-input w-200">
                                    </div>
				                	<input type="hidden" id="category" name="category" value="SET">
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
                                        <col class="subject">
                                        <col class="date">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th><input class="uk-checkbox" type="checkbox" id="checkAll"></th>
                                            <th class="num">순번</th>
                                            <th class="subject">메뉴명</th>
                                            <th class="subject">URL</th>
                                            <th>집계여부</th>
                                        </tr>
                                    </thead>
                                    <tbody class="list">
                                     	<c:choose> 
                                     		<c:when test = "${empty result || result[0].totalCount == 0 }"> 
                                     			<tr> 
                                     				<td colspan="4">검색 내역이 없습니다.</td> 
                                     			</tr> 
                                     		</c:when> 
                                     		<c:otherwise> 
                                        	<c:set var="num" value="${paginationInfo.totalRecordCount - ((paginationInfo.currentPageNo-1) * 10)}" />	<!-- 페이징 공식 -->
                                        	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
		                                        	<td><input class="uk-checkbox" type="checkbox" id="checkId" name="ckIdsArg" value="${data.seq}"></td>
		                                        	<td class="num"><c:out value="${num}"/></td>
		                                            <td class="subject">
		                                            	<a href="#" onclick="$menuStatSet.event.goDetail('<c:out value="${data.seq}"/>'); return false;"><c:out value="${data.menuNm}" escapeXml="false"/></a>
		                                            </td>
		                                            <td class="subject uk-text-left">
		                                            	<a href="#" onclick="$menuStatSet.event.goDetail('<c:out value="${data.seq}"/>'); return false;"><c:out value="${data.menuUrl}"/></a>
		                                            </td>
	                                            <c:if test="${data.useYn eq 'Y'}">
				        	                    	<td><span class="uk-text-primary">사용</span></td>
				                                </c:if>
			    	                            <c:if test="${data.useYn eq 'N'}">
				    	                             <td><span class="uk-text-muted">해제</span></td>
			                	                </c:if>           
	                	                  	</tr>
		                                  	<c:set var="num" value="${num-1 }" />
		                                  </c:forEach>
	                                      </c:otherwise>
	                                   	</c:choose>
                                    </tbody>
                                </table>
                                
                                <div class="btn-write">
                                    <div class="uk-text-left">
                                        <button type="button" class="uk-button uk-button-default" id="isOpenY" onclick="$menuStatSet.event.isOpenClick('Y')">사용</button>
                                        <button type="button" class="uk-button uk-button-default" id="isOpenN" onclick="$menuStatSet.event.isOpenClick('N')">해제</button>
                                    </div>
                                    <button type="button" class="uk-button uk-button-primary" id="enrollBtn">등록</button>
                                </div>

                                </div>
                                <ul class="uk-pagination uk-flex-center pagination" uk-margin>
                                	<c:if test="${not empty paginationInfo}"> 
                                		<ui:pagination paginationInfo="${paginationInfo}" type="custom" jsFunction="$menuStatSet.event.fn_search_menu"/>
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