<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="title" content="자동차리콜센터 관리자시스템"/>
  <meta name="author" content="자동차리콜센터 관리자시스템"/>
  <meta name="keywords" content="자동차리콜센터 관리자시스템"/>

  <title>자동차리콜센터 관리자시스템</title>

  <link href="${contextPath}/css/all.css" rel="stylesheet" type="text/css" />
  <link rel="shortcut icon" href="${contextPath}/images/favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" type="text/css" href="${contextPath }/cmmn/ax5/css/ax5ui.all.css">

  <script src="${contextPath}/cmmn/jquery/jquery-1.9.1.js"></script>
  <script src="${contextPath}/js/cmmn/uikit.min.js"></script>
  <script src="${contextPath}/js/cmmn/uikit-icons.min.js"></script>
  <script type="text/javascript" src="${contextPath }/cmmn/ax5/js/ax5ui.all.min.js"></script>
  <script type="text/javascript" src="${contextPath}/js/cmmn/commonUtil.js"></script>
</head>

<body>
	<tiles:insertAttribute name="body" />
</body>
</html>