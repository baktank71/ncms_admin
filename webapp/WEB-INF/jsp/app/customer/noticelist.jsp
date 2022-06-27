<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<% pageContext.setAttribute("newLineChar", "\n"); %>
<script type="text/javascript">
	$(document).ready(function(){
		$(".board_row").click(function(){
			if($(this).find(".b_body").css("display") == "block"){
				$(this).removeClass("on");
			}else{
				$(this).addClass("on");
			}
		});
	});
</script>
        <div id="header">
            <div class="header_box">
                <div class="header_top">
                    <span class="header_left"><a href="javascript:goBack();" class="btn_back"></a></span>
                    <span class="header_title">공지사항</span>
                    <span class="header_right"></span>
                </div>
            </div>
        </div>
        <div id="container">
            <div class="content_sub">
                <div class="board1">
                    <ul>
					<c:forEach var="row" items="${list}" varStatus="status">
                        <li class="board_row"><a>
                            <div class="b_head">
                                <span class="title">${row.title }</span>
                                <span class="title_info"><sub>운영자</sub><sub>${row.reg_date }</sub></span>
                            </div>
                            <div class="b_body">
                                <span class="text">${fn:replace(row.contents, newLineChar, "<br/>") }</span>
                            </div>
                        </a></li>
					</c:forEach>                        
					<c:if test="${paginationInfo.totalRecordCount == 0 }">
                        <li>등록된 게시물이 없습니다.</li>		
					</c:if>
                    </ul>
                </div>
            </div>
        </div>