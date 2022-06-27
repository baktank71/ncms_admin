<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath }"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript" src="${contextPath}/cmmn/jquery-ui-1.9.2/js/jquery-1.8.3.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/jqGrid-master/js/i18n/grid.locale-kr.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/jquery-ui-1.9.2/js/jquery-ui-1.9.2.custom.js"></script>
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/jquery-ui-1.9.2/css/base/jquery-ui-1.9.2.custom.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/jquery.jqGrid-3.6.5/css/ui.jqgrid.css">
<%--  <script type="text/javascript" src="${contextPath}/jquery.jqGrid-3.6.5/js/jquery.jqGrid.min.js"></script>--%>
  <script type="text/javascript" src="${contextPath}/cmmn/jqGrid-master/js/jquery.jqGrid.js"></script>

  <script type="text/javascript" src="${contextPath}/js/cmmn/commonUtil.js"></script>
  <script type="text/javascript" src="${contextPath}/js/cmmn/test.js"></script>
<title>Insert title here</title>
</head>
<script type="text/javascript">
var contextPath = '<%=request.getContextPath()%>';


</script>
<body>
	<div class="sideList"> 
			<a href="javascript:void(0)" id="btnList">
				<img src="${contextPath}/images/ico/ico_sideList01.png" />
				<span>목록으로</span>
			</a>
			<%-- <a href="javascript:void(0)" id="btnSave">
				<img src="${contextPath}/images/ico/ico_sideList05.png" />
				<span>저장하기</span>
			</a>  --%>
			<a href="javascript:void(0)" id="btnMod">
				<img src="${contextPath}/images/ico/ico_sideList06.png" />
				<span>수정하기</span>
			</a>
			<a href="javascript:void(0)" id="btnDel">
				<img src="${contextPath}/images/ico/ico_sideList07.png" />
				<span>삭제하기</span>
			</a>
			 
	<%--	
			<a href="javascript:void(0)" id="btnPrint">
				<img src="${contextPath}/images/ico/ico_sideList09.png" />
				<span>출력하기</span>
			</a>
	--%>
 	</div> 

	<div>
		<form action="" method="POST"  name="from1" id="from1">
			번호:<input type="text" name="no" id="no"  value="${result.no }">
			제목:<input type="text" name="title" id="title" value="${result.title }">
			제목:<input type="text" name=""content"" id="content" value="${result.content }">
		</form>
	</div>
</body>
</html>