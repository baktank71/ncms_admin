<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManageRg.js"></script> 

<form id="searchFrm" name="searchFrm" method="post">
	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
   	<input type="hidden" name="searchOpenYn" id="searchOpenYn" value="${params.searchOpenYn }" />
	<input type="hidden" name="contentsId" id="contentsId" value="${params.contentsId }" />
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
                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <div class="board-view">
                                    <div class="subject">${result.title}</div>
                                    <div class="info">
                                        <dl>                    
                                            <dt>공개여부</dt>
                                            <dd><c:choose><c:when test="${result.isOpen == 'Y'}">공개</c:when>
	                                            <c:otherwise>비공개</c:otherwise></c:choose>
                                            </dd>
                                            <dt>작성일</dt>
                                            <dd>${result.writeTime}</dd>
                                            <dt>&nbsp;</dt>
                                            <dd>&nbsp;</dd>
                                        </dl>
                                    </div>
                                    <div class="info">
                                        <dl>                    
                                            <dt>대표
                                            	<c:choose><c:when test="${result.jbsource != '2'}">동영상</c:when>
	                                            <c:otherwise>이미지</c:otherwise></c:choose>
                                            </dt>
                                            <dd style="width:87%;">${result.titleDc}</dd>
                                        </dl>
                                    </div>
                                    <div class="substance">
                                    			${result.contents }
                                    </div>
                                </div>

                                <dl class="board-bottom">
                                    <!-- <dt>첨부파일<br/></dt> -->
									<dd class="file">
										<c:forEach items="${fileList }" var="file" varStatus="status">
											<a href="#" onClick="javascript:fileDownload(${file.fileId}, 'CONTENTS'); return false;"> ${file.attachmentOriginal } </a>
											<c:if test="${!status.last}"><br/></c:if>
										</c:forEach>
									</dd>
                                </dl>

                                <div class="uk-text-center">
                                    <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="modifyBtn" onclick="$crNttRg.event.goModify()">수정</button>
                                    <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="deleteBtn" onclick="$crNttRg.event.goDelete()">삭제</button>
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