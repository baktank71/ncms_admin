<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath}/js/cr/recallNtcnManage.js"></script> 

<form id="searchFrm" name="searchFrm">
	<input type="hidden" name="searchId" id="searchId" value="${params.searchId }" />
	<input type="hidden" name="searchStr" id="searchStr" value="${params.searchStr }" />
	<input type="hidden" name="searchFromDate" id="searchFromDate" value="${params.searchFromDate }" />
	<input type="hidden" name="searchToDate" id="searchToDate" value="${params.searchToDate }" />
	<input type="hidden" name="subscribeNo" id="subscribeNo" value="${params.subscribeNo }" />
</form>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>리콜알리미 상세보기</h3>
                    <div class="uk-card uk-card-default uk-card-body">
						<h4>▶ 신청인 정보</h4>
                        <table class="uk-table uk-table-divider table-stat">
                            <caption>신청인</caption>
                            <colgroup>
                                <col style="width: 10%;">
                                <col style="width: 20%;">
                                <col style="width: 10%;">
                                <col style="width: 20%;">
                                <col style="width: 10%;">
                                <col style="width: 20%;">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>신청인</th>
                                    <td>${result.subscribeName}</td>
                                    <th>이메일</th>
                                    <td>${result.subscribeEmail}</td>
                                    <th>신청일자</th>
                                    <td>${result.writeTime}</td>
                                </tr>
                                <tr>
                                    <th>휴대폰번호</th>
                                    <td>${result.subscribeCellular}</td>
                                    <th>신청인 주민번호</th>
                                    <td>${result.residentId}
                                    	<input type="hidden" id="residentId" value="${result.residentId}" />
                                    </td>
                                    <th>전화번호</th>
                                    <td>${result.subscribeTelephone}</td>
                                </tr>
                                <tr>
                                    <th>차량번호</th>
                                    <td>${result.vehicleNumber}</td>
                                    <th>소유자명</th>
                                    <td>${result.ownerName}</td>
                                    <th>소유자 주민번호</th>
                                    <td>${result.ownerResidentId}</td>
                                </tr>
                                <tr>
                                    <th>해지여부</th>
                                    <td colspan="5">${result.delFlag}</td>
                                    <%-- <th>이벤트당첨여부</th>
                                    <td colspan="3">${result.eventWinFlag}</td> --%>
                                </tr>                                        
                            </tbody>
                        </table>
                        
                        <h4>▶ 자동차 정보</h4>
                        <table class="uk-table uk-table-divider table-stat">
                            <caption>신청인</caption>
                            <colgroup>
                                <col style="width: 8%;">
                                <col style="width: 17%;">
                                <col style="width: 11%;">
                                <col style="width: 19%;">
                                <col style="width: 8%;">
                                <col style="width: 15%;">
                                <col style="width: 8%;">
                                <col style="width: 14%;">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>차명</th>
                                    <td>${result.productName}</td>
                                    <th>차대번호</th>
                                    <td>${result.vehicleIdNumber}</td>
                                    <th>등록일자</th>
                                    <td>${result.registrationDate}</td>
                                    <th>배기량</th>
                                    <td>${result.baegi}</td>
                                </tr>
                                <tr>
                                    <th>형식</th>
                                    <td>${result.carType}</td>
                                    <th>제원관리번호</th>
                                    <td>${result.formOkno}</td>
                                    <th>모델년도</th>
                                    <td>${result.yearType}</td>
                                    <td colspan="2">&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>변속기</th>
                                    <td>${result.transType}</td>
                                    <th>엔진타입</th>
                                    <td>${result.engineType}</td>
                                    <th>사용연료</th>
                                    <td>${result.fuelCode}</td>
                                    <th>기통수</th>
                                    <td>${result.engCyl}</td>
                                </tr>
                            </tbody>
                        </table>

                                <div class="uk-text-center">
                                    <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="applicationBtn">해지신청 저장</button>
                                    <button type="button" class="uk-button uk-button-primary uk-margin-small-right" id="pswResetBtn">패스워드 초기화</button>
                                	<button type="button" class="uk-button uk-button-default" id="listBtn">목록</button>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>		
	</section>
</article>