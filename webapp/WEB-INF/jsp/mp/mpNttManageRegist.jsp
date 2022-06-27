<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- SmartEditor를 사용하기 위해서 다음 js파일을 추가 (경로 확인) -->
<script type="text/javascript" src="${contextPath}/ext/SE2/js/service/HuskyEZCreator.js" charset="utf-8"></script>

<script type="text/javascript" src="${contextPath}/js/mp/mpNttManage.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                <c:choose>
                	<c:when test="${empty result.contentsId }">
	                    <h3>제작자 게시물 등록</h3>
                	</c:when>
                	<c:otherwise>
						<h3>제작자 게시물 수정</h3>                	
                	</c:otherwise>
                </c:choose>
                    <form id="searchForm" method="post">
                    	<input type="hidden" name="isOpen" id="isOpen" value="${params.isOpen }" />
                    	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
                    	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
                    	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
                    	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
                    </form>
                    
                    <form id="insertForm" name="insertForm" method="post" onsubmit="return false;" action="fileupload.do" enctype="multipart/form-data">
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
                                    	<c:choose>
	                                    	<c:when test="${params.divisionCode eq 0331 || params.divisionCode eq 0333}">
											<tr>
	                                            <th>FAQ 종류</th>
	                                            <td>
	                                                <label for="ck1" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="faqId1" name="divisionCode" value="0331" <c:if test ="${result.divisionCode eq '0331' } "/>> 제작관리 </label>
	                                                <label for="ck2" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="faqId2" name="divisionCode" value="0333" <c:if test ="${result.divisionCode eq '0333' } "/>> 홈페이지 </label>
	                                            </td>
	                                        </tr>                                    	
	                                    	</c:when>
	                                    	<c:when test="${params.divisionCode eq 0401 }">
											<tr>
	                                            <th>보도자료 종류</th>
	                                            <td>
	                                                <label for="ck1" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="newsId1" name="divisionCode" value="0321" <c:if test ="${result.divisionCode eq '0321' } "/>> 자동차 관리 요령</label>
	                                                <label for="ck2" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="newsId2" name="divisionCode" value="0322" <c:if test ="${result.divisionCode eq '0322' } "/>> 자동차 정보상식 </label>
	                                                <label for="ck2" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="newsId3" name="divisionCode" value="0323" <c:if test ="${result.divisionCode eq '0323' } "/>> 자동차 뉴스 </label>
	                                            </td>
	                                        </tr>    	                                    	
	                                    	</c:when>
	                                    	<c:otherwise>
	                                    	
	                                    	</c:otherwise>
                                        </c:choose>
                                        <tr>
                                            <th>공개여부</th>
                                            <td>
                                                <label for="ck1" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="isOpen1" name="isOpen" value="Y" <c:if test="${result.isOpen != 'N' }">checked</c:if>> 공개 </label>
                                                <label for="ck2" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="isOpen2" name="isOpen" value="N" <c:if test="${result.isOpen == 'N' }">checked</c:if>> 비공개 </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>제목</th>
                                            <td><input type="text" class="uk-input" id="title" name="title" value="<c:out value="${result.title }" />"> </td>
                                        </tr>                   
                                        <tr>
                                            <th>내용</th>
                                            <td><textarea class="uk-textarea" rows="12" id="contents" name="contents"><c:out value="${result.contents }" /></textarea></td>
                                        </tr>
                                        <tr>
                                            <th>첨부</th>
                                            <td>
                                            	<!-- fileDiv -->
                                                <div class="uk-margin flie" uk-margin>
                                                    <div uk-form-custom="target: true">
                                                        <input type="file" id="uploadfileList" name="uploadfiles" multiple>
                                                        <input  class="uk-input" type="text" placeholder="이곳를 클릭하여 파일을 첨부하세요." disabled>
                                                        <button class="uk-button uk-button-default" type="file" id="uploadBtn">찾아보기</button>
                                                    </div>
                                                    
                                                <!-- 등록할 시, 나타나는 코드 -->
                                                <ul class="flie-list" id="fileList_add">
                                                		<!-- 파일이름 -->	
                                                </ul>
                                                
                                                <c:forEach items="${fileList }" var="file" varStatus="status">
	                                            <ul class="flie-list" id="fileList_${file.fileId}">
														<c:out value="${file.attachmentOriginal }" /> 
														<a href="#" onClick="$mpNtt.event.deleteFile(${file.fileId}, 'CONTENTS');">[X]</a>
                                                </ul>
                                                </c:forEach>
                                                </div>
                                                <!-- 내가 수정을 눌렀을 때 이 액션이 나온다 -->
                                            </td>
                                        </tr> 
                                    </tbody>
                                </table>
								</form>
								
                                <div class="uk-text-center">
                                	<c:choose>
                                	<c:when test="${empty result.contentsId }">
                                    	<button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="registBtn">등록</button>
                                    	<button type="button" class="uk-button uk-button-default" id="cancelBtn">취소</button>
                                    </c:when>
                                    <c:otherwise>
                                        <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="registBtn">수정</button>
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