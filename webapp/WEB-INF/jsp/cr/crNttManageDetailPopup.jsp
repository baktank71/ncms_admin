<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManagePop.js"></script> 

<form id="searchFrm" name="searchFrm" method="post">
    <input type="hidden" name="searchUseYn" id="searchUseYn" value="${params.searchUseYn }" />
	<input type="hidden" name="currentPageNo" id="currentPageNo" value="${params.currentPageNo}"/>
	<input type="hidden" name="bannerId" id="bannerId" value="${params.bannerId }" />
	<input type="hidden" name="divisionCode" id="divisionCode" value="${params.divisionCode }" />
</form>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>게시물 상세보기</h3>
                    <div class="uk-card uk-card-default uk-card-body">
						<!-- <h4>팝업존</h4> -->
                        <div class="board-view">
	                        <table class="uk-table uk-table-divider table-stat">
	                            <caption>팝업존</caption>
	                            <colgroup>
	                                <col style="width: 15%;">
	                                <col style="width: 35%;">
	                                <col style="width: 15%;">
	                                <col style="width: 35%;">
	                            </colgroup>
	                            <tbody class="uk-text-left">
	                                <tr>
	                                    <th>배너제목</th>
	                                    <td colspan="3">${result.bannerTitle}</td>
	                                </tr>
	                                <tr>
	                                    <th>사용여부</th>
	                                    <td>
	                                    	<c:if test="${result.bannerUse == 'Y'}">사용</c:if>
                                            <c:if test="${result.bannerUse == 'N'}">미사용</c:if>
                                        </td>
	                                    <th>표시순위</th>
	                                    <td>${result.bannerSort}</td>
	                                </tr>   
	                                <tr>
	                                    <th>기간설정</th>
	                                    <td colspan="3">
	                                    	<c:choose><c:when test="${result.bannerPeriod eq 'N'}">
		                	               		 기간제한없음
		                	                </c:when><c:otherwise>
		                	                	<c:out value="${result.bannerStartDate}"/> ~ <c:out value="${result.bannerEndDate}"/>
		                	                </c:otherwise></c:choose>
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <th>배너링크URL</th>
	                                    <td colspan="3">${result.bannerLinkUrl}</td>
	                                </tr>
	                                <tr>
	                                    <th>배너링크타겟</th>
	                                    <td colspan="3">
	                                    	<c:choose>
                                            	<c:when test="${result.bannerLinkTarget eq '1'}">새창</c:when>
                                            	<c:otherwise>현재창</c:otherwise>
                                           	</c:choose>
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <th>배너이미지</th>
	                                    <td colspan="3">
	                                    	<img src="${contextPath}/${result.bannerImage }" alt="배너이미지" style="width: 373px; height: 210px; display: block;"/>
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <th>내용</th>
	                                    <td colspan="3">${result.bannerContents}</td>
	                                </tr>
	                            </tbody>
	                        </table>
	                    </div>    

                        <div class="uk-margin-small-top uk-text-center">
                            <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="modifyBtn" onclick="$crNttPop.event.goModify(<c:out value="${result.bannerId }" />)">수정</button>
                            <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="deleteBtn" onclick="$crNttPop.event.goDelete(<c:out value="${result.bannerId }" />)">삭제</button>
                            <button type="button" class="uk-button uk-button-default" id="cancelBtn">목록</button>          
                        </div>
                    </div>
                </div>
            </div>
        </div>		
	</section>
</article>