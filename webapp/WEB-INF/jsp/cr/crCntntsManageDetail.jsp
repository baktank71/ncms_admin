<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crCntntsManage.js"></script> 

<form id="searchFrm" name="searchFrm">
	<input type="hidden" name="contentsId" id="contentsId" value="${result.contentsId }" />
	<input type="hidden" name="divisionCode" id="divisionCode" value="${result.divisionCode }" />
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
                    <h3>컨텐츠 상세보기</h3> 
                    <div class="uk-child-width-1-1">
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <div class="board-view">
                                    <div class="subject">${result.title}</div>
                                    <div class="subject">${result.titleDc}</div>
                                    <div class="info">
                                        <dl>               
                                            <dt>메뉴ID</dt>
                                            <dd>${result.jbsource}</dd>     
                                            <dt>SNS공유여부</dt>
                                            <c:if test="${result.isOpen == 'Y'}">
                                            	<dd>허용</dd>
                                            </c:if>
                                            <c:if test="${result.isOpen == 'N'}">
                                            	<dd>제외</dd>
                                            </c:if>
                                            <dt>&nbsp;</dt>
                                            <dd>&nbsp;</dd>
                                        </dl>
                                    </div>
                                    <div class="substance">
                                    	<c:out value="${result.contents }" escapeXml="false" />
                                    </div>
                                </div>
                                
                                <div class="uk-text-center  uk-margin-small-top">
                                    <button type="button" class="uk-button uk-button-default uk-margin-small-right" id="popViewBtn">미리보기</button>
                                    <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="enrollBtn">수정</button>
                                    <!-- <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="deleteBtn">삭제</button> -->
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