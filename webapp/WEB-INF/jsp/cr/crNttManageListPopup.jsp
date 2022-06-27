<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManagePop.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>게시물 관리</h3>
                    <a href="#" class="uk-button uk-button-default board-select" id="selectBoxName"> 팝업존 <span uk-icon="chevron-down"></span></a>
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
									
                                    <legend>검색조건</legend>
                                    <div class="uk-form-controls">
                                        <select id="searchUseYn" name="searchUseYn" class="uk-select w-100">
                                            <option value="">전체</option>
                                            <option value="Y" <c:if test="${params.searchUseYn eq 'Y' }">selected</c:if>>사용중</option>
                                            <option value="N" <c:if test="${params.searchUseYn eq 'N' }">selected</c:if>>사용안함</option>
                                        </select>
                                    </div>
                                    <button type="submit" id="searchBtn" class="uk-button uk-button-secondary">검색</button>
                                    <div class="uk-form-controls">
                                        <label class="uk-form-label">팝업존 MAX</label>
                                        <select id="popupMax" name="popupMax" class="uk-select w-100">
											<c:forEach begin="1" end="5" step="1" var="cnt">
												<c:choose>
												<c:when test="${maxPopCnt == cnt}">
													<option value='${cnt}' selected >${cnt}</option>
												</c:when>
												<c:otherwise>
													<option value='${cnt}' >${cnt}</option>
												</c:otherwise>
												</c:choose>
											</c:forEach>
                                        </select>                                          
                                    </div>
                                    <button type="submit" id="fnonUseBtn" class="uk-button uk-button-secondary">적용</button>
                                </form>

                                <hr>

								<c:if test="${not empty paginationInfo }">
                                	<p class="count-result">전체 <span class="uk-text-primary">${paginationInfo.totalRecordCount }</span>건 (페이지 <span class="uk-text-primary">${paginationInfo.currentPageNo }/${paginationInfo.totalPageCount }</span>)</p>
                                </c:if>                                
                                <table class="uk-table uk-table-divider board-list">
                                    <caption>게시물 목록</caption>
                                    <colgroup>
                                        <col class="num">
                                        <col class="subject">
                                        <%-- <col class="file"> --%>
                                        <%-- <col class="date"> --%>
                                        <col class="writer">
                                        <col class="date">
                                        <col class="counter">
                                        <col style="width: 140px;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th class="num">배너ID</th>
                                            <th class="subject">제목</th>
<!--                                             <th class="file">첨부</th> -->
                                            <th class="writer">표시순위</th>
                                            <th class="date">등록일</th>
                                            <th class="counter">사용여부</th>
                                            <th>기간</th>
                                        </tr>
                                    </thead>
                                    <tbody class="list">
                                     	<c:choose> 
                                     		<c:when test = "${empty result || result[0].totalCount == 0 }"> 
                                     			<tr> 
                                     				<td colspan="6">검색 내역이 없습니다.</td> 
                                     			</tr> 
                                     		</c:when> 
                                     		<c:otherwise>
                                        	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
	                                        	<td class="num"><c:out value="${data.bannerId}"/></td>
	                                            <td class="subject uk-text-left"><a href="#" onclick="$crNttPop.event.detailView('<c:out value="${data.bannerId }" />','<c:out value="${params.divisionCode }" />'); return false;"><c:out value="${data.bannerTitle}"/></a></td>
	                                            <td class="writer"><c:out value="${data.bannerSort}"/></td>
                                            	<td class="date"><c:out value="${data.insertDate}"/></td>
				        	                    <td class="counter">
				                	                <c:choose><c:when test="${data.bannerUse eq 'N'}">
				                	               		<span class="uk-text-primary">사용안함</span>
				                	                </c:when><c:otherwise>
				                	                	<span class="uk-text-primary">사용</span>
				                	                </c:otherwise></c:choose>
				                	            </td>
			                	                <td>
				                	                <c:choose><c:when test="${data.bannerPeriod eq 'N'}">
				                	               		 기간제한없음
				                	                </c:when><c:otherwise>
				                	                	<c:out value="${data.bannerStartDate}"/> ~ <c:out value="${data.bannerEndDate}"/>
				                	                </c:otherwise></c:choose>
			                	                </td>
	                	                  	</tr>
		                                  </c:forEach>
	                                      </c:otherwise>
	                                   	</c:choose>
                                    </tbody>
                                </table>
                                <div class="btn-write">
                                    <button type="button" class="uk-button uk-button-primary" id="enrollBtn">글쓰기</button>
                                </div>

                                <ul class="uk-pagination uk-flex-center pagination" uk-margin>
                                	<c:if test="${not empty paginationInfo}"> 
                                		<ui:pagination paginationInfo="${paginationInfo}" type="custom" jsFunction="$crNttPop.event.fn_search"/>
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