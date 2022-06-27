<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script type="text/javascript">
	function goList( tp ){
		location.href="list.do?tp="+tp;
	}
</script>
        <div id="header">
            <div class="header_box">
                <div class="header_top">
                    <span class="header_left"><a href="javascript:goBack();" class="btn_back"></a></span>
                    <span class="header_title">적립내역</span>
                    <span class="header_right"></span>
                </div>
                <div class="header_tab">
                    <ul>
                        <li id="li_day" <c:if test="${tp eq 'day' }">class="on"</c:if>><a href="javascript:goList( 'day' );">일간</a></li>
                        <li id="li_week" <c:if test="${tp eq 'week' }">class="on"</c:if>><a href="javascript:goList( 'week' );">주간</a></li>
                        <li id="li_month" <c:if test="${tp eq 'month' }">class="on"</c:if>><a href="javascript:goList( 'month' );">월간</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div id="container">
            <div class="content_sub_tab">
                <div class="board2">
                    <table>
                        <colgroup>
                            <col width="26%" />
                            <col width="37%" />
                            <col width="37%" />                            
                        </colgroup>
                        <tr>                           
                            <th>구분</th>
                            <th>예정 마일리지</th>
                            <th>확정 마일리지</th>
                        </tr>
                    <c:set var="totM" value="0" />
                    <c:set var="decideM" value="0" />
					<c:forEach var="row" items="${list}" varStatus="status">
                        <tr>
                            <td>${row.title }</td>
                            <td><fmt:formatNumber value="${row.mileage }" pattern="#,###" /></td>
                            <td><fmt:formatNumber value="${row.decide_mileage }" pattern="#,###" /></td>
                        </tr>
                        <c:set var="totM" value="${totM + row.mileage }" />
                    	<c:set var="decideM" value="${decideM + row.decide_mileage }" />
                    </c:forEach>

                        <tfoot>
                            <tr>
                                <td>합계</td>
                                <td><fmt:formatNumber value="${totM }" pattern="#,###" /></td>
                                <td><fmt:formatNumber value="${decideM }" pattern="#,###" /></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>


    