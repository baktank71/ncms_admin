<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath }"/>
<html>
<head>
  <script type="text/javascript" src="${contextPath}/cmmn/jquery-ui-1.9.2/js/jquery-1.8.3.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/jqGrid-master/js/i18n/grid.locale-kr.js"></script>
  <script type="text/javascript" src="${contextPath}/cmmn/jquery-ui-1.9.2/js/jquery-ui-1.9.2.custom.js"></script>
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/jquery-ui-1.9.2/css/base/jquery-ui-1.9.2.custom.css">
  <link rel="stylesheet" type="text/css" href="${contextPath}/cmmn/jquery.jqGrid-3.6.5/css/ui.jqgrid.css">
<%--  <script type="text/javascript" src="${contextPath}/jquery.jqGrid-3.6.5/js/jquery.jqGrid.min.js"></script>--%>
  <script type="text/javascript" src="${contextPath}/cmmn/jqGrid-master/js/jquery.jqGrid.js"></script>

  <script type="text/javascript" src="${contextPath}/js/cmmn/commonUtil.js"></script>
  <script type="text/javascript" src="${contextPath}/js/cmmn/test.js"></script>


</head>
<script type="text/javascript">
var contextPath = '<%=request.getContextPath()%>';
</script>

<body>
<div id="tabs">
  <ul>
    <li><a href="#tabs-1">One</a></li>
    <li><a href="#tabs-2">two</a></li>
    <li><a href="#tabs-3">three</a></li>
  </ul>
  <div id="tabs-1">
  	
    <table id="list"></table>
    <div id="pager">
    <input type="hidden" id="page">
    <input type="hidden" id="pageSize">
    <input type="hidden" id="total">
    </div>
    <div id="NoData"></div>
    <button id="insertBt" onclick="$main.ui.insertBt();">등록</button>
  </div>
  <div id="tabs-2">
    <p>two</p>
    <table id="treegrid"></table>
    <div id="ptreegrid"></div>
  </div>
  <div id="tabs-3">
    <table id="list3"></table>
    <div id="pager3"></div>
  </div>
</div>


</body>
</html>