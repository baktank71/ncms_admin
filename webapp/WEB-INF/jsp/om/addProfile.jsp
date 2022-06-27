<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="${contextPath }/js/om/addprofile.js"></script>

<article>
	<h2 class="skip">컨텐츠</h2>
	<section>
		<div class="content-padder">
            <div class="uk-section-small">
                <div class="uk-container uk-container-large">
                    <h3>회원정보</h3>
                    <div class="uk-card uk-card-default uk-card-body uk-child-width-1-1">
                    <form id="loginFrm" name="loginFrm" method="POST">
                    <table class="uk-table uk-table-divider table-form"> 
                            <caption>회원 정보 </caption>
                            <colgroup>
                                <col class="th">
                                <col class="td">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th class="th">사용자 ID</th>
                                    <td class="td">
                                        <input class="uk-input uk-form-width-medium" type="text" id="mbId" name="mbId">
                                    </td>
                                </tr>
                                <tr>
                                    <th class="th">사용자명</th>
                                    <td class="td">
                                     	<input class="uk-input uk-form-width-medium" type="text" id="mbNm" name="mbNm">
                                    </td>
                                </tr>
                                <tr>
                                    <th class="th">비밀번호</th>
                                    <td class="td">
                                    	<input class="uk-input uk-form-width-medium" type="password" id="mbPw" name="mbPw">
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="uk-text-center btn-submit-group">
                            <button type="button" class="uk-button uk-button-large uk-button-primary uk-margin-small-right" id="addProfile">저장</button>
                            <button type="button" class="uk-button uk-button-large uk-button-default" id="cancelBtn">취소</button>               
                        </div>
                     </form>
                     </div>
                </div>
            </div>
        </div>		
	</section>
</article>