<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- SmartEditor를 사용하기 위해서 다음 js파일을 추가 (경로 확인) -->
<script type="text/javascript" src="${contextPath}/ext/SE2/js/service/HuskyEZCreator.js" charset="utf-8"></script>

<script type="text/javascript" src="${contextPath}/js/cr/crCntntsManage.js"></script> 


<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>컨텐츠 등록</h3>
                    
                    <form id="searchFrm" method="post">
						<input type="hidden" name="currentPageNo" id="currentPageNo" value="${params.currentPageNo}"/>
                    	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
                    	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
                    	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
                    	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
                    </form>
                    
                    <form id="insertForm" name="insertForm" method="post" onsubmit="return false;" enctype="multipart/form-data">
	                    <input type="hidden" name="divisionCode" id="divisionCode" value="${params.divisionCode }" />
	                    <input type="hidden" name="contentsId" id="contentsId" value="${params.contentsId }" />
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
                                            <th>메뉴ID</th>
                                            <td>
                                            	<input type="text" class="uk-input" id="jbsource" name="jbsource" value="<c:out value="${result.jbsource }" />">
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>SNS공유여부</th>
                                            <td>
                                                <label for="isOpen1" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="isOpen1" name="isOpen" value="Y" <c:if test="${result.isOpen != 'N' }">checked</c:if>/> 허용 </label>
                                                <label for="isOpen2" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="isOpen2" name="isOpen" value="N" <c:if test="${result.isOpen == 'N' }">checked</c:if>/> 제외 </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>메뉴명</th>
                                            <td><input type="text" class="uk-input" id="title" name="title" value="<c:out value="${result.title }" />"> </td>
                                        </tr>   
                                        <tr>
                                            <th>메뉴소개</th>
                                            <td><input type="text" class="uk-input" id="titleDc" name="titleDc" value="<c:out value="${result.titleDc }" />"> </td>
                                        </tr>                 
                                        <%-- <tr>
                                            <th>내용</th>
                                            <td><textarea class="uk-textarea" rows="12" id="textAreaContents" name="contents"><c:out value="${result.contents }" /></textarea></td>
                                        </tr> --%>                 
                                        <tr>
                                            <th>내용</th>
											<td><textarea class="uk-textarea" rows="12" id="contents" name="contents" ><c:out value="${result.contents }" /></textarea></td>
                                            <%-- <td><textarea id="contents" name="contents"><c:out value="${result.contents }" /></textarea></td> --%>
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