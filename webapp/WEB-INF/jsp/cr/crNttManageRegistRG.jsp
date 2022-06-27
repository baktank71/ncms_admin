<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- SmartEditor를 사용하기 위해서 다음 js파일을 추가 (경로 확인) -->
<script type="text/javascript" src="${contextPath}/ext/SE2/js/service/HuskyEZCreator.js" charset="utf-8"></script>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManageRg.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>게시물 등록</h3>
                    
                    <form id="searchFrm" method="post">
                    	<input type="hidden" name="isOpen" id="isOpen" value="${params.isOpen }" />
                    	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
                    	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
                    	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
                    	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
   						<input type="hidden" name="searchOpenYn" id="searchOpenYn" value="${params.searchOpenYn }" />
						<input type="hidden" name="currentPageNo" id="currentPageNo" value="${params.currentPageNo}"/>
                    </form>
                    
                    <form id="insertForm" name="insertForm" method="post" onsubmit="return false;">
	                    <input type="hidden" name="divisionCode" id="divisionCode" value="${params.divisionCode }" />
	                    <input type="hidden" name="contentsId" id="contentsId" value="${params.contentsId }" />
	                    <input type="hidden" name="userNm" id="loginName" value='<%=request.getSession().getAttribute("userNm") %>' />
	                    <input type="hidden" name="userId" id="loginId" value='<%=request.getSession().getAttribute("userId") %>' />
	                    <input type="hidden" id="writeFlag" value="Y" />
                    
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
                                            <th>공개여부</th>
											<td>
												<label for="ck1" class="uk-margin-medium-right">
												<input class="uk-radio" type="radio" id="isOpen1" name="isOpen" value="Y"
													<c:if test="${result.isOpen != 'N' }">checked</c:if>>
													공개 </label> 
												<label for="ck2" class="uk-margin-medium-right">
												<input class="uk-radio" type="radio" id="isOpen2" name="isOpen" value="N"
													<c:if test="${result.isOpen == 'N' }">checked</c:if>>
													비공개 </label>
											</td>
                                        </tr>
                                        <tr>
                                            <th>제목</th>
                                            <td><input type="text" class="uk-input" id="title" name="title" value="<c:out value="${result.title }" />"> </td>
                                        </tr>   
                                        <tr>
                                            <th>대표이미지<br/></th>
                                            <td>
                                                <div class="uk-margin flie" uk-margin>
                                            	<select id="jbsource" name="jbsource" class="uk-select w-100">
		                                            <option value="1" <c:if test="${result.jbsource ne '2'}">selected</c:if>>동영상</option>
		                                            <option value="2" <c:if test="${result.jbsource eq '2'}">selected</c:if>>이미지</option>
		                                        </select>
		                                        	<div id="jbsourceDiv1" uk-form-custom="target: true">
                                                    	<c:if test='${ result.jbsource ne "2"}'><c:set var="titleDc" value="${result.titleDc}" /></c:if>
		                                        		<input class="uk-input" type="text" id="titleDc" name="titleDc" value="${titleDc}" placeholder="동영상  Url주소를 입력하세요.">
		                                        	</div>
                                                    <div id="jbsourceDiv2" uk-form-custom="target: true">
                                                    	<c:set var="titleDc" value="이곳을 클릭하여 하나의 대표 이미지를 등록하세요." />
                                                    	<c:if test='${ result.jbsource == "2" && result.titleDc != null && result.titleDc != ""}'><c:set var="titleDc" value="${result.titleDc}" /></c:if>
                                                        <input type="file" id="uploadfileRep" name="uploadfileRep">
                                                        <input class="uk-input" type="text" placeholder="${titleDc}" disabled>
                                                        <button class="uk-button uk-button-default" type="file">찾아보기</button>
                                                    </div>
                                                    <!-- <button class="uk-button uk-button-default btn-add" id="fileAdd"><span uk-icon="icon: plus; ratio: 0.8"></span>추가</button> -->

                                                </div>
                                                <!-- 파일 -->
												
                                            </td>
                                        </tr>                
                                        <tr>
                                            <th>내용</th>
                                            <td><textarea class="uk-textarea" rows="12" id="contents" name="contents"><c:out value="${result.contents }" /></textarea></td>
											
                                        </tr>
                                        <tr>
                                            <th>첨부파일<br/></th>
                                            <td>
                                                <div class="uk-margin flie" uk-margin>
                                                    <div uk-form-custom="target: true">
                                                        <input type="file" id="uploadfiles" name="uploadfiles" multiple>
                                                        <input class="uk-input" type="text" placeholder="이곳을 클릭하여 여러개의 파일을 첨부하세요." disabled>
                                                        <button class="uk-button uk-button-default" type="file">찾아보기</button>
                                                    </div>                                                    
                                                    <!-- <button class="uk-button uk-button-default btn-add" id="fileAdd"><span uk-icon="icon: plus; ratio: 0.8"></span>추가</button> -->

														<!-- 등록할 시, 나타나는 코드 -->
													<ul class="flie-list" id="fileList_add">
														<!-- 파일이름 -->
													</ul>
														
												<c:forEach items="${fileList }" var="file" varStatus="status">
	                                                <ul class="flie-list" id="fileList_${file.fileId}">
														<c:out value="${file.attachmentOriginal }" /> <a href="#" onClick="$crNttRg.event.deleteFile(${file.fileId}, 'CONTENTS');">[X]</a>
														<input type="hidden" name="fileId" value="${file.fileId}" />
	                                                </ul>
												</c:forEach>

                                                </div>
                                                <!-- 파일 -->
												
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
								</form>
								
                                <div class="uk-text-center">
                                	<c:choose>
                                	<c:when test="${empty result.contentsId }">
                                    	<button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="registRgBtn">등록</button>
                                    	<button type="button" class="uk-button uk-button-default" id="cancelBtn">취소</button>
                                    </c:when>
                                    <c:otherwise>
                                        <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="registRgBtn">수정</button>
                                        <button type="button" class="uk-button uk-button-default uk-margin-small-right" id="returnBtn" onclick="history.go(-1)">취소</button>
                                        <button type="button" class="uk-button uk-button-default" id="cancelBtn">목록</button>
                                    </c:otherwise>
                                    </c:choose>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>		
	</section>
</article>