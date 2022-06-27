<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath }/js/mp/mpNttManage.js"></script>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>제작자 게시물 관리</h3>
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
                                    <legend>검색조건</legend>
                                    <c:choose>
                                    	<c:when test = "${params.divisionCode eq 0331 }">
			                            	<div class="uk-form-controls">
			                            		<select id="faqId" name="faqId" class="uk-select w-100">
			                            			<option value="">전체</option>
			                            			<option value="A" <c:if test="${params.faqId eq 'A'}">selected </c:if>>제작관리</option>
			                            			<option value="B" <c:if test="${params.faqId eq 'B'}">selected </c:if>>홈페이지</option>
			                            		</select>
			                            	</div>
                                    	</c:when>
                                    	<c:when test = "${params.divisionCode eq 0401 }">
                                    		<div class="uk-form-controls">
                                    			<select id="newsData" name="newsData" class="uk-select w-100">
                                    				<option value="">전체</option>
                                    				<option value="A" <c:if test="${params.faqId eq 'A'}">selected </c:if>>관리요령</option>
			                            			<option value="B" <c:if test="${params.faqId eq 'B'}">selected </c:if>>정보/상식</option>
			                            			<option value="C" <c:if test="${params.faqId eq 'B'}">selected </c:if>>뉴스</option>
                                    			</select>
                                    		</div>
                                    	</c:when>
                                    	<c:otherwise>
                                    	</c:otherwise>
                                    </c:choose>
                                    
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
									<div class="" data-ax5picker="mpNttDate" style="width: 292px; display: inline-table; vertical-align: middle; margin-bottom:2px;">
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
                                        <col style="width: 50px;">
                                        <col class="num">
                                        <col class="subject">
                                        <col class="file">
                                        <col class="date">
                                        <col class="counter">
                                        <%-- <col style="width: 70px;"> --%>
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th><input class="uk-checkbox" type="checkbox" id="checkAll"></th>
                                            <th class="num">번호</th>
                                            <th class="subject">제목</th>
                                            <th class="file">첨부</th>
                                            <!-- <th class="writer">출처</th> -->
                                            <th class="date">작성일</th>
                                            <th>공개</th>
                                            <!-- <th></th> -->
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
                                        	<c:set var="num" value="${paginationInfo.totalRecordCount - ((paginationInfo.currentPageNo-1) * 10)}" />	<!-- 페이징 공식 -->
                                        	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
		                                        	<td><input class="uk-checkbox" type="checkbox" id="checkId" name="ckIdsArg" value="${data.contentsId}"></td>
													<td class="num">${num } </td>
		                                            <td class="subject uk-text-left"><a href="javascript:void(0);" onclick="$mpNtt.event.detailView('<c:out value="${data.contentsId}"/>');"><c:out value="${data.title}"/></a></td>
		                                            <td class="file">
		                                            
		                                            <c:if test="${data.fileCount ne '0'}">
		                                            	<i class="ion-document"></i>
		                                            </c:if>
		   		                                    </td>
		                                            <!-- <td class="writer">국토교통부</td> -->
		                                            <td class="date"><c:out value="${data.writeTime}"/></td>
		                                            <c:if test="${data.isOpen eq 'Y'}">
					        	                    	<td><span class="uk-text-primary">공개</span></td>
					                                </c:if>
				    	                            <c:if test="${data.isOpen eq 'N'}">
					    	                             <td><span class="uk-text-muted">비공개</span></td>
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
                                        <button type="button" class="uk-button uk-button-default" id="isOpenY" onclick="$mpNtt.event.isOpenClick('Y')">공개</button>
                                        <button type="button" class="uk-button uk-button-default" id="isOpenN" onclick="$mpNtt.event.isOpenClick('N')">비공개</button>
                                    </div>
                                    <button type="button" class="uk-button uk-button-primary" id="enrollBtn">글쓰기</button>
                                </div>

                                <ul class="uk-pagination uk-flex-center pagination" uk-margin>
                                	<c:if test="${not empty paginationInfo}"> 
                                		<ui:pagination paginationInfo="${paginationInfo}" type="custom" jsFunction="$mpNtt.event.listSearch"/>
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