//null check
function isEmpty(value) {
	if ( value == undefined || value == null || value == "" ) {
		return true;
	} else {
		return false;
	}
}

/**
* 딜레이 함수
* @param msecs 딜레이 시간 (1000 = 1초)
*/
function sleep(msecs){
	  var start =new Date().getTime();
	  varcur=start;
	  while(cur-start<msecs){
	    cur=new Date().getTime();
	  }
}

//null 값check
var Acc_Auh = "N";                   /*세목권한여부*/
var initChk = "" ;
function isNull(value) {
	if (value == "" ||  value == null || value == 'undefined' || value == "<undefined>"  || value == " " || typeof(value) == undefined) {
		return true;
	}
	
	return false;
}

/**
 * getToday : 오늘날짜
 */
function getToday()
{
	var nowDate = new Date();
	var nowYear = nowDate.getYear();
	var nowMonth = nowDate.getMonth()+1;
	var nowDay = nowDate.getDate();
	if(nowMonth <10) nowMonth = "0"+nowMonth;
	if(nowDay <10)   nowDay   = "0"+nowDay;
	var toDay = nowYear +""+ nowMonth +""+ nowDay;

	return toDay;
}

/**
* 한달 전 날짜 반환 함수
* @return new Date()
*/
function retDate(){
	
	var prevDate = new Date(new Date().setMonth(new Date().getMonth()-1)); // 한달전 날짜
	return prevDate;
}

//==============================================================================
//Description  	: 지정날짜구하기
//Parameter    	: targetday : 지정일 
//Parameter    	: type      : YY:년도, MM:월, DD:날짜
//Parameter    	: args      : 더할 날짜.
//Return Value	: rtnVal    : 형식에 맞는 시간
//==============================================================================
function getAddDate( targetday, type, args )
{
	if(targetday.length != 8 ){
		return false;
	}

	var nowDate  = new Date(targetday.substring(0,4), targetday.substring(4,6), targetday.substring(6,8) );

	if(type == "YY"){
		nowDate.setYear( nowDate.getYear()+ parseInt(args));
	}else if (type == "MM"){
		nowDate.setMonth( nowDate.getMonth()+ parseInt((args-1)));
	}else if (type == "DD") {
		nowDate.setDate( nowDate.getDate()+ parseInt(args));
	}

	var nowYear  = nowDate.getFullYear();
	var nowMonth = nowDate.getMonth();
	if(type == "MM"){
		nowMonth = nowDate.getMonth()+1;
	}else{
		nowMonth = nowDate.getMonth();
	}
	var nowDay   = nowDate.getDate();

	if(nowMonth == 0) nowMonth = 12;
	if(nowMonth <10) nowMonth = "0"+nowMonth;
	if(nowDay <10)   nowDay   = "0"+nowDay;
	var rtnVal  = nowYear +""+ nowMonth +""+ nowDay;

	return rtnVal;
}

/**
 * @name	get_data_with_json
 * @desc	Transaction function
 * @author	Joseph Hong (str2350@nate.com)
 * @version	2011.12.12
 */
function get_data_with_json(sUrl, objData, callback, default_data, popupId)
{
	$.ajax({
        type:"POST",
        url: sUrl,
        data: objData,
        cache: false,
        beforeSend: function() {
            //console.log('[beforeSend]:');
        },
        success: function (data) {
        	if( typeof callback == "function" )
			{
        		callback(data, popupId);
        	}
        },
        complete:function () {
            //console.log('[complete]:');
        },
        error: function(data) {
        	if( typeof callback == "function" )
			{
        		callback(default_data, popupId);
        	}
        }
    });					
}

/**
 * @name	log_message
 * @desc	logging at browser console window
 * @author	Joseph Hong (str2350@nate.com)
 * @version	2011.12.12
 */
function log_message(message)
{
  try{
	  if(console)
	  {
	    console.log(message);
	  }
  } catch(e)
  {
  }
}

//bpopup open
function openBpopup( popupId, popupUrl, popupParam, width ){
	var bpopuplayer = $('<div />').attr('id', popupId).attr('style','background:#FFFFFF;width:' + width + 'px').appendTo($('body'));
	
	get_data_with_json(popupUrl, popupParam, bpopupCallback, "Error!!", popupId);
}

//bpopup data callback 
function bpopupCallback( data, popupId ){
	$("#" + popupId).html( data );
	$('#' + popupId).bPopup();	
}

//bpopup close
function closeBpopup( popupId ){
	$('#' + popupId).bPopup().close();
	$('#' + popupId).remove();
}

/**
 * @name	fixalign
 * @desc	지정 개체를 화면 중앙 정렬
 * @author	Joseph Hong (str2350@nate.com)
 * @version	2011.12.12
 */
function fixalign(targetElement) 
{
	var screen = {
		x:$(window).width(),
		y:$(window).height()
	};

	var targetmatrix = {
		x:targetElement.width(),
		y:targetElement.height()
	};

	var fixmatrix = {
		x:(screen.x - targetmatrix.x)/2,
		y:(screen.y - targetmatrix.y)/2+$(window).scrollTop()
	};

	targetElement.css('left',fixmatrix.x);
	targetElement.css('top',fixmatrix.y);
}


function setLogoutTimer(){
	//setInterval(function(){goLogout()},180000); //3분후 로그아웃시킴
}


function goLogout()
{	
	location.href = "/app/user/logout.do";
}

function goBack(){
	location.href = "/app/main.do";
	//history.back(-1);
}


