<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %><c:set var="contextPath" value="${pageContext.request.contextPath}"/>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script> -->
<script type="text/javascript" src="${contextPath}/ext/Chart.js-2.9.3/Chart.min.js"></script>
<script type="text/javascript" src="${contextPath}/js/si/conditionSttemnt.js"></script>

<c:set var="flgVal" value="월" />
<c:if test="${'Y' == search.rcType}">
	<c:set var="flgVal" value="연도" />
</c:if>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
      <input type="hidden" id="divisionCodeBt" >
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>${flgVal }별 통계정보</h3>

                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                            <form id="srchFrm" name="searchFrm" method="POST" onsubmit="return false;" action="" class="search-condition">
								<input type="hidden" id="type" name="type" value="${search.type }" />
								<input type="hidden" id="rcType" name="rcType" value="${search.rcType }" />
								<input type="hidden" id="statType" name="statType" value="${search.statType }" />
								<input type="hidden" id="recallDateFrom" name="recallDateFrom" value="${search.recallDateFrom }" />
								
								<legend>검색조건</legend>
								<c:if test="${search.statType eq 'CG'}"><!-- 차량별 조건에 제조사 추가 --> 
								<div class="uk-form-controls">
									<label class="uk-form-label uk-margin-small-left">제작사선택</label>
									<div class="uk-form-controls">
										<input type="text" class="uk-input w-200 uk-margin-small-left" id="makerName" name="makerName" title="제작사코드" value="<c:out value="${search.makerName }" />" uk-toggle="target: #find-prdct" readonly>
										<input type="hidden" id="makerCode" name="makerCode" value="${search.makerCode }" />
										<button class="uk-button uk-button-secondary" type="button" id="srchPrdctBtn" uk-toggle="target: #find-prdct">찾아보기</button>
									</div>
								</div>	
								<hr/>
								</c:if>
								<div class="uk-form-controls">
									<label class="uk-form-label">연도선택</label>
									<select id="recallYear" name="recallYear" class="uk-select w-100">
									<c:forEach var="item" items="${yList}">
										<option value="${item.year}" <c:if test="${item.year == search.recallYear}">selected="selected"</c:if>>${item.year}</option>
									</c:forEach>
									</select>
									<c:if test="${'Y' == search.rcType}">
									-
									<select id="recallToYear" name="recallToYear" class="uk-select w-100">
									<c:forEach var="item" items="${yList}">
										<option value="${item.year}" <c:if test="${item.year == search.recallToYear}">selected="selected"</c:if>>${item.year}</option>
									</c:forEach>
									</select>
									</c:if>
								</div>
								<input type="hidden" id="recallMonth" name="recallMonth" value="0" />
			                    <button type="submit" id="srchBtn" class="uk-button uk-button-secondary">검색</button>
								
							</form>
				            <hr>
			
<!-- START 리콜현황 -->
<c:if test="${search.statType eq 'SC'}">
				        
			<c:choose><c:when test="${'Y' != search.rcType}">
			<h3>${search.recallYear} 월별 신고현황</h3>
			</c:when><c:otherwise>
			<h3>연도별 신고현황</h3>
			</c:otherwise></c:choose>
			<table class="uk-table uk-table-divider table-stat">
                <caption>${flgVal}별 신고현황</caption>
                <colgroup>
                    <col style="width: 15%;">
                    <col style="width: 12%;">
                    <col style="width: 14%;">
                    <col style="width: 12%;">
                </colgroup>
                <thead>
                	<tr>
                		<th rowspan="2">해당 ${flgVal}</th>
                		<th>국내자동차</th>
                		<th>수입자동차</th>
                		<th>계</th>
                	</tr>
                </thead>
                <tbody id="openTrOne">
                <c:set var="kor_tot_car_cnt" value="0" />
                <c:set var="for_tot_car_cnt" value="0" />
                <c:set var="all_tot_car_cnt" value="0" />
				<c:forEach items="${result}" var="data" varStatus="status">
                	<tr class="openTrOne" style="display:none">
					<c:choose><c:when test="${'Y' != search.rcType}">
						<c:set var="targetMonth" value="${fn:substring(data.recallDateFrom,5,7)}" />
                        <th>${targetMonth}월</th>
                        <%--  <a href="#" onclick="$main.event.detailView('${targetMonth}'); return false;"><span class="badge">현황</span></a></th> --%>
                    </c:when><c:otherwise>
                       <th>
						<c:choose><c:when test='${data.recallDateFrom eq "2002"}'>2003년 이전</c:when>
						<c:otherwise>${data.recallDateFrom}년<c:if test="${search.thisYear eq data.recallDateFrom}">*</c:if></c:otherwise></c:choose>
                       </th>
                        <%--  <a href="#" onclick="$main.event.detailYearView('${data.recallDateFrom}'); return false;"><span class="badge">현황</span></a></th> --%>
                    </c:otherwise></c:choose>    
                        <td><fmt:formatNumber value='${data.korDaesu}' type='number'/></td>
                        <td><fmt:formatNumber value='${data.forDaesu}' type='number'/></td>
                        <td><fmt:formatNumber value='${data.totDaesu}' type='number'/></td>
                    </tr>
                	<c:set var="kor_tot_car_cnt" value="${kor_tot_car_cnt + data.korDaesu}" />
                	<c:set var="for_tot_car_cnt" value="${for_tot_car_cnt + data.forDaesu}" />
                	<c:set var="all_tot_car_cnt" value="${all_tot_car_cnt + data.totDaesu}" />
				</c:forEach>
            	<c:if test="${not empty result}">
                    <tr id="openTrTotOne">
                        <th>계<c:if test="${search.thisYear eq search.recallYear}">*</c:if></th>
                        <td><fmt:formatNumber value='${kor_tot_car_cnt}' type='number'/></td>
                        <td><fmt:formatNumber value='${for_tot_car_cnt}' type='number'/></td>
                        <td><fmt:formatNumber value='${all_tot_car_cnt}' type='number'/></td>
                    </tr>
				</c:if>   
                </tbody>
            </table>

		<c:choose>
			<c:when test="${search.thisYear eq search.recallYear}">
				<p>* ${search.thisYear}년 신고현황 집계중</p>
			</c:when>
			<c:when test="${'Y' == search.rcType}">
				<p>* ${search.thisYear}년 신고현황 집계중</p>
			</c:when>
		</c:choose>	
		
		<script>
			//차트 값 생성
			var labels = new Array();
			var data2 = new Array();	//국내차량건수
			var data4 = new Array();	//외국차량건수
			var data6 = new Array();	//총자동차수량
			<c:forEach items="${result}" var="data"> 
				<c:if test="${'Y' != search.rcType}">
					labels.push("${fn:substring(data.recallDateFrom,5,7)}");
	        	</c:if>
				<c:if test="${'Y' == search.rcType}">
					labels.push("${data.recallDateFrom}");
	        	</c:if> 
				data2.push("${data.korDaesu}");		
				data4.push("${data.forDaesu}");		
				data6.push("${data.totDaesu}");		
			</c:forEach>
			labels.reverse();
			data2.reverse();
			data4.reverse();
			data6.reverse();
		</script>
		 
		<div id="selectChartOne" style="display:none">
			<div class="btn-write">
			<label class="uk-form-label">차트선택</label>
			<select class="uk-select w-100" onChange="$main.ui.changeCharts('One', this.value);">
            	<option value="1">막대선형</option>
            	<option value="2">레이더형</option>
            </select>
            </div>
        </div>
        <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid" id="openDivOne" style="display:none">
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart1-1Div">
		        <div>
		        	<h4>${flgVal}별 신고현황</h4>
		        	<canvas id="recallChart1" width="400" height="320"></canvas>
		        </div>
		    </div>
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart2-1Div">
		        <div>
		        	<h4>${flgVal}별 신고현황</h4>
		        	<canvas id="recallChart2" width="400" height="320"></canvas>
		        </div>
		    </div>
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart1-2Div" style="display:none">
		        <div>
		        	<h4>${flgVal}별 신고현황</h4>
		        	<canvas id="recallChart1-2" width="400" height="320"></canvas>
		        </div>
		    </div>
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart2-2Div" style="display:none">
		        <div>
		        	<h4>${flgVal}별 신고현황</h4>
		        	<canvas id="recallChart2-2" width="400" height="320"></canvas>
		        </div>
		    </div>
		</div> 

        <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid">
			<div class="btn-write">
				<button type="button" id="openOneBtn" onClick="$main.event.openTable('One')" class="uk-button uk-button-primary" >더보기+</button>
				<button type="button" id="closeOneBtn" onClick="$main.event.closeTable('One')" class="uk-button uk-button-primary" style="display:none" >숨기기-</button>
			</div>
        </div>

</c:if>
<!-- END 리콜현황 -->
<!-- START 리콜현황(제조사별) -->
<c:if test="${search.statType eq 'MK'}">

		<c:choose><c:when test="${'Y' != search.rcType}">
		<h3>${search.recallYear} 월별 신고현황(제작사별)</h3>
		</c:when><c:otherwise>
		<h3>연도별 신고현황(제작사별)</h3>
		</c:otherwise></c:choose>
		<table class="uk-table uk-table-divider table-stat">
               <caption>${flgVal}별 신고현황(제작사별)</caption>
               <colgroup>
                   <col style="width: 20%;">
                   <col style="width: 50%;">
                   <col style="width: 30%;">
               </colgroup>
               <thead>
               	<tr>
               		<th>해당 ${flgVal}</th>
               		<th>제조사명</th>
               		<th>계</th>
               	</tr>
               </thead>
                <tbody id="openTrTwo">
                <c:set var="tot_cnt" value="0" />
                <c:set var="maker_code" value="" />
                <c:set var="maker_name" value="" />
                <c:set var="sub_cnt" value="0" />
			<c:forEach items="${result}" var="data" varStatus="status">
                <c:choose><c:when test="${ maker_code eq ''}">
	             	<c:set var="maker_code" value="${data.makerCode}" />
	             	<c:set var="maker_name" value="${data.makerName}" />
	             	<c:set var="sub_cnt" value="${data.recallCarCount}" />
                </c:when><c:when test="${ maker_code eq data.makerCode}">
            		<c:set var="sub_cnt" value="${sub_cnt + data.recallCarCount}" />
                </c:when><c:otherwise>
            	<tr class="openTrTwo" style="display:none">
                     <th id="tr_${maker_code}">
	                  	<label id="labelTwo_open_${maker_code}"><a href="#" onClick="$main.event.subOpenTable('Two','${maker_code}'); return false;">소계 +</a></label>
	                  	<label id="labelTwo_close_${maker_code}" style="display:none"><a href="#" onClick="$main.event.subCloseTable('Two','${maker_code}'); return false;">소계 -</a></label>
                     </th>
                    <td>${maker_name}</td>
                    <td><fmt:formatNumber value='${sub_cnt}' type='number'/></td>
                </tr>
             	<c:set var="maker_code" value="${data.makerCode}" />
             	<c:set var="maker_name" value="${data.makerName}" />
             	<c:set var="sub_cnt" value="${data.recallCarCount}" />
                </c:otherwise></c:choose>
               	<tr class="tr_${maker_code}" style="display:none">
				<c:choose><c:when test="${'Y' != search.rcType}">
					<c:set var="targetMonth" value="${fn:substring(data.recallDateFrom,5,7)}" />
                       <th>${targetMonth}월</th>
                   </c:when><c:otherwise>
                       <th>
						<c:choose><c:when test='${data.recallDateFrom eq "2002"}'>2003년 이전</c:when>
						<c:otherwise>${data.recallDateFrom}년</c:otherwise></c:choose>
                       </th>
                   </c:otherwise></c:choose>    
                       <td>${data.makerName}</td>
                       <td><fmt:formatNumber value='${data.recallCarCount}' type='number'/></td>
                   </tr>
               	<c:set var="tot_cnt" value="${tot_cnt + data.recallCarCount}" />
			</c:forEach>
           	<c:if test="${not empty result}">
             	<tr class="openTrTwo" style="display:none">
                     <th id="tr_${maker_code}">
	                  	<label id="labelTwo_open_${maker_code}"><a href="#" onClick="$main.event.subOpenTable('Two','${maker_code}'); return false;">소계 +</a></label>
	                  	<label id="labelTwo_close_${maker_code}" style="display:none"><a href="#" onClick="$main.event.subCloseTable('Two','${maker_code}'); return false;">소계 -</a></label>
                     </th>
                     <td>${maker_name}</td>
                     <td><fmt:formatNumber value='${sub_cnt}' type='number'/></td>
                 </tr>
                 <tr id="openTrTotTwo">
                    <th colspan="2">계<c:if test="${search.thisYear eq search.recallYear}">*</c:if></th>
                    <td><fmt:formatNumber value='${tot_cnt}' type='number'/></td>
                </tr>
			</c:if>   
               </tbody>
           </table>

		<c:if test="${search.thisYear eq search.recallYear}">
			<p>* ${search.thisYear}년 신고현황 집계중</p>
		</c:if>
		
			<div id="selectChartTwo" style="display:none">
				<div class="btn-write">
				<label class="uk-form-label">차트선택</label>
				<select class="uk-select w-100" onChange="$main.ui.changeCharts('Two', this.value);">
	            	<option value="1">파이형</option>
	            	<option value="2">라인형</option>
	            	<option value="3">선형</option>
	            </select>
	            </div>
            </div>
           <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid" id="openDivTwo" style="display:none">
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart3-1Div">
		        <div>
		        	<h4>국산 ${flgVal}별 신고현황(제작사별)</h4>
		        	<canvas id="recallChart3" width="400" height="320"></canvas>
		        </div>
		    </div>
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart4-1Div">
		        <div>
		        	<h4>수입 ${flgVal}별 신고현황(제작사별)</h4>
		        	<canvas id="recallChart4" width="400" height="320"></canvas>
		        </div>
		    </div>
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart3-2Div" style="display:none">
		        <div>
		        	<h4>국산 ${flgVal}별 신고현황(제작사별)</h4>
		        	<canvas id="recallChart3-2" width="400" height="320"></canvas>
		        </div>
		    </div>
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart4-2Div" style="display:none">
		        <div>
		        	<h4>수입 ${flgVal}별 신고현황(제작사별)</h4>
		        	<canvas id="recallChart4-2" width="400" height="320"></canvas>
		        </div>
		    </div>
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart3-3Div" style="display:none">
		        <div>
		        	<h4>국산 ${flgVal}별 신고현황(제작사별)</h4>
		        	<canvas id="recallChart3-3" width="400" height="320"></canvas>
		        </div>
		    </div>
		    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart4-3Div" style="display:none">
		        <div>
		        	<h4>수입 ${flgVal}별 신고현황(제작사별)</h4>
		        	<canvas id="recallChart4-3" width="400" height="320"></canvas>
		        </div>
		    </div>
		</div> 
		
        <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid">
			<div class="btn-write">
				<button type="button" id="openTwoBtn" onClick="$main.event.openTable('Two')" class="uk-button uk-button-primary" >더보기+</button>
				<button type="button" id="closeTwoBtn" onClick="$main.event.closeTable('Two')" class="uk-button uk-button-primary" style="display:none" >숨기기-</button>
			</div>
        </div>
			     
</c:if>
<!-- END 결함신고현황(제조사별) -->
<!-- START 결함신고현황(장치별) -->
<c:if test="${search.statType eq 'PD'}">  
		        
		<c:choose><c:when test="${'Y' != search.rcType}">
		<h3>${search.recallYear} 월별 신고현황(장치별)</h3>
		</c:when><c:otherwise>
		<h3>연도별 신고현황(장치별)</h3>
		</c:otherwise></c:choose>
		<table class="uk-table uk-table-divider table-stat">
               <caption>${flgVal}별 신고현황(장치별)</caption>
               <colgroup>
                   <col style="width: 20%;">
                   <col style="width: 50%;">
                   <col style="width: 30%;">
               </colgroup>
               <thead>
               	<tr>
               		<th>해당 ${flgVal}</th>
               		<th>결함장비명</th>
               		<th>계</th>
               	</tr>
               </thead>
               <tbody id="openTrThr">
               <c:set var="tot_cnt" value="0" />
               <c:set var="division_cd" value="" />
               <c:set var="division_name" value="" />
               <c:set var="sub_cnt" value="0" />
				<c:forEach items="${result}" var="data" varStatus="status">
                <c:choose><c:when test="${ division_cd eq ''}">
	             	<c:set var="division_cd" value="${data.divisionCd}" />
	             	<c:set var="division_name" value="${data.divisionName}" />
	             	<c:set var="sub_cnt" value="${data.recallCarCount}" />
                </c:when><c:when test="${ division_cd eq data.divisionCd}">
            		<c:set var="sub_cnt" value="${sub_cnt + data.recallCarCount}" />
                </c:when><c:otherwise>
            	<tr class="openTrThr" style="display:none">
                    <th id="tr_${division_cd}">
                    	<label id="labelThr_open_${division_cd}"><a href="#" onClick="$main.event.subOpenTable('Thr','${division_cd}'); return false;">소계 +</a></label>
                    	<label id="labelThr_close_${division_cd}" style="display:none"><a href="#" onClick="$main.event.subCloseTable('Thr','${division_cd}'); return false;">소계 -</a></label>
                    </th>
                    <td>${division_name}</td>
                    <td><fmt:formatNumber value='${sub_cnt}' type='number'/></td>
                </tr>
             	<c:set var="division_cd" value="${data.divisionCd}" />
             	<c:set var="division_name" value="${data.divisionName}" />
             	<c:set var="sub_cnt" value="${data.recallCarCount}" />
                </c:otherwise></c:choose>
               	<tr class="tr_${division_cd}" style="display:none">
				<c:choose><c:when test="${'Y' != search.rcType}">
					<c:set var="targetMonth" value="${fn:substring(data.recallDateFrom,5,7)}" />
                       <th>${targetMonth}월</th>
                   </c:when><c:otherwise>
                       <th>
						<c:choose><c:when test='${data.recallDateFrom eq "2002"}'>2003년 이전</c:when>
						<c:otherwise>${data.recallDateFrom}년</c:otherwise></c:choose>
                       </th>
                   </c:otherwise></c:choose>    
                       <td>${data.divisionName}</td>
                       <td><fmt:formatNumber value='${data.recallCarCount}' type='number'/></td>
                   </tr>
               	<c:set var="tot_cnt" value="${tot_cnt + data.recallCarCount}" />
			</c:forEach>
           	<c:if test="${not empty result}">
            	<tr class="openTrThr" style="display:none">
                    <th id="tr_${division_cd}">
                    	<label id="labelThr_open_${division_cd}"><a href="#" onClick="$main.event.subOpenTable('Thr','${division_cd}'); return false;">소계 +</a></label>
                    	<label id="labelThr_close_${division_cd}" style="display:none"><a href="#" onClick="$main.event.subCloseTable('Thr','${division_cd}'); return false;">소계 -</a></label>
                    </th>
                    <td>${division_name}</td>
                    <td><fmt:formatNumber value='${sub_cnt}' type='number'/></td>
                </tr>
                <tr id="openTrTotThr">
                    <th colspan="2">계<c:if test="${search.thisYear eq search.recallYear}">*</c:if></th>
                    <td><fmt:formatNumber value='${tot_cnt}' type='number'/></td>
                </tr>
			</c:if>   
               </tbody>
           </table>

			<c:if test="${search.thisYear eq search.recallYear}">
				<p>* ${search.thisYear}년 신고현황 집계중</p>
			</c:if>
			<div>
			  <span >-결함신고별 다수의 장치가 신고될 수 있습니다.</span>
			</div>
			
			<div id="selectChartThr" style="display:none">
				<div class="btn-write">
				<label class="uk-form-label">차트선택</label>
				<select class="uk-select w-100" onChange="$main.ui.changeCharts('Thr', this.value);">
	            	<option value="1">파이형</option>
	            	<option value="2">라인형</option>
	            	<option value="3">선형</option>
	            </select>
	            </div>
            </div>
	        <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid" id="openDivThr" style="display:none">
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart5-1Div">
			        <div>
			        	<h4>국산 ${flgVal}별 신고현황(장치별)</h4>
			        	<canvas id="recallChart5" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart6-1Div">
			        <div>
			        	<h4>수입 ${flgVal}별 신고현황(장치별)</h4>
			        	<canvas id="recallChart6" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart5-2Div" style="display:none">
			        <div>
			        	<h4>국산 ${flgVal}별 신고현황(장치별)</h4>
			        	<canvas id="recallChart5-2" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart6-2Div" style="display:none">
			        <div>
			        	<h4>수입 ${flgVal}별 신고현황(장치별)</h4>
			        	<canvas id="recallChart6-2" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart5-3Div" style="display:none">
			        <div>
			        	<h4>국산 ${flgVal}별 신고현황(장치별)</h4>
			        	<canvas id="recallChart5-3" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart6-3Div" style="display:none">
			        <div>
			        	<h4>수입 ${flgVal}별 신고현황(장치별)</h4>
			        	<canvas id="recallChart6-3" width="400" height="320"></canvas>
			        </div>
			    </div>
			</div> 
	
	        <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid">
				<div class="btn-write">
					<button type="button" id="openThrBtn" onClick="$main.event.openTable('Thr')" class="uk-button uk-button-primary" >더보기+</button>
					<button type="button" id="closeThrBtn" onClick="$main.event.closeTable('Thr')" class="uk-button uk-button-primary" style="display:none" >숨기기-</button>
				</div>
	        </div>
            
</c:if>			
<!-- END 결함신고현황(장치별) -->
<!-- START 결함신고현황(접수경로별) -->
<c:if test="${search.statType eq 'RP'}">  
		        
			<c:choose><c:when test="${'Y' != search.rcType}">
			<h3>${search.recallYear} 월별 신고현황(접수경로별)</h3>
			</c:when><c:otherwise>
			<h3>연도별 신고현황</h3>
			</c:otherwise></c:choose>
			<table class="uk-table uk-table-divider table-stat">
                <caption>${flgVal}별 신고현황(접수경로별)</caption>
                <colgroup>
                    <col style="width: 15%;">
                    <col style="width: 12%;">
                    <col style="width: 14%;">
                    <col style="width: 12%;">
                    <col style="width: 14%;">
                    <col style="width: 12%;">
                    <col style="width: 14%;">
                </colgroup>
                <thead>
                	<tr>
                		<th>해당 ${flgVal}</th>
                		<th>온라인</th>
                		<th>오프라인</th>
                		<th>국민신문고</th>
                		<th>한국소비자원</th>
                		<th>검사소</th>
                		<th>기타</th>
                		<th>계</th>
                	</tr>
                </thead>
                <tbody id="openTrFour">
                <c:set var="car_cnt_1" value="0" />
                <c:set var="car_cnt_2" value="0" />
                <c:set var="car_cnt_3" value="0" />
                <c:set var="car_cnt_4" value="0" />
                <c:set var="car_cnt_5" value="0" />
                <c:set var="car_cnt_9" value="0" />
                <c:set var="all_tot_car_cnt" value="0" />
				<c:forEach items="${result}" var="data" varStatus="status">
                	<tr class="openTrFour" style="display:none">
					<c:choose><c:when test="${'Y' != search.rcType}">
						<c:set var="targetMonth" value="${fn:substring(data.recallDateFrom,5,7)}" />
                        <th>${targetMonth}월</th>
                    </c:when><c:otherwise>
                       <th>
						<c:choose><c:when test='${data.recallDateFrom eq "2002"}'>2003년 이전</c:when>
						<c:otherwise>${data.recallDateFrom}년<c:if test="${search.thisYear eq data.recallDateFrom}">*</c:if></c:otherwise></c:choose>
                       </th>
                    </c:otherwise></c:choose>    
                        <td><fmt:formatNumber value='${data.daesu1}' type='number'/></td>
                        <td><fmt:formatNumber value='${data.daesu2}' type='number'/></td>
                        <td><fmt:formatNumber value='${data.daesu3}' type='number'/></td>
                        <td><fmt:formatNumber value='${data.daesu4}' type='number'/></td>
                        <td><fmt:formatNumber value='${data.daesu5}' type='number'/></td>
                        <td><fmt:formatNumber value='${data.daesu9}' type='number'/></td>
                        <td><fmt:formatNumber value='${data.totDaesu}' type='number'/></td>
                    </tr>
                	<c:set var="car_cnt_1" value="${car_cnt_1 + data.daesu1}" />
                	<c:set var="car_cnt_2" value="${car_cnt_2 + data.daesu2}" />
                	<c:set var="car_cnt_3" value="${car_cnt_3 + data.daesu3}" />
                	<c:set var="car_cnt_4" value="${car_cnt_4 + data.daesu4}" />
                	<c:set var="car_cnt_5" value="${car_cnt_5 + data.daesu5}" />
                	<c:set var="car_cnt_9" value="${car_cnt_9 + data.daesu9}" />
                	<c:set var="all_tot_car_cnt" value="${all_tot_car_cnt + data.totDaesu}" />
				</c:forEach>
            	<c:if test="${not empty result}">
                    <tr id="openTrTotFour">
                        <th>계<c:if test="${search.thisYear eq search.recallYear}">*</c:if></th>
                        <td><fmt:formatNumber value='${car_cnt_1}' type='number'/></td>
                        <td><fmt:formatNumber value='${car_cnt_2}' type='number'/></td>
                        <td><fmt:formatNumber value='${car_cnt_3}' type='number'/></td>
                        <td><fmt:formatNumber value='${car_cnt_4}' type='number'/></td>
                        <td><fmt:formatNumber value='${car_cnt_5}' type='number'/></td>
                        <td><fmt:formatNumber value='${car_cnt_9}' type='number'/></td>
                        <td><fmt:formatNumber value='${all_tot_car_cnt}' type='number'/></td>
                    </tr>
				</c:if>   
                </tbody>
            </table>

			<c:if test="${search.thisYear eq search.recallYear}">
				<p>* ${search.thisYear}년 신고현황 집계중</p>
			</c:if>
			<div id="selectChartFour" style="display:none">
				<div class="btn-write">
				<label class="uk-form-label">차트선택</label>
				<select class="uk-select w-100" onChange="$main.ui.changeCharts('Four', this.value);">
	            	<option value="1">파이형</option>
	            	<option value="2">라인형</option>
	            	<option value="3">선형</option>
	            </select>
	            </div>
            </div>
	        <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid" id="openDivFour" style="display:none">
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart7-1Div">
			        <div>
			        	<h4>국내 ${flgVal}별 신고현황(접수경로별)</h4>
			        	<canvas id="recallChart7" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart8-1Div">
			        <div>
			        	<h4>수입 ${flgVal}별 신고현황(접수경로별)</h4>
			        	<canvas id="recallChart8" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart7-2Div" style="display:none">
			        <div>
			        	<h4>국산 ${flgVal}별 신고현황(접수경로별)</h4>
			        	<canvas id="recallChart7-2" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart8-2Div" style="display:none">
			        <div>
			        	<h4>수입 ${flgVal}별 신고현황(접수경로별)</h4>
			        	<canvas id="recallChart8-2" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart7-3Div" style="display:none">
			        <div>
			        	<h4>국산 ${flgVal}별 신고현황(접수경로별)</h4>
			        	<canvas id="recallChart7-3" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart8-3Div" style="display:none">
			        <div>
			        	<h4>수입 ${flgVal}별 신고현황(접수경로별)</h4>
			        	<canvas id="recallChart8-3" width="400" height="320"></canvas>
			        </div>
			    </div>
			</div> 
	
	        <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid">
				<div class="btn-write">
					<button type="button" id="openFourBtn" onClick="$main.event.openTable('Four')" class="uk-button uk-button-primary" >더보기+</button>
					<button type="button" id="closeFourBtn" onClick="$main.event.closeTable('Four')" class="uk-button uk-button-primary" style="display:none" >숨기기-</button>
				</div>
	        </div>
            
</c:if>			
<!-- END 결함신고현황(접수경로별) -->
<!-- START 결함신고현황(차종별) -->
<c:if test="${search.statType eq 'CG'}"> 
		        
		<c:choose><c:when test="${'Y' != search.rcType}">
		<h3>${search.recallYear} 월별 신고현황(차종별)</h3>
		</c:when><c:otherwise>
		<h3>연도별 신고현황(차종별)</h3>
		</c:otherwise></c:choose>
		<table class="uk-table uk-table-divider table-stat">
               <caption>${flgVal}별 신고현황(차종별)</caption>
               <colgroup>
                   <col style="width: 20%;">
                   <col style="width: 50%;">
                   <col style="width: 30%;">
               </colgroup>
               <thead>
               	<tr>
               		<th>해당 ${flgVal}</th>
               		<th>차량명</th>
               		<th>계</th>
               	</tr>
               </thead>
               <tbody id="openTrFive">
               <c:set var="tot_cnt" value="0" />
               <c:set var="product_cd" value="" />
               <c:set var="product_name" value="" />
               <c:set var="sub_cnt" value="0" />
               <c:set var="idx" value="0" />
				<c:forEach items="${result}" var="data" varStatus="status">
                <c:choose><c:when test="${ product_cd eq ''}">
	             	<c:set var="product_cd" value="${idx}" />
	             	<c:set var="product_name" value="${data.groupCarName}" />
	             	<c:set var="sub_cnt" value="${data.recallCarCount}" />
                </c:when><c:when test="${product_name eq data.groupCarName}">
            		<c:set var="sub_cnt" value="${sub_cnt + data.recallCarCount}" />
                </c:when><c:otherwise>
            	<tr class="openTrFive" style="display:none">
                    <th id="tr_${product_cd}">
                    	<label id="labelFive_open_${product_cd}"><a href="#" onClick="$main.event.subOpenTable('Five','${product_cd}'); return false;">소계 +</a></label>
                    	<label id="labelFive_close_${product_cd}" style="display:none"><a href="#" onClick="$main.event.subCloseTable('Five','${product_cd}'); return false;">소계 -</a></label>
                    </th>
                    <td>${product_name}</td>
                    <td><fmt:formatNumber value='${sub_cnt}' type='number'/></td>
                </tr>
               	<c:set var="idx" value="${idx+1}" />
             	<c:set var="product_cd" value="${idx}" />
             	<c:set var="product_name" value="${data.groupCarName}" />
             	<c:set var="sub_cnt" value="${data.recallCarCount}" />
                </c:otherwise></c:choose>
               	<tr class="tr_${product_cd}" style="display:none">
				<c:choose><c:when test="${'Y' != search.rcType}">
					<c:set var="targetMonth" value="${fn:substring(data.recallDateFrom,5,7)}" />
                       <th>${targetMonth}월</th>
                   </c:when><c:otherwise>
                       <th>
						<c:choose><c:when test='${data.recallDateFrom eq "2002"}'>2003년 이전</c:when>
						<c:otherwise>${data.recallDateFrom}년</c:otherwise></c:choose>
                       </th>
                   </c:otherwise></c:choose>    
                       <td>${data.groupCarName}</td>
                       <td><fmt:formatNumber value='${data.recallCarCount}' type='number'/></td>
                   </tr>
               	<c:set var="tot_cnt" value="${tot_cnt + data.recallCarCount}" />
			</c:forEach>
           	<c:if test="${not empty result}">
            	<tr class="openTrFive" style="display:none">
                    <th id="tr_${product_cd}">
                    	<label id="labelFive_open_${product_cd}"><a href="#" onClick="$main.event.subOpenTable('Five','${product_cd}'); return false;">소계 +</a></label>
                    	<label id="labelFive_close_${product_cd}" style="display:none"><a href="#" onClick="$main.event.subCloseTable('Five','${product_cd}'); return false;">소계 -</a></label>
                    </th>
                    <td>${product_name}</td>
                    <td><fmt:formatNumber value='${sub_cnt}' type='number'/></td>
                </tr>
                <tr id="openTrTotFive">
                    <th colspan="2">계<c:if test="${search.thisYear eq search.recallYear}">*</c:if></th>
                    <td><fmt:formatNumber value='${tot_cnt}' type='number'/></td>
                </tr>
			</c:if>   
               </tbody>
           </table>

			<c:if test="${search.thisYear eq search.recallYear}">
				<p>* ${search.thisYear}년 신고현황 집계중</p>
			</c:if>

			<div id="selectChartFive" style="display:none">
				<div class="btn-write">
				<label class="uk-form-label">차트선택</label>
				<select class="uk-select w-100" onChange="$main.ui.changeCharts('Five', this.value);">
	            	<option value="1">파이형</option>
	            	<option value="2">라인형</option>
	            	<option value="3">선형</option>
	            </select>
	            </div>
            </div>
	        <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid" id="openDivFive" style="display:none">
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart9-1Div">
			        <div>
			        	<h4>${flgVal}별 신고현황(차종별)</h4>
			        	<canvas id="recallChart9" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <%-- <div class="uk-width-1-2@l uk-width-1-1@s">
			        <div>
			        	<h4>수입 ${flgVal}별 신고현황(차종별)</h4>
			        	<canvas id="recallChart10" width="400" height="320"></canvas>
			        </div>
			    </div> --%>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart9-2Div" style="display:none">
			        <div>
			        	<h4>${flgVal}별 신고현황(차종별)</h4>
			        	<canvas id="recallChart9-2" width="400" height="320"></canvas>
			        </div>
			    </div>
			    <div class="uk-width-1-2@l uk-width-1-1@s" id="recallChart9-3Div" style="display:none">
			        <div>
			        	<h4>${flgVal}별 신고현황(차종별)</h4>
			        	<canvas id="recallChart9-3" width="400" height="320"></canvas>
			        </div>
			    </div>
			</div> 
	
		<c:if test='${search.makerCode ne "" && search.makerCode != null}'>
	        <div class="uk-margin-medium-top uk-margin-medium-bottom uk-grid">
				<div class="btn-write">
					<button type="button" id="openFiveBtn" onClick="$main.event.openTable('Five')" class="uk-button uk-button-primary" >더보기+</button>
					<button type="button" id="closeFiveBtn" onClick="$main.event.closeTable('Five')" class="uk-button uk-button-primary" style="display:none" >숨기기-</button>
				</div>
	        </div>
		</c:if>
            
</c:if>			
<!-- END 결함신고현황(차종별) -->
                                <div class="btn-write">
                                	<button type="button" class="uk-button uk-button-default" id="listBtn">목록</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>		
                
    <!-- 제작사 찾기 Layer Popup -->
	<div id="find-prdct" class="uk-modal" uk-modal>		
	    <div class="uk-modal-dialog">
	    	<a href="#" class="uk-modal-close-default uk-close"></a>
	    	<div class="uk-modal-header uk-modal-title">제작사 찾기</div>
	    	<div class="uk-modal-body">
<form id="sForm" name="sForm" method="post" action="" onsubmit="return false;">
	    		<div class="uk-text-right">
	                <select id="srchCategory" name="srchCategory" class="uk-select" style="width:30%;">
	                    <option value="">전체</option>
	                    <option value="1">자동차</option>
	                    <option value="2">이륜자동차</option>
	                    <option value="3">기타</option>
	                </select>
	    			<input id="srchWrd" name="srchWrd" onkeyup='javascript:if(window.event.keyCode == 13){$main.ui.searchPrdctList(1)}' class="uk-input uk-form-width-medium" type="text" placeholder="제조사명">
					<button type="button" onclick='$main.ui.searchPrdctList(1);' class="uk-button uk-button-secondary">조회</button>	
	    		</div>
</form>
	    		<table id="searchTable1" class="uk-table table-style-1">
	                <caption>게시물 목록</caption>
	                <colgroup>
	                    <col style="width: 20%;">
	                    <col style="width: 25%;">
	                    <col style="width: 55%;">
	                </colgroup>
	                <thead>
	                	<tr>
	                		<th class="th">분류</th>
	                		<th class="th">제작사코드</th>
	                		<th class="th">제작사명</th>
	                	</tr>
	                </thead>
	                <tbody id="prdctList">
	                	<tr>
	                        <td class="uk-text-center" colspan="3">제작사명으로 검색할 수 있습니다</td>
	                    </tr>
	                </tbody>
	            </table>
	            <ul id="pagingUi" class="uk-pagination uk-flex-center uk-margin">
				    <li class="uk-active"><a href="#">1</a></li>
				</ul>
	    	</div>
	    </div>
	</div>
	<!--// 제작사 찾기 Layer Popup-->
	</section>
</article>
