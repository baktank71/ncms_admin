<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>

<!-- iOS에서는 position:fixed 버그가 있음, 적용하는 사이트에 맞게 position:absolute 등을 이용하여 top,left값 조정 필요 -->
<div id="layer" style="display:none;position:fixed;overflow:hidden;z-index:10000;-webkit-overflow-scrolling:touch;">
<img src="//t1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼">
</div>

<script type="text/javascript">
	// 우편번호 찾기 화면을 넣을 element
	var element_layer = document.getElementById('layer');
	var proc = false;
	
	function closeDaumPostcode() {
	    // iframe을 넣은 element를 안보이게 한다.
	    element_layer.style.display = 'none';
	}
	
	function sample2_execDaumPostcode( val ) {
	    new daum.Postcode({
	        oncomplete: function(data) {
	            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
	            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	            var fullAddr = data.address; // 최종 주소 변수
	            var extraAddr = ''; // 조합형 주소 변수
	
	            // 기본 주소가 도로명 타입일때 조합한다.
	            if(data.addressType === 'R'){
	                //법정동명이 있을 경우 추가한다.
	                if(data.bname !== ''){
	                    extraAddr += data.bname;
	                }
	                // 건물명이 있을 경우 추가한다.
	                if(data.buildingName !== ''){
	                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                }
	                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
	                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
	            }
	
	            // 우편번호와 주소 정보를 해당 필드에 넣는다.
	            document.getElementById(val + '_zip').value = data.zonecode; //5자리 새우편번호 사용
	            document.getElementById(val + '_addr1').value = fullAddr;
	            //document.getElementById('sample2_addressEnglish').value = data.addressEnglish;
	
	            // iframe을 넣은 element를 안보이게 한다.
	            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
	            element_layer.style.display = 'none';
	        },
	        width : '100%',
	        height : '100%',
	        maxSuggestItems : 5
	    }).embed(element_layer);
	
	    // iframe을 넣은 element를 보이게 한다.
	    element_layer.style.display = 'block';
	
	    // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
	    initLayerPosition();
	}
	
	// 브라우저의 크기 변경에 따라 레이어를 가운데로 이동시키고자 하실때에는
	// resize이벤트나, orientationchange이벤트를 이용하여 값이 변경될때마다 아래 함수를 실행 시켜 주시거나,
	// 직접 element_layer의 top,left값을 수정해 주시면 됩니다.
	function initLayerPosition(){
	    var width = 300; //우편번호서비스가 들어갈 element의 width
	    var height = 400; //우편번호서비스가 들어갈 element의 height
	    var borderWidth = 5; //샘플에서 사용하는 border의 두께
	
	    // 위에서 선언한 값들을 실제 element에 넣는다.
	    element_layer.style.width = width + 'px';
	    element_layer.style.height = height + 'px';
	    element_layer.style.border = borderWidth + 'px solid';
	    // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
	    element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
	    element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
	}

	function doJoin(){
		
        var idReg = /^[a-z]+[a-z0-9]{7,11}$/g;
        var pwReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,16}$/;
        
		if(proc){
			alertPopup("회원가입 진행중입니다...");
			//$("#id").focus();
			return;
		}
        
		if($.trim($("#id").val()) == ""){
			alertPopup("아이디를 입력해주세요.");
			//$("#id").focus();
			return;
		}

        if( !idReg.test( $("#id").val() ) ) {
        	alertPopup("아이디는 영(소)문자로 시작하는 8~12자 영(소)문자 또는 숫자이어야 합니다.");
            //$("#id").focus();
            return;
        }
        
		if($.trim($("#id").val()) != $("#idchk").val()){
			alertPopup("아이디 중복체크를 해주세요.");
			//$("#id").focus();
			return;
		}        
		
		if($.trim($("#pwd").val()) == "") {
			alertPopup("비밀번호를 입력해주세요.");
			//$("#pwd").focus();
			return;
		}
		if($.trim($("#cpwd").val()) == "") {
			alertPopup("비밀번호를 한번더 입력해주세요.");
			//$("#cpwd").focus();
			return;
		}	
		if($.trim($("#pwd").val()) != $.trim($("#cpwd").val())) {
			alertPopup("비밀번호가 맞지 않습니다. 다시 확인 해주세요.");
			//$("#cpwd").focus();
			return;
		}
        if( !pwReg.test( $("#pwd").val() ) ) {
        	alertPopup("비밀번호는 특수문자를 포함하는 8~12자의 영문자와 숫자로 입력 해주세요.");
            //$("#pwd").focus();
            return;
        }		
		
		if($.trim($("#hp").val()) == "") {
			alertPopup("휴대폰번호를 입력해주세요.");
			//$("#hp").focus();
			return;
		}	
		if($.trim($("#card_num1").val()) == "") {
			alertPopup("교통카드번호를 입력해주세요.");
			//$("#card_num1").focus();
			return;
		}
		if($.trim($("#card_num2").val()) == "") {
			alertPopup("교통카드번호를 입력해주세요.");
			//$("#card_num2").focus();
			return;
		}
		if($.trim($("#card_num3").val()) == "") {
			alertPopup("교통카드번호를 입력해주세요.");
			//$("#card_num3").focus();
			return;
		}
		if($.trim($("#card_num4").val()) == "") {
			alertPopup("교통카드번호를 입력해주세요.");
			//$("#card_num4").focus();
			return;
		}
		
		var card_num = $("#card_num1").val()+""+$("#card_num2").val()+""+$("#card_num3").val()+""+$("#card_num4").val();
		
		if($.trim(card_num) != $("#cardchk").val()){
			alertPopup("카드번호 유효성 체크를 해주세요.");
			//$("#card_num1").focus();
			return;
		}  		
		if($.trim($("#nm").val()) == "") {
			alertPopup("이름을 입력해주세요.");
			//$("#nm").focus();
			return;
		}
		if($.trim($("#birth").val()) == "") {
			alertPopup("생년월일을 입력해주세요.");
			//$("#birth").focus();
			return;
		}
		if($.trim($("#s_zip").val()) == "") {
			alertPopup("출발지를 입력해주세요.");
			//$("#s_zip").focus();
			return;
		}
		if($.trim($("#s_addr1").val()) == "") {
			alertPopup("출발지를 입력해주세요.");
			//$("#s_addr1").focus();
			return;
		}
		//if($.trim($("#s_addr2").val()) == "") {
			//alertPopup("출발지를 입력해주세요.");
			//$("#s_addr2").focus();
			//return;
		//}
		if($.trim($("#e_zip").val()) == "") {
			alertPopup("도착지를 입력해주세요.");
			//$("#e_zip").focus();
			return;
		}
		if($.trim($("#e_addr1").val()) == "") {
			alertPopup("도착지를 입력해주세요.");
			//$("#e_addr1").focus();
			return;
		}
		//if($.trim($("#e_addr2").val()) == "") {
			//alertPopup("도착지를 입력해주세요.");
			//$("#e_addr2").focus();
			//return;
		//}		
		if($.trim($("#s_addr1").val()) == $.trim($("#e_addr1").val())) {
			alertPopup("출발지와 도착지를 다르게 입력해주세요.");
			//$("#e_addr1").focus();
			return;
		}		
		
		
		$("#card_num").val( card_num );
		
		proc = true;
		if(navigator.userAgent.indexOf("Android") != -1) {
			$("#device_ty").val( "A" );
			$("#uuid").val( window.Android.getUUID() );
			
			$("#frm").attr("method", "post");
			$("#frm").submit();			
		} else {
			$("#device_ty").val( "I" );
			getDeviceUUID();
		}
		
	}
	
	function getDeviceUUID(){
		window.location="jscall://getIOSDeviceUUID";
	}
	
	function getIOSDeviceUUID( val ){
		$("#uuid").val( val );
		
		$("#frm").attr("method", "post");
		$("#frm").submit();		
	}
		
	
	function onlyNumber(obj) {
	    $(obj).keyup(function(){
	         $(this).val($(this).val().replace(/[^0-9]/g,""));
	    }); 
	}	
	
	function idchk(){
		var idReg = /^[a-z]+[a-z0-9]{7,11}$/g;
		var id = $("#id").val();
        
		if($.trim(id) == ""){
			alertPopup("아이디를 입력해주세요.");
			//$("#id").focus();
			return;
		}

        if( !idReg.test( id ) ) {
        	alertPopup("아이디는 영(소)문자로 시작하는 8~12자 영(소)문자와  숫자 조합이어야 합니다.");
            //$("#id").focus();
            return;
        }
        
		$.ajax({
			url		: "/app/user/idchk.do",
			type 	: "post",
			dataType: "json",
			async	: false, 
	 		data	: "id=" + id,
			success : function(data){
				if(data.rlt == "Y"){
					alertPopup("사용 가능한 아이디입니다.");
					$("#idchk").val( id );			
				}else{
					alertPopup("사용할 수 없는 아이디입니다.");
					$("#id").val("");
				}
			},
			error 	: function(xhr, status, error){
				alertPopup(error);
			}
		});
        
	}
	
	function cardchk(){
		
		if($.trim($("#card_num1").val()) == "") {
			alertPopup("교통카드번호를 입력해주세요.");
			//$("#card_num1").focus();
			return;
		}
		if($.trim($("#card_num2").val()) == "") {
			alertPopup("교통카드번호를 입력해주세요.");
			//$("#card_num2").focus();
			return;
		}
		if($.trim($("#card_num3").val()) == "") {
			alertPopup("교통카드번호를 입력해주세요.");
			//$("#card_num3").focus();
			return;
		}
		if($.trim($("#card_num4").val()) == "") {
			alertPopup("교통카드번호를 입력해주세요.");
			//$("#card_num4").focus();
			return;
		}
		
		var card_num = $("#card_num1").val()+""+$("#card_num2").val()+""+$("#card_num3").val()+""+$("#card_num4").val();
		
		$.ajax({
			url		: "/app/user/cardchk.do",
			type 	: "post",
			dataType: "json",
			async	: false, 
	 		data	: "card_num=" + card_num,
			success : function(data){
				if(data.rlt == "Y"){
					alertPopup("사용 가능한 카드번호입니다.");
					$("#cardchk").val( card_num );			
				}else{
					alertPopup("사용할 수 없는 카드번호입니다.");
					$("#card_num").val("");
				}
			},
			error 	: function(xhr, status, error){
				alertPopup(error);
			}
		});		
	}
	
	function findaddr(){
		openBpopup( "zipfind", "/app/user/zipfind.do", "", "90%" );
	}	
	
	function KeyCheck(objName,objSize,nextObjName)
	{
	  if( objName.value.length == objSize ){
	    nextObjName.focus();
	    return;
	  }

	}	
</script>



<form id="frm" name="frm">
<input type="hidden" id="idchk" name="idchk" value="" />
<input type="hidden" id="cardchk" name="cardchk" value="" />
<input type="hidden" id="uuid" name="uuid" value="" />
<input type="hidden" id="device_ty" name="device_ty" value="" />

        <div id="header">
            <div class="header_box">
                <div class="header_top">
                    <span class="header_left"><a href="javascript:goBack();" class="btn_back"></a></span>
                    <span class="header_title">회원가입</span>
                    <span class="header_right"></span>
                </div>
            </div>
        </div>
       
        <div id="container">
            <div class="content_sub">
                <div class="join_area">
                    <div class="g1 mbs">
                        <span class="join_id"><input type="text" id="id" name="id" placeholder="아이디(영문소문자+숫자, 08~12자리)" maxlength="12" /></span>
                        <a href="javascript:idchk();" class="btn_m btn_gray">중복체크</a>
                    </div>
                    <span class="mbs"><input type="password" id="pwd" name="pwd" placeholder="비밀번호(08~12자리, 특수문자 1개 이상)" maxlength="12" /></span>
                    <span class="mbs"><input type="password" id="cpwd" name="cpwd" placeholder="비밀번호 확인" maxlength="12" /></span>
                    <span class="mbs"><input type="text" id="hp" name="hp" placeholder="휴대폰번호(-제외)" maxlength="12" onkeydown="onlyNumber(this);" /></span>
                    <div class="g1 mbs">

                        <input type="text" id="card_num1" name="card_num1" placeholder="카" maxlength="4" OnKeyUp="KeyCheck(this,4,this.form.card_num2)" onkeydown="onlyNumber(this);" />&nbsp;&nbsp;
                        <input type="text" id="card_num2" name="card_num2" placeholder="드" maxlength="4" OnKeyUp="KeyCheck(this,4,this.form.card_num3)" onkeydown="onlyNumber(this);" />&nbsp;&nbsp;
                        <input type="text" id="card_num3" name="card_num3" placeholder="번" maxlength="4" OnKeyUp="KeyCheck(this,4,this.form.card_num4)" onkeydown="onlyNumber(this);" />&nbsp;&nbsp;
                        <input type="text" id="card_num4" name="card_num4" placeholder="호" maxlength="4" onkeydown="onlyNumber(this);" />

                        <input type="hidden" id="card_num" name="card_num"maxlength="16" />

                        <a href="javascript:cardchk();" class="btn_m btn_gray">유효성체크</a>
                    </div>
                    <span class="mbs"><input type="text" id="nm" name="nm" placeholder="이름" maxlength="10" /></span>
                    <span class="mbs"><input type="text" id="birth" name="birth" placeholder="생년월일(예:19970313)" maxlength="8" onkeydown="onlyNumber(this);" /></span>
                    <h3>출발지</h3>
                    <div class="g1 mbs">
                        <span class="post_id"><input type="text" id="s_zip" name="s_zip" placeholder="우편번호" maxlength="6" readonly /></span>
                        <a href="javascript:sample2_execDaumPostcode('s');" class="btn_l btn_gray">우편번호찾기</a>
                    </div>
                    <span class="mbs"><input type="text" id="s_addr1" name="s_addr1" placeholder="출발지 주소" maxlength="120" readonly /></span>
                    <span class="mbs"><input type="hidden" id="s_addr2" name="s_addr2" placeholder="출발지 주소(상세)" maxlength="60" /></span>
                    <h3>도착지</h3>
                    <div class="g1 mbs">
                        <span class="post_id"><input type="text" id="e_zip" name="e_zip" placeholder="우편번호" maxlength="6" readonly /></span>
                        <a href="javascript:sample2_execDaumPostcode('e');" class="btn_l btn_gray">우편번호찾기</a>
                    </div>
                    <span class="mbs"><input type="text" id="e_addr1" name="e_addr1" placeholder="도착지 주소" maxlength="120" readonly /></span>
                    <span class="mbs"><input type="hidden" id="e_addr2" name="e_addr2" placeholder="도착지 주소(상세)" maxlength="60" /></span>
                    <span class="btn_area"><input type="button" value="회원가입" onclick="doJoin();" class="btn_join" /></span>
                </div>
                <div class="bottom_link">
                    <ul>
                        <li><a href="/app/customer/privateinfo.do">개인정보 이용내역</a></li>
                        <li><a href="/app/customer/gisinfo.do">위치기반서비스 이용약관</a></li>
                    </ul>
                </div>
            </div>
        </div>        
</form>        