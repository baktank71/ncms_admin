<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="newLineChar" value="<%= '\n' %>" />

<script type="text/javascript" src="${contextPath }/js/mp/mpNttManageQnA.js"></script>

<form id="searchFrm" name="searchFrm">
	<input type="hidden" name="contentsId" id="contentsId" value="${params.contentsId }" />
	<input type="hidden" name="divisionCode" id="divisionCode" value="${params.divisionCode }" />
   	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
	<input type="hidden" name="replyYn" id="replyYn" value="Y"/>
   	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
   	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
   	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
   	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
</form>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section class="content" id="content">
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>Q & A 상세보기</h3>
                    <div class="uk-child-width-1-1 uk-grid" >
                            <div class="uk-card uk-card-default uk-card-body">
                                <table class="uk-table uk-table-divider table-stat">
                                    <caption>번호, 제목, 첨부, 작성일, 조회수, 공개</caption>
                                    <colgroup>
                                        <col class="rowsize-th">
                                        <col class="rowsize-td">
                                    </colgroup>
                                    <tbody class="uk-text-left">
                                    	<tr>
                                    		<th> 공개여부 </th>
                                    		<c:choose>
                                    			<c:when test="${result.isOpen == 'Y' }">
                                    				<td> 공개  </td>
                                    			</c:when>
                                    			<c:when test="${result.isOpen == 'N' }">
                                    				<td> 비공개 </td>
                                    			</c:when>
                                    		</c:choose>
                                    	</tr>
                                    
                                        <tr>
                                            <th> 작성자 </th>
											<td> <c:out value="${result.writeName }" /> </td>
                                        </tr>
                                        <tr>
											<th> 작성일자 </th>
											<td> <c:out value="${result.writeTime }" /></td>
                                        </tr>
                                        <tr>
                                            <th>질문 제목</th>
                                            <td><c:out value="${result.title }" /></td>
                                        </tr>
                                        <tr>
                                        	<th>질문 내용</th>
                                        	<%-- <td><c:out value="${result.contents }" escapeXml="false" /></td> --%>
                                       		<td>${fn:replace(result.contents, newLineChar, "<br />") }</td>
                                        </tr>
					                    <tr>
					                    	<th>제작자 첨부파일</th> 
					                    	<td colspan="5">
												<!-- file_id, attachment, attachment_original, server_path   -->
												<c:forEach items="${fileList }" var="file" varStatus="status">
													<a href="#" onClick="javascript:fileDownload('${file.fileId}', 'QNA'); return false;">${file.attachmentOriginal } <br></a> 
												</c:forEach>
											</td>
										</tr> 
                                        
                                        <c:choose>
                                       	<c:when test="${!empty result.replyContents }" >
                                        <tr>
                                        	<th>처리자 </th>
                                  			<td><c:out value="${userNm }" /></td>
                                        </tr>
                                        
                                        <tr>
                                        	<th>처리일 </th>
                                  			<td><c:out value="${result.replyWriteTime }" /></td>
                                        </tr>
                                        <tr>
                                            <th>답변</th>
                                       		<%-- <td><c:out value="${result.replyContents }" escapeXml="false" /></td> --%>
                                       		<td>${fn:replace(result.replyContents, newLineChar, "<br />") }</td>
                                        </tr>
					                    <tr>
					                    	<th>관리자 첨부파일</th> 
					                    	<td colspan="5">
												<!-- file_id, attachment, attachment_original, server_path   -->
												<c:forEach items="${replyFileList }" var="file" varStatus="status">
													<a href="#" onClick="javascript:fileDownload('${file.fileId}', 'QNA'); return false;">${file.attachmentOriginal } <br></a> 
												</c:forEach>
											</td>
										</tr> 
                                       	</c:when>
                                        </c:choose>
                                        </tbody>                                        
                                </table>

                                <div class="uk-text-center">
                                        <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="goAnswer" onclick="$mpNttQnA.event.goAnswer('<c:out value="${result.contentsId }" />')">수정</button>
                                        <button type="button" class="uk-button uk-button-default uk-margin-small-right" id="goDelete" onclick="$mpNttQnA.event.goDelete('<c:out value="${result.contentsId }" /> ')">삭제</button>
                                        <button type="button" class="uk-button uk-button-default" id="cancelBtn">목록</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>		
	</section>
</article>