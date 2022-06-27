<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<script type="text/javascript" src="${contextPath}/ext/Chart.js-2.9.3/Chart.min.js"></script>

<script type="text/javascript" src="${contextPath}/js/cs/menuStat.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>메뉴별 통계</h3>
                    <!-- 
                    <a href="#" class="uk-button uk-button-default board-select" id="selectBoxName"> 메뉴별 통계 <span uk-icon="chevron-down"></span></a>
                    <div uk-dropdown="pos: bottom-right; mode: click; offset: 0;">
                       <ul class="uk-nav uk-navbar-dropdown-nav nav-list">
                           <li value="1"><a href="#" onClick="return false;">메뉴별 통계</a></li>
                           <li value="2"><a href="#" onClick="return false;">메뉴명 설정</a></li>
                       </ul>
                    </div>
 					-->
                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <form id="searchFrm" name="searchFrm" method="POST" onsubmit="return false;" action="" class="search-condition">
                                    <legend>검색조건</legend>
                                    <div class="uk-form-controls">
                                        <select id="searchType" name="searchType" class="uk-select w-100">
                                            <option value="3" <c:if test="${params.searchType eq 3 }">selected</c:if>>일별</option>
                                            <option value="2" <c:if test="${params.searchType eq 2 }">selected</c:if>>월별</option>
                                            <option value="1" <c:if test="${params.searchType eq 1 }">selected</c:if>>전체</option>
                                        </select>
                                    </div>
									<div class="uk-form-controls" id="searchTypeM">
										<label class="uk-form-label">날짜선택</label>
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
				                	<input type="hidden" id="category" name="category" value="STAT">
                                    <button type="submit" id="searchBtn" class="uk-button uk-button-secondary">검색</button>
                                </form>

                                <hr>
                              
                                <table class="uk-table uk-table-divider board-list">
                                    <caption>게시물 목록</caption>
                                    <colgroup>
                                        <col class="num">
                                        <col class="subject">
                                        <col class="subject">
                                        <col class="date">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th class="num">순번</th>
                                            <th class="subject">메뉴명</th>
                                            <th class="subject">URL</th>
                                            <th>페이지뷰</th>
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
                                        	<c:forEach items="${result}" var="data" varStatus="status">
		                                    <tr>
		                                        	<td class="num"><c:out value="${status.count}"/></td>
		                                            <td class="subject"><c:out value="${data.menuNm}" escapeXml="false"/></td>
		                                            <td class="subject uk-text-left"><c:out value="${data.menuUrl}"/></td> <!-- data.url -->           
		                                            <td><c:out value="${data.cnt}"/></td>
	                	                  	</tr>
		                                  </c:forEach>
	                                      </c:otherwise>
	                                   	</c:choose>
                                    </tbody>
                                </table>
                                
                                <div class="btn-write">
                                    <div class="uk-text-left"></div>

                                </div>
                                
								<script type="text/javaScript">
									var labels = new Array(); //차트 값 생성
									var cData = new Array(); //접속수
									<c:forEach items="${result}" var="data"> 
										labels.push("${data.menuNm}");
										cData.push("${data.cnt}");
									</c:forEach>
								</script>
						
							    <div class="">
							        <div>
			        					<h4 id="hTitle">접속통계</h4>
							        	<canvas id="sChart" width="800" height="320"></canvas>
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