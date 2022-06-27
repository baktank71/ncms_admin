<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="newLineChar" value="<%= '\n' %>" />

<script type="text/javascript" src="${contextPath}/js/mp/mpNttManage.js"></script> 

<form id="searchFrm" name="searchFrm">
	<input type="hidden" name="contentsId" id="contentsId" value="${result.contentsId }" />
	<input type="hidden" name="divisionCode" id="divisionCode" value="${result.divisionCode }" />
	<input type="hidden" name="currentPageNo" id="currentPageNo" value="${params.currentPageNo}"/>
   	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
   	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
   	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
   	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
   	<input type="hidden" name="searchOpenYn" id="searchOpenYn" value="${params.searchOpenYn }" />
   	<input type="hidden" name="faqId" id="faqId" value="${params.faqId }" />
   	<input type="hidden" name="newsData" id="newsData" value="${params.newsData }" />
</form>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>제작자 게시물 상세보기</h3>
                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <%-- <div class="board-view">
                                    <div class="subject">${result.title}</div>
                                    <div class="info">
                                        <dl>                    
                                            <dt>공개여부</dt>
                                            <c:if test="${result.isOpen == 'Y'}">
                                            	<dd>공개</dd>
                                            </c:if>
                                            <c:if test="${result.isOpen == 'N'}">
                                            	<dd>비공개</dd>
                                            </c:if>
                                            <dt>조회수</dt>
                                            <dd>${ result.readCount }</dd>
                                            <dt>작성일</dt>
                                            <dd>${result.writeTime}</dd>
                                            <dt>첨부</dt>
											<dd class="file">
												<c:forEach items="${fileList }" var="file" varStatus="status">
													<a href="javascript:void(0);" onClick="javascript:fileDownload(${file.fileId}, 'CONTENTS')"> ${file.attachmentOriginal } </a>
												</c:forEach>
											</dd>
                                        </dl>
                                    </div>
                                    <div class="substance">
                                    			${fn:replace(result.contents, newLineChar, "<br />") }
                                    </div>
                                </div> --%>
                            <div class="board-view">  
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
												${result.title} 
		                                    	<%-- <c:choose><c:when test="${result.isOpen != 'N'}"><i uk-icon="icon: unlock;" class="unlock" title="공개" ></i></c:when>
												<c:otherwise><i uk-icon="icon: lock;" class="lock" title="비공개" ></i></c:otherwise></c:choose> --%>
											</td>
		                                </tr>
					                 	<tr> 
					                         <th>공개여부</th> 
					                         <td><c:if test="${result.isOpen == 'Y'}">공개</c:if>
	                                            <c:if test="${result.isOpen == 'N'}">비공개</c:if></td>
					                         <th>조회수</th> 
					                         <td><c:out value="${result.readCount}" /></td>  
					                         <th>작성일</th> 
					                         <td><c:out value="${result.writeTime}" /></td> 
					                    </tr>
					                    <tr>
					                    	<th>첨부파일</th> 
					                    	<td colspan="5">
												<!-- file_id, attachment, attachment_original, server_path   -->
												<c:forEach items="${fileList }" var="file" varStatus="status">
													<a href="#" onClick="javascript:fileDownload('${file.fileId}', 'CONTENTS'); return false;">${file.attachmentOriginal } <br></a> 
												</c:forEach>
											</td>
										</tr> 
					                    <%-- <tr>
					                    	<th>내용</th> 
					                    	<td colspan="5">
												${fn:replace(result.contents, newLineChar, "<br />") }
											</td>
										</tr> --%>
					                 </tbody> 
					            </table>  
                            	<div class="substance">
                                   			${fn:replace(result.contents, newLineChar, "<br />") }
                            	</div>
                            </div> 

                                <dl class="board-bottom">
                                    <dt>이전글</dt>
                                    <dd>
                                    	<c:choose>
                                    		<c:when test="${not empty pre }">
                                    			<a href="javascript:void(0)" onclick="$mpNtt.event.detailView('${pre.contentsId }');">
                                    				${pre.title }
                                    			</a>		
                                    		</c:when>
                                    		<c:otherwise>
                                    			이전 글이 없습니다.
                                    		</c:otherwise>
                                    	</c:choose>
                                   	</dd>
                                    		
                                    <dt>다음글</dt>
                              
                                    <dd>
                                    	<c:choose>
                                    		<c:when test="${not empty next }">
                                    			<a href="javascript:void(0)" onclick="$mpNtt.event.detailView('${next.contentsId }');" >
                                    				${next.title }
                                    			</a>
                                    		</c:when>
                                    		<c:otherwise>
                                    			다음 글이 없습니다.
                                    		</c:otherwise>
                                    	</c:choose>
                                    </dd>
                                </dl>

                                <div class="uk-text-center">
                                    <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="modifyBtn" onclick="$mpNtt.event.goModify(<c:out value="${result.contentsId }" />)">수정</button>
                                    <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="deleteBtn" onclick="$mpNtt.event.goDelete(<c:out value="${result.contentsId }" />)">삭제</button>
                                    <button type="button" class="uk-button uk-button-default" id="cancelBtn">목록</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>		
	</section>
</article>