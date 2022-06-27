<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<script type="text/javascript" src="${contextPath}/js/cr/crNttManage.js"></script> 


<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
			<div class="uk-section-small">
				<div class="uk-container uk-container-large">
					<c:choose>
						<c:when test="${empty result.contentsId }">
							<h3>게시물 등록</h3>
						</c:when>
						<c:otherwise>
							<h3>게시물 수정</h3>
						</c:otherwise>
					</c:choose>
					<form id="searchFrm" method="post">
						<input type="hidden" name="isOpen" id="isOpen" value="${params.isOpen }" /> 
						<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" /> 
						<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" /> 
						<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" /> 
						<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
						<input type="hidden" name="currentPageNo" id="currentPageNo" value="${params.currentPageNo }" />
					</form>

					<form id="insertForm" name="insertForm" method="post" onsubmit="return false;">
						<input type="hidden" name="seq" id="seq" value="${params.seq}" />
						<input type="hidden" name="userNm" id="loginName"
							value='<%=request.getSession().getAttribute("userNm") %>' /> 
						<input type="hidden" name="userId" id="loginId" 
							value='<%=request.getSession().getAttribute("userId") %>' />

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
												<th>집계여부</th>
												<td>
													<label for="isOpen1" class="uk-margin-medium-right">
														<input class="uk-radio" type="radio" id="isOpen1" name="isOpen" value="Y" <c:if test="${result.isOpen != 'N' }">checked</c:if>>
													사용 </label> 
													<label for="isOpen2" class="uk-margin-medium-right">
														<input class="uk-radio" type="radio" id="isOpen2" name="isOpen" value="N" <c:if test="${result.isOpen == 'N' }">checked</c:if>>
													해제 </label>
												</td>
											</tr>
											<tr>
												<th>메뉴명</th>
												<td><input type="text" class="uk-input" id="menuNm" name="menuNm" value="<c:out value="${result.menuNm }" />">
												</td>
											</tr>
											<tr>
												<th>URL</th>
												<td><input type="text" class="uk-input" id="menuUrl"
													name="menuUrl" value="<c:out value="${result.menuUrl }" />">
												</td>
											</tr>
										</tbody>
									</table>
					</form>

					<div class="uk-text-center">
						<c:choose>
							<c:when test="${empty result.contentsId }">
								<button type="button"
									class="uk-button uk-button-primary uk-margin-small-right"
									id="registBtn">등록</button>
								<button type="button" class="uk-button uk-button-default"
									id="cancelBtn">취소</button>
							</c:when>
							<c:otherwise>
								<button type="button"
									class="uk-button uk-button-primary uk-margin-small-right"
									id="registBtn">수정</button>
								<button type="button"
									class="uk-button uk-button-default uk-margin-small-right"
									id="returnBtn" onclick="history.go(-1)">취소</button>
								<button type="button" class="uk-button uk-button-default"
									id="cancelBtn">목록</button>
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