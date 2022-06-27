
function postToURL(path, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", path);
    
    //Spring Security의 token값 설정
    var csrfField = document.createElement("input");
    csrfField.setAttribute("type", "hidden");
    csrfField.setAttribute("name", $("meta[name='_csrf_parameter']").attr("content"));
    csrfField.setAttribute("value", $("meta[name='_csrf']").attr("content"));
    form.appendChild(csrfField);
    
    // parameter 세팅    
    for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }
    
    document.body.appendChild(form);
    form.submit();
    //form.remove(); // 필요없을 경우 삭제, 반복적으로 사용할 경우 그대로 둠
    return false;
}

/**
 * @name         : fn_getFormData
 * @description  : 폼데이터를 Json Arry로 직렬화
 * @date         : 
 * @author	     : 
 */
function fn_getFormData(form, data) {
	var unindexed_array = $(form).serializeArray();
	var indexed_array = {};

	$.map(unindexed_array, function(n, i) {
		indexed_array[n['name']] = n['value'].trim();
	});

	$.extend(indexed_array, data);
	return indexed_array;
};


/**
 * @name         : fn_getFormDataToJson
 * @description  : 폼데이터를 Json 으로 변환
 * @date         : 
 * @author	     : 
 */
function fn_getFormDataToJson(form) {
	JSON.stringify(fn_getFormData(form));

}

/**
 * @name         : FormatNumber
 * @description  : 1000단위 콤마 처리
 * @date         : 
 * @author	     : 
 */
function FormatNumber(num) {

	if(num == undefined){
		num = "0";
	}

    //소수점 제외 1000단 위 콤마로 수정
	var parts = num.toString().split(".");
	return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1]?"."+parts[1]:"");

}

/**
 * @name         : leadingZeros
 * @description  : digits 자릿수까지 0으로 채워준다.
 * @date         : 
 * @author	     : 
 */
function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++) {
			zero += '0';
		}
	}
	return zero + n;
}/**
 * @name         : leadingZerosF
 * @description  : digits 자릿수만큼 0을 붙인다.
 * @date         : 
 * @author	     : 
 */
function leadingZerosF(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++) {
			zero += '0';
		}
	}
	return n + zero;
}

/**
 * @name         : nvl
 * @description  : null 이나 빈값을 기본값으로 변경
 * @date         : str, defaultVal
 * @author	     : 
 */
function nvl(str, defaultVal) {
    var defaultValue = "";
     
    if (typeof defaultVal != 'undefined') {
        defaultValue = defaultVal;
    }
     
    if (typeof str == "undefined" || str == null || str == '' || str == "undefined") {
        return defaultValue;
    }
     
    return str;
}
// =====파일 다운로드 처리 시작=====
/**
 * @name         : fileDownload
 * @description  : 파일다운로드
 * @date         : 
 * @author	     : 
 */
function tempFileDownload(path, filename, realFilename) {
	$.download("path=" + path + "&filename=" + filename + "&realFilename=" + realFilename, 'POST', '_self');
}

function fileDownload(atchFileSn){
	$.download("atchFileSn="+atchFileSn, 'POST', '_self');
}

function fileDownload(atchFileSn, btype){
	$.download("atchFileSn="+atchFileSn+"&btype="+btype, 'POST', '_self');
}

// Ajax 파일 다운로드
jQuery.download = function(data, method, target) {
	// url과 data를 입력받음
	var url = contextPath+"/file/dnldFile.do";

	var inputs = '';
	if (url && data) {
		// data 는 string 또는 array/object 를 파라미터로 받는다.
		data = typeof data == 'string' ? data : jQuery.param(data);
		// 파라미터를 form의 input으로 만든다.
		jQuery.each(data.split('&'), function() {
			var pair = this.split('=');
			inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
		});
	};

    var csrfInput = '<input type="hidden" name="' + $("meta[name='_csrf_parameter']").attr("content") + '" value="' + $("meta[name='_csrf']").attr("content") + '" />';

	if (typeof (target) == 'undefined') {
		target = "_self";
	}
	// request를 보낸다.
	jQuery('<form action="' + url + '" method="' + (method || 'post') + '" target="' + target + '" accept-charset="UTF-8" onsubmit="emulAcceptCharset(this)">' + inputs + csrfInput + '</form>').appendTo('body').submit().remove();
};


function emulAcceptCharset(app_form) {
	if (app_form.canHaveHTML) { // detect IE
		document.charset = app_form.acceptCharset;
	}
	return true;
}

String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/gi, "")
}

//=====파일 다운로드 처리 종료=====

/**
 * @name         : String.prototype.yyyymmdd
 * @description  : 년월일 포멧  20170101 ==> 2017-01-01
 * @date         : 
 * @author	     : 
 */
String.prototype.yyyymmdd = function() {
	var rtnStr = "";
	if (this.length == 8) {
		rtnStr = this.substring(0, 4) + "-" + this.substring(4, 6) + "-" + this.substring(6, 8);
	} else if (this.length == 6) {
		rtnStr = this.substring(0, 4) + "-" + this.substring(4, 6);
	}
	return rtnStr;
}

/**
 * @name         : txtSubstitution
 * @description  : 특수문자 치환
 * @date         : 
 * @author	     : 
 */
function txtSubstitution(orgTxt){
    var rtnTxt = orgTxt;
    rtnTxt = rtnTxt.replace(/&lt;/gi,'<');
    rtnTxt = rtnTxt.replace(/&gt;/gi,'>');
    rtnTxt = rtnTxt.replace(/&quot;/gi,'"');
    rtnTxt = rtnTxt.replace(/&amp;/gi,'&');
    /*rtnTxt = rtnTxt.replace(/&nbsp;/gi,' ');*/

    return rtnTxt;

}


/**
 * @name         : ajax
 * @description  : ajax 통신 (csrf 토큰 포함)
 * @date         : 
 * @author	     : 
 */
function ajax(isLodingBool, url, isLodingElement, beforeSendText, ajaxParam, fn_success, fn_complete) {

	
    var loader = isLoading($('body')[0], {
        type: "overlay",
        class : "fa fa-refresh fa-spin",
        text: beforeSendText
    });

    var header = $("meta[name='_csrf_header']").attr("content");
    var token  = $("meta[name='_csrf']").attr("content");

    $.ajax({
        url : url,
        type : 'POST',
        contentType : "application/json",
        data : JSON.stringify(ajaxParam),
        dataType : "json",
        beforeSend : function(xhr) {
        	xhr.setRequestHeader(header, token);
        	
            if (isLodingBool) {
                loader.loading();
            }
        },
        success : function(data) {
            if(fn_success != null || fn_success != undefined){
                fn_success(data);
            }else{

            }
        },
        error : function(jxhr, textStatus) {
            alert("처리중 에러가 발생하였습니다.");
        },
        complete : function(xhr, status) {
            if (isLodingBool) {
                loader.remove();
            }
            if(fn_complete != null || fn_complete != undefined){
                fn_complete(xhr);
            }
        }
    });
}

/**
 * @name         : fileUpload
 * @description  : ajax 통신
 * @date         : formData
 * @author	     : 
 */
function fileAjax(url, formData, fn_success, fn_complete) {

    var loader = isLoading($('body')[0], {
        type: "overlay",
        class : "fa fa-refresh fa-spin",
        text: "파일업로드중입니다."
    });

    var header = $("meta[name='_csrf_header']").attr("content");
    var token = $("meta[name='_csrf']").attr("content");
    
    $.ajax({
        url : url,
        type: 'POST',
        enctype: 'multipart/form-data',
        dataType: 'json',
        data: formData, 
        processData: false, 
        contentType: false,         
        beforeSend : function(xhr) {
            xhr.setRequestHeader(header, token);
            loader.loading();
        },
        success : function(data) {
            if(fn_success != null || fn_success != undefined){
                fn_success(data);
            }else{

            }
        },
        error : function(jxhr, textStatus) {
            alert("처리중 에러가 발생하였습니다.");
        },
        complete : function(xhr, status) {

            loader.remove();
            
            if(fn_complete != null || fn_complete != undefined){
                fn_complete(xhr);
            }            
        }
    });
}

/**
 * @name         : fileDownload
 * @description  : ajax 통신
 * @date         : atchFileSn
 * @author	     : 
 */
/*function fileDownload(atchFileSn) {

	var cdata = {};
	cdata.atchFileSn = atchFileSn;
	
    $.ajax({
        url : '/file/download.do',
        type : 'POST',
        contentType : "application/json",
        data : JSON.stringify(cdata),
		dataType: "json",
        success : function(data) {
        	
        },
        error : function(jxhr, textStatus) {
            alert("처리중 에러가 발생하였습니다.");
        }
    });
}*/
/**
 * @name         : 공통코드목록
 * @description  : ajax 통신
 * @date         : CD_CL
 * @author	     : 
 */
function getCodeData(cdCl, fn_success, fn_complete){

	var cdata = {};
	cdata.cdCl = cdCl;

    var header = $("meta[name='_csrf_header']").attr("content");
    var token  = $("meta[name='_csrf']").attr("content");
    
	$.ajax({
		url	: contextPath+'/cmmn/codeList.do', 
        type : 'POST',
        contentType : "application/json",
        data : JSON.stringify(cdata),
		dataType: "json",
        beforeSend : function(xhr) {
        	xhr.setRequestHeader(header, token);
        },
		success : function(data) {
            if(fn_success != null || fn_success != undefined){
                fn_success(data);
            }else{

            }
		},
		error 	: function(xhr, status){
			cds = null;
            alert("처리중 에러가 발생하였습니다.");
		},
        complete : function(xhr, status) {
            if(fn_complete != null || fn_complete != undefined){
                fn_complete(xhr);
            }
        }
	});
}

/**
 * @name         : navi_renderPaging
 * @description  : Ajax 페이징 Navi 생성 함수
 * @date         : divId : 페이징 태그가 그려질 div
 * 				 : pageIndx : 현재 페이지 위치가 저장될 input 태그 id
 * 				 : recordCount : 페이지당 레코드 수 
 * 				 : totalCount : 전체 조회 건수 
 * 				 : eventName : 페이징 하단의 숫자 등의 버튼이 클릭되었을 때 호출될 함수 이름
 * @author	     : 
 */
//var navi_pageIndex = null; 
var navi_eventName = null; 
function navi_renderPaging(params){ 
	//페이징이 그려질 div id 
	var divId = params.divId; 
	//현재 위치가 저장될 input 태그 
	//navi_pageIndex = params.pageIndex; 
	//전체 조회 건수
	var totalCount = params.totalCount; 
	//현재 위치 
	var currentIndex = params.pageIndex;  //$("#"+params.pageIndex).val(); 
	//if($("#"+params.pageIndex).length == 0 || isNull(currentIndex) == true){ 
	if(isNull(currentIndex) == true){ 
		currentIndex = 1; 
	} 
	//페이지당 레코드 수 
	var recordCount = params.recordCount; 
	if(isNull(recordCount) == true){ 
		recordCount = 10; 
	} 
	// 전체 인덱스 수 
	var totalIndexCount = Math.ceil(totalCount / recordCount); 
	
	//페이징 클릭 시 실행할 함수명
	navi_eventName = params.eventName; 

	var first = (parseInt((currentIndex-1) / 10) * 10) + 1; 
	var last = (parseInt(totalIndexCount/10) == parseInt(currentIndex/10)) ? totalIndexCount%10 : 10; 
	var prev = (parseInt((currentIndex-1)/10)*10) - 9 > 0 ? (parseInt((currentIndex-1)/10)*10) - 9 : 1; 
	var next = (parseInt((currentIndex-1)/10)+1) * 10 + 1 < totalIndexCount ? (parseInt((currentIndex-1)/10)+1) * 10 + 1 : totalIndexCount; 

	var preStr = ""; 
	var postStr = ""; 
	var str = ""; 
	
	// 웹 페이징 make
	$("#"+divId).empty(); 
	if(totalIndexCount > 10){ 
		//전체 인덱스가 10이 넘을 경우, 맨앞, 앞 태그 작성 
		preStr += "<li class='first'><a href='#this' title='첫페이지' onclick='_movePage(1)'></a></li>" 
			+ "<li class='prev'><a href='#this' title='이전페이지' onclick='_movePage("+prev+")'></a></li>"; 
	} else if(totalIndexCount <=10 && totalIndexCount > 1){ 
		//전체 인덱스가 10보다 작을경우, 맨앞 태그 작성 
		preStr += "<li class='first'><a href='#this' title='첫페이지' onclick='_movePage(1)'></a></li>" 
	} 
	if(totalIndexCount > 10){ 
		//전체 인덱스가 10이 넘을 경우, 맨뒤, 뒤 태그 작성 
		postStr += "<li class='next'><a href='#this' title='다음페이지' onclick='_movePage("+next+")'></a></li>" 
		+ "<li class='last'><a href='#this' title='끝페이지' onclick='_movePage("+totalIndexCount+")'></a></li>"; 
	} else if(totalIndexCount <=10 && totalIndexCount > 1){ 
		//전체 인덱스가 10보다 작을경우, 맨뒤 태그 작성 
		postStr += "<li class='last'><a href='#this' title='끝페이지' onclick='_movePage("+totalIndexCount+")'></a></li>"; 
	} 
	for(var i=first; i<(first+last); i++){ 
		if(i != currentIndex){ 
			str += "<li><a href='#this' onclick='_movePage("+i+")'>"+i+"</a></li>"; 
		} else{ 
			str += "<li class='uk-active'><a href='#this' onclick='_movePage("+i+")'>"+i+"</a></li>"; 
		} 
	} 
	$("#"+divId).append(preStr + str + postStr); 
		
} 

function _movePage(value){ 
	//$("#"+navi_pageIndex).val(value); 
	if(typeof(navi_eventName) == "function"){ 
		navi_eventName(value); 
	} else { 
		eval(navi_eventName + "(value);"); 
	}
}

/**
 * @name         : validate
 * @description  : validate 공통
 * @date         : 
 * @author	     : 
 */
function valick(obj){
	
	var flag = true;				
	var targetNm =  $(".wTable");
	if(obj!=null){
		targetNm = obj;
	}
	
	targetNm.find("input").each( function ( index ) {
		 var clsnm = $( this ).attr('class');
		
		 //필수값 체크
		 if($( this ).hasClass('reqed')){ 
			 if( $.trim($( this ).val()) == ""){
				 alert($( this ).attr("title")+"은(는) 필수값입니다.");
				 $( this ).focus();
				 flag = false;
				 return false;
			 }
		 } 
		 //숫자형 체크
		 if($( this ).hasClass('nan')){ 
			 var regNumber = /^[0-9]*$/;

			 if(!regNumber.test($( this ).val())) {
				 alert($( this ).attr("title")+"은(는) 숫자만 입력해주세요.");
				 $( this ).focus();
				 flag = false;
				 return false;
			 }
		 }
        //전화번호 체크
        if($( this ).hasClass('ntel')){
            var regTel = /^\d{2,4}-\d{3,4}-\d{4}$/;

            if(!regTel.test($( this ).val()) && $( this ).val() != '') {
                alert($( this ).attr("title")+"의 전화번호 형식이 맞지 않습니다.");
                $( this ).focus();
                flag = false;
                return false;
            }
        }
        //휴대폰번호 체크
        if($( this ).hasClass('nphone')){
            var regPhone = /^01([0|1|2|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;

            if(!regPhone.test($( this ).val()) && $( this ).val() != '') {
                alert($( this ).attr("title")+"의 휴대폰번호 형식이 맞지 않습니다.");
                $( this ).focus();
                flag = false;
                return false;
            }
        }
		 //날짜형 체크
		 if($( this ).hasClass('ndate')){
			 var dayRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
			 if($( this ).val()!="" && !dayRegExp.test($( this ).val())) {
				 alert($( this ).attr("title")+"의 날짜 형식이 맞지 않습니다.");
				 $( this ).focus();
				 flag = false;
				 return false;
			 }
		 }
        //날짜시간형 체크
        if($( this ).hasClass('ndatetime')){
            // var daytimeRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1]) $/;
            var daytimeRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1]) (오[전후]) ([1-9]|1[012]):([0-5][0-9])$/;
            if($( this ).val()!="" && !daytimeRegExp.test($( this ).val())) {
                alert($( this ).attr("title")+"의 날짜 형식이 맞지 않습니다.");
                $( this ).focus();
                flag = false;
                return false;
            }
        }
        //숫자/문자열 길이 체크 (DB의 LENGTH)
        if($( this ).hasClass('nlength')){
            // 한글 포함 byte수 변환
            var strByteLength = function(s,b,i,c){
                for(b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
                return b
            };

            var maxLength = $(this).attr('maxlength');
            var valLength = strByteLength($(this).val());

            if(valLength > maxLength) {
                alert($( this ).attr("title")+"의 숫자 또는 문자열의 제한길이를 초과하였습니다.");
                $( this ).focus();
                flag = false;
                return false;
            }
        }
	});

    targetNm.find("textarea").each( function ( index ) {
        var clsnm = $( this ).attr('class');

        //필수값 체크
        if($( this ).hasClass('reqed')){
            if( $.trim($( this ).val()) == ""){
                alert($( this ).attr("title")+"은(는) 필수값입니다.");
                $( this ).focus();
                flag = false;
                return false;
            }
        }
        //숫자/문자열 길이 체크 (DB의 LENGTH)
        if($( this ).hasClass('nlength')){
            // 한글 포함 byte수 변환
            var strByteLength = function(s,b,i,c){
                for(b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
                return b
            };

            var maxLength = $(this).attr('maxlength');
            var valLength = strByteLength($(this).val());

            if(valLength > maxLength) {
                alert($( this ).attr("title")+"의 숫자 또는 문자열의 제한길이를 초과하였습니다.");
                $( this ).focus();
                flag = false;
                return false;
            }
        }
    });

	return flag;
	
}

// =====KENDO 관련=====
/**
 * @name         : btnPeriodClick
 * @description  : 검색 기간 시작일 및 종료일 세팅
 * @date         : 
 * @author	     : 
 */
function btnPeriodClick(fromDate, toDate, no){
	$("#" + toDate).data("kendoDatePicker").value(moment().toDate());
	$("#" + fromDate).data("kendoDatePicker").value(moment().add(no,"month").toDate());
}

//날짜형 체크
function isValidDate(obj, format){

	var dayRegExp = "";
	if(format=="YYYY-MM-DD"){
		dayRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
	}else {
		dayRegExp = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
	}
	
	if(!isNull(obj.val()) && !dayRegExp.test(obj.val())) {
		alert("지정된 날짜 형식이 맞지 않습니다.");
		obj.focus()
		return false;
	}
	return true;
}

/**
 * @name         : valickFromtoDate
 * @description  : 검색 기간 시작일 및 종료일 비교
 * @date         : fromDateVal, toDateVal, alertFlag(N일시 알림제거)
 * @author	     : 
 */
function valickFromtoDate(fromDateVal, toDateVal, alertFlag){
	if(nvl(fromDateVal)!="" && nvl(toDateVal)!=""){
		if (fromDateVal > toDateVal) {
			if(isNull(alertFlag)){
		        alert("시작일은 종료일보다 늦을 수 없습니다.");				
			}
	        return false;
	   	}	
	}
	return true;
}

/**
 * @name         : String.prototype.toBizrno
 * @description  : 사업자번호 포맷  1234567890 ==> 123-45-67890
 * @date         :
 * @author	     :
 */
String.prototype.toBizrno = function() {
    var rtnStr = "";
    if (this.length > 6) {
        rtnStr = this.substr(0, 3) + "-" + this.substr(3, 2) + "-" + this.substr(5, 5);
    } else {
        rtnStr = this;
    }
    return rtnStr;
};

/**
 * @name         : String.prototype.toPhoneNumber
 * @description  : 전화번호 포맷  01011112222 ==> 010-1111-2222
 * @date         :
 * @author	     :
 */
String.prototype.toPhoneNumber = function() {
    var rtnStr = "";
    if (this.length == 10) {
        rtnStr = this.substr(0, 3) + "-" + this.substr(3, 3) + "-" + this.substr(6, 4);
    } else if (this.length == 11) {
        rtnStr = this.substr(0, 3) + "-" + this.substr(3, 4) + "-" + this.substr(7, 4);
    } else {
        rtnStr = this;
    }
    return rtnStr;
};

/**
 * @name         : fnCreateDialog
 * @description  : 다이얼로그 생성
 * @date         :
 * @author	     :
 */
function fnCreateDialog(dialog_id) {
    var templateString = "<div id='#: dialog_id #'></div>";
    var template = kendo.template(templateString);

    if ($("#" + dialog_id).length > 0) {
        // 동일 다이얼로그 삭제 후 띄움
        $("#" + dialog_id).parent().remove();
    }

    $("#dialog").html(template({ dialog_id: dialog_id }));

    return $("#" + dialog_id);
}

/* ===== 사업자 검색 다이얼로그 관련 ===== */
// 조회된 사업자 정보 목록
var bizrDataSource = [];

/**
 * @name         : fnBizrnoDialogOpen
 * @description  : 사업자검색 다이얼로그 열기
 * @date         :
 * @author	     :
 */
function fnBizrnoDialogOpen() {
    bizrDataSource = [];

    var saupNum = fnCreateDialog("saupNumDialog");

    var saupNumCont = '<div class="pSearchBox"> ';
    saupNumCont     += '<span>회사명 검색</span>';
    saupNumCont     += '<input id="searchCmpnyNm" type="text" class="inp" />';
    saupNumCont     += '<a href="javascript:fnBizrnoDialogSearch()"><img src="' + contextPath + '/images/ico/ico_search01.png" /></a>';
    saupNumCont     += '</div>';
    saupNumCont     += '<table id="saupGrid">';
    saupNumCont     += '<colgroup><col width="50" /><col width="" /><col width="" /><col width="" /></colgroup>';
    saupNumCont     += '<thead>';
    saupNumCont     += '<tr>';
    saupNumCont     += '<th>순번</th>';
    saupNumCont     += '<th>회사명</th>';
    saupNumCont     += '<th>사업자번호</th>';
    saupNumCont     += '<th>선택</th>';
    saupNumCont     += '</tr>';
    saupNumCont     += '</thead>';
    saupNumCont     += '<tbody>';
    saupNumCont     += '<tr>';
    saupNumCont     += '<td colspan="4">데이터가 없습니다.</td>';
    saupNumCont     += '</tr>';
    saupNumCont     += '</tbody>';
    saupNumCont     += '</table>';

    saupNum.kendoDialog({
        width: "700px",
        title: "운수회사 검색",
        closable: true,
        modal: true,
        content: saupNumCont,
        close: function(){
            //alert(1);
        }
    }).data("kendoDialog").open();

    var top = Number($('#regEditDialog').parent().css('top').replace('px', '')) - 35;
    var left = Number($('#regEditDialog').parent().css('left').replace('px', '')) + 151;
    top += 'px';
    left += 'px';

    $('#saupNumDialog').parent().css("top", top);
    $('#saupNumDialog').parent().css("left", left);

    $("#saupGrid").kendoGrid({
        dataSource: {
            data: null,
            transport: {
                read:{
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    url: contextPath + '/cmmn/bsnsInqireView',
                    type: "POST",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader($("meta[name='_csrf_header']").attr("content"), $("meta[name='_csrf']").attr("content"));
                    }
                },
                parameterMap: function(options){
                    options.cmpnyNm = $("#searchCmpnyNm").val();
                    return JSON.stringify(options);
                }
            },
            schema: {
                data: "data",
                total: "total"
            },
            pageSize: 10,
            serverPaging: true,
            change: function(e) {
                bizrDataSource = e.sender._pristineData;
            }
        },
        navigatable: true,
        pageable: {
            pageSizes: true,
            buttonCount: 5
        },
        noRecords: {
            template: "데이터가 없습니다."
        },
        rowTemplate: kendo.template($("#saupTemplate").html()),
        editable: false,
        resizable: true,
        height: 350
    });

    $(window).resize(function(){
        $("#saupGrid").data("kendoGrid").resize();
    });
}

/**
 * @name         : fnBizrnoDialogSearch
 * @description  : 사업자검색 다이얼로그 검색
 * @date         :
 * @author	     :
 */
function fnBizrnoDialogSearch() {
    if(! valick( $('.pSearchBox') )) {
        return;
    }

    var grid = $('#saupGrid').data('kendoGrid');
    grid.dataSource.page(1);
    grid.dataSource.read();
}

/**
 * @name         : fnBizrnoDialogClose
 * @description  : 사업자검색 다이얼로그 회사 선택
 * @parameter    : sn(순번 ROWNUM), fn_choice(선택 후 선택된 object로 할 작업)
 * @date         :
 * @author	     :
 */

function fnChoiceCmpny(sn) {
    var dataObj = {};

    bizrDataSource.forEach(function(item) {
        if(item.sn == sn) {
            dataObj = item;
        }
    });

    $('#cmpnyNm-dialog').val(dataObj.cmpnyNm);
    $('#bizrno-dialog').val(dataObj.bizrno.toBizrno());

    // 사업자검색 다이얼로그 닫기
    bizrDataSource = [];
    $('#saupNumDialog').data("kendoDialog").close();
}
/* ===== 사업자 검색 다이얼로그 관련 끝 ===== */

/**
 * @name         : dateFormatting
 * @description  : 데이터 스트링 포맷팅
 * @date         :
 * @author	     :
 */
function dateFormatting (dateStr) {
    var res = [];
    var str = '';

    if(dateStr != null && dateStr != '') {
        if(dateStr.length == 14) {
            res = dateStr.match(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/);
        } else if(dateStr.length == 12) {
            res = dateStr.match(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/);
        }
        str = res.splice(1,3).join('-') + " " + res.splice(1,2).join(":");
    }

    return str;
}

/**
 * @name         : selectAx5
 * @description  : 셀렉박스 설정
 * @param        : selectId, columnList, valueColNm, textColNm, option, isRequire, defaultText
 * @author       :
 */
function selectAx5(selectId, columnList, valueColNm, textColNm, option, isRequire, defaultText) {
  
  var list = [];
  if(! isRequire) list.push({value: '', text: defaultText ? defaultText : '선택'});
  
  columnList.forEach(function(item, index) {
    var map;
    
    map = {value: item[valueColNm], text: item[textColNm]};
    list.push(map);
    
    if(columnList.length == index + 1) {
      $('[data-ax5select="' + selectId + '"]').ax5select({
        options: list,
        minWidth: option.minWidth ? option.minWidth : 130,
        onStateChanged: function() {
          if(option.stateChgFun) option.stateChgFun(this);
        }
      });
      
      if(! option.hasOwnProperty('search')) {
        // css..
        var select = $('[data-ax5select="' + selectId + '"] > select');
        select.css('border', 'none');
        select.css('height', 'inherit');
        
        var a = $('[data-ax5select="' + selectId + '"] > a');
        a.css('border', 'none');
        a.css('height', '38px');
      }
      
    }
    
  });
  
}


/**
 * @name         : searchFormDatePeriod
 * @description  : 검색 날짜 기간선택 부분 설정
 * @param        : menuId, subMap
 * @author       :
 */
function searchFormDatePeriod(type, pickerId, subMap) {
  
  var option = {
    target: $('[data-ax5picker="' + pickerId + '"]'),
    direction: "top",
    content: {
      width: 270,
      margin: 10,
      type: 'date',
      config: {
        dateFormat: 'yyyy-MM-dd',
        control: {
          left: '<i class="fa fa-chevron-left"></i>',
          yearTmpl: '%s',
          monthTmpl: '%s',
          right: '<i class="fa fa-chevron-right"></i>'
        },
        lang: {
          yearHeading: '연도 선택',
          monthHeading: '월 선택',
          yearTmpl: "%s년",
          months: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
          dayTmpl: "%s"
        }
      },
      formatter: {
        pattern: 'date'/*(' + type + ')'*/
      }
    },
    btns: {
      ok: {label: "확인", theme: "default"},
      cancel: {
        label: "취소", theme: "default", onClick: function() {
          $('#' + pickerId + 'Start').val('');
          $('#' + pickerId + 'End').val('');
          
          subMap[pickerId + 'Start'] = '';
          subMap[pickerId + 'End'] = '';
          
          this.self.close();
        }
      }
    }
  };
  
  if(type == 'date') {
    option.onStateChanged = function() {
      if(this.state == 'changeValue') {
        if(this.inputIndex == 0) subMap[pickerId + 'Start'] = this.value;
        if(this.inputIndex == 1) subMap[pickerId + 'End'] = this.value;
      }
    }
    
  } else if(type == 'year') {
    option.content.config.mode = type;
    option.content.config.selectMode = type;
    
    option.onStateChanged = function() {
      if(this.state == 'changeValue') {
        
        if(this.values[0] == this.values[1]) {
          modeChange(this);
          
        } else {
          $('.calendar-item-year.live.focus.selected-year').removeClass('selected-year');
          var a0 = $('[data-calendar-item-year="' + this.values[0] + '-01-01"]')[0];
          $(a0).addClass('selected-year');
          var a1 = $('[data-calendar-item-year="' + this.values[1] + '-01-01"]')[1];
          $(a1).addClass('selected-year');
        }
        
        if(this.inputIndex == 0) subMap[pickerId + 'Start'] = this.value;
        if(this.inputIndex == 1) subMap[pickerId + 'End'] = this.value;
        
        
      }
    };
    
    // yyyy-mm 입력 필드 필요 시 수정
  } else if(type == 'month') {
    option.content.config.mode = type;
    option.content.config.selectMode = type;
    
    option.onStateChanged = function() {
      if(this.state == 'changeValue') {
        if(this.inputIndex == 0) subMap[pickerId + 'Start'] = this.value;
        if(this.inputIndex == 1) subMap[pickerId + 'End'] = this.value;
      }
    }
  }
  
  if(option) $('[data-ax5picker="' + pickerId + '"]').ax5picker(option);
  
  // 연선택, 월선택 모드일 경우
  var modeChange = function(ths) {
    ths.item.pickerCalendar[0].ax5uiInstance.changeMode(type, ths.value);
    ths.item.pickerCalendar[1].ax5uiInstance.changeMode(type, ths.value);
    
    // calendar의 config의 animatetime 만큼 딜레이를 주고, 모드변경 후 선택 표시 클래스 추가
    setTimeout(function() {
      $('.calendar-item-year.live.focus.selected-year').removeClass('selected-' + type);
      if(type == 'year') {
        $('[data-calendar-item-year="' + ths.value + '-01-01"]').addClass('selected-year');
      } else {
        $('[data-calendar-item-month="' + ths.value + '-01"]').addClass('selected-month');
      }
    }, 100);
  };
  
}
