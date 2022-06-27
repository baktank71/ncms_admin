<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Login - denied</title>

  <!-- Bootstrap core CSS-->
  <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
  <!-- Custom fonts for this template-->
  <link href="/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"/>
  <!-- Custom styles for this template-->
  <link href="/css/operator/sb-admin.css" rel="stylesheet"/>

  <!-- Bootstrap core JavaScript-->
  <script src="/vendor/jquery/jquery.min.js"></script>
  <script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- Core plugin JavaScript-->
  <script src="/vendor/jquery-easing/jquery.easing.min.js"></script>

  <script type="text/javascript">
    var contextPath = '<%=request.getContextPath()%>';

    $.ready(function() {
      console.log('access denied~!!')
    })

  </script>
</head>

<body class="bg-dark">

<div class="container">
  <div class="card card-login mx-auto mt-5">
    <div class="card-header">Mileage System Login</div>
    <div class="card-body">
      <div class="text-center">

        access denied~!!

        <!-- <a class="d-block small mt-3" href="register.html">Register an Account</a>
        <a class="d-block small" href="forgot-password.html">Forgot Password?</a>-->
      </div>
    </div>
  </div>
</div>

</body>

</html>
