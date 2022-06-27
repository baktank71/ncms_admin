<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">
	var chk = "";
	$(document).ready(function(){
	if(navigator.userAgent.indexOf("Android") != -1) {
		if(window.Android.getPermissionLocation()){
			$("#gi_info_yn").prop("checked", true);
		}else{
			$("#gi_info_yn").removeProp("checked");
		}

		$("#verInfo").html( window.Android.getAppVersionName() );
		
	} else {
		getLocationStatus();
		getAppVersion();
	}
	});
	
	function getLocationStatus(){
		window.location="jscall://getIOSUserLocationStatus";
	}	
	
	function getIOSUserLocationStatus( val ){
		if(val == "TRUE" || val == "true"){
			$("#gi_info_yn").prop("checked", true);
		}else{
			$("#gi_info_yn").removeProp("checked");
		}
	}

	function getAppVersion(){
		window.location="jscall://getIOSAppVersion";
	}
	
	function getIOSAppVersion( val ){
		$("#verInfo").html( val );
	}
		

	function updateConfig(){
		var gi_info_yn = "N";
		if($("#gi_info_yn").is(":checked")){
			gi_info_yn = "Y";
		}
		
		if(gi_info_yn == "N"){
			alertPopup("위치정보수집을 허용하지 않으면 포인트 적립이 불가능합니다.");
		}
		
		$.ajax({
			url		: "/app/json/giinfoset.do",
			type 	: "post",
			dataType: "json",
			async	: false, 
	 		data	: "gi_info_yn=" + gi_info_yn,
			success : function(data){
				
			},
			error 	: function(xhr, status, error){
				alertPopup(error);
			}
		});   		
	}

</script>
        <div id="header">
            <div class="header_box">
                <div class="header_top">
                    <span class="header_left"><a href="javascript:goBack();" class="btn_back"></a></span>
                    <span class="header_title">설정</span>
                    <span class="header_right"></span>
                </div>
            </div>
        </div>
        <div id="container">
            <div class="content_sub">
                <div class="setting_area">
                    <ul>
                        <li><span class="t1">위치 정보 허용</span><span class="check_slide">
                        <input type="checkbox" id="gi_info_yn" checked disabled/>
                        <label for="gi_info_yn"></label></span></li>
                        <li><span class="t1">버전 정보</span><span class="t3" id="verInfo">V 1.0</span></li>
                    </ul>
                </div>
            </div>
        </div>
    