<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManageGrts.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>게시물 관리</h3>
                    <a href="#" class="uk-button uk-button-default board-select" id="selectBoxName"> 무상점검·정비 <span uk-icon="chevron-down"></span></a>
                    <div uk-dropdown="pos: bottom-right; mode: click; offset: 0;">
                       <ul class="uk-nav uk-navbar-dropdown-nav nav-list">
                           <li value="0402"><a href="#" onClick="return false;">공지사항</a></li>
                           <li value="0401"><a href="#" onClick="return false;">리콜보도자료</a></li>
                           <li value="0331"><a href="#" onClick="return false;">FAQ</a></li>
                           <li value="0337"><a href="#" onClick="return false;">FAQ(Eng)</a></li>
                           <li value="1001"><a href="#" onClick="return false;">리콜현황</a></li>
                           <li value="8888"><a href="#" onClick="return false;">무상점검·정비</a></li>
                           <li value="8003"><a href="#" onClick="return false;">신고내역조회</a></li>
                           <li value="7777"><a href="#" onClick="return false;">팝업존</a></li>
                           <li value="0507"><a href="#" onClick="return false;">자동차 안전지식</a></li> 
                           <li value="0701"><a href="#" onClick="return false;">관리자공지사항</a></li> 
                       </ul>
                    </div>
                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <form id="searchFrm" name="searchFrm" method="POST" onsubmit="return false;" action="" class="search-condition">
                                	<input type="hidden" id="divisionCode" name="divisionCode" value="${params.divisionCode }" />
                                	<input type="hidden" id="currentPageNo" name="currentPageNo" value="${params.currentPageNo }" />
                                	<input type="hidden" id="isOpen" name="isOpen" value="${params.isOpen }" />
									
                                    <legend>검색조건</legend>
                                    <div class="uk-form-controls">
                                        <select id="searchId" name="searchId" class="uk-select w-100">
                                            <option value="">전체</option>
                                            <option value="1" <c:if test="${params.searchId eq 1 }">selected</c:if>>제목</option>
                                            <option value="2" <c:if test="${params.searchId eq 2 }">selected</c:if>>출처</option>
                                            <option value="3" <c:if test="${params.searchId eq 3 }">selected</c:if>>차명</option>
                                        </select>
                                        <input type="text" name="searchStr" id="searchStr" value="${params.searchStr }" class="uk-input w-200">
                                    </div>

								  <!-- 달력입니다. -->
				                  <div class="uk-form-controls">
									<label class="uk-form-label">작성일</label>
				                    <div class="" data-ax5picker="crctGrtsDate" style="width: 292px; display: inline-table; vertical-align: middle; margin-bottom:2px;">
				                      <input id="searchFromDate" name="searchFromDate" type="text" class="form-control date-picker-input" placeholder="검색일자" value="${params.searchFromDate }">
				                      <span class="input-group-addon date-picker-span"><i class="fa fa-calculator"></i></span>
				                      <span class="input-group-addon read-only" style="padding: 0 2px;">~</span>
				                      <input id="searchToDate"  name="searchToDate" type="text" class="form-control date-picker-input" placeholder="검색일자" value="${params.searchToDate }">
				                      <span class="input-group-addon date-picker-span"><i class="fa fa-calculator"></i></span>
				                    </div>
				                  </div>

                                    <div class="uk-form-controls uk-margin-small-left">
									<!-- <label class="uk-form-label">공개여부</label> -->
		                            	<div class="uk-form-controls">
		                            		<select id="searchOpenYn" name="searchOpenYn" class="uk-select w-100">
		                            			<option value="">공개여부</option>
		                            			<option value="Y" <c:if test="${params.searchOpenYn eq 'Y'}">selected </c:if>>공개</option>
		                            			<option value="N" <c:if test="${params.searchOpenYn eq 'N'}">selected </c:if>>비공개</option>
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
                                        <col class="writer">
                                        <col class="date">
                                        <%-- <col class="file"> --%>
                                        <col class="counter">
                                        <col style="width: 140px;">
                                        <col style="width: 120px;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th><input class="uk-checkbox" type="checkbox" id="checkAll"></th>
                                            <th class="num">번호</th>
                                            <th class="subject">제목</th>
                                            <th class="writer">출처</th>
                                            <th class="date">작성일</th>
                                       		<!-- <th class="file">첨부</th> -->
                                            <th class="counter">조회수</th>
                                            <th>공개여부</th>
                                            <th>SNS공유</th>
                                        </tr>
                                    </thead>
                                    <tbody class="list">
                                     	<c:choose> 
                                     		<c:when test = "${empty result || result[0].totalCount == 0 }"> 
                                     			<tr> 
                                     				<td colspan="8">검색 내역이 없습니다.</td> 
                                     			</tr> 
                                     		</c:when> 
                                     		<c:otherwise>
                                     		<c:set var="num" value="${paginationInfo.totalRecordCount - ((paginationInfo.currentPageNo -1) * 10) }" />
                                        	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
	                                        	<td><input class="uk-checkbox" type="checkbox" id="ckId" value="${data.gratischeckId}"></td>
	                                        	<td class="num"><c:out value="${num}"/></td>
	                                            <td class="subject uk-text-left"><a href="#" onclick="$crNttGrts.event.detailView('<c:out value="${data.gratischeckId}"/>', '8888'); return false;"><c:out value="${data.gratischeckTitle}"/></a></td>
                                            	<td class="writer"><c:out value="${data.gratischeckSource}"/></td>
	                                            <td class="date"><c:out value="${data.regDate}"/></td>
	                                       		<!-- <td class="file">첨부</td> -->
                                            	<td class="counter"><c:out value="${data.readCount}"/></td>
				                                <c:if test="${data.isOpen != 'N'}">
				        	                    	<td><span class="uk-text-primary">공개</span></td>
				                                </c:if>
			    	                            <c:if test="${data.isOpen eq 'N'}">
				    	                             <td><span class="uk-text-muted">비공개</span></td>
			                	                </c:if>
			                	                <td>
				                                <c:if test="${data.snsOpen != 'N'}">
			                	                	<span class="uk-text-success"><i uk-icon="icon: check;"></i></span>
				                                </c:if>
				                                </td>
	                	                  	</tr>
	                	                  	<c:set var="num" value="${num-1 }" />
		                                  </c:forEach>
	                                      </c:otherwise>
	                                   	</c:choose>
                                    </tbody>
                                </table>
                                <div class="btn-write">
                                    <div class="uk-text-left" style="margin-top:36px;">
                                        <button type="button" class="uk-button uk-button-default" id="isOpenY" onclick="$crNttGrts.event.isOpenClick('Y')">공개</button>
                                        <button type="button" class="uk-button uk-button-default" id="isOpenN" onclick="$crNttGrts.event.isOpenClick('N')">비공개</button>
                                        <button type="button" class="uk-button uk-button-default" id="snsOpenY" onclick="$crNttGrts.event.snsOpenClick('Y')">SNS허용</button>
                                        <button type="button" class="uk-button uk-button-default" id="snsOpenN" onclick="$crNttGrts.event.snsOpenClick('N')">SNS제외</button>
                                    </div>
                                    <!-- <button type="button" class="uk-button uk-button-primary" id="enrollBtn">글쓰기</button> -->
                                </div>

                                <ul class="uk-pagination uk-flex-center pagination" uk-margin>
                                	<c:if test="${not empty paginationInfo}"> 
                                		<ui:pagination paginationInfo="${paginationInfo}" type="custom" jsFunction="$crNttGrts.event.fn_search"/>
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