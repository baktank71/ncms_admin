<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath }/js/mp/mpNttManageQnA.js"></script>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>Q & A 게시물 관리</h3>
                    <a href="#" class="uk-button uk-button-default board-select" id="selectBoxName"> 공지사항[제작] <span uk-icon="chevron-down"></span></a>
                    <div uk-dropdown="pos: bottom-right; mode: click; offset: 0;">
                       <ul class="uk-nav uk-navbar-dropdown-nav nav-list">
                           <li value="0412"><a href="javascript:void(0)">공지사항</a></li>
                           <li><a href="/mp/qna/listView">Q & A</a></li>
                           <li value="0413"><a href="javascript:void(0)">FAQ</a></li>
                       </ul>
                    </div>
                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <form id="searchFrm" name="searchFrm" method="POST" onsubmit="return false;" action="" class="search-condition">
                                	<input type="hidden" id="divisionCode" name="divisionCode" value="${params.divisionCode }" />
                                	<input type="hidden" id="currentPageNo" name="currentPageNo" value="${params.currentPageNo }" />
                                	<input type="hidden" id="isOpen" name="isOpen" value="${params.isOpen }" />
                                	<input type="hidden" id="replyYn" name="replyYn" value="${params.replyYn }" />
                                    <legend>검색조건</legend>
                                    <div class="uk-form-controls">
                                        <select id="searchId" name="searchId" class="uk-select w-100">
                                            <option value="">전체</option>
                                            <option value="1" <c:if test="${params.searchId eq 1 }">selected</c:if>>제목</option>
                                            <option value="2" <c:if test="${params.searchId eq 2 }">selected</c:if>>내용</option>
                                        </select>
                                        <input type="text" name="searchStr" id="searchStr" value="${params.searchStr }" class="uk-input w-200">
                                    </div>
                                    
								  <!-- 달력입니다. -->
				                  <div class="uk-form-controls">
									<label class="uk-form-label">작성일</label>
				                    <div class="" data-ax5picker="mpNttQnADate" style="width: 292px; display: inline-table; vertical-align: middle; margin-bottom:2px;">
				                      <input id="searchFromDate" name="searchFromDate" type="text" class="form-control date-picker-input" placeholder="검색일자" value="${params.searchFromDate }">
				                      <span class="input-group-addon date-picker-span"><i class="fa fa-calculator"></i></span>
				                      <span class="input-group-addon read-only" style="padding: 0 2px;">~</span>
				                      <input id="searchToDate"  name="searchToDate" type="text" class="form-control date-picker-input" placeholder="검색일자" value="${params.searchToDate }">
				                      <span class="input-group-addon date-picker-span"><i class="fa fa-calculator"></i></span>
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
                                        <col class="num">
                                        <col class="subject">
                                        <col class="file">
                                        <col style="width: 70px;">
                                        <col class="date">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th class="num">번호</th>
                                            <th class="subject">제목</th>
                                            <th class="answerYN">답변</th>
                                            <th class="date">작성일</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                     	<c:choose> 
                                     		<c:when test = "${empty result || result[0].totalCount == 0 }"> 
                                     			<tr> 
                                     				<td colspan="7">검색 내역이 없습니다.</td> 
                                     			</tr> 
                                     		</c:when> 
                                     		<c:otherwise> 
                                        	<c:set var="num" value="${paginationInfo.totalRecordCount - ((paginationInfo.currentPageNo-1) * 10)}" />	<!-- 페이징 공식 -->
                                        	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
													<td class="num">${num } </td>
													
		                                            <td class="subject uk-text-left">
		                                            	<a href="javascript:void(0);" onclick="$mpNttQnA.event.detailView('<c:out value="${data.contentsId}"/>', '<c:out value="${data.replyYn}" />');">
		                                            		<c:if test="${data.isOpen eq 'Y' }">
		                                            		</c:if>
		                                            		<c:if test="${data.isOpen eq 'N' }">
																	<i class="ion-locked" title= "비공개"></i>
		                                            		</c:if>
		                                            		<c:out value="${data.title}"/>
		                                            	</a>
		                                          	</td>
		                                            
		                                            <c:choose>
		                                            	<c:when test = "${empty data.replyYn }">
		                                            		<td>
		                                            			<span class="uk-text-danger">
		                                            				대기
		                                            			</span>
		                                            		</td>
		                                            	</c:when>
		                                            	<c:otherwise>
		                                            		<td>
		                                            			<span class="uk-text-primary">
		                                            				완료
		                                            			</span>
		                                            		</td>
		                                            	</c:otherwise>
		                                            </c:choose>
		                                            <td class="date"><c:out value="${data.writeTime}"/></td>
	                	                  </tr>
		                                  <c:set var="num" value="${num-1 }" />
		                                  </c:forEach>
	                                      </c:otherwise>
	                                   	</c:choose>
                                    </tbody>
                                </table>

                                <ul class="uk-pagination uk-flex-center pagination" uk-margin>
                                	<c:if test="${not empty paginationInfo}"> 
                                		<ui:pagination paginationInfo="${paginationInfo}" type="custom" jsFunction="$mpNttQnA.event.listSearch"/>
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