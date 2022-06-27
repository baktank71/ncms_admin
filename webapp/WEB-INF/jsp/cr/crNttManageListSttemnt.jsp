<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManageSttemnt.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>게시물 관리</h3><!-- 신고내역조회 -->
                    <a href="#" class="uk-button uk-button-default board-select" id="selectBoxName"> 신고내역조회 <span uk-icon="chevron-down"></span></a>
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
	                            		<select id="ctype" name="ctype" class="uk-select w-100">
	                            			<option value="EP" <c:if test="${params.ctype eq 'EP'}">selected </c:if>>자동차결함</option>
	                            			<option value="CMR" <c:if test="${params.ctype eq 'CMR'}">selected </c:if>>건설기계결함</option>
	                            			<option value="RDM" <c:if test="${params.ctype eq 'RDM'}">selected </c:if>>리콜불만</option>
	                            		</select>
	                            	</div>                                    
                                    <div class="uk-form-controls">
                                        <select id="searchId" name="searchId" class="uk-select w-100">
                                            <option value="">전체</option>
                                            <option value="1" <c:if test="${params.searchId eq 1 }">selected</c:if>>차명</option>
                                            <option value="2" <c:if test="${params.searchId eq 2 }">selected</c:if>>결함장치</option>
                                            <option value="3" <c:if test="${params.searchId eq 3 }">selected</c:if>>신고인</option>
                                        </select>
                                        <input type="text" name="searchStr" id="searchStr" value="${params.searchStr }" class="uk-input w-200">
                                    </div>

				                    <div class="uk-form-controls">
										<label class="uk-form-label">신고일</label>
					                    <div class="" data-ax5picker="crNttRecallDate" style="width: 292px; display: inline-table; vertical-align: middle; margin-bottom:2px;">
					                      <input id="searchFromDate" name="searchFromDate" type="text" class="form-control date-picker-input" placeholder="신고일자" value="${params.searchFromDate }">
					                      <span class="input-group-addon date-picker-span"><i class="fa fa-calculator"></i></span>
					                      <span class="input-group-addon read-only" style="padding: 0 2px;">~</span>
					                      <input id="searchToDate"  name="searchToDate" type="text" class="form-control date-picker-input" placeholder="신고일자" value="${params.searchToDate }">
					                      <span class="input-group-addon date-picker-span"><i class="fa fa-calculator"></i></span>
					                    </div>
				                    </div>

                                    <%-- <div class="uk-form-controls">
									<label class="uk-form-label">공개여부</label>
		                            	<div class="uk-form-controls">
		                            		<select id="searchOpenYn" name="searchOpenYn" class="uk-select w-100">
		                            			<option value="">전체</option>
		                            			<option value="Y" <c:if test="${params.searchOpenYn eq 'Y'}">selected </c:if>>공개</option>
		                            			<option value="N" <c:if test="${params.searchOpenYn eq 'N'}">selected </c:if>>비공개</option>
		                            		</select>
		                            	</div>
		                            </div> --%>

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
                                        <%-- <col class="writer"> --%>
                                        <col class="date">
                                        <col class="counter">
                                        <col style="width: 120px;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th><input class="uk-checkbox" type="checkbox" id="checkAll"></th>
                                            <th class="num">번호</th>
                                            <th class="subject">제목</th>
                                            <th class="file">단계</th>
                                            <th class="date">작성일</th>
                                            <th class="writer">작성자</th>
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
                                        	<c:set var="num" value="${paginationInfo.totalRecordCount - ((paginationInfo.currentPageNo-1) * 10)}" />	<!-- 페이징 공식 -->
                                        	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
	                                        	<td><input class="uk-checkbox" type="checkbox" id="ckId" value="${data.petitionId},${data.petitionType}"></td>
												<td class="num">${num } </td>
	                                            <td class="subject uk-text-left">
	                                            	<a href="#" onclick="$sttemnt.event.detailView('${data.petitionId}','${params.divisionCode}','${data.petitionType}'); return false;">
	                                            	<c:choose>
	                                            		<c:when test="${data.petitionType eq 'RDM'}">[리콜불만신고]</c:when>
	                                            		<c:otherwise>[결함신고]</c:otherwise>
	                                            	</c:choose>
	                                            	<c:out value="${data.petitionTitle}"/>
			    	                            	<c:if test="${data.petitionOpenDegree eq '002'}">
			    	                            		<i uk-icon="icon: lock; ratio:0.8;"></i>
			    	                            	</c:if>
	                                            	</a>
	                                            </td>            
	                                            <td class="file">
	                                            ${data.eptnStatus}
	                                           <%--  <c:if test="${data.eptnStatus ne '0'}">
	                                            	<i class="ion-document"></i>
	                                            </c:if> --%>
	   		                                    </td>
	                                            <!-- <td class="writer">국토교통부</td> -->
	                                            <td class="date"><c:out value="${data.writeTime}"/></td>
                                           		<td class="counter"><c:out value="${data.name}"/></td>
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
                                        <button type="button" class="uk-button uk-button-default" id="isOpenY" onclick="$sttemnt.event.snsOpenClick('Y')">SNS허용</button>
                                        <button type="button" class="uk-button uk-button-default" id="isOpenN" onclick="$sttemnt.event.snsOpenClick('N')">SNS제외</button>
                                    </div>
                                </div>

                                <ul class="uk-pagination uk-flex-center pagination" uk-margin>
                                	<c:if test="${not empty paginationInfo}"> 
                                		<ui:pagination paginationInfo="${paginationInfo}" type="custom" jsFunction="$sttemnt.event.fn_search"/>
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