<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManageRcInfo.js"></script> 

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>게시물 등록</h3>
                    
                    <form id="searchFrm" method="post">
                    	<input type="hidden" name="searchUseYn" id="searchUseYn" value="${params.searchUseYn }" />
						<input type="hidden" name="currentPageNo" id="currentPageNo" value="${params.currentPageNo}"/>
                    </form>
                    
                    <form id="insertForm" name="insertForm" method="post" onsubmit="return false;" enctype="multipart/form-data">
	                    <input type="hidden" name="divisionCode" id="divisionCode" value="${params.divisionCode }" />
	                    <input type="hidden" name="bannerId" id="bannerId" value="${params.bannerId }" />
	                    <input type="hidden" name="bannerType" id="bannerType" value="P" />
                    
                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <table class="uk-table uk-table-divider board-write">
                                    <caption>팝업존 등록/수정</caption>
                                    <colgroup>
                                        <col class="rowsize-th">
                                        <col class="rowsize-td">
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <th>제목</th>
                                            <td><input type="text" class="uk-input reqed" id="bannerTitle" name="bannerTitle" title="제목" value="<c:out value="${result.bannerTitle }" />"> </td>
                                        </tr>   
                                        <tr>
                                            <th>사용여부</th>
                                            <td>
                                                <label for="bannerUse1" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="bannerUse1" name="bannerUse" value="Y" <c:if test="${result.bannerUse != 'N' }">checked</c:if>/> 사용 </label>
                                                <label for="bannerUse2" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="bannerUse2" name="bannerUse" value="N" <c:if test="${result.bannerUse == 'N' }">checked</c:if>/> 미사용 </label>
                                            </td>
                                        </tr>     
                                        <tr>
                                            <th>표시순위</th>
                                            <td>
												<select id="bannerSort" name="bannerSort" class="uk-select w-100">
													<option value="0" <c:if test="${'0' == result.bannerSort}">selected="selected"</c:if>>0</option>
													<option value="1" <c:if test="${null == result.bannerSort || '1' == result.bannerSort}">selected="selected"</c:if>>1</option>
												<c:forEach var="item" varStatus="i" begin="2" end="5" step="1">
													<option value="${item}" <c:if test="${item == result.bannerSort}">selected="selected"</c:if>>${item}</option>
												</c:forEach>
												</select>
											</td>
                                        </tr>  
                                        <tr>
                                            <th>기간설정</th>
                                            <td>
                                                <label for="bannerPeriod1" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="bannerPeriod1" name="bannerPeriod" value="N" <c:if test="${result.bannerPeriod != 'Y' }">checked</c:if>/> 기간제한없음</label>
                                                <label for="bannerPeriod2" class="uk-margin-medium-right"><input class="uk-radio" type="radio" id="bannerPeriod2" name="bannerPeriod" value="Y" <c:if test="${result.bannerPeriod == 'Y' }">checked</c:if>/> 기간설정</label>
												<input type="text" class="uk-input w-100 ndate" id="bannerStartDate" title="기간시작일" maxLength="10" value="<c:out value="${result.bannerStartDate eq null ? strToday : result.bannerStartDate}" />">
		                                        <input type="text" class="uk-input" style="width:40px;" id="bannerStartHour" maxLength="2" value="<c:out value="${result.bannerStartHour eq null ? '00' : result.bannerStartHour }" />">
		                                        :<input type="text" class="uk-input" style="width:40px;" id="bannerStartMinute" maxLength="2" value="<c:out value="${result.bannerStartMinute eq null ? '00' : result.bannerStartMinute }" />">
		                                        ~
		                                        <input type="text" class="uk-input w-100 ndate" id="bannerEndDate" title="기간종료일" maxLength="10" value="<c:out value="${result.bannerEndDate eq null ? strToday : result.bannerEndDate }" />">
		                                        <input type="text" class="uk-input" style="width:40px;" id="bannerEndHour" maxLength="2" value="<c:out value="${result.bannerEndHour eq null ? '23' : result.bannerEndHour }" />">
		                                        :<input type="text" class="uk-input" style="width:40px;" id="bannerEndMinute" maxLength="2" value="<c:out value="${result.bannerEndMinute eq null ? '59' : result.bannerEndMinute }" />">
                                            </td>
                                        </tr>   
                                        <tr>
                                            <th>링크URL</th>
                                            <td><input type="text" class="uk-input reqed" style="width:85%;" id="bannerLinkUrl" name="bannerLinkUrl" title="링크URL" value="<c:out value="${result.bannerLinkUrl }" />">
                                                <!-- <button class="uk-button uk-button-default" type="button" id="srchUrlBtn">찾아보기</button> --> 
                                            </td>
                                        </tr>    
                                        <tr>
                                            <th>링크타켓</th>
                                            <td>
                                            	<select id="bannerLinkTarget" name="bannerLinkTarget" class="uk-select w-100">
		                                            <option value="1" <c:if test="${result.bannerLinkTarget != '2' }">selected</c:if>>새창</option>
		                                            <option value="2" <c:if test="${result.bannerLinkTarget == '2' }">selected</c:if>>현재창</option>
		                                        </select>
		                                    </td>
                                        </tr>   
                                        <tr>
                                            <th>배너이미지</th>
                                            <td>
                                                <div class="uk-margin flie" uk-margin>
                                                    <div uk-form-custom="target: true">
                                                        <input type="file" id="uploadfiles" name="uploadfiles">
                                                        <input class="uk-input" type="text" placeholder="이미지사이즈 : 373*210" disabled>
                                                        <button class="uk-button uk-button-default" type="file">찾아보기</button>
                                                    </div>                                                    
                                                    <!-- <button class="uk-button uk-button-default btn-add" id="fileAdd"><span uk-icon="icon: plus; ratio: 0.8"></span>추가</button> -->

													<c:if test="${result.bannerImage != null}" >
		                                                <ul class="flie-list" id="fileList_">
															<c:out value="${result.bannerImage }" />
		                                                </ul>
													</c:if>
                                                </div>
                                                <!-- 파일 -->
                                            </td>
                                        </tr>         
                                        <tr>
                                            <th>배너내용</th>
                                            <td><textarea class="uk-textarea" rows="4" id="textAreaContents" name="bannerContents"><c:out value="${result.bannerContents }" /></textarea>
                                            	<span>*내용은 이미지 alt에 출력됩니다. 내용이 없을 경우 alt는 제목으로 대체됩니다.</span>
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