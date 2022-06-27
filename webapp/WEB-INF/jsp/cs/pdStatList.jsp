<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<script type="text/javascript" src="${contextPath}/ext/Chart.js-2.9.3/Chart.min.js"></script>

<script type="text/javascript" src="${contextPath}/js/cs/pdStat.js"></script> 

<c:set var="visitTitle" value="접속" />
<c:if test="${params.searchGb eq 2}">
	<c:set var="visitTitle" value="방문자" />
</c:if>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>기간별 접속통계</h3>

                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <form id="searchFrm" name="searchFrm" method="POST" onsubmit="return false;" action="" class="search-condition">
                                    <legend>검색조건</legend>
                                    <div class="uk-form-controls">
                                        <select id="searchGb" name="searchGb" class="uk-select w-100">
                                            <option value="1" <c:if test="${params.searchGb eq 1 }">selected</c:if>>접속수</option>
                                            <option value="2" <c:if test="${params.searchGb eq 2 }">selected</c:if>>방문자수</option>
                                        </select>                             
                                        <select id="searchType" name="searchType" class="uk-select w-150">
                                            <option value="1" <c:if test="${params.searchType eq 1 }">selected</c:if>>년도별</option>
                                            <option value="2" <c:if test="${params.searchType eq 2 }">selected</c:if>>월별</option>
                                            <option value="3" <c:if test="${params.searchType eq 3 }">selected</c:if>>일별</option>
                                            <option value="4" <c:if test="${params.searchType eq 4 }">selected</c:if>>접속시간대별</option>
                                        </select>
                                    </div>
									<div class="uk-form-controls" id="searchTypeY">
										<label class="uk-form-label">연도선택</label>
										<select id="searchFromYear" name="searchFromYear" class="uk-select w-100">
											<option value="">전체</option>
										<c:forEach var="item" items="${yList}">
											<option value="${item.year}" <c:if test="${item.year == params.searchFromYear}">selected="selected"</c:if>>${item.year}</option>
										</c:forEach>
										</select>
										~
										<select id="searchToYear" name="searchToYear" class="uk-select w-100">
											<option value="">전체</option>
										<c:forEach var="item" items="${yList}">
											<option value="${item.year}" <c:if test="${item.year == params.searchToYear}">selected="selected"</c:if>>${item.year}</option>
										</c:forEach>
										</select>
									</div>	
									<div class="uk-form-controls" id="searchTypeM">
										<label class="uk-form-label">연도선택</label>
										<select id="searchYear" name="searchYear" class="uk-select w-100">
										<c:forEach var="item" items="${yList}">
											<option value="${item.year}" <c:if test="${item.year == params.searchYear}">selected="selected"</c:if>>${item.year}</option>
										</c:forEach>
										</select>
										<select id="searchMonth" name="searchMonth" class="uk-select w-100">
											<option value="">전체</option>
										<c:forEach var="item" varStatus="i" begin="1" end="12" step="1">
											<fmt:formatNumber var="no" minIntegerDigits="2" value="${item}" type="number"/>
											<option value="${no}" <c:if test="${no == params.searchMonth}">selected="selected"</c:if>>${item}</option>
										</c:forEach>
										</select>
									</div>	
                                    <%-- <div class="uk-form-controls" id="searchTypeD">
                                        <label class="uk-form-label">날짜선택</label>
                                        <input type="text" id="searchFromDate" name="searchFromDate" value="${params.searchFromDate }" maxLength="8" class="uk-input uk-width-small" placeholder="검색일자"><!-- 달력위치 -->
                                         ~ <input type="text" id="searchToDate" name="searchToDate" value="${params.searchToDate }" maxLength="8" class="uk-input uk-width-small" placeholder="검색일자">                                     
                                    </div> --%>  
				                	<div class="uk-form-controls" id="searchTypeD">
										<label class="uk-form-label">작성일</label>
					                    <div class="" data-ax5picker="crctDate" style="width: 292px; display: inline-table; vertical-align: middle; margin-bottom:2px;">
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
                          
                                <div class="btn-write">
                                
                                </div>
                                
				            <div class="uk-margin-medium-top uk-margin-medium-bottom" uk-grid>
							    <div class="uk-width-1-2@l uk-width-1-1@s">

			        			<h4 id="hTitle">${visitTitle}통계</h4>
                                <table class="uk-table uk-table-divider board-list">
                                    <caption>게시물 목록</caption>
                                    <colgroup>
                                        <col class="num">
                                        <col class="date">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th class="num">구분</th>
                                            <th>${visitTitle}수</th>
                                        </tr>
                                    </thead>
                                    <tbody class="list">
                                     	<c:choose> 
                                     		<c:when test = "${empty result || result[0].totalCount == 0 }"> 
                                     			<tr> 
                                     				<td colspan="2">검색 내역이 없습니다.</td> 
                                     			</tr> 
                                     		</c:when> 
                                     		<c:otherwise> 
                                        	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
		                                        	<td><c:out value="${data.gb}"/></td>
   		                                            <td><c:out value="${data.cnt}"/></td>
	                	                  	</tr>
		                                  </c:forEach>
	                                      </c:otherwise>
	                                   	</c:choose>
                                    </tbody>
                                </table>

								<script type="text/javaScript">
									var labels = new Array(); //차트 값 생성
									var cData = new Array(); //접속수
									<c:forEach items="${result}" var="data"> 
										labels.push("${data.gb}");
										cData.push("${data.cnt}");
									</c:forEach>
								</script>
						
							    </div>
							    <div class="uk-width-1-2@l uk-width-1-1@s">
							        <div>
							        	<h4></h4>
							        	<canvas id="sChart" width="400" height="400"></canvas>
							        </div>
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