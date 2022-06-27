<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManageRcInfo.js"></script> 

<form id="searchFrm" name="searchFrm" method="post">
	<input type="hidden" name="ctype" id="ctype" value="${params.ctype }" />
	<input type="hidden" name="recallId" id="recallId" value="${params.recallId }" />
	<input type="hidden" name="divisionCode" id="divisionCode" value="${params.divisionCode }" />
	<input type="hidden" name="currentPageNo" id="currentPageNo" value="${params.currentPageNo}"/>
	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
   	<input type="hidden" name="searchOpenYn" id="searchOpenYn" value="${params.searchOpenYn }" />
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
                            <%-- <div class="board-view">
                                <div class="subject">
	                                <c:choose><c:when test="${result.isOpen != 'N'}"><i uk-icon="icon: unlock;" class="unlock" title="공개" ></i></c:when>
									<c:otherwise><i uk-icon="icon: lock;" class="lock" title="비공개" ></i></c:otherwise></c:choose>
                                	${result.gratischeckTitle}
                                </div>
                                <div class="info">
                                    <dl>                    
                                        <dt>출처</dt>
                                        <dd>${result.gratischeckSource}</dd>
                                        <dt>작성일</dt>
                                        <dd>${result.regDate}</dd>
                                        <dt>조회수</dt>
                                        <dd>${result.readCount}</dd>
										<dd class="file">
										<!-- file_id, attachment, attachment_original, server_path   -->
										<c:forEach items="${fileList}" var="file" varStatus="status">
											<a href="#" onClick="javascript:fileDownload(${file.fileId}, 'GRTS'); return false;"> ${file.attachmentOriginal } </a>
										</c:forEach></dd>
                                    </dl>
                                </div>
                            </div> --%>
                                                        
				 			<h3>기본정보</h3> 
				 			<table class="uk-table uk-table-divider table-stat"> 
				                 <caption>리콜현황 기본정보</caption> 
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
	                                    <td colspan="5">${result.recallTitle} 
	                                    	<c:choose><c:when test="${result.isOpen != 'N'}"><i uk-icon="icon: unlock;" class="unlock" title="공개" ></i></c:when>
											<c:otherwise><i uk-icon="icon: lock;" class="lock" title="비공개" ></i></c:otherwise></c:choose>
										</td>
	                                </tr>
				                 	<tr> 
				                         <th>출처</th> 
				                         <td><c:out value="${result.recallSource}" /></td>
				                         <th>작성일</th> 
				                         <td><c:out value="${result.regDate}" /></td> 
				                         <th>조회수</th> 
				                         <td><c:out value="${result.readCount}" /></td>  
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
				            
				        
				 			<h3>자동차 결함정보</h3> 
				 			<table class="uk-table uk-table-divider table-stat"> 
				                 <caption>리콜현황 자동차 결함정보</caption> 
				                 <colgroup> 
	                                <col style="width: 18%;">
	                                <col style="width: 32%;">
	                                <col style="width: 18%;">
	                                <col style="width: 32%;">
				                 </colgroup> 
				                 <tbody class="uk-text-left"> 
				                	<tr>
				                        <th>제작(수입)사</th>
				                        <td><c:out value="${result.originalMakeCodeName}" /></td>
				                        <th>차명</th>
				                        <td><c:out value="${result.productName}" /></td>
				                    </tr>
				                    <tr>
				                        <th>생산기간</th>
				                        <td><c:out value="${result.productDateFrom}" /> ~ <c:out value="${result.productDateTo}" /></td>
				                        <th>시정기간</th>
				                        <td><c:out value="${result.recallDateFrom}" /> ~ <c:out value="${result.recallDateTo}" /></td>
				                    </tr>
				                    <tr>
				                        <th>대상수량</th>
				                        <td><fmt:formatNumber value="${result.recallCarCount}" pattern="#,###" /> 대</td>      
				                        <th>장치분류</th>
				                        <td><c:out value="${result.petitionDivisionName}" /></td>
				                    </tr>
				                    <c:if test='${params.ctype == "O"}'>
				                    <tr>
				                        <th>미시정수량</th>
				                        <td><fmt:formatNumber value="${result.nonCrctCnt}" pattern="#,###" /> 대</td>
				                        <th>시정률</th>
				                        <td><fmt:formatNumber value="${result.crctRate}" pattern="#.##"/> %</td>
				                    </tr>
				                    <%-- <tr>
				                        <th>진행여부</th>
				                        <td colspan="3"><c:if test="${result.recallGubun == 'isRecall'}">진행중</c:if></td>
				                    </tr> --%>
				                    </c:if>
				                    <tr>
				                        <th>결함내용</th>
				                        <td colspan="3"><c:out value="${result.faultyInformation}" escapeXml="false" /></td>
				                    </tr>
				                    <tr>
				                        <th>시정방법</th>
				                        <td colspan="3"><c:out value="${result.recoverMethod}" escapeXml="false" /></td>
				                    </tr>
				                    <tr>
				                        <th>기타문의</th>
				                        <td colspan="3"><c:out value="${result.furtherInformation}" /></td>
				                    </tr>
				                 </tbody> 
				            </table>      

                            <div class="btn-write uk-text-center">
                                <div class="uk-text-left">
                                <c:choose>
                                 <c:when test="${result.isOpen == 'N' }">
                                     <button type="button" class="uk-button uk-button-default" id="isOpenY" onclick="$rcInfo.event.isOpenOne('Y')">공개</button>
                                 </c:when>
                                 <c:otherwise>
                                     <button type="button" class="uk-button uk-button-default" id="isOpenN" onclick="$rcInfo.event.isOpenOne('N')">비공개</button>
                                 </c:otherwise>
                                </c:choose>
                                <c:choose>
                                 <c:when test="${result.snsOpen == 'N' }">
                                     <button type="button" class="uk-button uk-button-default" id="snsOpenY" onclick="$rcInfo.event.snsOpenOne('Y')">SNS허용</button>
                                 </c:when>
                                 <c:otherwise>
                                     <button type="button" class="uk-button uk-button-default" id="snsOpenN" onclick="$rcInfo.event.snsOpenOne('N')">SNS제외</button>
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