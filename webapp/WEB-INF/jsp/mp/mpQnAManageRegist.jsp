<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- SmartEditor를 사용하기 위해서 다음 js파일을 추가 (경로 확인) -->
<%-- <script type="text/javascript" src="${contextPath}/ext/SE2/js/service/HuskyEZCreator.js" charset="utf-8"></script> --%>

<script type="text/javascript" src="${contextPath }/js/mp/mpNttManageQnA.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                <h3>Q & A 답변 등록 및 수정</h3>
                    <form id="searchForm" method="post">
                    	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
                    	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
                    	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
                    	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
                    </form>
                    
                    <form id="insertForm" name="insertForm" method="post" onsubmit="return false;" action="fileupload.do" enctype="multipart/form-data">
	                    <input type="hidden" name="divisionCode" id="divisionCode" value="${params.divisionCode }" />
	                    <input type="hidden" name="contentsId" id="contentsId" value="${params.contentsId }" />
	                    <input type="hidden" name="replyYn" id="replyYn" value="${params.replyYn }" />
                        <input type="hidden" name="userNm" id="loginName" value='<%=request.getSession().getAttribute("userNm") %>' />
	                    <input type="hidden" name="userId" id="loginId" value='<%=request.getSession().getAttribute("userId") %>' />
                    
                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <table class="uk-table uk-table-divider board-write">
                                    <caption>번호, 제목, 첨부, 작성일, 조회수, 공개</caption>
                                    <colgroup>
                                        <col class="rowsize-th">
                                        <col class="rowsize-td">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>작성자</th>
                                            <td>
                                            	<span><c:out value="${result.writeName }" /></span> 
                                            </td>
                                        </tr>    
                                        <tr>
                                            <th>작성일자</th>
                                            <td>
                                            	<span><c:out value="${result.writeTime }" /></span> 
                                            </td>
                                        </tr>    
                                        <tr>
                                            <th>질문 제목</th>
                                            <td>
                                            	<span><c:out value="${result.title }" /></span> 
                                            </td>
                                        </tr>                   
                                        <tr>
                                            <th>질문 내용</th>
                                            <td>
                                            	<span><c:out value="${result.contents }" /></span>
                                            </td>
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
                                        <tr>
                                        	<th>답변</th>
                                        	<td><textarea class="uk-textarea" rows="12" id="replyContents" name="replyContents"><c:out value="${result.replyContents }" /></textarea></td>
                                        </tr>
                                        <tr>
                                            <th>첨부</th>
                                            <td>
                                            	<!-- fileDiv -->
                                                <div class="uk-margin flie" uk-margin>
                                                    <div uk-form-custom="target: true">
                                                        <input type="file" id="uploadfileList" name="uploadfiles" multiple>
                                                        <input class="uk-input" type="text" placeholder="이곳를 클릭하여 파일을 첨부하세요." disabled>
                                                        <button class="uk-button uk-button-default" type="file" id="uploadBtn">찾아보기</button>
                                                    </div>
                                                    
                                                <!-- 등록할 시, 나타나는 코드 -->
                                                <ul class="flie-list" id="fileList_add">
                                                		<!-- 파일이름 -->	
                                                </ul>
                                                
                                                <c:forEach items="${replyFileList }" var="file" varStatus="status">
	                                            <ul class="flie-list" id="fileList_${file.fileId}">
														<c:out value="${file.attachmentOriginal }" /> 
														<a href="#" onClick="$mpNttQnA.event.deleteFile(${file.fileId}, 'QNA');">[X]</a>
                                                </ul>
                                                </c:forEach>
                                                </div>
                                            </td>
                                        </tr> 
                                    </tbody>
                                </table>
                                <div class="uk-text-center">
                                   	<button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="registBtn" onclick="$mpNttQnA.event.answerRegist('<c:out value="${result.contentsId }" />') ">답변 달기</button>
                                   	<button type="button" class="uk-button uk-button-default" id="cancelBtn">취소</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    </form>
                </div>
            </div>
       </div>
	</section>
</article>