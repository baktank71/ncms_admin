<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/recallNtcnManage.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>리콜 알리미</h3>
					<div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <form id="searchFrm" name="searchFrm" method="POST" onsubmit="return false;" action="" class="search-condition">
                                	<input type="hidden" id="currentPageNo" name="currentPageNo" value="${params.currentPageNo }" />
                                    <legend>검색조건</legend>
                                    <!-- <div class="uk-form-controls">
                                    	<label class="uk-form-label">신청일</label>
                                    	<input type="text" id="searchFromDate" name="searchFromDate" maxLength="8" class="uk-input uk-width-small" placeholder="검색일자"> ~
                                    	<input type="text" id="searchFromDate" name="searchFromDate" maxLength="8" class="uk-input uk-width-small" placeholder="검색일자">
                                    </div>
                                    
                                    <div class="uk-form-controls">
                                    	<label class="uk-form-label">신청인</label>
                                    	<input type="text" class="uk-input uk-width-small">
                                    </div>
                                    
                                    <div class="uk-form-controls">
                                    	<label class="uk-form-label">차량번호</label>
                                    	<input type="text" class="uk-input uk-width-small">
                                    </div> -->
                                    <div class="uk-form-controls">
                                        <select id="searchId" name="searchId" class="uk-select w-100">
                                            <option value="">전체</option>
                                            <option value="1" <c:if test="${params.searchId eq 1 }">selected</c:if>>신청인</option>
                                            <option value="2" <c:if test="${params.searchId eq 2 }">selected</c:if>>차량번호</option>
                                            <option value="3" <c:if test="${params.searchId eq 3 }">selected</c:if>>차명</option>
                                        </select>
                                        <input type="text" name="searchStr" id="searchStr" value="${params.searchStr }" class="uk-input w-200">
                                    </div>

								  <!-- 달력입니다. -->
				                  <div class="uk-form-controls">
									<label class="uk-form-label">신청일</label>
				                    <div class="" data-ax5picker="recallNtcnDate" style="width: 292px; display: inline-table; vertical-align: middle; margin-bottom:2px;">
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
                                        <col class="date">
                                        <col class="date">
                                        <col class="date">
                                        <col class="date">
                                        <col style="width: 70px;">
                                    </colgroup>
                                    <thead>
				                        <th class="num">번호</th>
				                        <th>자동차등록번호</th>
				                        <th>소유명/법인명</th>
				                        <th>신청인</th>
				                        <th>휴대폰번호</th>
				                        <th>신청일</th>
				                        <th>상태</th>
                                    </thead>
                                    <tbody class="list">
										<c:forEach items="${result }" var="data" varStatus="status">
				                       	<tr onClick="$recallNtcn.event.detailView('${data.subscribeNo }')" style="cursor: pointer;">
				                           <td class="num"><c:out value="${data.rnum }" /></td>
				                           <td><c:out value="${data.vehicleNumber }" /></td>            
				                           <td><c:out value="${data.ownerName }" /></td>
				                           <td><c:out value="${data.subscribeName }" /></td>
				                           <td><c:out value="${data.subscribeCellular }" /></td>
				                           <td><c:out value="${data.writeTime }" /></td>
				                           <td>
					                           <c:choose><c:when test="${data.delFlag == 'Y'}">해지</c:when>
					                           <c:otherwise>&nbsp;</c:otherwise></c:choose>
				                           </td>
				                       	</tr>
				                       	</c:forEach>
                                    </tbody>
                                </table>

                                <ul class="uk-pagination uk-flex-center pagination" uk-margin>
                                	<c:if test="${not empty paginationInfo}"> 
                                		<ui:pagination paginationInfo="${paginationInfo}" type="custom" jsFunction="$recallNtcn.event.fn_search"/>
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