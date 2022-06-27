<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath" value="${pageContext.request.contextPath }"/>

<!DOCTYPE HTML>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>자동차리콜센터</title>
	<meta name="title" content="자동차리콜센터" />
	<meta name="author" content="자동차리콜센터" />
	<meta name="keywords" content="자동차리콜센터" />
	<link href="${contextPath}/css/font.css" rel="stylesheet" type="text/css" />
	<link href="${contextPath}/css/uikit.css" rel="stylesheet" type="text/css" />
	<link href="${contextPath}/css/style_hp.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="/js/cmmn/uikit.min.js"></script>
	<script type="text/javascript" src="/js/cmmn/uikit-icons.min.js"></script>
	<link rel="shortcut icon" href="${contextPath}/images/hp/favicon.ico" type="image/x-icon" />
</head>

<body>
	
	<tiles:insertAttribute name="body" />
	
</body> 
</html>