<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- <ti les:importAttribute name="sessId" /> -->
<!DOCTYPE HTML>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>테스트</title>

  <link rel="stylesheet" type="text/css" href="${contextPath }/cmmn/ax5/css/ax5ui.all.css">
  <script type="text/javascript" src="${contextPath }/cmmn/ax5/js/ax5ui.all.min.js"></script>

	<script type="text/javascript" src="${contextPath }/js/cmmn/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="${contextPath }/js/cmmn/jquery.bpopup.min.js"></script>
	<script type="text/javascript" src="${contextPath }/js/cmmn/common.js"></script>
	
	<script type="text/javascript">
		$(document).ready(function(){
			
		});
	</script>
</head>

<body id="page-top">
	<!-- <ti les:insertAttribute name="header" /> -->
	<tiles:insertAttribute name="body" />
	<!-- <ti les:insertAttribute name="footer" /> -->
</body>
</html>