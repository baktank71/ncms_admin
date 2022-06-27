<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<script type="text/javascript">
		var newYn = "${newYn}";
		//var endYn = "${endYn}";
		var endYn = "N";
		var selectBtn = "";
		
		var point_ty = "${procData.point_ty }";
		var point_s = "${procData.point_s }";
		var point_u = "${procData.point_u }";
		var point_d = "${procData.point_d }";
		var point_e = "${procData.point_e }";
		
		$(document).ready(function(){
			//기존 선택된거 set
			if(point_ty == "W"){
				$("#walkBtn").addClass("on");
			}else if(point_ty == "B"){
				$("#bicycleBtn").addClass("on");
			}
			
			if(point_s != ""){
				selectBtn = "startBtn";
			}
			if(point_u != ""){
				selectBtn = "upBtn";
			}
			if(point_d != ""){
				selectBtn = "downBtn";
			}
			if(point_e != ""){
				selectBtn = "endBtn";
			}
			$("#" + selectBtn).addClass("on");
		});		
		
		function chkMoveTy( k ){
			if(endYn == "Y"){ //마일리지 4회 적립했으면 끝
				alertPopup("금일 적립 가능횟수를 모두 사용하였습니다. 감사합니다.");
			}else{
				if(newYn == "Y" && selectBtn == ""){ //신규 프로세스 일때만 선택 가능
					if( k == "W" ){ // 걷기
						$("#walkBtn").addClass("on");
						$("#bicycleBtn").removeClass("on");
						
						$("#startBtn").removeClass("on");
						$("#upBtn").removeClass("on");
						$("#downBtn").removeClass("on");
						$("#endBtn").removeClass("on");		
	
					}else if( k == "B"){ //자전거
						$("#walkBtn").removeClass("on");
						$("#bicycleBtn").addClass("on");
						
						$("#startBtn").removeClass("on");
						$("#upBtn").removeClass("on");
						$("#downBtn").removeClass("on");
						$("#endBtn").removeClass("on");				
					}
					point_ty = k;
				}else{
					alertPopup("프로세스 진행중에는 이동수단 선택이 불가능합니다.");
				}
			}
		}
		
		var loc = ""; //좌표
		var kval = ""; //k
		
		function getIOSUserLocation( val ){ //좌표
			ctrlProc( val, kval );
		}
		
		function appCtrl( k ){
			if(endYn == "Y"){ //마일리지 4회 적립했으면 끝
				alertPopup("금일 적립 가능횟수를 모두 사용하였습니다. 감사합니다.");
			}else{
				kval = k;	
				if(navigator.userAgent.indexOf("Android") != -1) {
					loc = window.Android.getLocation();
					ctrlProc( loc, k );
				} else {
					window.location="jscall://getIOSUserLocation";
				}
				//loc = "37.3997029,126.9699321";
			}
			
		}
		
		function ctrlProc( loc, k ){
			if(loc == "0.0,0.0" || loc == "0.000000,0.000000"){
				alertPopup("GPS 기능를 켜지 않으면 마일리지 적립이 불가능합니다.");
			}else{
				if(point_ty!=""){
					if( k == "s"){ //출발
						$("#startBtn").addClass("on");
						$("#upBtn").removeClass("on");
						$("#downBtn").removeClass("on");
						$("#endBtn").removeClass("on");
						
						selectBtn = "startBtn";
						newYn = "Y";
						saveProc( k, loc );
						
					}else if( k == "u"){ //승차
						if(selectBtn == "startBtn"){
							$("#startBtn").removeClass("on");
							$("#upBtn").addClass("on");
							$("#downBtn").removeClass("on");
							$("#endBtn").removeClass("on");	
							
							selectBtn = "upBtn";
							saveProc( k, loc );
						}else{
							alertPopup("출발 후 승차가 가능합니다!!");
						}
						
					}else if( k == "d"){ //하차
						if(selectBtn == "upBtn"){
							$("#startBtn").removeClass("on");
							$("#upBtn").removeClass("on");
							$("#downBtn").addClass("on");
							$("#endBtn").removeClass("on");
							
							selectBtn = "downBtn";
							saveProc( k, loc );
						}else{
							alertPopup("승차 후 하차가 가능합니다!!");
						}
						
					}else if( k == "e"){ //도착
						if(selectBtn == "downBtn"){
							$("#startBtn").removeClass("on");
							$("#upBtn").removeClass("on");
							$("#downBtn").removeClass("on");
							$("#endBtn").addClass("on");
							
							selectBtn = "endBtn";
							saveProc( k, loc );
						}else{
							alertPopup("하차 후 도착이 가능합니다!!");
						}
	
					}
					
				}else{
					alertPopup("먼저 이동수단을 선택해주세요!");
				}	
			}
		}
		
		function saveProc( k, loc ){
			$("#point_ty").val( point_ty );
			$("#proc_ty").val( k );
			$("#point_" + k).val( loc );
			
			var move_dist = 0;
						
			var lat1 = "";
			var lon1 = "";
			var lat2 = "";
			var lon2 = "";
			var spltS;
			var spltE;
			
			if(k == "u"){
				spltS = $("#point_s").val().split(",");
				spltE = loc.split(",");
				move_dist = Math.ceil( calculateDistance(spltS[0], spltS[1], spltE[0], spltE[1]) * 1000 );
				$("#move_dist").val( move_dist );
			}else if(k == "e"){
				spltS = $("#point_d").val().split(",");
				spltE = loc.split(",");		
				move_dist = Math.ceil( calculateDistance(spltS[0], spltS[1], spltE[0], spltE[1]) * 1000 );
				$("#move_dist").val( move_dist );
			}
			$.ajax({
				url		: "/app/mileage/json/mileage_save.do",
				type 	: "post",
				dataType: "json",
				async	: false, 
		 		data	: $("#frm").serialize(),
				success : function(data){
					if(k == "e"){ //도착시 다시 시작
						alertPopup("적립이 완료되었습니다.");
					}
					location.href = "write.do";
				},
				error 	: function(xhr, status, error){
					alertPopup("세션이 만료되었습니다. 다시 로그인해주세요.");
				}
			});
		}
		
		
	      function calculateDistance(lat1, lon1, lat2, lon2) {
	        var R = 6371; // km
	        var dLat = (lat2-lat1) * Math.PI / 180;
	        var dLon = (lon2-lon1) * Math.PI / 180; 
	        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
	                Math.sin(dLon/2) * Math.sin(dLon/2); 
	        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	        var d = R * c;
	        return d;
	      }

		
	</script>
		<form id="frm" name="frm">
			<input type="hidden" name="proc_ty" id="proc_ty" value="" />
			<input type="hidden" name="seq" id="seq" value="${procData.seq }" />
			<input type="hidden" name="point_ty" id="point_ty" value="${procData.point_ty }" />
			<input type="hidden" name="point_s" id="point_s" value="${procData.point_s }" />
			<input type="hidden" name="point_u" id="point_u" value="${procData.point_u }" />
			<input type="hidden" name="point_d" id="point_d" value="${procData.point_d }" />
			<input type="hidden" name="point_e" id="point_e" value="${procData.point_e }" />
			<input type="hidden" name="move_dist" id="move_dist" value="0" />
		</form>
        <div id="header">
            <div class="header_top">
                <span class="header_left"><a href="javascript:goBack();" class="btn_back"></a></span>
                <span class="header_title">광역알뜰교통카드 마일리지</span>
                <span class="header_right"></span>
            </div>
        </div>        
        <div id="container">
            <div class="content">
                <div class="maileage">
                    <div class="maileage_tab">
                        <ul>
                            <li id="walkBtn" class=""><a href="javascript:chkMoveTy('W');"><span class="walk">걸어서 이동하기</span></a></li>
                            <li id="bicycleBtn" class=""><a href="javascript:chkMoveTy('B');"><span class="bicycle">자전거로 이동하기</span></a></li>
                        </ul>
                    </div>
                    <div class="maileage_check">
                        <ul>
                            <li id="startBtn" class=""><a href="javascript:appCtrl('s');"><span class="btn01">출발</span></a></li>
                            <li id="upBtn" class=""><a href="javascript:appCtrl('u');"><span class="btn02">승차</span></a></li>
                            <li id="endBtn" class=""><a href="javascript:appCtrl('e');"><span class="btn04">도착</span></a></li>
                            <li id="downBtn" class=""><a href="javascript:appCtrl('d');"><span class="btn03">하차</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="main_bg"></div>