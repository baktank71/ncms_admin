<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath }/js/om/editprofile.js"></script>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>개인정보변경</h3>
                    <div class="uk-card uk-card-default uk-card-body uk-child-width-1-1">
                    <form id="loginFrm" name="loginFrm" method="POST">
                    	<input type="hidden" name="userId" id="userId" value="${mbId }" />
                    	<input type="hidden" name="userNm" id="userNm" value="${mbNm }" />
                    <table class="uk-table uk-table-divider table-form"> 
                            <caption>개인정보변경 입력 폼</caption>
                            <colgroup>
                                <col class="th">
                                <col class="td">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th class="th">사용자 ID</th>
                                    <td class="td">
                                        <span>${mbId }</span>		<!-- 로그인한 아이디 -->
                                    </td>
                                </tr>
                                <tr>
                                    <th class="th">사용자명</th>
                                    <td class="td">
                                     	<span>${mbNm }</span>		<!-- 로그인한 사람의 성명 -->
                                    </td>
                                </tr>
                                <tr>
                                    <th class="th">기존 비밀번호 확인</th>
                                    <td class="td">
                                    	<input class="uk-input uk-form-width-medium" type="password" id="mbPw" name="mbPw">
                                    </td>
                                </tr>
                                <tr>
                                    <th class="th">새 비밀번호</th>
                                    <td class="td">
                                    	<input class="uk-input uk-form-width-medium" type="password" id="mbPwNew" name="mbPwNew">
                                    </td>
                                </tr>
                                <tr>
                                    <th class="th">새 비밀번호 확인</th>
                                    <td class="td">
                                    	<input class="uk-input uk-form-width-medium" type="password" id="mbPwConfirm" name="mbPwConfirm">
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="uk-text-center btn-submit-group">
                            <button type="button" class="uk-button uk-button-large uk-button-primary uk-margin-small-right" id="updateProfile">저장</button>
                            <button type="button" class="uk-button uk-button-large uk-button-default" id="cancelBtn">취소</button>               
                        </div>
                     </form>
                     </div>
                </div>
            </div>
        </div>		
	</section>
</article>