<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManageGrts.js"></script> 

<form id="searchFrm" name="searchFrm" method="post">
	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
   	<input type="hidden" name="searchOpenYn" id="searchOpenYn" value="${params.searchOpenYn }" />
	<input type="hidden" name="gratischeckId" id="gratischeckId" value="${params.gratischeckId }" />
	<input type="hidden" name="divisionCode" id="divisionCode" value="${params.divisionCode }" />
	<input type="hidden" name="currentPageNo" id="currentPageNo" value="${params.currentPageNo}"/>
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
                            <table class="uk-table uk-table-divider table-stat"> 
				                 <caption>게시물 상세보기</caption> 
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
	                                    	<c:choose><c:when test="${result.isOpen != 'N'}"><i uk-icon="icon: unlock;" class="unlock" title="공개" ></i></c:when>
											<c:otherwise><i uk-icon="icon: lock;" class="lock" title="비공개" ></i></c:otherwise></c:choose>
											${result.gratischeckTitle} 
										</td>
	                                </tr>
				                 	<tr> 
				                         <th>출처</th> 
				                         <td><c:out value="${result.gratischeckSource}" /></td>
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
											<a href="#" onClick="javascript:fileDownload('${file.fileId}', 'GRTS'); return false;">${file.attachmentOriginal } <br></a> 
										</c:forEach>
										</td>
									</tr> 
				                 </tbody> 
				            </table>  
                                                        
				 			<h3>무상점검·정비대상</h3> 
				 			<table class="uk-table uk-table-divider table-stat"> 
				                 <caption>무상점검·정비대상</caption> 
				                 <colgroup> 
				                     <col style="width: 15%;"> 
				                     <col style="width: 35%;"> 
				                     <col style="width: 15%;"> 
				                     <col style="width: 35%;"> 
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
				                         <th>무상수리기간</th> 
				                         <td><c:out value="${result.gratischeckDateFrom}" /> ~ <c:out value="${result.gratischeckDateTo}" /></td> 
				                     </tr> 
				                     <tr> 
				                         <th>대수</th> 
				                         <td colspan="3"><c:out value="${result.carCount}" /> 대</td> 
				                     </tr> 
				                     <tr> 
				                         <th>무상점검내용</th> 
				                         <td colspan="3"><c:out value="${result.correctiveInformation}" escapeXml="false" /></td> 
				                     </tr> 
				                     <tr> 
				                         <th>조치사항</th> 
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
                                     <button type="button" class="uk-button uk-button-default" id="isOpenY" onclick="$crNttGrts.event.isOpenOne('Y')">공개</button>
                                 </c:when>
                                 <c:otherwise>
                                     <button type="button" class="uk-button uk-button-default" id="isOpenN" onclick="$crNttGrts.event.isOpenOne('N')">비공개</button>
                                 </c:otherwise>
                                </c:choose>
                                <c:choose>
                                 <c:when test="${result.snsOpen == 'N' }">
                                     <button type="button" class="uk-button uk-button-default" id="snsOpenY" onclick="$crNttGrts.event.snsOpenOne('Y')">SNS허용</button>
                                 </c:when>
                                 <c:otherwise>
                                     <button type="button" class="uk-button uk-button-default" id="snsOpenN" onclick="$crNttGrts.event.snsOpenOne('N')">SNS제외</button>
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