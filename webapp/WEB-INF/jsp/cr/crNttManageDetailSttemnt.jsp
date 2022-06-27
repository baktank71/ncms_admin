<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManageSttemnt.js"></script> 

<c:set var="detail" value="${result.detail}" />
<c:set var="fileList" value="${result.fileList}" />

<form id="searchFrm" name="searchFrm" method="post">
   	<input type="hidden" name="petitionId" id="petitionId" value="${params.petitionId}">
	<input type="hidden" name="divisionCode" id="divisionCode" value="${params.divisionCode }" />
	<input type="hidden" name="ctype" id="ctype" value="${params.ctype }" />
	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
    <input type="hidden" name="currentPageNo" id="currentPageNo" value="${params.currentPageNo }" />
</form>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>게시물 상세보기</h3>
                    <div>	
                        <div class="uk-card uk-card-default uk-card-body">
                                                        
				 			<h3>${params.ctype }</h3> 
				 			<table class="uk-table uk-table-divider table-stat"> 
				                 <caption>신고내역조회</caption> 
				                 <colgroup> 
	                                <col style="width: 115px;">
	                                <col style="width: 170px;">
	                                <col style="width: 115px;">
	                                <col style="width: 170px;">
	                                <col style="width: 150px;">
	                                <col style="width: 110px;">
				                 </colgroup> 
				                 <tbody class="uk-text-left"> 
	                                <tr>
	                                    <th>제목</th>
	                                    <td colspan="5">
		                                    <c:choose><c:when test="${detail.petitionOpenDegree eq '001'}"><i uk-icon="icon: unlock;" class="unlock" title="공개" ></i></c:when>
											<c:otherwise><i uk-icon="icon: lock;" class="lock" title="비공개" ></i></c:otherwise></c:choose>
											${detail.petitionTitle}
										</td>
	                                </tr>
				                 	<tr> 
				                         <th>신고인</th> 
				                         <td><c:out value="${detail.name}" /></td>
				                         <th>신고일</th> 
				                         <td><c:out value="${detail.writeTime}" /></td> 
				                         <th>조회수</th> 
				                         <td><c:out value="${detail.readCount}" /></td>  
				                    </tr>
				                    <tr>
				                    	<th>첨부파일</th> 
				                    	<td colspan="5">
									<!-- file_id, attachment, attachment_original, server_path   -->
									<!-- <dd class="file"> -->
										<c:forEach items="${fileList }" var="file" varStatus="status">
											<a href="#" onClick="javascript:fileDownload('${file.fileId}', '${params.ctype}'); return false;">${file.attachmentOriginal } <br></a> 
										</c:forEach>
										</td>
									</tr> 
				                 </tbody> 
				            </table>   
				            
			<c:if test="${params.ctype eq 'CMR'}">	
			<!-- 건설기계 결함신고 -->		
            <h3>자동차 기본정보</h3>
			<table class="uk-table uk-table-divider table-stat">
                <caption>자동차 기본정보</caption>
                <colgroup>
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                </colgroup>
                <tbody class="uk-text-left">
                	<tr>
                        <th>건설기계명</th>
                        <td>${detail.productName}</td>
                        <th>제작(수입)사</th>
                        <td>${detail.makerName}</td>
                    </tr>
                    <tr>
                        <th>모델연도</th>
                        <td colspan="3">${detail.yearType}</td>
                    </tr>
                    <tr>
                        <th>구입방법</th>
                        <td>${detail.purchaseName}</td>
                        <th>구입시기</th>
                        <td>${fn:substring(detail.purchaseDate, 0, 4)}년 ${fn:substring(detail.purchaseDate, 4, 6)}월</td>
                    </tr>
                    <tr>
                        <th>주행거리</th>
                        <td><fmt:formatNumber value="${detail.coveredDistance}" type="number"/>km</td>
                        <th>주행시간</th>
                        <td><fmt:formatNumber value="${detail.workTime}" type="number"/>분</td>
                    </tr>
                </tbody>
            </table>
            <h3>자동차 결함신고 내용</h3>
			<table class="uk-table uk-table-divider table-stat">
                <caption>자동차 결함정보</caption>
                <colgroup>
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                </colgroup>
                <tbody class="uk-text-left">
                    <tr>
                        <th>신고내용</th>
                        <td colspan="3"><c:out value="${detail.petitionContent}" escapeXml="false" /></td>
                    </tr>
                </tbody>
            </table>
            </c:if>

			<c:if test="${params.ctype ne 'CMR'}">
			<!-- 자동차, 이륜자동차 결함신고 -->
			<h3>자동차 기본정보</h3>
			<table class="uk-table uk-table-divider table-stat">
                <caption>자동차 기본정보</caption>
                <colgroup>
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                </colgroup>
                <tbody class="uk-text-left">
                	<tr>
                        <th>차명</th>
                        <td>${detail.productName}</td>
                        <th>차종구분</th>
                        <td>${detail.carDivisionName}</td>
                    </tr>
                    <tr>
                        <th>제작(수입)사</th>
                        <td>${detail.makerCodeName}</td>
                        <th>모델연도</th>
                        <td>${detail.yearType}</td>
                    </tr>
                    <tr>
                        <th>변속기</th>
                        <td>${detail.transTypeName}</td>
                        <th>구동방식</th>
                        <td>${detail.driveMethodName}</td>
                    </tr>
                    <tr>
                        <th>엔진배기량</th>
                        <td>${detail.baegi} cc</td>
                        <th>사용연료</th>
                        <td>${detail.fuelCodeName}</td>
                    </tr>
                </tbody>
            </table>
        	</c:if>    
            
			<c:if test="${params.ctype eq 'RDM'}">
			<!-- 리콜불만신고 -->
            <h3>리콜 불만신고 내용</h3>
			<table class="uk-table uk-table-divider table-stat">
                <caption>자동차 결함정보</caption>
                <colgroup>
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                </colgroup>
                <tbody class="uk-text-left">
                    <tr>
                        <th>신고내용</th>
                        <td colspan="3"><c:out value="${detail.petitionContent}" escapeXml="false" /></td>
                    </tr>
                </tbody>
            </table>    
			</c:if>
			
			<c:if test="${params.ctype eq 'EP'}">	
            <h3>자동차 결함정보</h3>
		    <c:forEach items="${result.defectInfoList}" var="defectInfoObj" varStatus="seq">
			<table class="uk-table uk-table-divider table-stat">
                <caption>자동차 결함정보</caption>
                <colgroup>
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                    <col style="width: 15%;">
                    <col style="width: 35%;">
                </colgroup>
                <tbody class="uk-text-left">
                	<tr>
                        <th>결함발생횟수</th>
                        <td><fmt:formatNumber value="${defectInfoObj.defectFrequency}" type="number"/> 회</td>
                        <th>결함발생일</th>
                        <td><c:if test="${fn:length(defectInfoObj.defectInfoDetailList) > 0}">
			                	<fmt:parseDate value='${defectInfoObj.defectInfoDetailList[0].defectDate}' var='defect_time' pattern='yyyymmdd'/><fmt:formatDate value='${defect_time}' type='date' pattern='yyyy-mm-dd'/>
			                </c:if></td>
                    </tr>
                    <tr>
                        <th>결함발생시 주행거리</th>
                        <td><c:if test="${fn:length(defectInfoObj.defectInfoDetailList) > 0}">
			            		<fmt:formatNumber value='${defectInfoObj.defectInfoDetailList[0].defectDistance}' type='number'/>
			            	</c:if> Km</td>
                        <th>결함발생시 속도</th>
                        <td><c:if test="${fn:length(defectInfoObj.defectInfoDetailList) > 0}">
			            	${defectInfoObj.defectInfoDetailList[0].defectSpeed}
			            	</c:if> Km</td>
                    </tr>
                    <tr>
                        <th>결함내용</th>
                        <td colspan="3"><c:out value="${defectInfoObj.petitionContent}" escapeXml="false" /></td>
                    </tr>
                    <tr>
                        <td colspan="4" class="uk-text-center"><p class="uk-padding-small"><span class="uk-margin-small-right uk-text-primary">신고내용과 관련하여 사고가 발생하였습니까?</span> ${defectInfoObj.accidentOccurred}</p></td>
                    </tr>
                </tbody>
            </table>   
		    </c:forEach>
            </c:if> 

				 			    

                            <div class="btn-write uk-text-center">
                                <div class="uk-text-left">
                                <c:choose>
                                 <c:when test="${detail.snsOpen == 'N' }">
                                     <button type="button" class="uk-button uk-button-default" id="snsOpenY" onclick="$sttemnt.event.snsOpenOne('Y')">SNS허용</button>
                                 </c:when>
                                 <c:otherwise>
                                     <button type="button" class="uk-button uk-button-default" id="snsOpenN" onclick="$sttemnt.event.snsOpenOne('N')">SNS제외</button>
                                 </c:otherwise>
                                </c:choose>
                                </div>
                                <button type="button" class="uk-button uk-button-default" id="cancelBtn">목록</button>          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>		
	</section>
</article>