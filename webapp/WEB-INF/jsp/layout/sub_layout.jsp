<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>

<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<%-- <tiles:importAttribute name="sessId" /> --%>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="title" content="관리자시스템"/>
  <meta name="author" content="관리자시스템"/>
  <meta name="keywords" content="관리자시스템"/>
  <sec:csrfMetaTags />
  
  <title>관리자시스템</title>

  <link rel="stylesheet" href="${contextPath}/css/all.css" type="text/css" />
  <link rel="shortcut icon" href="${contextPath}/images/favicon.ico" type="image/x-icon" />
  
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5ui.all.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5mask.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5modal.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5grid.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5calendar.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5formatter.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5picker.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5select.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5dialog.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/ax5/css/ax5uploader.css">

  <script type="text/javascript" src="${contextPath}/js/cmmn/jquery-1.12.3.min.js"></script>
  <script type="text/javascript" src="${contextPath}/js/cmmn/uikit.min.js"></script>
  <script type="text/javascript" src="${contextPath}/js/cmmn/uikit-icons.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5ui.all.min.js"></script>  
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5core.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5mask.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5modal.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5grid.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5calendar.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5formatter.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5picker.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5select.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5dialog.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/ax5uploader.min.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/ax5/js/jquery-direct.min.js"></script>
  
  <script type="text/javascript" src="${contextPath}/js/cmmn/commonUtil.js"></script>
  <script type="text/javascript" src="${contextPath}/js/cmmn/common.js"></script>
  <script type="text/javascript" src="${contextPath}/js/is-loading/isLoading.js"></script>

  <!-- fontAwesome 추가 -->
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/fontawesome-free-5.9.0-web/css/all.min.css">

<script type="text/javascript">
	var userNm = '<%=request.getSession().getAttribute("userNm")%>';
	var contextPath = '<%=request.getContextPath()%>';
</script>

</head>


<body>
	<tiles:insertAttribute name="header" />
	<tiles:insertAttribute name="nav" />
	<tiles:insertAttribute name="body" />
	<tiles:insertAttribute name="footer" />
</body>
</html>
