<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/crNttManageRcInfo.js"></script> 

<form id="searchFrm" name="searchFrm">
	<input type="hidden" name="ctype" id="ctype" value="${params.ctype }" />
	<input type="hidden" name="recallId" id="recallId" value="${result.boardId }" />
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
                    <h3>게시물 상세보기</h3>
                    <div class="uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-card uk-card-default uk-card-body">
                                <div class="board-view">
                                    <div class="subject"><c:choose><c:when test="${result.isOpen == 'N'}"><i uk-icon="icon: lock;" class="lock" title="비공개" ></i></c:when>
									<c:otherwise><i uk-icon="icon: unlock;" class="unlock" title="공개" ></i></c:otherwise></c:choose>
									${result.title}</div>
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
													<a href="javascript:void(0);" onClick="javascript:fileDownload(${file.fileId}, 'const_board')"> ${file.attachmentOriginal } </a>
												</c:forEach>
											</dd>
                                        </dl>
                                    </div>
                                    <div class="substance">
                                    			${result.contents }
                                    </div>
                                </div>

                                <dl class="board-bottom">
                                    <dt>이전글</dt>
                                    <dd>
                                    	<c:choose>
                                    		<c:when test="${not empty pre }">
                                    			<a href="#" onclick="$rcInfo.event.detailView('${pre.boardId }','1001','C'); return false;">
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
                                    			<a href="#" onclick="$rcInfo.event.detailView('${next.boardId }','1001','C'); return false;" >
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
	                                <div class="uk-text-left">
	                                <c:choose>
	                                 <c:when test="${result.isOpen == 'N' }">
	                                     <button type="button" class="uk-button uk-button-default" id="isOpenY" onclick="$rcInfo.event.isOpenOne('Y')">공개</button>
	                                 </c:when>
	                                 <c:otherwise>
	                                     <button type="button" class="uk-button uk-button-default" id="isOpenN" onclick="$rcInfo.event.isOpenOne('N')">비공개</button>
	                                 </c:otherwise>
	                                </c:choose>
	                                <c:choose>
	                                 <c:when test="${result.snsOpen == 'N' }">
	                                     <button type="button" class="uk-button uk-button-default" id="snsOpenY" onclick="$rcInfo.event.snsOpenOne('Y')">SNS허용</button>
	                                 </c:when>
	                                 <c:otherwise>
	                                     <button type="button" class="uk-button uk-button-default" id="snsOpenN" onclick="$rcInfo.event.snsOpenOne('N')">SNS제외</button>
	                                 </c:otherwise>
	                                </c:choose>
	                                </div>
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