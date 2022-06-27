//var host_name = "10.59.252.142:8660";	//개발
var host_name = "10.59.252.254:8660";	//운영

var apiUrl = "http://" + host_name + "/anal/anal.do"; //분석 api
var calcApiUrl = "http://" + host_name + "/konanApi/sdRest.do"; //통계 api
var amUrl = "http://" + host_name + "/konanApi/adRest.do"; //업무 api
var caUrl = "http://" + host_name + "/anal/classifyApi.do"; //장치분류 api

/**
* 카테고리 매칭 함수. 
* 타입 0 넘겨주면 Main url을, 타입 1 넘겨주면 Detail url을 리턴
* 
* @ param ctgr - 카테고리값 
* @ param type - 타입(0 : Main.do, 1 : Detail.do)  
*
* @ return str 			
**/	
function rtnCtgrUrl( ctgr, type ){
	var rtn_val = "";
	if( type != 0 && type != 1 )
		return rtn_val;
	
	for(var i=0;i<ctgr_cnt;i++){
		if( ctgr_arr[i][0] == ctgr ){
			if( type == 0 ){
				rtn_val = ctgr_arr[i][2];
			}else{
				rtn_val = ctgr_arr[i][3];
			}
		}
	}
	
	
	return rtn_val;
}

/**
* 카테고리 매칭 함수. 
* 카테고리명을 넘겨주면 코드를, 코드값을 넘겨주면 카테고리 명을 리턴
* 
* @ param ctgr - 카테고리값 
* @ param type - 타입(0 : 카테고리명, 1 : 카테고리코드 )  
*
* @ return str 			
**/	
function rtnCtgrVal( ctgr, type ){
	var rtn_val = "";
	if( type != 0 && type != 1 )
		return rtn_val;
	
	for(var i=0;i<ctgr_cnt;i++){
		if( ctgr_arr[i][type] == ctgr ){
			if( type == 0 ){
				rtn_val = ctgr_arr[i][1];
			}else{
				rtn_val = ctgr_arr[i][0];
			}
		}
	}
	
	return rtn_val;
}

/**
* 카테고리 매칭 함수(카운트). 
* 카테고리 코드값을 넘겨주면, total 값을 리턴한다.
* 
* @ param ctgr - 카테고리 코드
* 
* @ return str 			
**/
function rtnCtgrCnt( ctgr_cd, sub_ctgr_cd ){
	var rtn_val = 0;
	
	if(sub_ctgr_cd == "ALL"){
		for(var i=0;i<ctgr_cnt;i++){
			if(ctgr_arr[i][1] == ctgr_cd){
				rtn_val = ctgr_arr[i][6];
				return rtn_val;
			}
		}
	}else{
		for(var i=0;i<ctgr_cnt;i++){
			if(ctgr_arr[i][1] == ctgr_cd, ctgr_arr[i][3] == sub_ctgr_cd){
				rtn_val = ctgr_arr[i][6];
				return rtn_val;
			}
		}
	}
	
	return rtn_val;
}

/**
* 카테고리 매칭 함수(필터). 
* 카테고리 명을 넘겨주면, 필터값을 리턴한다.
* 
* @ param ctgr - 카테고리명
* 
* @ return str
**/
function rtnCtgrFilter( ctgr_cd ){
	var rtn_val = 0;
	
	for(var i=0;i<ctgr_cnt;i++){
		if(ctgr_arr[i][1] == ctgr_cd){
			rtn_val = ctgr_arr[i][5];
			return rtn_val;
		}
	}
	
	return rtn_val;
}

//숫자 3자리 단위 콤마 찍기
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

//카테고리 날짜 숫자로 가져오기
function cateNum(ctNum){
	return ''+ctNum.substr(0,2) + ctNum.substr(4,2)
}

//날짜 계산 함수
function dateAddDel(sDate,nNum,type){
	var yy= parseInt(sDate.substr(0,4),10);
	var mm= parseInt(sDate.substr(4,2),10);
	var dd= parseInt(sDate.substr(6,2),10);
	var d;
	
	if(type =="d"){
		d = new Date(yy, mm - 1 ,dd+nNum);
	}else if(type =="m"){
		d = new Date(yy, mm - 1 ,dd+(nNum*31));
	}else if(type =="y"){
		d = new Date(yy+nNum, mm - 1 ,dd);
	}
	
	dd = d.getDate(); dd = (dd<10) ? '0' + dd : dd;
	mm = d.getMonth() + 1; mm = (mm <10) ? '0' +mm : mm;
	yy = d.getFullYear();
	return ''+yy+mm+dd;
}

//웹스토리지 세팅
function storageSet(){
	if(localStorage.kwd !=null && localStorage.kwd.length > 0){
		kwd = localStorage.kwd;								//언론 키워드
	}else{
		kwd = '';
	}
	if(localStorage.device !=null && localStorage.device.length > 0){
		device = localStorage.device;						//장치
	}else{
		device = '';
	}
	if(localStorage.defective !=null && localStorage.defective.length > 0){
		defective = localStorage.defective;					//하자
	}else{
		defective = '';
	}
	if(localStorage.maker !=null && localStorage.maker.length > 0){
		maker =localStorage.maker;							//제조사
	}else{
		maker = '';
	}
	if(localStorage.baegi !=null && localStorage.baegi.length > 0){
		baegi =localStorage.baegi;							//배기량
	}else{
		baegi = '';
	}
	if(localStorage.year_type !=null && localStorage.year_type.length > 0){
		year_type =localStorage.year_type;					//연식
	}else{
		year_type = '';
	}
	if(localStorage.covered_distance !=null && localStorage.covered_distance.length > 0){
		covered_distance =localStorage.covered_distance;	//주행거리
	}else{
		covered_distance = '';
	}
	if(localStorage.engine_type !=null && localStorage.engine_type.length > 0){
		engine_type =localStorage.engine_type;				//엔진타입
	}else{
		engine_type = '';
	}
	if(localStorage.date !=null && localStorage.date.length > 0){
		date =localStorage.date;		//기간 (개월)
	}else{
		date = '';
	}
	if(localStorage.startDate !=null && localStorage.startDate.length > 0){
		startDate =localStorage.startDate;					//시작날짜 (년월일)
	}else{
		startDate = '';
	}
	if(localStorage.endDate !=null && localStorage.endDate.length > 0){
		endDate =localStorage.endDate;						//종료날짜 (년월일)
	}else{
		endDate = '';
	}
}

/*******************************************************
** 종합상황판 api										  ** 
********************************************************/
var devMode = true;
function commonApiAjax(Url, params){
	var data = {};
	
	$.ajax({
	type : "GET",
	url : Url,
	dataType : "json",
	data: encodeURI(params),
	async: false,
	success: function(result){
		data = result;
	}
	,beforeSend:function(){

	}
	,complete:function(){
		
	}
	,timeout:100000
	});
	return data;
}

function apiFilter1(){ //제조사
	var data = commonApiAjax(apiUrl, "lang=filter&num=1"); 
	var rlt = [];
	rlt.push({value: "", text: "제조사"});
	$.each(data.result,function(index,item){
		rlt.push({value: this["maker_name"], text: this["maker_name"]});
	});
	return rlt;
}
function apiFilter2(){ //배기량
	var data = commonApiAjax(apiUrl, "lang=filter&num=2");
	var rlt = [];
	rlt.push({value: "", text: "배기량"});
	$.each(data.result,function(index,item){
		rlt.push({value: this["baegi"], text: this["baegi"]});
	});	
	return rlt;
}
function apiFilter3(){ //연식
	var data = commonApiAjax(apiUrl, "lang=filter&num=3");
	var rlt = [];
	rlt.push({value: "", text: "연식"});
	$.each(data.result,function(index,item){
		rlt.push({value: this["year_type"], text: this["year_type"]});
	});		
	return rlt;
}
function apiFilter4(){ //주행거리
	var data = commonApiAjax(apiUrl, "lang=filter&num=4");
	var rlt = [];
	rlt.push({value: "", text: "주행거리"});
	$.each(data.result,function(index,item){
		rlt.push({value: this["covered_distance"], text: this["covered_distance"]});
	});			
	return rlt;
}
function apiFilter5(){ //엔진타입
	var data = commonApiAjax(apiUrl, "lang=filter&num=5");
	var rlt = [];
	rlt.push({value: "", text: "엔진타입"});
	$.each(data.result,function(index,item){
		rlt.push({value: this["engine_type"], text: this["engine_type"]});
	});			
	return rlt;
}
function apiFilter6(){ //개월별
	var data = commonApiAjax(apiUrl, "lang=filter&num=6");
	var rlt = [];
	rlt.push({value: "", text: "개월"});
	$.each(data.result,function(index,item){
		rlt.push({value: this["write_time_m"], text: this["write_time_m"]});
	});			
	return rlt;
}
function apiFilter7(){ //연도별
	var data = commonApiAjax(apiUrl, "lang=filter&num=7");
	var rlt = [];
	rlt.push({value: "", text: "연도"});
	$.each(data.result,function(index,item){
		rlt.push({value: this["recall_year"], text: this["recall_year"]});
	});			
	return rlt;
}

//1. 결함신고 발생건수
function main1(url){
	var htmlList="";
	var status ="";
	var data = commonApiAjax(apiUrl, "lang=main&num=1&dev=&def=&maker=&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	$.each(data.result,function(index,item){
		for(var i=0; i<5; i++){
			status = $(".area_risk_report").children('.uk-table').find('tbody').children().eq(i).children("th").text();
			if(status == "신고"){
				status = "신고";
			}else if(status ==  "접수"){
				status = "접수";
			}else if(status == "모니터링"){
				status = "모니터대상";
			}else if(status == "조사"){
				status = "조사대상";
			}else if(status == "완료"){
				status = "종료";
			}else{
				status = "";
			}

			if(this["eptn_name"] == status){
				var str = "<a href='#' onclick='javascript:changeMainData(\""+status+"\");'>" + this["count(*)"] + "</a>";
				$(".area_risk_report").children('.uk-table').find('tbody').children().eq(i).children("td").html( str );
			}
		}
	});		
}

function changeMainData(status){
	localStorage.status = status;
	main3(apiUrl); //신고최근내역
	main4(apiUrl); //장치별발생건수
	main6(apiUrl); //제작사별,장치별,하자별 비중
}

//2. 리스크 매트릭스
function main2(url){
	var htmlList="";
	var tbody = $(".area_risk_matrics").children('.table').find('tbody');
	var data = commonApiAjax(apiUrl, "&lang=main&num=2&pageSize=1000");
	var cnt = 0;
	//장치 리스크 매트릭스 초기화
	for(var i=0; i<5; i++){
		for(var j=0; j<5; j++){
			tbody.children("tr").eq(i).children('td').eq(j).children('span').text("0");
			tbody.children("tr").eq(i).children('td').eq(j).children('div').remove();
		}
	}
	
	$.each(data.result,function(index,item){
		if( this["risk_cls"] != 'none' ){
			cnt++;
			var itemData = this["count(*)"];
			
			if(item.risk_lv == '5'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(0).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(0).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(0).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(0).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(0).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '4'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(1).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(1).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(1).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(1).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(1).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '3'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(2).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(2).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(2).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(2).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(2).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '2'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(3).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(3).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(3).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(3).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(3).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '1'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(4).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(4).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(4).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(4).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(4).children('td').eq(4).children('span').html(itemData);
				}
			}
			
		}
		
	});
	console.log("cnt :"+cnt);
	//장치 클릭 이벤트
//	$(".popupLayer").children('span').click(function (){
//		var strArray = $(this).text().split('-');
//		localStorage.device = strArray[0];	  //웹스토리지 장치 등록
//		localStorage.defective = strArray[1]; //웹스토리지 하자 등록
//	});	

}
//3. 결함신고 최근 내역 상세 리스트
function main3(url){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	
//	var data = commonApiAjax(Url,"&dev="+device+"&def="+defective+"&maker="+maker+"&baegi="+baegi
//			+"&year_type="+year_type+"&covered_distance="+covered_distance
//			+"&engine_type="+engine_type+"&date="+date+"&status=" + status
//			+"&startDate="+startDate+"&endDate="+endDate	
	
	var data = commonApiAjax(apiUrl, "lang=main&num=3&status="+localStorage.status+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	$(".area_full").children('.simplebar_wrap').find('tbody').html("");

	$.each(data.result,function(index,item){
		y = this["write_time_ymd"].substr(0,4);
		m = this["write_time_ymd"].substr(4,2);
		d = this["write_time_ymd"].substr(6,2);
		htmlList += "<tr>";
		htmlList += "<td>"+y+"."+m+"."+d+"</td>";
		htmlList += "<td>"+this["maker_name"]+"</td>";
		htmlList += "<td>"+this["car_name"]+"</td>";
		htmlList += "<td>"+this["eptn_name"]+"</td>";
		htmlList += "<td>"+this["division1_name"] + " > " + this["division3_name"] + "</td>";
		htmlList += "<td>"+this["petition_style_name"]+"</td>";
		htmlList += "<td>"+this["receipt_result"]+"</td>";
		htmlList += "</tr>";
		if(index == 4){
			//return false; //5개만
		}
	});

	$(".area_full").children('.simplebar_wrap').find('tbody').append(htmlList);	
}

//4. 결함 장치별 발생 건수
function main4(url){
	var wordData=[{}];
	var categories=[];
	var data = commonApiAjax(apiUrl, "lang=main&num=4&status="+localStorage.status+"&date=2019&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
		
	wordData[0].maxPointWidth = 28;
	wordData[0].data = [{}];
	$.each(data.result,function(index,item){
		categories[index] = item.division1_name;
		wordData[0].data[index] = {name : this["division1_name"], y : this["count(*)"]/100};
	});
	//결함장치별 발생건수 그래프
	Highcharts.chart('riskOccurGraph', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: null
	    },
	    xAxis: {
	        categories: categories,
	        crosshair: true
	    },
	    yAxis: {
	        min: 0,
	        title: {
	            text: '건수'
	        }
	    },
	    tooltip: {
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
	    },
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        }
	    },
	    series: wordData
	});
}

//5. 급상승 검색어
function main5(Url){
	var htmlList = "";
	var data = commonApiAjax(apiUrl, "lang=main&num=5&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	$.each(data.result,function(index,item){
		htmlList += "<tr>";
		htmlList += "<td>"+(index+1)+"</td>";
		htmlList += "<td>"+item.string+"</td>";		
		if(item.rank_diff =="keep" || item.rank_diff =="new" || item.rank_diff =="low"){
			htmlList += "<td>NEW</td>";
		}else if(item.rank_diff.indexOf("-") ==-1){
			htmlList += "<td><i class='fas fa-long-arrow-alt-up'></i>"+item.rank_diff+"</td>";
		}else{
			htmlList += "<td><i class='fas fa-long-arrow-alt-down'></i>"+item.rank_diff+"</td>";
		}	
		htmlList += "</tr>";
	});

	$("#upSearchWordList").html(htmlList);	
	
	
}

//6. 제작사별/장치별/하자별 비중
function main6(Url){
	var temp= [];
	var wordData1=[{}];
	var wordData2=[{}];
	var wordData3=[{}];
	var enName=['onlyMadeGraph','onlyDeviceGraph','onlyRiskGraph'];
	var i=0;
	var data = commonApiAjax(apiUrl, "lang=main&num=6&status="+localStorage.status+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	wordData1[0].name = "제작사별";
	wordData1[0].data = [{}];
	wordData2[0].name = "장치별";
	wordData2[0].data = [{}];
	wordData3[0].name = "하자별";
	wordData3[0].data = [{}];
	$.each(data.result,function(index,item){
		if(index < 6){
			wordData1[0].data[(index%6)] = {name:this['maker_name'],y:this['count(*)']*1};
		}else if(6<= index && index < 12){
			wordData2[0].data[(index%6)] = {name:this['division1_name'],y:this['count(*)']*1};
		}else{
			wordData3[0].data[(index%6)] = {name:this['petition_style_name'],y:this['count(*)']*1};
		}
		
	});
	temp[0] = wordData1;
	temp[1] = wordData2;
	temp[2] = wordData3;
    
    for(var i=0; i<3; i++){
    	Highcharts.chart(enName[i], {
    	    chart: {
    	        type: 'pie',
    	        options3d: {
    	            enabled: true,
    	            alpha: 45
    	        }
    	    },
    	    title: {
    	        text: null
    	    },
    	    plotOptions: {
    	        pie: {
    	            innerSize: 100,
    	            depth: 45
    	        }
    	    },
    	    series: temp[i]
    	});    	

    }	

}	
/*******************************************************
** 장치 현황											  ** 
********************************************************/
//1. 장치명
function device1(Url,tag){
	var htmlList="";
	
	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		success: function(data){	
			$.each(data.result,function(index,item){
				if(index == 0){
					htmlList += '<li class="active"><a href="#">'+item.division1_name+'</a></li>';
					localStorage.device = item.division1_name;	//웹스토리지 최초 장치 등록
				}else{
					htmlList += '<li><a href="#">'+item.division1_name+'</a></li>';
				}
				
				$(".aside").children('ul').html(htmlList);
			});
			
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
			
			//장치 클릭 이벤트
			//$(".aside").children('ul').find('.simplebar-content').children('li').click(function ()
			$(".aside").children('ul').children('li').click(function (){
				var title = $(this).text();
				var idx = -1;
				$('.area_device .detail').find('.title').each(function(index,item){
					if(title.trim() == $(item).text().trim()){
						idx = index;
					}
				});
				if(idx == -1){
					idx = 16;
				}
				$('.area_device .detail').eq(idx).show().siblings().hide();  //이미지 변경
				
				$(".aside").children('ul').children('li').removeClass('active');
				$(this).addClass('active');
				localStorage.device = $(this).text(); //웹스토리지 장치 등록
			});
		}
		,timeout:100000
	});
	
	
}

//3. 발생 추이
function device3(Url,dev,stDate,edDate,stDate2,edDate2){
	var wordData =[{},{}];
	var categorie1 = [];

	//기간만큼 카테고리 입력
	var text = stDate+'';
	var i=0;
	while(true){
		categorie1[i]= text.substr(4,2) + "월 " + text.substr(6,2) + "일" ;
		if(text == edDate){
			break;
		}
		text = dateAddDel(text,1,'d');
		i++;
	}
	

	var data = commonApiAjax(apiUrl, "lang=device&num=3&dev="+dev+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, "")+"&maker="+$("[name=maker]").val()+"&baegi="+$("[name=baegi]").val()
		+"&year_type="+$("[name=year_type]").val()+"&covered_distance="+$("[name=covered_distance]").val()
		+"&engine_type="+$("[name=engine_type]").val());
	
	if((stDate+"").substr(0,4) == (edDate+"").substr(0,4)){
		wordData[1].name = (stDate+"").substr(0,4) ;
	}else{
		wordData[1].name = (stDate+"").substr(0,4) +" ~ " + (edDate+"").substr(0,4);
	}
	wordData[1].data = [];
	//wordData[1].color = colors[1];
	
	$.each(data.result,function(index,item){
		for(var j=0; j < categorie1.length; j++){	//기간 길이만큼 반복
			if(cateNum(categorie1[j]) == item.write_time_ymd.substr(4)){	//카테고리와 날짜 데이터와 같으면 입력
				wordData[1].data[j] = this['count(*)']*1;
			}else{
				if(wordData[1].data[j] !=0 && wordData[1].data[j] == null){
					wordData[1].data[j] = 0;
				}
				
			}
		}
	});
	//장치 발생 추이
    Highcharts.chart('occurenceGraph', {
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        chart: {
            marginTop: 45,
            spacingLeft: 50,
            spacingRight: 50,
            width: 700,
            height: '360px'
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: categorie1,
            labels: {
            	rotation: 10,
                style: {
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'NotoSansKR-DemiLight-Hestia'
                }
            }
        },
        yAxis: {
            title: {
                text: null
            }
        },
        legend: {
            itemStyle: {
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'Nanum Gothic'
            }
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },
        series: wordData
        ,
    });

}
//4. 상세 종류별
function device4(Url,dev){
	wordData =[{}];
	
	var data = commonApiAjax(apiUrl, "lang=device&num=4&dev="+dev+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, "")+"&maker="+$("[name=maker]").val()+"&baegi="+$("[name=baegi]").val()
			+"&year_type="+$("[name=year_type]").val()+"&covered_distance="+$("[name=covered_distance]").val()
			+"&engine_type="+$("[name=engine_type]").val());	
	
	wordData[0].name = 'Brands';
	wordData[0].colorByPoint = true;
	wordData[0].data = [{}];
	$.each(data.result,function(index,item){
		wordData[0].data[index] = {name:this['division3_name'],y:this['count(*)']*1}; 
		
	});
	
	// Build the chart
    Highcharts.chart('sortGraph', {
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: 540,
            height: '360px'
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                center: ['50%', '50%'],
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %',
                    distance: -50,
                    style: {
                        fontSize: '18px',
                        fontFamily: 'Nanum Gothic',
                        textOutline: false,
                        color: '#ffffff',
                    }
                }
            },
        },
        legend: {
            itemMarginBottom: 4,
            itemStyle: {
                fontWeight: 'normal',
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'Nanum Gothic'
            }
        },
        series: wordData
    });

}

//5. 결함이슈 상세 리스트
function device5(Url,dev){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	$(".area_full").children('.simplebar_wrap').find('tbody').html("");
	
	var data = commonApiAjax(apiUrl, "lang=device&num=5&&dev="+dev+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, "")+"&maker="+$("[name=maker]").val()+"&baegi="+$("[name=baegi]").val()
			+"&year_type="+$("[name=year_type]").val()+"&covered_distance="+$("[name=covered_distance]").val()
			+"&engine_type="+$("[name=engine_type]").val());	
	
	$.each(data.result,function(index,item){
		y = this["write_time_ymd"].substr(0,4);
		m = this["write_time_ymd"].substr(4,2);
		d = this["write_time_ymd"].substr(6,2);
		htmlList += "<tr>";
		htmlList += "<td>"+y+"."+m+"."+d+"</td>";
		htmlList += "<td>"+this["maker_name"]+"</td>";
		htmlList += "<td>"+this["car_name"]+"</td>";
		htmlList += "<td>"+this["eptn_name"]+"</td>";
		htmlList += "<td>"+this["division1_name"] + " > " + this["division3_name"] + "</td>";
		htmlList += "<td>"+this["petition_style_name"]+"</td>";
		htmlList += "<td>"+this["receipt_result"]+"</td>";
		htmlList += "</tr>";
		if(index==4){
			//return false;
		}
	});

	$(".area_full").children('.simplebar_wrap').find('tbody').append(htmlList);	
	
//		data: encodeURI("&dev="+dev+"&def="+defective+"&maker="+maker+"&baegi="+baegi
//		+"&year_type="+year_type+"&covered_distance="+covered_distance
//		+"&engine_type="+engine_type+"&date="+date
//		+"&startDate="+startDate+"&endDate="+endDate) 

}

/*******************************************************
** 하자 현황											  ** 
********************************************************/
//1. 키워드 클라우드
function defective1(url){
	var wordData = [{}];
	
	var data = commonApiAjax(apiUrl, "lang=defective&num=1");	

	wordData[0].type = 'wordcloud';
	wordData[0].data = [{}];
	$.each(data.result,function(index,item){
		wordData[0].data[index] = {name:item.string,weight:item.count}; 
		
	});
	
    //최초 년도별 발생 빈도수
    defective2(url, wordData[0].data[0].name); 	
    defective3(url, wordData[0].data[0].name,$("#regDtmStart").val().replace(/-/gi, ""),$("#regDtmEnd").val().replace(/-/gi, ""),'','');
    defective4(url, wordData[0].data[0].name,$("#regDtmStart").val().replace(/-/gi, ""),$("#regDtmEnd").val().replace(/-/gi, ""),'','');
    defective5(url, wordData[0].data[0].name,$("#regDtmStart").val().replace(/-/gi, ""),$("#regDtmEnd").val().replace(/-/gi, ""),'','');
    defective6(url, wordData[0].data[0].name);
    
    localStorage.defective = wordData[0].data[0].name;
    
	Highcharts.setOptions({
        colors: ['#ff9700','#ff5e80','#eb0a0a','#ac26a8','#9962ff','#0c2e86','#0067b3','#0db2a1','#009c47','#8bc24a']
        
    });
    Highcharts.chart('textGraph', {
    	chart: {
            type: 'wordcloud',
            width: 700,
            height: '400px',
        },
        
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        //tooltip: { enabled: false },
        plotOptions: {
            series: {
                cursor: 'pointer',
                minFontSize: 30,
                maxFontSize: 80,
                events: {
                    click: function (event) {	//클라우드 하자클릭 이벤트
                    	//부제목
                        //$(".area_full").children(".title").children(".main_title").text(event.point.name);
            		    //$(".area_risk_matrics").children(".title").children(".main_title").text(event.point.name);
            		    //년도별 발생 빈도수
            		    defective2(url, event.point.name); 	
            		    defective3(url, event.point.name,$("#regDtmStart").val().replace(/-/gi, ""),$("#regDtmEnd").val().replace(/-/gi, ""),'','');
            		    defective4(url, event.point.name,$("#regDtmStart").val().replace(/-/gi, ""),$("#regDtmEnd").val().replace(/-/gi, ""),'','');
            		    defective5(url, event.point.name,$("#regDtmStart").val().replace(/-/gi, ""),$("#regDtmEnd").val().replace(/-/gi, ""),'','');
            		    defective6(url, event.point.name);     		    
            		    
            		    //하자 웹스토리지 저장
            		    localStorage.defective = event.point.name;
                    }
                }
            }
        },
        //컬러 랜덤 반복
        series: wordData,
        title: {
            text: null
        }
    });	

}

//2. 하자 리스크 매트릭스
function defective2(Url,def){
	var htmlList="";
	var tbody = $('.area_risk_matrics').find('tbody');
	
	$("#defTitle").html(def);
	
	var data = commonApiAjax(apiUrl, "lang=defective&num=2&def=" + def);	

	//장치 리스크 매트릭스 초기화
	for(var i=0; i<5; i++){
		for(var j=0; j<5; j++){
			tbody.children("tr").eq(i).children('td').eq(j).children('span').text("0");
			tbody.children("tr").eq(i).children('td').eq(j).children('div').remove();
		}
	}
	
	$.each(data.result,function(index,item){
		if( this["risk_cls"] != 'none' ){
			var itemData = this["total"];
			
			if(item.risk_lv == '5'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(0).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(0).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(0).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(0).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(0).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '4'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(1).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(1).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(1).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(1).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(1).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '3'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(2).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(2).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(2).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(2).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(2).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '2'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(3).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(3).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(3).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(3).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(3).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '1'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(4).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(4).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(4).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(4).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(4).children('td').eq(4).children('span').html(itemData);
				}
			}
			
		}
		
	});	

}

//하자 리스크매트릭스 툴팁
function defHtml(tbody,eq1,eq2,division1_name,petition_style_name,total){
	var htmlList ='';
	var cnt = 0;
	cnt = tbody.children("tr").eq(eq1).children('td').eq(eq2).children('span').text();
	tbody.children("tr").eq(eq1).children('td').eq(eq2).children('span').text((cnt*1)+1 + '');
	
	if(cnt == 0){
//		htmlList += '<div class="popupLayer">';
//		htmlList += '<span><a href="#" >'+ division1_name +'-' +petition_style_name + "</a></span> : <span>" + total + '</span><br>' ;
//		htmlList += '</div>';
		tbody.children("tr").eq(eq1).children('td').eq(eq2).append(htmlList);
	}else{
		tbody.children("tr").eq(eq1).children('td').eq(eq2).children('div').append('<span><a href="#" >'+ division1_name +'-' +petition_style_name + "</a></span> : <span>" + total + '</span><br>');
	}
	
}

//3. 하자 현황 발생 빈도 (년도별)
function defective3(Url,def,stDate,edDate,stDate2,edDate2){
	stDate = edDate-'00010000' ;
	var htmlCnt="";
	var htmlCntTmp="";
	var htmlList="";
	var now = new Date();
	var now_month= now.getMonth()+1;
	var pre_cnt =[0,0,0,0,0,0,0,0,0,0,0,0];
	var nex_cnt =[0,0,0,0,0,0,0,0,0,0,0,0];
	//초기화
	$(".area_full").children('.issue-tbl').find('thead').html("");
	$(".area_full").children('.issue-tbl').find('tbody').html("");
	
	//리스트 현재 시작날짜로 초기화 
	htmlList += "<tr>";
	htmlList += "<th>"+"리스트"+"</th>";
	for(var i=0; i< 12; i++){
		if(12 != now_month){
			htmlList += "<th>"+ now_month +"월</th>";
			now_month++;
		}else{
			htmlList += "<th>"+ now_month +"월</th>";
			now_month=1;
		}
	}
	htmlList += "</tr>";
	$(".area_full").children('.issue-tbl').find('thead').html(htmlList);
	
	var data = commonApiAjax(apiUrl, "lang=defective&num=3&def="+def+"&startDate="+stDate+"&endDate="+edDate);		
	
	$.each(data.result,function(index,item){
		pre_cnt[(this["write_time_m"]*1)-1] = this["count(*)"]*1;
	});
	for(var i=0; i<12; i++){
		if(i == 0){
			htmlCnt += "<tr>";
			htmlCnt += "<th>"+"최근1년"+"</th>";
		}
		
		if(now_month-1 > i+""){
			htmlCntTmp += "<td>" + pre_cnt[i]+"</td>";
		}else {
			htmlCnt += "<td>" + pre_cnt[i]+"</td>";
		}
		if(i == 11 ){
			htmlCnt += htmlCntTmp;
			htmlCntTmp ="";
			htmlCnt += "</tr>";
		}
	}
	$(".area_full").children('.issue-tbl').find('tbody').append(htmlCnt);

}

//4. 발생빈도 (그래프용)
function defective4(Url,def,stDate,edDate,stDate2,edDate2){
	var wordData =[{},{}];
	var categorie1 = [];
	
	//기간만큼 카테고리 입력
	var text = stDate+'';
	var i=0;
	while(true){
		categorie1[i]= text.substr(4,2) + "월 " + text.substr(6,2) + "일" ;
		if(text == edDate){
			break;
		}
		text = dateAddDel(text,1,'d');
		i++;
	}
	
	var data = commonApiAjax(apiUrl, "lang=defective&num=4&dev=&def="+def+"&startDate="+stDate+"&endDate="+edDate+"&maker="+$("[name=maker]").val()+"&baegi="+$("[name=baegi]").val()
			+"&year_type="+$("[name=year_type]").val()+"&covered_distance="+$("[name=covered_distance]").val()
			+"&engine_type="+$("[name=engine_type]").val());			
		
	wordData[1].type = 'column';
	if((stDate+"").substr(0,4) == (edDate+"").substr(0,4)){
		wordData[1].name = (stDate+"").substr(0,4) ;
	}else{
		wordData[1].name = (stDate+"").substr(0,4) +" ~ " + (edDate+"").substr(0,4);
	}
	wordData[1].data = [];
//	wordData[1].color = colorsType2[1];
	$.each(data.result,function(index,item){
		for(var j=0; j < categorie1.length; j++){	//기간 길이만큼 반복
			if(cateNum(categorie1[j]) == item.write_time_ymd.substr(4)){	//카테고리와 날짜 데이터와 같으면 입력
				wordData[1].data[j] = this['count(*)']*1;
			}else{
				if(wordData[1].data[j] !=0 && wordData[1].data[j] == null){
					wordData[1].data[j] = 0;
				}
				
			}
		}
	});	
	
			
					//장치 발생 추이
					Highcharts.chart('frequencyGraph', {
                        chart: {
                            marginTop: 25,
                            spacingRight: 40,
                            spacingLeft: 40,
                            width: 1160,
                            height: '360px'
                        },
                        credits: false,
                        exporting: {
                            buttons: {
                                contextButton: {
                                    enabled: false
                                }
                            }
                        },
                        title: {
                            text: null
                        },

                        xAxis: {
                            categories: categorie1,
                            labels: {
                            	rotation: 10,
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: '#333333',
                                    fontFamily: 'Nanum Gothic'
                                },
                            },
                        },
                        yAxis: {
                            title: {
                                text: null
                            },
                            min: 0,
                            max: 6
                        },
                        legend: {
                            itemStyle: {
                                fontWeight: 'normal',
                                fontSize: '16px',
                                color: '#666666',
                                fontFamily: 'Nanum Gothic'
                            }
                        },
                        series: wordData
                    });
		            
}
//5. 처리상태 
function defective5(Url,def,stDate,edDate,stDate2,edDate2){
	var wordData =[{},{},{},{}];
	var categorie1 = [];
	var eptn_name = ['접수','조사대상','모니터대상','종료'];

	var data = commonApiAjax(apiUrl, "lang=defective&num=5&dev=&def="+def+"&startDate="+stDate+"&endDate="+edDate+"&maker="+$("[name=maker]").val()+"&baegi="+$("[name=baegi]").val()
			+"&year_type="+$("[name=year_type]").val()+"&covered_distance="+$("[name=covered_distance]").val()
			+"&engine_type="+$("[name=engine_type]").val());			
			
	//카테고리 등록
	if((stDate+"").substr(0,4) == (edDate+"").substr(0,4)){
		categorie1[1] = (stDate+"").substr(0,4) +"년";
	}else{
		categorie1[1] = (stDate+"").substr(0,4) +" ~ " + (edDate+"").substr(0,4) +" 년";
	}
	
	for(var i=0; i<4; i++){
		wordData[i].name = eptn_name[i];
		wordData[i].data = [0,0];
		//wordData[i].color = colorsType3[i];
	}
	$.each(data.result,function(index,item){
		for(var i=0; i<4; i++){
			if(wordData[i].name == item.eptn_name){
				wordData[i].data[1] = this["count(*)"]*1;
			}
		}
	});
					Highcharts.chart('processGraph', {
                        data: {
                            table: 'datatable'
                        },
                        chart: {
                            type: 'column',
                            spacingLeft: 42,
                            spacingRight: 42,
                            width: 640,
                            height: '360px'
                        },
                        plotOptions: {
                            series: {
                                dataLabels: {
                                    enabled: true,
                                    style: {
                                        fontSize: '18px',
                                        fontFamily: 'Nanum Gothic'
                                    }
                                }
                            }
                        },
                        exporting: {
                            buttons: {
                                contextButton: {
                                    enabled: false
                                }
                            }
                        },
                        credits: false,
                        title: {
                            text: null
                        },
                        xAxis: {
                            categories: categorie1,
                            allowDecimals: false,
                            title: {
                                text: null
                            },
                            labels: {
                                style: {
                                    fontWeight: 'normal',
                                    fontSize: '16px',
                                    color: '#333333',
                                    fontFamily: 'Nanum Gothic'
                                },
                            }

                        },
                        yAxis: {
                            title: {
                                text: null
                            },
                            gridLineWidth: 0,
                            visible: false,
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontSize: '16px',
                                    fontWeight: 'bold'
                                }
                            },

                        },
                        legend: {
                            itemStyle: {
                                fontSize: '16px',
                                color: '#666666',
                                fontFamily: 'Nanum Gothic'
                            }
                        },
                        series: wordData
                    });
		            

}

//6. 결함이슈 상세 리스트
function defective6(Url,def){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	$(".area_full").children('.issue-tbl2').find('tbody').html("");
	
	var data = commonApiAjax(apiUrl, "lang=defective&num=6&dev=&def="+def+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, "")+"&maker="+$("[name=maker]").val()+"&baegi="+$("[name=baegi]").val()
			+"&year_type="+$("[name=year_type]").val()+"&covered_distance="+$("[name=covered_distance]").val()
			+"&engine_type="+$("[name=engine_type]").val());			
	
	$.each(data.result,function(index,item){
		y = this["write_time_ymd"].substr(0,4);
		m = this["write_time_ymd"].substr(4,2);
		d = this["write_time_ymd"].substr(6,2);
		htmlList += "<tr>";
		htmlList += "<td>"+y+"."+m+"."+d+"</td>";
		htmlList += "<td>"+this["maker_name"]+"</td>";
		htmlList += "<td>"+this["car_name"]+"</td>";
		htmlList += "<td>"+this["eptn_name"]+"</td>";
		htmlList += "<td>"+this["division1_name"] + " > " + this["division3_name"] + "</td>";
		htmlList += "<td>"+this["petition_style_name"]+"</td>";
		htmlList += "<td>"+this["receipt_result"]+"</td>";
		htmlList += "</tr>";
		
		if(index==4){
			//return false;
		}
	});

	$(".area_full").children('.issue-tbl2').find('tbody').append(htmlList);

}

/*******************************************************
** 제작사 현황											  ** 
********************************************************/
//1. 상위제작사 top 5
function maker1(Url){
	var htmlList="";
	$('.area_made_top5').html("");
	
	var data = commonApiAjax(apiUrl, "lang=maker&num=1");			
	
	$.each(data.result,function(index,item){
		
		if(item.maker_name != null && item.maker_name != '' && item.maker_name.length > 0){
			
			htmlList +='<div class="uk-width-1-5">';
			htmlList += '<p class="uk-h5 uk-text-center">'+item.maker_name+'</li><ul>';
			
		}else if(index ==5 || index ==11 || index ==17 || index ==23 || index ==29 ){
			
			htmlList += '<li><span class="uk-badge uk-margin-small-right">'+(index%6)+'</span>'+item.division1_name+'-'+item.petition_style_name+'</li>';
			htmlList += '</ul></div>';
			
		}else{
			
			htmlList += '<li><span class="uk-badge uk-margin-small-right">'+(index%6)+'</span>'+item.division1_name+'-'+item.petition_style_name+'</li>';
			
		}
		
	});
	
	$('.area_made_top5').html(htmlList);	
}

//2. 전체 제작사별 차량 결함
function maker2(Url){
	var htmlList="";
	
	var data = commonApiAjax(apiUrl, "lang=maker&num=2");		
	
	$.each(data.result,function(index,item){
		if(index == 0){
			htmlList += '<a class="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" href="#">'+item.maker_name+'</a>';
			localStorage.maker = item.maker_name;	//웹스토리지 최초 장치 등록
			maker = localStorage.maker;
		}else{
			htmlList += '<a class="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" href="#">'+item.maker_name+'</a>';
		}
	});
	$(".area_wrap").find(".word_ranking").html(htmlList);
	maker3(Url);					//차량결함 top5 점유율
	maker5(Url);
	maker6(Url);
	maker7(Url);

	//장치 클릭 이벤트
	$(".area_wrap").find(".word_ranking").children('a').click(function (){
		$(".area_wrap").find(".word_ranking").children('a').removeClass('active');
		$(this).addClass('active');
		localStorage.maker = $(this).text(); //웹스토리지 장치 등록
		maker = localStorage.maker;
		maker3(Url);				//차량결함 top5 점유율
		maker5(Url);
		maker6(Url);
		maker7(Url);
	});	
}

//3. 차량결함 TOP 5 점유율 (그래프용)
function maker3(Url){
	var color = [7,9,4,0,1];
	var wordData= [] ;
	var categorie1 = [];
	var pieIdx = 0;
	var lineIdx = 1;
	//기간만큼 카테고리 입력
	var text = $("#regDtmStart").val().replace(/-/gi, "");
	var i=0;
	while(true){
		categorie1[i]= text.substr(4,2) + "월 " + text.substr(6,2) + "일" ;
		if(text == $("#regDtmEnd").val().replace(/-/gi, "")){
			break;
		}
		text = dateAddDel(text,1,'d');
		i++;
	}	
	
	var data = commonApiAjax(apiUrl, "lang=maker&num=3&dev=&def=&maker="+localStorage.maker+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));	
	
	for(var i=0; i<(data.total*1)+1; i++){
		wordData[i] = {}
		if(i != 0 ){
			wordData[i].type = 'line';
			wordData[i].data = [];
			//wordData[i].color = colors[color[(i-1)]];
		}
	}
	wordData[0].type = 'pie';
	wordData[0].name = '차량결합 TOP 5 점유율 파이그래프';
	wordData[0].data =[{}];
	wordData[0].center =[-250, 100];
	wordData[0].size =200;
	wordData[0].showInLegend =false;
	wordData[0].dataLabels ={enabled: false};
	
	$.each(data.result,function(index,item){
		//파이 그래프
		if(item.division1_name != null && item.division1_name != '' && item.division1_name.length > 0){
			wordData[0].data[pieIdx]={name : item.division1_name +'-'+item.petition_style_name, y: this['count(*)']*1};
			wordData[pieIdx+1].name = item.division1_name + '-' + item.petition_style_name;
			pieIdx++;
			if(index != 0){
				lineIdx++;
			}else{
				
			}
		}else{
			
			for(var j=0; j < categorie1.length; j++){	//기간 길이만큼 반복
				if(cateNum(categorie1[j]) == item.write_time_ymd.substr(4)){	//카테고리와 날짜 데이터와 같으면 입력
					wordData[lineIdx].data[j] = this['count(*)']*1;
				}else{
					if(wordData[lineIdx].data[j] != 0 && wordData[lineIdx].data[j] == null){
						wordData[lineIdx].data[j] = 0;
					}
					
				}
			}
		}
		
	});	
	
	Highcharts.chart('sharePie', {
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        chart: {
            width: 1100,
            height: '350px',
            marginTop: 65,
            marginLeft: 500,
            marginRight: 91,
            spacingBottom: 50
        },
        title: {
            text: null
        },
        xAxis: {
            categories: categorie1,
            labels: {
            	rotation: 10,
                style: {
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'NotoSansKR-bold-Hestia'
                },
            }
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                enabled: false
            }
        },
        legend: {
            y: 30,
            x: -70,
            itemStyle: {
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'Nanum Gothic'
            }
        },
        plotOptions: {
            pie: {
                tooltip: {
                    pointFormat: '<b>{point.name}:</b> {point.y}'
                }
            }
        },
        series: wordData
    });

}

//4. 차량결함 TOP 5 점유율 (년도별)   [현재 사용안함]
function maker4(Url,dev,def,wordData,idx,cate){
	var color = [7,9,4,0,1];
	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("dev="+dev+"&def="+def+"&maker="+localStorage.maker+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, "")),
		success: function(data){
			wordData[idx].type = 'line';
			wordData[idx].name = dev + '-' + def;
			wordData[idx].data = [];
			wordData[idx].color = colors[color[idx]];
		
			$.each(data.result,function(index,item){
				for(var j=0; j < cate.length; j++){	//기간 길이만큼 반복
					wordData[idx].data[j] = 0;
					/*if(cateNum(cate[j]) == item.write_time_ymd.substr(4)){	//카테고리와 날짜 데이터와 같으면 입력
						//alert(item.write_time_ymd.substr(4) +" : "+wordData[1].data[j]+" : "+this['count(*)']*1);
						wordData[idx].data[j] = this['count(*)']*1;
					}else{
						if(wordData[idx].data[j] !=0 && wordData[idx].data[j] == null){
							wordData[idx].data[j] = 0;
						}
						
					}*/
				}
			});
            
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
			
			
		}
		,timeout:100000
	});
}
//5. 차량결함 (그래프용)
function maker5(Url){
	var wordData= [] ;
	
	var data = commonApiAjax(apiUrl, "lang=maker&num=5&maker="+localStorage.maker+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));	
		
	for(var i=0; i<(data.total*1); i++){
		wordData[i]=[];
	}
	//alert(wordData.length +" | "+ wordNode.length);
	$.each(data.result,function(index,item){
		if(item.maker_name != null){
			wordData[index]= [this["maker_name"],this["car_name"],(this["count(*)"]*1)];
		}else if(item.division1_name != null && item.car_name != null && item.maker_name == null){
			wordData[index]= [this["car_name"],this["division1_name"],(this["count(*)"]*1)];
		}else if(item.division1_name != null && item.petition_style_name != null && item.maker_name == null && item.car_name == null){
			wordData[index]= [this["division1_name"],this["petition_style_name"],(this["count(*)"]*1)];
		}
		
		
	});
	//제작사 차량결함 그래프
    Highcharts.chart('madeGraph', {
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        chart: {
            width: 900,
            height: 410
        },
        title: {
            text: null
        },
        plotOptions: {
            series: {
                dataLabels: {
                    style: {
                        color: '#000000',
                        textOutline: '#ffffff',
                        fontSize: '14px',
                        fontFamily: 'Nanum Gothic'
                    },
                }
            }
        },
        tooltip: {
            pointFormat: '{point.from} -> {point.to}'
        },
        series: [{
            keys: ['from', 'to', 'weight'],
            data: wordData,
            type: 'sankey',
            name: null
        }]
    });
}

//6. 차량 결함(장치용)
function maker6(Url){
	var htmlList="";
	var categories =[];
	var wordData = [{}];
	
	var data = commonApiAjax(apiUrl, "lang=maker&num=6&maker="+localStorage.maker+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));	
			
	wordData[0].name ='결함건수';
	wordData[0].data =[];
	wordData[0].pointPlacement ='on';
	$.each(data.result,function(index,item){
		categories[index] = this['division1_name'];
		wordData[0].data[index]= this['count(*)']*1;
	});
	
	//제작사 스파이더맵
    Highcharts.chart('madeSpiderGraph', {
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        chart: {
            polar: true,
            type: 'line',
            width: 440,
            height: '410px'
        },
        title: {
            text: null
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            categories: categories,
            tickmarkPlacement: 'on',
            lineWidth: 0,
            labels: {
                style: {
                    fontWeight: 'normal',
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'Nanum Gothic'
                },
            }
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            
        },
        plotOptions: {
            series: {
                color: '#FF0000'
            }
        },
        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },
        legend: {
            itemStyle: {
                fontWeight: 'normal',
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'Nanum Gothic'
            }
        },
        series: wordData ,
    });

}

//7. 결함이슈 상세 리스트
function maker7(Url){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	$(".area_full").children('.issue-tbl2').find('tbody').html("");
	
	var data = commonApiAjax(apiUrl, "lang=maker&num=7&dev=&def=&maker="+localStorage.maker+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));	
				
	$.each(data.result,function(index,item){
		y = this["write_time_ymd"].substr(0,4);
		m = this["write_time_ymd"].substr(4,2);
		d = this["write_time_ymd"].substr(6,2);
		htmlList += "<tr>";
		htmlList += "<td>"+y+"."+m+"."+d+"</td>";
		htmlList += "<td>"+this["maker_name"]+"</td>";
		htmlList += "<td>"+this["car_name"]+"</td>";
		htmlList += "<td>"+this["eptn_name"]+"</td>";
		htmlList += "<td>"+this["division1_name"] + " > " + this["division3_name"] + "</td>";
		htmlList += "<td>"+this["petition_style_name"]+"</td>";
		htmlList += "<td>"+this["receipt_result"]+"</td>";
		htmlList += "</tr>";
		
		if(index==4){
			//return false;
		}
	});

	$(".area_full").children('.issue-tbl2').find('tbody').append(htmlList);

}

/*******************************************************
** 언론 현황											  ** 
********************************************************/
//1. [연관키워드] 연관키워드
function news1(Url){
	var wordData = [{}];
	var title =  $(".area_wrap").children('div').children(".title").children('.main_title');
	title.html('<i class="icon_border"></i>' +localStorage.kwd + '<span class="normal"> 연관키워드</span>');
	
	var data = commonApiAjax(apiUrl, "lang=news&num=1&kwd=&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));	
			
	$.each(data.result,function(index,item){
		if(index ==0){
			wordData[index].name = "";
			wordData[index].data = [{name : "", value : item.count/50}];
			wordData[index].color = '#ffffff';
			wordData[index].dataLabels = { style : {color: '#0db2a1'} };
			
			wordData[index+1] = { name : item.string , data : [{name : item.string , value : item.count/50}] };
		}else{
			wordData[index+1] = { name : item.string , data : [{name : item.string , value : item.count/50}] };

		}
	});
	
	Highcharts.chart('keyWordGraph', {
        chart: {
            type: 'packedbubble',
            height: '660px'
        },
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        title: {
            text: null
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value}'
        },
        plotOptions: {
            series: {
                color: '#0db2a1',
                marker: {
                    fillOpacity: 1
                },
                events: {
                    click: function (event) {	//클라우드 하자클릭 이벤트
                    	localStorage.kwd = event.point.name;
        				news1(Url);
                    }
                }
            },
            packedbubble: {
                minSize: '30px',
                maxSize: '400px',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                style: {
                    stroke: '#0db2a1',
                    strokeWidth: '6'
                },
                dataLabels: {
                    enabled: true,
                    verticalAlign: 'midddle',
                    align: 'center',
                    format: '{point.name}',
                    y: -20,
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 1,
                        style: {
                            fontSize: '10px'
                        }
                    },
                    style: {
                        color: '#ffffff',
                        textOutline: 'none',
                        fontWeight: 'normal',
                        fontSize: '36px',
                    }
                }
            }
        },
        legend: {
            enabled: false,
        },
        series: wordData
    });	
	
}


//2. [이슈사이클] 이슈어 싸이클
function news2(Url){
	var csvData ="";
	
	var data = commonApiAjax(apiUrl, "lang=news&num=2&kwd="+localStorage.kwd+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));	
				
	csvData = data.status;

	K_DaViF("#issueCycleGraph").visualization({
		dataCsv:csvData,
//		data:data,
		avg : 0.8313871772542999,
		width:1200,
		height:600,
		type:'quad_scatter',
		margin : {
			top : 15,
			right : 50,
			bottom : 40,
			left : 10
		},
		click : function(d) {
			console.log(d);
		},
		axis : {
			inner : true,
			path : "/konanResources/analytics/img/KDaViF"
		},
		//division : 8,					//차트 분할 사이즈
		 node : {
			size : 8,					//node 사이즈,
			style : {
				//css
			},
			color :{					//분할 면 색상 값 설정
				puberty : '#7247A3',	
				trend : '#E74549',
				decline : '#B19787',
				emerging : '#42866C',
			}
		},
		text : {
			style : {
				'font-size' : '18px'	//node 옆 text 사이즈
			}
		}
	});
}

//3. [커뮤니티] 긍/부정 분석
function news3(Url,kwd){
	var title =  $(".area_wrap").children('div').eq(2).children(".title").children('.main_title');
	title.html('<i class="icon_border"></i>' +kwd + '<span class="sub_title"> 긍/부정 분석</span>');
	
	var total=0;
	var pos=0;
	var neg =0;
	
	var posGauge = [{}];
	var posTotal=0;
	var posData = [{}];
	
	var negGauge = [{}];
	var negTotal=0;
	var negData = [{}];
	
	var p_index = 0;
	var n_index = 0;
	
	var data = commonApiAjax(apiUrl, "lang=news&num=3&kwd="+localStorage.kwd+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	$.each(data.result,function(index,item){
		//긍부정 분포 게이지 
		if(index <4){
			if(index == 0){			//부정
				negTotal = item.count*1;
			}else if(index == 2){	//긍정
				posTotal = item.count*1;
			}
			
			//분포게이지 통계 게산
			total = negTotal+posTotal;
			pos = Math.round( ((posTotal/total)*100)*10 )/10;
			neg = Math.round( ((negTotal/total)*100)*10 )/10;
			
			posGauge[0].name = '긍정';
			posGauge[0].data = [{
                    color: '#3690df',
                    radius: '107%',
                    innerRadius: '78.3%',
                    y: pos
                }] ;
			
			negGauge[0].name = '부정';
			negGauge[0].data = [{
                color: '#ff5e80',
                radius: '97%',
                innerRadius: '68.3%',
                    y: neg
                }] ;
			
			if(pos > neg ){
				$(".bigger_arrow").children('span').eq(0).removeClass("display-none");
				$(".bigger_arrow").children('span').eq(1).addClass("display-none");
			}else if(pos < neg) {
				$(".bigger_arrow").children('span').eq(0).addClass("display-none");
				$(".bigger_arrow").children('span').eq(1).removeClass("display-none");
			}else{
				$(".bigger_arrow").children('span').eq(0).removeClass("display-none");
				$(".bigger_arrow").children('span').eq(1).addClass("display-none");
			}
		}
		
		// 긍/부정 데이터 
		if(item.polarity =="POS"){
			posData[p_index] = { name : item.string , data : [{name : item.string , value : item.count/20}] };	
			p_index++;
		}else if(item.polarity =="NEG"){
			negData[n_index] = { name : item.string , data : [{name : item.string , value : item.count/20}] };	
			n_index++;
		}

	});

	//긍정 게이지 그래프
    function renderIcons() {}
    Highcharts.chart('positiveGauge', {
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        chart: {
            type: 'solidgauge',
            height: '266px',
            events: {
                render: renderIcons
            }
        },

        title: {
            text: null,
            style: {
                fontSize: '24px'
            }
        },
        tooltop: {
            enabled: false
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{
                outerRadius: '110%',
                innerRadius: '75.3%',
                backgroundColor: '#e8e8e8',
                borderWidth: 0
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    align: 'center',
                    borderWidth: 0,
                    backgroundColor: 'none',
                    style: {
                        fontSize: '26px',
                        color: '#3690df',
                        textAlign: 'center'
                    },
                    format: '<span style="text-align: center; font-weight: normal;">{series.name}</span><br><span style="font-size:40px; color: {point.color}; font-weight: bold">{point.y}<span style="font-size: 24px; font-weight: normal; color: #999999">%</span></span>',
                    x: 5,
                    y: 60
                    // positioner: function (labelWidth) {
                    //     return {
                    //         x: (this.chart.chartWidth - labelWidth) / 2,
                    //         y: (this.chart.plotHeight / 2) - 0
                    //     };
                    // }
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            },
        },

        series: posGauge
    });
    
    
    //긍정 버블 그래프
    Highcharts.chart('positiveGraph', {
        chart: {
            type: 'packedbubble',
            height: '330px'
        },
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        title: {
            text: null
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value}'
        },
        plotOptions: {
            series: {
                color: '#3690df',
                marker: {
                    fillOpacity: 1
                }
            },
            packedbubble: {
                minSize: '40px',
                maxSize: '260px',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                style: {
                    stroke: '#ffffff',
                    strokeWidth: '2'
                },
                dataLabels: {
                    enabled: true,
                    verticalAlign: 'middle',
                    format: '{point.name}',
                    y: 5,
                    style: {
                        color: '#ffffff',
                        textOutline: 'none',
                        fontWeight: 'normal',
                        fontSize: '24px',
                    }
                }
            }
        },
        legend: {
            enabled: false,
        },
        series: posData
    });
    
  //부정 게이지 그래프
    function renderIcons() {}
    Highcharts.chart('negativeGauge', {
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        chart: {
            type: 'solidgauge',
            height: '266px',
            events: {
                render: renderIcons
            }
        },

        title: {
            text: null,
            style: {
                fontSize: '24px'
            }
        },
        tooltop: {
            enabled: false
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{
                outerRadius: '100%',
                innerRadius: '65.3%',
                backgroundColor: '#e8e8e8',
                borderWidth: 0
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    align: 'center',
                    borderWidth: 0,
                    backgroundColor: 'none',
                    style: {
                        fontSize: '26px',
                        color: '#ff5e80',
                        textAlign: 'center'
                    },
                    format: '<span style="text-align: center; font-weight: normal;">{series.name}</span><br><span style="font-size:40px; color: {point.color}; font-weight: bold">{point.y}<span style="font-size: 24px; font-weight: normal; color: #999999">%</span></span>',
                    x: 5,
                    y: 60
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            },
        },
        series: negGauge
    });
    
  //부정 버블 그래프
    Highcharts.chart('negativeGraph', {
        chart: {
            type: 'packedbubble',
            height: '330px'
        },
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        title: {
            text: null
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value}'
        },
        plotOptions: {
            series: {
                color: '#ff5e80',
                marker: {
                    fillOpacity: 1
                }
            },

            packedbubble: {
                minSize: '40px',
                maxSize: '260px',
                zMin: 0,
                zMax: 1000,
                style: {
                    stroke: '#ffffff',
                    strokeWidth: '2'
                },
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    verticalAlign: 'middle',
                    format: '{point.name}',
                    y: 5,
                    style: {
                        color: '#ffffff',
                        textOutline: 'none',
                        fontWeight: 'normal',
                        fontSize: '24px',
                    }
                }
            }
        },
        legend: {
            enabled: false,
        },
        // 텍스트 길어질 경우 <br>로 2줄 처리
        series: negData
    });
}


//4. 급상승 검색어
function news4(Url){
	var temp;
	var data = commonApiAjax(apiUrl, "lang=news&num=4&kwd="+localStorage.kwd+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	if(data.result == null ){
		$('.issue-tbl1').children('ul').children('li').html("");
	}
	$.each(data.result,function(index,item){
		if(index == 0){
			kwd = item.string;
			localStorage.kwd = kwd;
		}
		temp = '<span class="num_tag">'+(index+1)+'</span><a href="#">'+item.string+'</a><span class="right"><i class="fas fa-long-arrow-alt-up"></i>'+item.count+'</span>';
		$('.issue-tbl1').children('ul').children('li').eq(index).html(temp);
	});
	
	news1(apiUrl_news_1,kwd);
	
	//언론현황 탭 클릭 이벤트
	$(".word_ranking").children('li').click(function (){
		var tabNm ="";					//언론현황 탭 이름
		tabNm = $(".tabs").children('ul').children('.active').text();
		kwd = $(this).children('a').text();
		localStorage.kwd = kwd;
		
	});
}

//5. 연관 기사 (제목)
function news5(Url){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	var total;
	
	var data = commonApiAjax(apiUrl, "lang=news&num=5&kwd="+localStorage.kwd+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	total = data.total;	//총 건수
	pageNum++;			//페이지 증가
	$('.area_col2').eq(0).children(".title").children('.desc').text(numberWithCommas(total)+"건");
	$.each(data.result,function(index,item){
		y = this["write_time"].substr(0,4);
		m = this["write_time"].substr(4,2);
		d = this["write_time"].substr(6,2);
		if(index ==0){
			htmlList += '<li class="active">';
		}else{
			htmlList += '<li>';
		}
		
		htmlList += '	<a href="#">';
		htmlList += '		<span class="img_wrap">';
		//htmlList += '			<img src="/konanResources/analytics/img/temp/article_logo.png" alt="조선일보">';
		htmlList += '		</span>';
		htmlList += '		<div>';
		htmlList += '			<p class="list_title">'+ item.title + '</p>';
		htmlList += '			<span>'+ item.host +'</span>';
		htmlList += '			<span class="date">'+y+"."+m+"."+d+'</span>';
		htmlList += '		</div>'
		htmlList += '	</a>';
		htmlList += '</li>';
	
	});

	$(".word_ranking").append(htmlList);
	
	//기사 제목 클릭 이벤트
	$(".word_ranking").children('li').click(function (){
		var Idx = $(this).index();
		$(".word_ranking").children('li').removeClass('active');
		$(this).addClass('active');
		
		news6(Url, localStorage.kwd,(Idx+1));
		//localStorage.kwd = kwd;
	});
}

//6. 기사 보기 (내용)
function news6(Url,kwd, num){
	var url="";
	var htmlList="";
	
	var data = commonApiAjax(apiUrl, "lang=news&num=6&kwd="+localStorage.kwd+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	$.each(data.result,function(index,item){
		htmlList += '<div class="area_header">';
		htmlList += '<p>'+item.title+'</p>';
		htmlList += '</div>';
		htmlList += '<div class="area_body">';
		htmlList += '<p>'+item.content.replace("&lt;b&gt;","<b>").replace("&lt;/b&gt;","</b>") +'</p>';
		htmlList += '</div>';
		
		$('.article_link').children('a').attr('href',item.url);
		$('.article_link').children('a').text(item.url);
		
	});
	$('.area_col2').eq(1).children('.area').find('.simplebar-content').html(htmlList);
}

//7. KWC 급상승 검색어
function news7(Url,tabNm){
	var temp;
	
	var data = commonApiAjax(apiUrl, "lang=news&num=7&kwd="+localStorage.kwd+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	if(data.result == null ){
		$('.area_search_word').children('.area_border').children('ul').children('li').html("");
	}
	$.each(data.result,function(index,item){
		if(index == 0){
			kwd = item.string;
			localStorage.kwd = kwd;
			$.cookie('tabNm',tabNm);	
			//localStorage.tabNm = tabNm;			//현재 탭이름 상새현황에 전달	
		}
		temp = '<span class="num_tag">'+(index+1)+'</span><a href="#">'+item.string+'</a><span class="right"><i class="fas fa-long-arrow-alt-up"></i>'+item.count+'</span>';
		$('.area_search_word').children('.area_border').children('ul').children('li').eq(index).html(temp);
	});
	
	news3(apiUrl_news_3,kwd);
}

//8. KWC 연관 기사 (제목)
function news8(Url,kwd,num){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	var total;
	
	var data = commonApiAjax(apiUrl, "lang=news&num=8&kwd="+localStorage.kwd+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));

	total = data.total;	//총 건수
	pageNum++;			//페이지 증가
	$('.area_col2').eq(0).children(".title").children('.desc').text(numberWithCommas(total)+"건");
	$.each(data.result,function(index,item){
		y = this["write_time_ymd"].substr(0,4);
		m = this["write_time_ymd"].substr(4,2);
		d = this["write_time_ymd"].substr(6,2);
		if(index ==0 && num==1){
			htmlList += '<li class="active">';
		}else{
			htmlList += '<li>';
		}
		
		htmlList += '	<a href="#">';
		htmlList += '		<span class="img_wrap">';
		htmlList += '			<img src="/konanResources/analytics/img/temp/article_logo.png" alt="조선일보">';
		htmlList += '		</span>';
		htmlList += '		<div>';
		htmlList += '			<p class="list_title">'+ item.title + '</p>';
		htmlList += '			<span>'+ item.sourceNm +'</span>';
		htmlList += '			<span class="date">'+y+"."+m+"."+d+'</span>';
		htmlList += '		</div>'
		htmlList += '	</a>';
		htmlList += '</li>';
	
	});

	$(".word_ranking").append(htmlList);
	
	//기사 제목 클릭 이벤트
	$(".word_ranking").children('li').unbind();
	$(".word_ranking").children('li').click(function (){
		//this.removeEventListener("click",arguments.callee);
		var Idx = $(this).index();
		$(".word_ranking").children('li').removeClass('active');
		$(this).addClass('active');
		
		news9(apiUrl_news_9,kwd,(Idx+1));
		//localStorage.kwd = kwd;
	});	
}

//9. KWC 기사 보기 (내용)
function news9(Url,kwd,num){
	var url="";
	var htmlList="";
	
	var data = commonApiAjax(apiUrl, "lang=news&num=9&kwd="+localStorage.kwd+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));
	
	$.each(data.result,function(index,item){
		htmlList += '<div class="area_header">';
		htmlList += '<p>'+item.title+'</p>';
		htmlList += '</div>';
		htmlList += '<div class="area_body">';
		htmlList += '<p>'+item.body.replace("&lt;b&gt;","<b>").replace("&lt;/b&gt;","</b>") +'</p>';
		htmlList += '</div>';
		
		$('.article_link').children('a').attr('href',item.url);
		$('.article_link').children('a').text(item.url);
		
	});
	$('.area_col2').eq(1).children('.area').find('.simplebar-content').html(htmlList);
}
/*******************************************************
** 모니터링 현황											  ** 
********************************************************/
//3. 제작사별 모니터링 비율
function monitoring3(Url){
	var wordData=[{}];
	
	$.ajax({
		type : "GET",
		url : Url,
		data: encodeURI("startDate="+startDate+"&endDate="+endDate) ,
		dataType : "json",
		success: function(data){
			wordData[0].name = '제조사 TOP 10';
			wordData[0].data = [];
			$.each(data.result,function(index,item){
				wordData[0].data[index]={name: this['maker_name'] , y : this['count(*)']*1};
			});
			
			Highcharts.setOptions({
                colors: ['#0db2a1','#8bc24a','#ff9700','#ff5e80','#9962ff', '#0067b3']
            });
            Highcharts.chart('madeTop10Graph', {
                credits: false,
                exporting: {
                    buttons: {
                        contextButton:{
                            enabled: false
                        }
                    }
                },
                chart: {
                    type: 'pie',
                    width: 908,
                    marginLeft: 300,
                    marginRight: 300,
                    height: '316px'
                },
                title: {
                    text: null
                },
                tooltip: {
                    pointFormat: '<b> {point.name}</b><b>{point.y}</b><b>건</b>'
                },
                plotOptions : {
                    pie : {
                        center: ['50%', '50%'],
                        showInLegend: true,
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.1f} %',
                            distance: -35,
                            style : {
                                fontSize: '18px',
                                fontFamily: 'Nanum Gothic',
                                textOutline: false,
                                color: '#ffffff'
                            }
                        }
                    },
                    series : {
                        size: '100%',
                        innerSize: '40%',
                        style : {
                            fontSize: '16px'
                        }
                    }
                },
                legend: {
                    itemMarginBottom: 4,
                    itemStyle: {
                        fontSize: '16px',
                        fontFamily: 'Nanum Gothic',
                        color: '#666666',
                        lineHeight: '1.2'
                    }
                },
                series: wordData
            });
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
	
}

//4. 장치별 모니터링 비율
function monitoring4(Url){
	var wordData=[{}];
	
	$.ajax({
		type : "GET",
		url : Url,
		data: encodeURI("startDate="+startDate+"&endDate="+endDate) ,
		dataType : "json",
		success: function(data){
			wordData[0].name = '이슈구분';
			wordData[0].data = [];
			$.each(data.result,function(index,item){
				wordData[0].data[index]={name: this['division1_name'] , y : this['count(*)']*1};
			});
			
			Highcharts.setOptions({
                colors: ['#0db2a1','#8bc24a','#ff9700','#ff5e80','#9962ff','#0067b3']
            });
            Highcharts.chart('issueGraph', {
                credits: false,
                exporting: {
                    buttons: {
                        contextButton:{
                            enabled: false
                        }
                    }
                },
                chart: {
                    type: 'pie',
                    width: 908,
                    marginLeft: 300,
                    marginRight: 300,
                    height: '316px'
                },
                title: {
                    text: null
                },
                tooltip: {
                    pointFormat: '<b> {point.name}</b><b>{point.y}</b><b>건</b>'
                },
                plotOptions : {
                    pie : {
                        center: ['50%', '50%'],
                        showInLegend: true,
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.1f} %',
                            distance: -35,
                            style : {
                                fontSize: '18px',
                                fontFamily: 'Nanum Gothic',
                                textOutline: false,
                                color: '#ffffff'
                            }
                        }
                    },
                    series : {
                        size: '100%',
                        innerSize: '40%',
                        style : {
                            fontSize: '16px'
                        }
                    }
                },
                legend: {
                    itemStyle: {
                        fontSize: '16px',
                        fontFamily: 'Nanum Gothic',
                        color: '#666666',
                        lineHeight: '1.2'
                    }
                },
                series: wordData
            });
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
	
}
/*******************************************************
** EWR 현황											  ** 
********************************************************/
//1.[무상수리] 제작사/장치/ TOP10 무상수리 비중 
function ewr1(Url){
	var wordData1=[{}];
	var wordData2=[{}];
	var color = [7,8,9,0,1,2,3,4,5,6];
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=1&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
	
	wordData1[0].innerSize = '50%';
	wordData1[0].name = '제작사 TOP 10';
	wordData1[0].data = [{}];
	wordData2[0].innerSize = '50%';
	wordData2[0].name = '장치 TOP 10';
	wordData2[0].data = [{}];
	$.each(data.result,function(index,item){
		//제작사별 무상수리
		if(item.maker_name != null && item.maker_name != '' && item.maker_name.length > 0){
			wordData1[0].data[index] = {
                    name: item.maker_name,
                    y: this["count(*)"]*1,
                    //color: colors[color[index]]
                }
		//장치별 무상수리
		}else{
			wordData2[0].data[index%10] = {
                    name: item.division1_name,
                    y: this["count(*)"]*1,
                    //color: colors[color[index%10]]
                }
			
		}
		
	});
	
	//데이터 건수 0
	if(wordData1[0].data[0].name == null){
		wordData1[0].data[0] = {
                name: "없음",
            }
	}
	if(wordData2[0].data[0].name == null){
		wordData2[0].data[0] = {
                name: "없음",
            }
	}
	
	//최초 무상수리 top 제작사 등록
	localStorage.maker = wordData1[0].data[0].name;
	
	//무상수리 그래프 1
	Highcharts.chart('deviceTopGraph1', {
        credits: false,
        exporting: {
            buttons: {
                contextButton:{
                    enabled: false
                }
            }
        },
        chart: {
            type: 'pie',
            width: 600,
            height: '400px',
            spacingTop: 30
        },
        title: {
            text: null
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b><b>{point.y}</b>',
        	
        },
        plotOptions : {
            pie : {
                size: 234,
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '<b style="font-weight: normal;">{point.percentage:.1f}</b>%',
                    distance: -30,
                    style : {
                        fontWeight: 'normal',
                        fontSize: '18px',
                        fontFamily: 'Nanum Gothic',
                        textOutline: false,
                    }
                },
                events:{
                	click: function(event){
            		    //하자 웹스토리지 저장
            		    localStorage.maker = event.point.name;
                		
                	}
                }
            }
            
        },
        legend: {
            width: 600,
            x: 30,
            y: 0,
            align : "center",
            itemMarginBottom: 4,
            itemStyle: {
                fontWeight: 'normal',
                fontSize : '16px',
                fontFamily: 'Nanum Gothic',
                color: '#666666'
            }
        },
        series: wordData1
    });
	
	//무상수리 그래프 2
	Highcharts.chart('deviceTopGraph2', {
        credits: false,
        exporting: {
            buttons: {
                contextButton:{
                    enabled: false
                }
            }
        },
        chart: {
            type: 'pie',
            width: 600,
            height: '400px',
            spacingTop: 30
        },
        title: {
            text: null
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b><b>{point.y}</b>'
        },
        plotOptions : {
            pie : {
                size: 234,
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '<b style="font-weight: normal;">{point.percentage:.1f}</b>%',
                    distance: -30,
                    style : {
                        fontWeight: 'normal',
                        fontSize: '18px',
                        fontFamily: 'Nanum Gothic',
                        textOutline: false,
                    }
                    
                    
                }
        
            },
        },
        legend: {
            width: 600,
            align : "center",
            x: 50,
            y: 0,
            itemMarginBottom: 4,
            itemStyle: {
                fontWeight: 'normal',
                fontSize : '16px',
                fontFamily: 'Nanum Gothic',
                color: '#666666'
            }
        },
        series: wordData2
        
    });
}
//2.[무상수리] 제작사 TOP10 무상수리 증가 추이 
function ewr2(Url){
	var wordData = [];
	var categorie = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
	var color = [7,8,9,0,1,2,3,4,5,6];
	var idx = 0;
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=2");		
	
	for(var i=0; i<(data.total*1); i++){
		wordData[i] = {};
		wordData[i].data = [];
		//wordData[i].color = colors[color[i]];
		//전체 초기화
		for(var j=0; j < categorie.length; j++){	
			wordData[i].data[j] = 0;
		}
	}
	
	$.each(data.result,function(index,item){
		//파이 그래프
		if(item.maker_name != null && item.maker_name != '' && item.maker_name.length > 0){
			wordData[idx+1].name = item.maker_name;
			if(index != 0){
				idx++;
			}else{
				wordData[idx].name = item.maker_name;
			}
		}else{
			wordData[idx].data[((item.write_time_m*1)-1)] = this['count(*)']*1;
		}
	});

	//국산/수입 리콜 수 그래프
    Highcharts.chart('deviceTopGraph3', {
        credits: false,
        exporting: {
            buttons: {
                contextButton:{
                    enabled: false
                }
            }
        },
        chart: {
            type: 'column',
            width: 1820,
            spacingLeft: 30,
            spacingRight: 30,
            marginTop: 40,
            height: "250px"
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: categorie,
            labels: {
                style : {
                    fontWeight: 'normal',
                    fontSize: '16px',
                    color: '#666666',
                    fontFamily: 'Nanum Gothic'
                },
            }
        },
        yAxis: {
            tickAmount: 6,
            title: {
                text: null
            },
            labels: {
                style : {
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'Nanum Gothic'
                },
            },
        },
        legend: {
            enabled: true,
            itemStyle: {
                fontWeight: 'normal',
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'Nanum Gothic'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                // pointWidth: 10
            },
            series: {
                color: '#0db2a1',
                borderWidth: 0,
                dataLabels: {
                    enabled: false
                }
            }
        },
        tooltip: {
            pointFormat: '<b>{point.y:.2f}</b>'
        },
        series: wordData
    });
}
//3.[무상수리] 장치별 무상수리 추이 
function ewr3(Url){
	var color = [7,9,0,2,3];
	var wordData= [] ;
	var categorie = [];
	var idx = 0;
	
	//기간만큼 카테고리 입력
	var text = startDate+'';
	var i=0;
	while(true){
		categorie[i]= text.substr(4,2) + "월 " + text.substr(6,2) + "일" ;
		if(text == endDate){
			break;
		}
		text = dateAddDel(text,1,'d');
		i++;
	}	
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=3&dev=&def=&maker="+localStorage.maker+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
		
	for(var i=0; i<(data.total*1); i++){
		wordData[i] = {};
		wordData[i].data = [];
		//wordData[i].color = colors[color[i]];
	}

	$.each(data.result,function(index,item){
		//라인 그래프
		if(item.division1_name != null && item.division1_name != '' && item.division1_name.length > 0){
			wordData[idx+1].name = item.division1_name;
			if(index != 0){
				idx++;
			}else{
				wordData[idx].name = item.division1_name;
			}
		}else{
			for(var j=0; j < categorie.length; j++){	//기간 길이만큼 반복
				if(cateNum(categorie[j]) == item.write_time_ymd.substr(4)){	//카테고리와 날짜 데이터와 같으면 입력
					wordData[idx].data[j] = this['count(*)']*1;
				}else{
					if(wordData[idx].data[j] != 0 && wordData[idx].data[j] == null){
						wordData[idx].data[j] = 0;
					}
					
				}
			}
		}
		
	});

	Highcharts.chart('freeFixTypeGraph', {
        credits: false,
        exporting: {
            buttons: {
                contextButton:{
                    enabled: false
                }
            }
        },
        title: {text: null},
        subtitle: {text: null},
        chart : {
            width: 1820,
            height: '410px',
            spacingBottom: 74,
            marginTop: 42,
            spacingLeft: 50,
            spacingRight: 50
        },
        xAxis : {
            categories: categorie,
            labels: {
            	rotation: 10,
                style : {
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'NotoSansKR-DemiLight-Hestia'
                },
            },
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style : {
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'NotoSansKR-DemiLight-Hestia'
                },
            },
        },
        legend: {
            y: 50,
            itemWidth: 150,
            itemStyle : {
                fontWeight: 'normal',
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'Nanum Gothic'
            }
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
            }
        },
        series: wordData,
    });	
}

//4.[무상수리] 결함 이슈 리스트
function ewr4(Url){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	$(".area_full").children('.issue-tbl2').find('tbody').html("");
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=3&dev=&def=&maker="+localStorage.maker+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
		
	$.each(data.result,function(index,item){
		htmlList += "<tr>";
		htmlList += "<td>"+this["maker_name"]+"</td>";
		htmlList += "<td>"+this["car_type"]+"</td>";
		htmlList += "<td>"+this["car_name"]+"</td>";
		
		y = this["car_acpt_dt"].substr(0,4);
		m = this["car_acpt_dt"].substr(4,2);
		d = this["car_acpt_dt"].substr(6,2);
		htmlList += "<td>"+y+"."+m+"."+d+" ~ ";
		y = this["car_retn_dt"].substr(0,4);
		m = this["car_retn_dt"].substr(4,2);
		d = this["car_retn_dt"].substr(6,2);
		htmlList += y+"."+m+"."+d+"</td>";
		htmlList += "<td>"+this["division1_name"]+"</td>";
		htmlList += "<td>"+this["tech_info_div_cd_nm"]+"</td>";
		htmlList += "<td>"+this["tech_info_nm"]+"</td>";
		htmlList += "</tr>";
		
		if(index==4){
			return false;
		}
	});

	$(".area_full").children('.issue-tbl2').find('tbody').append(htmlList);
		
}

//5.[TBS] 제조사별 TSB 추이 TOP5
function ewr5(Url){
	var color = [7,9,0,2,3];
	var wordData= [] ;
	var categorie = [];
	var idx = 0;
	
	//기간만큼 카테고리 입력
	var text = startDate+'';
	var i=0;
	while(true){
		categorie[i]= text.substr(4,2) + "월 " + text.substr(6,2) + "일" ;
		if(text == endDate){
			break;
		}
		text = dateAddDel(text,1,'d');
		i++;
	}	
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=5&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
			
	for(var i=0; i<(data.total*1); i++){
		wordData[i]={};
		wordData[i].data = [];
		//wordData[i].color = colors[color[i]];
	}

	$.each(data.result,function(index,item){
		//라인 그래프
		if(item.maker_name != null && item.maker_name != '' && item.maker_name.length > 0){
			//wordData[idx+1].name = item.maker_name;
			if(index != 0){
				idx++;
				wordData[idx].name = item.maker_name;
			}else{
				wordData[idx].name = item.maker_name;
			}
		}else{
			for(var j=0; j < categorie.length; j++){	//기간 길이만큼 반복
				if(cateNum(categorie[j]) == item.write_time_ymd.substr(4)){	//카테고리와 날짜 데이터와 같으면 입력
					wordData[idx].data[j] = this['count(*)']*1;
				}else{
					if(wordData[idx].data[j] != 0 && wordData[idx].data[j] == null){
						wordData[idx].data[j] = 0;
					}
					
				}
			}
		}
		
	});
	
	Highcharts.chart('madeTSBTop5Graph1', {
        credits: false,
        exporting: {
            buttons: {
                contextButton:{
                    enabled: false
                }
            }
        },
        title: {text: null},
        subtitle: {text: null},
        chart : {
            width: 700,
            height: '300px',
            spacingBottom: 54,
            marginTop: 27,
            spacingLeft: 49,
            spacingRight: 49
        },
        xAxis : {
            categories: categorie,
            labels: {
            	rotation: 10,
                style : {
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'NotoSansKR-DemiLight-Hestia'
                },
            },
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style : {
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'NotoSansKR-DemiLight-Hestia'
                },
            },
        },
        legend: {
            y: 40,
            itemStyle : {
                fontWeight: 'normal',
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'Nanum Gothic'
            }
        },
        plotOptions: {
            series: {
                label: {
                    //connectorAllowed: false
                },
            }
        },
        series: wordData,
    });
}

//6.[TBS] 제조사별 TSB 발생빈도
function ewr6(Url){
	var wordData=[{}];
	var status ="";
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=6&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
			
	$.each(data.result,function(index,item){
		for(var i=0; i<5; i++){
			status = $(".area_margin_left").children('.issue-tbl2').find('tbody').children().eq(i).children("th").text();
		
			if(this["tech_info_div_nm"] == status){
				$(".area_margin_left").children('.issue-tbl2').find('tbody').children().eq(i).children("td").children('a').text(this["count(*)"]);
			}
		}
	});
	
	$(".area_margin_left").children('.issue-tbl1').find('tbody').children().children("td").children('a').click(function(){
		localStorage.techNm = $(this).parent().prev().text();
	});	
}

//7.[TBS] 제조사별/이슈별 분포 (제조사 TOP10)
function ewr7(Url){
	var wordData=[{}];
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=7&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
			
	wordData[0].name = "제조사 TOP 10";
	wordData[0].data = [{}];
	if(data.total== 0){
		wordData[0].data[0] = {name:"없음",y: 0};
	}
	$.each(data.result,function(index,item){
		wordData[0].data[index] = {
                name: item.maker_name,
                y: this["count(*)"]*1,
            }
		
	});
	
	/*[{
        name: '제조사 TOP 10',
        data: [{
            name: '현대',
            y: 116,
        }, {
            name: '기아',
            y: 95,
        },*/
	//제조사 TOP 10 파이 차트
    Highcharts.setOptions({
        colors: ['#0db2a1','#009c47','#8bc24a','#ff9700','#ff5e80','#eb0a0a', '#ac26a8','#9962ff', '#0c2e86', '#0067b3']
    });
    Highcharts.chart('madeTop10Graph', {
        credits: false,
        exporting: {
            buttons: {
                contextButton:{
                    enabled: false
                }
            }
        },
        chart: {
            type: 'pie',
            width: 908,
            marginLeft: 300,
            marginRight: 300,
            height: '330px'
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '<b> {point.name}</b><b>{point.y}</b><b>건</b>'
        },
        plotOptions : {
            pie : {
                center: ['50%', '50%'],
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %',
                    distance: -35,
                    style : {
                        fontSize: '18px',
                        fontFamily: 'Nanum Gothic',
                        textOutline: false,
                        color: '#ffffff'
                    }
                }
            },
            series : {
                size: '100%',
                innerSize: '40%',
                style : {
                    fontSize: '16px'
                }
            }
        },
        legend: {
            itemMarginBottom: 4,
            itemStyle: {
                fontSize: '16px',
                fontFamily: 'Nanum Gothic',
                color: '#666666',
                lineHeight: '1.2'
            }
        },
        series: wordData
    });
}

//8.[TBS] 제조사별/이슈별 분포 (이슈구분)
function ewr8(Url){
	var wordData=[{}];
	var status ="";
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=8&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
			
	wordData[0].name = "이슈구분";
	wordData[0].data = [{}];
	if(data.total== 0){
		wordData[0].data[0] = {name:"없음",y: 0};
	}
	$.each(data.result,function(index,item){
		wordData[0].data[index] = {name : item.tech_info_div_nm , y : this["count(*)"]*1};
		
	});
	/*[{
        name: '이슈구분',
        data: [{
            name: '시정조치',
            y: 116,
        }, {
            name: '대상이 명확한 수리(통지)',
            y: 95,
        }, {
            name: '대상이 명확한 수리(미통지)',
            y: 55,
        }, {
            name: '대상이 불명확한 무상수리',
            y: 210,
        }, {
            name: '기타',
            y: 120,
        }]
    }]*/
	//이슈구분 파이 차트
    Highcharts.setOptions({
        colors: ['#0db2a1','#8bc24a','#ff9700','#ff5e80']
    });
    Highcharts.chart('issueGraph', {
        credits: false,
        exporting: {
            buttons: {
                contextButton:{
                    enabled: false
                }
            }
        },
        chart: {
            type: 'pie',
            width: 908,
            marginLeft: 300,
            marginRight: 300,
            height: '330px'
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '<b> {point.name}</b><b>{point.y}</b><b>건</b>'
        },
        plotOptions : {
            pie : {
                center: ['50%', '50%'],
                showInLegend: true,
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %',
                    distance: -35,
                    style : {
                        fontSize: '18px',
                        fontFamily: 'Nanum Gothic',
                        textOutline: false,
                        color: '#ffffff'
                    }
                }
            },
            series : {
                size: '100%',
                innerSize: '40%',
                style : {
                    fontSize: '16px'
                }
            }
        },
        legend: {
            itemStyle: {
                fontSize: '16px',
                fontFamily: 'Nanum Gothic',
                color: '#666666',
                lineHeight: '1.2'
            }
        },
        series : wordData
        
    });
}
//9.[TBS] 시정조치 내역
function ewr9(Url,techNm){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	//초기값 없을시 
	if(techNm =="" || techNm == null ){
		techNm ="시정조치";
	}
	$(".area_full").children('.issue-tbl2').find('tbody').html("");
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=9&kwd="+techNm+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
			
	$.each(data.result,function(index,item){
		y = this["write_time_ymd"].substr(0,4);
		m = this["write_time_ymd"].substr(4,2);
		d = this["write_time_ymd"].substr(6,2);
		htmlList += "<tr class='table_border_top'>";
		htmlList += "<td>"+y+"."+m+"."+d+"</td>";
		htmlList += "<td>"+this["maker_name"]+"</td>";
		htmlList += "<td>"+this["tech_info_recv_no"]+"</td>";
		htmlList += "<td>"+this["car_name_txt"]+"</td>";
		htmlList += "<td>"+this["tech_info_mng_no"]+"</td>";
		htmlList += "<td>"+this["tech_info_seq"]+"</td>";
		htmlList += "</tr>";
		
		htmlList += "<tr>";
		htmlList += "<td colspan='3' class='table-text-left'>"+this["tech_info_nm"]+"</td>";
		htmlList += "<td colspan='3' class='table-text-left'>"+this["occr_rsn_des"]+"</td>";
		htmlList += "</tr>";
		
		htmlList += "<tr class='table_border_bottom'>";
		htmlList += "<td colspan='3' class='table-text-left'>"+this["noact_phnm_des"]+"</td>";
		htmlList += "<td colspan='3' class='table-text-left'>"+this["tech_info_stat_cd"]+"</td>";
		htmlList += "</tr>";
	});
	
	$(".area_full").children('.issue-tbl2').find('tbody').append(htmlList);
	
}
//10.[기술분석] 기술분석 추이
function ewr10(Url){
	var color = [7,9,0];
	var wordData= [] ;
	var categorie = [];
	var idx = 0;
	
	//기간만큼 카테고리 입력
	var text = startDate+'';
	var i=0;
	while(true){
		categorie[i]= text.substr(4,2) + "월 " + text.substr(6,2) + "일" ;
		if(text == endDate){
			break;
		}
		text = dateAddDel(text,1,'d');
		i++;
	}	
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=10&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
		
	for(var i=0; i<3; i++){
		wordData[i] = {};
		if(i==0){
			wordData[i].name = "충돌";
		}else if(i==1){
			wordData[i].name = "화재";
		}else if(i==2){
			wordData[i].name = "기타";
		}
		wordData[i].data = [];
		//wordData[i].color = colors[color[i]];
	}

	$.each(data.result,function(index,item){
		//라인 그래프
		if(item.acdt_div_nm_lst != null && item.acdt_div_nm_lst != '' && item.acdt_div_nm_lst.length > 0){
			if(item.acdt_div_nm_lst == "충돌"){
				idx = 0;
			}else if(item.acdt_div_nm_lst == "화재"){
				idx = 1;
			}else if(item.acdt_div_nm_lst == "기타"){
				idx = 2;
			}
			//wordData[idx].name = item.acdt_div_nm_lst;
		}else{
			for(var j=0; j < categorie.length; j++){	//기간 길이만큼 반복
				if(cateNum(categorie[j]) == item.write_time_ymd.substr(4)){	//카테고리와 날짜 데이터와 같으면 입력
					wordData[idx].data[j] = this['count(*)']*1;
				}else{
					if(wordData[idx].data[j] != 0 && wordData[idx].data[j] == null){
						wordData[idx].data[j] = 0;
					}
					
				}
			}
		}
		
	});
	
	Highcharts.chart('madeTSBTop5Graph', {
        credits: false,
        exporting: {
            buttons: {
                contextButton:{
                    enabled: false
                }
            }
        },
        title: {text: null},
        subtitle: {text: null},
        chart : {
            width: 800,
            height: '300px',
            spacingBottom: 54,
            marginTop: 27,
            spacingLeft: 49,
            spacingRight: 49
        },
        xAxis : {
            categories: categorie,
            labels: {
            	rotation: 10,
                style : {
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'NotoSansKR-DemiLight-Hestia'
                },
            },
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                style : {
                    fontSize: '16px',
                    color: '#333333',
                    fontFamily: 'NotoSansKR-DemiLight-Hestia'
                },
            },
        },
        legend: {
            y: 40,
            itemStyle : {
                fontWeight: 'normal',
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'Nanum Gothic'
            }
        },
        series: wordData,
    });	
}

//11.[기술분석] 기술분석 발생 빈도 
function ewr11(Url){
	var wordData=[{}];
	var status ="";
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=11&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
		
	$.each(data.result,function(index,item){
		for(var i=0; i<4; i++){
			status = $(".area_margin_left").children('.issue-tbl1').find('tbody').children().eq(i).children("th").text();
			
			if(this["acdt_div_nm_lst"] == status){
				$(".area_margin_left").children('.issue-tbl1').find('tbody').children().eq(i).children("td").children('a').text(this["count(*)"]);
			}
		}
	});
	$(".area_margin_left").children('.issue-tbl1').find('tbody').children().children("td").children('a').click(function(){
		localStorage.analNm = $(this).parent().prev().text();
	});
}

//12.[기술분석] 충돌/화재/기타 분포
function ewr12(Url){
	var temp= [];
	var wordData1=[{}];
	var wordData2=[{}];
	var wordData3=[{}];
	var wordData4=[{}];
	var idx1=0;
	var idx2=0;
	var idx3=0;
	var idx4=0;
	var enName=['allGraph','crashGraph','fireGraph','ectGraph'];
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=12&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
			
	wordData1[0].name = "제조사 TOP 10";
	wordData1[0].data = [{}];
	wordData2[0].name = "제조사 TOP 10";
	wordData2[0].data = [{}];
	wordData3[0].name = "제조사 TOP 10";
	wordData3[0].data = [{}];
	wordData4[0].name = "제조사 TOP 10";
	wordData4[0].data = [{}];
	$.each(data.result,function(index,item){
		
		if(item.acdt_div_nm_lst == null || item.acdt_div_nm_lst == '' || item.acdt_div_nm_lst.length < 0 ){ //전체
			wordData1[0].data[idx1] = {name:this['maker_name'],y:this['count(*)']*1};
			idx1++;
		}
		
		if(item.acdt_div_nm_lst != null && item.acdt_div_nm_lst != '' && item.acdt_div_nm_lst.length > 0 && item.acdt_div_nm_lst == '충돌'){
			wordData2[0].data[idx2] = {name:this['maker_name'],y:this['count(*)']*1};
			idx2++;
		}
		
		if(item.acdt_div_nm_lst != null && item.acdt_div_nm_lst != '' && item.acdt_div_nm_lst.length > 0 && item.acdt_div_nm_lst == '화재'){
			wordData3[0].data[idx3] = {name:this['maker_name'],y:this['count(*)']*1};
			idx3++;
		}
		
		if(item.acdt_div_nm_lst != null && item.acdt_div_nm_lst != '' && item.acdt_div_nm_lst.length > 0 && item.acdt_div_nm_lst == '기타'){
			wordData4[0].data[idx4] = {name:this['maker_name'],y:this['count(*)']*1};
			idx4++;
		}
		
	});
	if(idx1 == 0){
		wordData1[0].data[0] = {name:"없음",y: 0};
	}
	if(idx2 == 0){
		wordData2[0].data[0] = {name:"없음",y: 0};
	}
	if(idx3 == 0){
		wordData3[0].data[0] = {name:"없음",y: 0};
	}
	if(idx4 == 0){
		wordData4[0].data[0] = {name:"없음",y: 0};
	}
	temp[0] = wordData1;
	temp[1] = wordData2;
	temp[2] = wordData3;
	temp[3] = wordData4;

	// 파이 그래프(전체,충돌,화재,기타)
	Highcharts.setOptions({
        colors: ['#0db2a1','#009c47','#8bc24a','#ff9700','#ff5e80','#eb0a0a', '#ac26a8','#9962ff', '#0c2e86', '#0067b3']
    });
    
    for(var i=0; i<4; i++){
        Highcharts.chart(enName[i], {
            credits: false,
            exporting: {
                buttons: {
                    contextButton:{
                        enabled: false
                    }
                }
            },
            chart: {
                type: 'pie',
                width: 348,
                height: '330px'
            },
            title: {
                text: null
            },
            tooltip: {
                pointFormat: '<b> {point.name}</b><b>{point.y}</b><b>건</b>'
            },
            plotOptions : {
                pie : {
                    center: ['50%', '50%'],
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        format: '{point.percentage:.1f} %',
                        distance: -35,
                        style : {
                            fontSize: '18px',
                            fontFamily: 'Nanum Gothic',
                            textOutline: false,
                            color: '#ffffff'
                        }
                    }
                },
                series : {
                    size: '100%',
                    innerSize: '40%',
                    style : {
                        fontSize: '16px'
                    }
                }
            },
            legend: {
                itemStyle: {
                    fontSize: '16px',
                    fontFamily: 'Nanum Gothic',
                    color: '#666666',
                    lineHeight: '1.2'
                }
            },
            series: temp[i]
        });
    }	
}

//13.[기술분석] 충돌내역
function ewr13(Url,techNm){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	//초기값 없을시 
	if(techNm =="" || techNm == null ){
		techNm ="전체";
	}
	$(".area_full").children('.issue-tbl2').find('tbody').html("");
	
	var data = commonApiAjax(apiUrl, "lang=ewr&num=13&kwd="+techNm+"&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, ""));		
			
	$.each(data.result,function(index,item){
		y = this["write_time_ymd"].substr(0,4);
		m = this["write_time_ymd"].substr(4,2);
		d = this["write_time_ymd"].substr(6,2);
		htmlList += "<tr class='table_border_top'>";
		htmlList += "<td>"+y+"."+m+"."+d+"</td>";
		htmlList += "<td>"+this["maker_name"]+"</td>";
		htmlList += "<td>"+this["acdt_div_nm_lst"]+"</td>";
		htmlList += "<td>"+this["anal_dat_recv_no"]+"</td>";
		htmlList += "<td>"+this["anal_dat_nm"]+"</td>";
		htmlList += "</tr>";
		
		htmlList += "<tr class='table_border_bottom'>";
		htmlList += "<td colspan='2' class='table-text-left'>"+this["acdt_rsn_des"]+"</td>";
		htmlList += "<td>"+this["acdt_rslt_des"]+"</td>";
		htmlList += "<td colspan='2' class='table-text-left'>"+this["inptn_des"]+"</td>";
		htmlList += "</tr>";
	});

	$(".area_full").children('.issue-tbl2').find('tbody').append(htmlList);
}


/*******************************************************
** 위험도 현황										  ** 
********************************************************/
//1. 장치명
function risk1(Url){
	var htmlList="";
	//var title1 =  $('.area_margin_left').children(".title").children('.main_title');
	
	var data = commonApiAjax(apiUrl, "lang=risk&num=1");	

	$.each(data.result,function(index,item){
		htmlList += '<a class="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom" href="#">'+item.upper_dvc+'</a>';
		if(index == 0){
			localStorage.device = item.upper_dvc;	//웹스토리지 최초 장치 등록
		}		
		$(".word_ranking").html(htmlList);
	});
	
	risk2(Url,localStorage.device);					//2. 리스크 매트릭스
	risk3(Url,localStorage.device, "");
	//장치 클릭 이벤트
	$(".word_ranking").children('a').click(function (){
		$(".word_ranking").children('a').removeClass('active');
		$(this).addClass('active');
		//localStorage.clear();	
		localStorage.removeItem('defective');
		localStorage.device = $(this).text(); //웹스토리지 장치 등록
		//title1.children().eq(1).text($(this).text());
		risk2(Url,localStorage.device);					//2. 리스크 매트릭스
		risk3(Url,localStorage.device,localStorage.defective);
	});
	
}

//2. 리스크 매트릭스
function risk2(Url,dev){
	var htmlList="";
	var tbody = $('.area_risk_matrics').find('tbody');
	
	$("#devTitle").html(dev);
	
	var data = commonApiAjax(apiUrl, "lang=defective&num=2&dev=" + dev);	

	//장치 리스크 매트릭스 초기화
	for(var i=0; i<5; i++){
		for(var j=0; j<5; j++){
			tbody.children("tr").eq(i).children('td').eq(j).children('span').text("0");
			tbody.children("tr").eq(i).children('td').eq(j).children('div').remove();
		}
	}
	
	$.each(data.result,function(index,item){
		if( this["risk_cls"] != 'none' ){
			var itemData = this["total"];
			
			if(item.risk_lv == '5'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(0).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(0).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(0).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(0).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(0).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '4'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(1).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(1).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(1).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(1).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(1).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '3'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(2).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(2).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(2).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(2).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(2).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '2'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(3).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(3).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(3).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(3).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(3).children('td').eq(4).children('span').html(itemData);
				}
			}else if(item.risk_lv == '1'){
				if(item.risk_rm == 'l1'){
					tbody.children("tr").eq(4).children('td').eq(0).children('span').html(itemData);
				}else if(item.risk_rm == 'l2'){
					tbody.children("tr").eq(4).children('td').eq(1).children('span').html(itemData);
				}else if(item.risk_rm == 'l3'){
					tbody.children("tr").eq(4).children('td').eq(2).children('span').html(itemData);
				}else if(item.risk_rm == 'l4'){
					tbody.children("tr").eq(4).children('td').eq(3).children('span').html(itemData);
				}else if(item.risk_rm == 'l5'){
					tbody.children("tr").eq(4).children('td').eq(4).children('span').html(itemData);
				}
			}
			
		}
		
	});	
	
}

//리스크매트릭스 툴팁
function riskHtml(tbody,eq1,eq2,division1_name,petition_style_name,total){
	var htmlList ='';
	var cnt = 0;
	cnt = tbody.children("tr").eq(eq1).children('td').eq(eq2).children('a').text();
	tbody.children("tr").eq(eq1).children('td').eq(eq2).children('a').text((cnt*1)+1 + '');
	
	if(cnt == 0){
		htmlList += '<div class="popupLayer">';
		htmlList += '	<div>';
		htmlList += '		<span onClick="closeLayer(this)" style="cursor:pointer;font-size:1.5em" title="닫기">X</span>';
		htmlList += '	</div>';
		htmlList += '<span><a href="#" >'+ division1_name +'-' +petition_style_name + "</a></span> : <span>" + total + '</span><br>' ;
		htmlList += '</div>';
		tbody.children("tr").eq(eq1).children('td').eq(eq2).append(htmlList);
	}else{
		tbody.children("tr").eq(eq1).children('td').eq(eq2).children('div').append('<span><a href="#" >'+ division1_name +'-' +petition_style_name + "</a></span> : <span>" + total + '</span><br>');
	}
	
}

//3. 위험도 상세 현황
function risk3(Url,dev,def){
	var htmlList="";
	$(".area_full").children('.issue-tbl2').find('tbody').html("");
	
	var data = commonApiAjax(apiUrl, "lang=risk&num=3&dev="+dev);			
	
	$.each(data.result,function(index,item){
		htmlList += "<tr>";
		htmlList += "<td>"+item.risk_lv+"</td>";
		htmlList += "<td>"+item.risk_rm+"</td>";
		htmlList += "<td>"+item.division1_name+"</td>";
		htmlList += "<td>"+item.petition_style_name+"</td>";
		htmlList += "<td>"+item.maker_name+ "</td>";
		htmlList += "<td>"+item.receipt_content+"</td>";
		htmlList += "</tr>";
		
		if(index ==4){
			//return false;
		}
	});
	$(".area_full").children('.issue-tbl2').find('tbody').html(htmlList);
	
}
/*******************************************************
** 관계도 현황										  ** 
********************************************************/
//3. 관계도 그래프
function relation3(Url,ele1,ele2){
	var wordData=[];
	var wordNode=[];
	var title1 =  $('.area_margin_left').children(".title").children('.main_title');
	var element1=element(ele1);
	var element2=element(ele2);
	var temp = "";
	var str = "";
	var idx =0;
	var NodeIdx = 0;
	
	var data = commonApiAjax(apiUrl, "lang=relation&num=3&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, "")+"&ele1="+ele1+"&ele2="+ele2);			

	for(var i =0; i<(data.total*1); i++){
		wordNode[i]= {};
		wordNode[i].target ="";
	}
	for(var i=0; i<(data.rows*1); i++){
		wordData[i]=[];
	}
	//alert(wordData.length +" | "+ wordNode.length);
	$.each(data.result,function(index,item){
		if(index < data.total){
			if(this[element1] != null){
				wordNode[index].id = this[element1];
				wordNode[index].title = this[element1];
				wordNode[index].name = this[element1];
				//wordNode[index].color = colors[index];
				wordNode[index].target = element1;
			}else{
				wordNode[index].id = this[element2];
				wordNode[index].title = this[element2];
				wordNode[index].name = this[element2];
				//wordNode[index].color = colors[index];
				wordNode[index].target = element2;
			}

		}else{
			wordData[idx]= [this[element1],this[element2],(this["count(*)"]*1)];
			idx++;
			
		}
	});
	
	//제작사와 장치 간의 관계 그래프
    Highcharts.chart('relationGraph', {
        credits: false,
        exporting: {
            buttons: {
                contextButton: {
                    enabled: false
                }
            }
        },
        chart: {
            width: 578,
            height: 434,
            marginTop: 77,
            marginBottom: 77
        },
        plotOptions: {
            series: {
                nodeWidth: 57,
                events: {
                    click: function (event) {	//클라우드 하자클릭 이벤트
                    	var idx = event.point.index;
                    	var value1 = event.point.series.data[idx].from;
                    	var value2 = event.point.series.data[idx].to;
                    	var name = event.point.name;
                    	
                    	if(event.point.name.indexOf("highcharts") != -1 ){
                    		localStorage.value1 = value1;
                    		localStorage.value2 = value2;
                    		
                    		//console.log(event.point.series.data[idx].from + "-" + event.point.series.data[idx].to);
                    	}else{
                    		if(event.point.target == element1 ){
                    			localStorage.value1 = name;
	                    		localStorage.value2 = '';
                    		}else{
                    			localStorage.value1 = '';
	                    		localStorage.value2 = name;
                    		}
                    		
                    		//console.log(event.point.name);
                    	}
                 
                    }
                }
            }
        },
        title: {
            text: null
        },
        series: [{
            keys: ['from', 'to', 'weight'],
            data: wordData,
            nodes: wordNode,
            type: 'dependencywheel',
            name: null,
            dataLabels: {
                color: '#333333',
                style: {
                    fontSize: '14px',
                    fontFamily: 'Nanum Gothic',
                },
                textPath: {
                    enabled: true,
                    attributes: {
                        dy: 5
                    }
                },
                distance: 24
            },
            size: '95%'
        }]

    });
	
}

//4. 결함 이슈 상세 리스트
function relation4(Url,ele1,ele2,value1,value2){
	var htmlList="";
	var y="";
	var m="";
	var d="";
	var element1=eleParam(ele1);
	var element2=eleParam(ele2);
	
	var data = commonApiAjax(apiUrl, "lang=relation&num=4&startDate="+$("#regDtmStart").val().replace(/-/gi, "")+"&endDate="+$("#regDtmEnd").val().replace(/-/gi, "")+"&ele1="+ele1+"&ele2="+ele2);			

	$.each(data.result,function(index,item){
		htmlList += "<tr>";
		y = this["write_time_ymd"].substr(0,4);
		m = this["write_time_ymd"].substr(4,2);
		d = this["write_time_ymd"].substr(6,2);
		htmlList += "<td>"+y+"."+m+"."+d+"</td>";
		htmlList += "<td>"+item.maker_name+"</td>";
		htmlList += "<td>"+item.car_name+"</td>";
		htmlList += "<td>"+item.eptn_name+"</td>";
		if(item.division3_name != null && item.division3_name != "" && item.division3_name.length > 0){
			htmlList += "<td>"+item.division1_name+ ">" + item.division3_name +"</td>";
		}else{
			htmlList += "<td>"+item.division1_name+"</td>";
		}
	
		htmlList += "<td>"+item.petition_style_name+ "</td>";
		htmlList += "<td>"+item.receipt_result+"</td>";
		htmlList += "</tr>";
		if(index==4){
			//return false;
		}
	});
	$(".area_full").children('.issue-tbl2').find('tbody').html(htmlList);
	
}

function element(ele){
	var field_ele;
	if(ele == "제작사") {
		field_ele= "maker_name";
	}else if(ele == "장치") {
		field_ele= "division1_name";
	}else if(ele == "하자") {
		field_ele= "petition_style_name";
	}else if(ele == "연료타입") {
		field_ele= "fuel_name";
	}else if(ele == "주행거리") {
		field_ele= "covered_distance";
	}else if(ele == "배기량") {
		field_ele= "baegi";
	}
	return field_ele;
}

function eleParam(ele){
	var field_ele;
	if(ele == "제작사") {
		field_ele= "maker";
	}else if(ele == "장치") {
		field_ele= "dev";
	}else if(ele == "하자") {
		field_ele= "def";
	}else if(ele == "연료타입") {
		field_ele= "Year_type";
	}else if(ele == "주행거리") {
		field_ele= "covered_distance";
	}else if(ele == "배기량") {
		field_ele= "baegi";
	}
	return field_ele;
}

/*******************************************************
** 외부정보 현황											  ** 
********************************************************/
//1. 소방 파이 그래프
function information1(Url){
	var htmlList="";
	var wordData=[];
	var color = [7,9,4,0,1];
	

	
	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("pageNum=" + num) ,
		success: function(data){
			wordData.name = "제작사별";
			wordData.data = [{}];
			$.each(data.result,function(index,item){
				wordData.data[index] = {name : item.mkaer_name , y : this["count(*)"] ,color : colors[color[index]] };
				
			});
			
			/*[{
                name: '제작사별',
                data: [{
                    name: '현대',
                    y: 200,
                    color: colors[7]
                }, {
                    name: '기아',
                    y: 50,
                    color: colors[9]
                }, {
                    name: '비엠더블유',
                    y: 11,
                    color: colors[0]
                }, {
                    name: '아우디',
                    y: 39,
                    color: colors[1]
                }]*/
			
			//국산/수입 리콜 분석 파이 그래프
            Highcharts.chart('recallPieGraph1', {
                credits: false,
                exporting: {
                    buttons: {
                        contextButton:{
                            enabled: false
                        }
                    }
                },
                chart: {
                    type: 'pie',
                    width: 550,
                    spacingLeft: 0,
                    height: '187.5',
                    marginRight: 110
                },
                title: {
                    text: null
                },
                tooltip: {
                    pointFormat: '<b> {point.name}</b><b>{point.y}</b><b>건</b>'
                },
                plotOptions : {
                    pie : {
                        center: ['50%', '50%'],
                        showInLegend: true,
                        color : "#ffffff",
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.1f} %',
                            distance: -35,
                            style : {
                                fontWeight: 'normal',
                                fontSize: '16px',
                                fontFamily: 'Nanum Gothic',
                                textOutline: false
                            },
                            filter: {
                                property: 'percentage',
                                operator: '>',
                                value: 4
                            }
                        }
                    },
                    series : {
                        size: '100%',
                        innerSize: '40%',
                        style : {
                            fontSize: '16px'
                        }
                    }
                },
                legend: {
                    itemStyle: {
                        fontWeight: 'normal',
                        fontSize: '16px',
                        fontFamily: 'Nanum Gothic',
                        color: '#666666'
                    },
                    itemMarginBottom : 13,
                    layout: 'vertical',
                    backgroundColor: '#FFFFFF',
                    align: 'left',
                    verticalAlign: 'top',
                    floating: true,
                    x: 390,
                    y: 25
                },
                series: wordData
            });
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
}

//2. 소방 막대 그래프
function information2(Url){
	
}

//3. 환경부 파이 그래프
function information3(Url){
	
}

//4. 환경부 막대 그래프
function information4(Url){
	
}

//5. 경찰서 파이 그래프
function information5(Url){
	
}

//6. 경찰서 막대 그래프
function information6(Url){
	
}

//7. 보험사 파이 그래프
function information7(Url){
	
}

//8. 보험사 막대 그래프
function information8(Url){
	
}
/*******************************************************
** 리콜 현황											  ** 
********************************************************/
//1. 국산 수입 리콜수
function recall1(Url,num){
	var wordData =[{},{}];
	var categorie1 = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
	
	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("date="+date),
		success: function(data){
			for(var i=0; i <2; i++){
				if(i == 0){
					wordData[i].name = "국산";
				}else{
					wordData[i].name = "수입";
				}
				
				wordData[i].data = [];
				if(i == 0){
					wordData[i].color = colors[7];
				}else{
					wordData[i].color = colors[1];
				}
			}
			//초기화
			for(var i=0; i <2; i++){
				for(var j=0; j < categorie1.length; j++){	
					wordData[i].data[j] = 0;
				}
			}

			$.each(data.result,function(index,item){
				if(item.inout_name == "국산" ){
					//국산 데이터
					wordData[0].data[((item.write_time_m*1)-1)] = this['sum(recall_car_totcount)']*1;
				}else{
					//수입
					wordData[1].data[((item.write_time_m*1)-1)] = this['sum(recall_car_totcount)']*1;
				}
			});

		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
			
			//국산/수입 리콜 수 그래프
            Highcharts.chart('recallNumGraph', {
                credits: false,
                exporting: {
                    buttons: {
                        contextButton: {
                            enabled: false
                        }
                    }
                },
                chart: {
                    type: 'column',
                    width: 1158,
                    spacingLeft: 80,
                    spacingRight: 80,
                    marginTop: 60,
                    height: "350px"
                },
                title: {
                    text: null
                },
                subtitle: {
                    text: null
                },
                xAxis: {
                    categories: categorie1,
                    labels: {
                        style: {
                            fontSize: '18px',
                            color: '#333333',
                            fontFamily: 'Nanum Gothic'
                        },
                    }
                },
                yAxis: {
                    tickAmount: 6,
                    title: {
                        text: null
                    },
                    labels: {
                        style: {
                            fontSize: '16px',
                            color: '#333333',
                            fontFamily: 'Nanum Gothic'
                        },
                    },
                },
                legend: {
                    enabled: true,
                    itemStyle: {
                        fontWeight: 'normal',
                        fontSize: '16px',
                        color: '#666666',
                        fontFamily: 'Nanum Gothic'
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        pointWidth: 20
                    },
                    series: {
                        color: '#0db2a1',
                        borderWidth: 0,
                        dataLabels: {
                            y: 10,
                            enabled: true,
                            format: '{point.y:.f}',
                            style: {
                                fontSize: '16px',
                                textOutline: false
                            }
                        }
                    }
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.f}</b>'
                },
                series:wordData
            });
			
		}
		,timeout:100000
	});
}

//2. 국산 수입 리콜 분석
function recall2(Url){
	var wordData =[{}];
	var color = [7,1];
	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("date="+date),
		success: function(data){
			wordData[0].data = [];
			$.each(data.result,function(index,item){
	
				wordData[0].data[index] = {name: item.inout_name , y : this['count(*)']*1, color: colors[color[index]] };

			});

		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
			
			//국산/수입 리콜 분석 파이 그래프
            Highcharts.chart('recallPieGraph', {
                credits: false,
                exporting: {
                    buttons: {
                        contextButton: {
                            enabled: false
                        }
                    }
                },
                chart: {
                    type: 'pie',
                    width: 638,
                    height: '350px',
                    marginTop: 30
                },
                title: {
                    text: null
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        showInLegend: true,
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.1f} %',
                            distance: -65,
                            style: {
                                fontSize: '18px',
                                fontFamily: 'Nanum Gothic',
                                textOutline: false
                            },
                        }

                    }
                },
                legend: {
                    enabled: true,
                    itemStyle: {
                        fontWeight: 'normal',
                        fontSize: '16px',
                        color: '#666666',
                        fontFamily: 'Nanum Gothic'
                    }
                },
                series: wordData
            });
			
		}
		,timeout:100000
	});
}

//3. 리콜 시정조치
function recall3(Url){
	var wordData =[{},{}];
	var categorie = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("date="+date),
		success: function(data){
			wordData[0].type = 'column';
			wordData[0].name = '조치완료';
			wordData[0].data = [];
			wordData[0].color = colors[6];
			wordData[1].type = 'line';
			wordData[1].name = '조치완료(누적)';
			wordData[1].data = [];
			wordData[1].color = colors[2];
			//초기화
			for(var i=0; i <2; i++){
				for(var j=0; j < categorie.length; j++){	
					wordData[i].data[j] = 0;
				}
			}
			$.each(data.result,function(index,item){
				wordData[0].data[((item.write_time_m*1)-1)] = this['sum(corec_totcount)']*1;
			});

		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();

			$.ajax({
				type : "GET",
				url : Url,
				dataType : "json",
				//data: encodeURI("date="+date),
				success: function(data){
					$.each(data.result,function(index,item){
						wordData[1].data[((item.write_time_m*1)-1)] = this['sum(corec_totcount)']*1;
					});
					
					Highcharts.chart('recallCorrectGraph', {
                        credits: false,
                        exporting: {
                            buttons: {
                                contextButton: {
                                    enabled: false
                                }
                            }
                        },
                        chart: {
                            width: 1818,
                            height: '300px',
                            marginTop: 34,
                            spacingRight: 40,
                            spacingLeft: 40
                        },
                        title: {
                            text: null
                        },
                        xAxis: {
                            categories: categorie,
                            labels: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: '#333333',
                                    fontFamily: 'Nanum Gothic'
                                },
                            },
                        },
                        yAxis: {
                            title: {
                                text: null
                            },
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                pointWidth: 40
                            },
                        },
                        legend: {
                            itemStyle: {
                                fontWeight: 'normal',
                                fontSize: '16px',
                                color: '#666666',
                                fontFamily: 'Nanum Gothic'
                            }
                        },
                        series: wordData
                    });
				}
				,beforeSend:function(){
					loading();
				}
				,complete:function(){
					loadingRemove();
				}
				,timeout:100000
			});
			
		}
		,timeout:100000
	});
}

//4. 제작사별 시정율 (국산)
function recall4(Url){
	var htmlList = "";
	var tbody1 = $(".area_full").children('.simplebar_wrap').eq(0).find('tbody');	//국산
	var total = 0;
	var preMaker = "";
	var cnt =0;
	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("date="+date),
		success: function(data){
			total = (data.total*1)+1;
			//alert(tbody1.html());
			$.each(data.result,function(index,item){
				if(this["maker_name"] != null && index ==0 ){
					htmlList += "<tr>";
					htmlList += "<td rowspan=' "+ total +"'>"+ "국산" +"</td>";
					htmlList += "<td>"+this["maker_name"]+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					preMaker = this["maker_name"];
					cnt++;
				}
				
				if(this["maker_name"] != null && preMaker == this["maker_name"] && this["recall_year"] == date && cnt ==1){
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					htmlList += "</tr>";
					preMaker = this["maker_name"];
					cnt =0;
				
				}
				
				if(this["maker_name"] != null && index !=0 && preMaker != this["maker_name"] && this["recall_year"] == ((date*1)-1)+"" && cnt ==0 ){
					//alert(this["recall_year"] +" : "+ this["maker_name"]);
					htmlList += "<tr>";
					htmlList += "<td>"+this["maker_name"]+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					preMaker = this["maker_name"];
					cnt++;
				}
				
				if(this["maker_name"] != null && index !=0 && preMaker != this["maker_name"] && this["recall_year"] == ((date*1)-1)+"" && cnt ==1 ){
					//alert(this["recall_year"] +" : "+ this["maker_name"]);
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "</tr>";
					
					htmlList += "<tr>";
					htmlList += "<td>"+this["maker_name"]+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					preMaker = this["maker_name"];
					
				}
				if(this["maker_name"] != null && index !=0 && preMaker != this["maker_name"] && this["recall_year"] == date && cnt == 1 ){
					//alert(this["recall_year"] +" : "+ this["maker_name"]);
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "</tr>";
					preMaker = this["maker_name"];
					cnt =0;
					
					if(cnt == 0 && this["recall_year"] == date+""  ){
						htmlList += "<tr>";
						htmlList += "<td>"+this["maker_name"]+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
						htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
						htmlList += "<td>"+this["car_per"]+"</td>";
						htmlList += "</tr>";
						preMaker = this["maker_name"];
						cnt =0;
					}
					
				}
				
				if(this["maker_name"] != null && index !=0 && preMaker != this["maker_name"] && this["recall_year"] != ((date*1)-1)+"" && cnt ==0){
					//alert(this["maker_name"]);
					htmlList += "<tr>";
					htmlList += "<td>"+this["maker_name"]+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					htmlList += "</tr>";
					preMaker = this["maker_name"];
					cnt =0;
				}
				
				if(this[date+"_car_per"] != null && this[date+"_car_per"].length > 0 ){
					//alert(this["maker_name"]);
					if(cnt == 1){
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "</tr>";
					}
					htmlList += "<tr class='table_sum'>";
					htmlList += "<td>"+"합계"+"</td>";

					htmlList += "<td>"+numberWithCommas(this[((date*1)-1)+""+"_recall_car_totcount_Sum"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this[((date*1)-1)+""+"_corec_totcount_Sum"])+"</td>";
					htmlList += "<td>"+this[((date*1)-1)+""+"_car_per"]+"</td>";
					htmlList += "<td>"+numberWithCommas(this[date+"_recall_car_totcount_Sum"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this[date+"_corec_totcount_Sum"])+"</td>";
					htmlList += "<td>"+this[date+"_car_per"]+"</td>";
					htmlList += "</tr>";
		
				}
				
			});
			
			tbody1.html(htmlList);
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
}

//5. 제작사별 시정율 (수입)
function recall5(Url){
	var tbody1 = $(".area_full").children('.simplebar_wrap').eq(1).find('tbody');	//수입
	var htmlList = "";
	var total = 0;
	var preMaker = "";
	var cnt =0;
	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("date="+date),
		success: function(data){
			total = (data.total*1)+1;
			//alert(tbody1.html());
			$.each(data.result,function(index,item){
				if(this["maker_name"] != null && index ==0 ){
					htmlList += "<tr>";
					htmlList += "<td rowspan=' "+ total +"'>"+ "수입" +"</td>";
					htmlList += "<td>"+this["maker_name"]+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					preMaker = this["maker_name"];
					cnt++;
				}
				
				if(this["maker_name"] != null && preMaker == this["maker_name"] && this["recall_year"] == date && cnt ==1){
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					htmlList += "</tr>";
					preMaker = this["maker_name"];
					cnt =0;
				
				}
				
				if(this["maker_name"] != null && index !=0 && preMaker != this["maker_name"] && this["recall_year"] == ((date*1)-1)+"" && cnt ==0 ){
					//alert(this["recall_year"] +" : "+ this["maker_name"]);
					htmlList += "<tr>";
					htmlList += "<td>"+this["maker_name"]+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					preMaker = this["maker_name"];
					cnt++;
				}
				
				if(this["maker_name"] != null && index !=0 && preMaker != this["maker_name"] && this["recall_year"] == ((date*1)-1)+"" && cnt ==1 ){
					//alert(this["recall_year"] +" : "+ this["maker_name"]);
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "</tr>";
					
					htmlList += "<tr>";
					htmlList += "<td>"+this["maker_name"]+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					preMaker = this["maker_name"];
					
				}
				if(this["maker_name"] != null && index !=0 && preMaker != this["maker_name"] && this["recall_year"] == date && cnt == 1 ){
					//alert(this["recall_year"] +" : "+ this["maker_name"]);
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "</tr>";
					preMaker = this["maker_name"];
					cnt =0;
					
					if(cnt == 0 && this["recall_year"] == date+""  ){
						htmlList += "<tr>";
						htmlList += "<td>"+this["maker_name"]+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
						htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
						htmlList += "<td>"+this["car_per"]+"</td>";
						htmlList += "</tr>";
						preMaker = this["maker_name"];
						cnt =0;
					}
					
				}
				
				if(this["maker_name"] != null && index !=0 && preMaker != this["maker_name"] && this["recall_year"] != ((date*1)-1)+"" && cnt ==0){
					//alert(this["maker_name"]);
					htmlList += "<tr>";
					htmlList += "<td>"+this["maker_name"]+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+"0"+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(recall_car_totcount)"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this["sum(corec_totcount)"])+"</td>";
					htmlList += "<td>"+this["car_per"]+"</td>";
					htmlList += "</tr>";
					preMaker = this["maker_name"];
					cnt =0;
				}
				
				if(this[date+"_car_per"] != null && this[date+"_car_per"].length > 0 ){
					//alert(this["maker_name"]);
					if(cnt == 1){
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "<td>"+"0"+"</td>";
						htmlList += "</tr>";
					}
					htmlList += "<tr class='table_sum'>";
					htmlList += "<td>"+"합계"+"</td>";

					htmlList += "<td>"+numberWithCommas(this[((date*1)-1)+""+"_recall_car_totcount_Sum"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this[((date*1)-1)+""+"_corec_totcount_Sum"])+"</td>";
					htmlList += "<td>"+this[((date*1)-1)+""+"_car_per"]+"</td>";
					htmlList += "<td>"+numberWithCommas(this[date+"_recall_car_totcount_Sum"])+"</td>";
					htmlList += "<td>"+numberWithCommas(this[date+"_corec_totcount_Sum"])+"</td>";
					htmlList += "<td>"+this[date+"_car_per"]+"</td>";
					htmlList += "</tr>";
		
				}
				
				
			});
			
			tbody1.html(htmlList);
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
}

/*******************************************************
** 필터	 api										  ** 
********************************************************/
//1. 제조사
function filter1(Url,num){
	var htmlList="";

	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("pageNum=" + num ),
		success: function(data){
			htmlList += "<option>제조사</option>";
			$.each(data.result,function(index,item){
				
				htmlList += "<option>"+item.maker_name+"</option>";
				
			});
			$("#select1").append(htmlList);
			
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
}

//2. 배기량
function filter2(Url,num){
	var htmlList="";

	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("pageNum=" + num ),
		success: function(data){
			htmlList += "<option>배기량</option>";
			$.each(data.result,function(index,item){
				htmlList += "<option>"+item.baegi+"</option>";
				
			});
			$("#select2").append(htmlList);
			
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
}
//3. 연식
function filter3(Url,num){
	var htmlList="";

	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("pageNum=" + num) ,
		success: function(data){
			htmlList += "<option>연식</option>";
			$.each(data.result,function(index,item){
				htmlList += "<option>"+item.year_type+"</option>";
				
		});
			$("#select3").append(htmlList);
			
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
}
//4. 주행거리
function filter4(Url,num){
	var htmlList="";

	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("pageNum=" + num) ,
		success: function(data){
			htmlList += "<option>주행거리</option>";
			$.each(data.result,function(index,item){
				htmlList += "<option>"+item.covered_distance+"</option>";
				
			});
			$("#select4").append(htmlList);
			
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
}

//5. 엔진 타입
function filter5(Url,num){
	var htmlList="";

	$.ajax({
		type : "GET",
		url : Url,
		dataType : "json",
		data: encodeURI("pageNum=" + num) ,
		success: function(data){
			htmlList += "<option>엔진타입</option>";
			$.each(data.result,function(index,item){
				htmlList += "<option>"+item.engine_type+"</option>";
				
			});
			$("#select5").append(htmlList);
			
		}
		,beforeSend:function(){
			loading();
		}
		,complete:function(){
			loadingRemove();
		}
		,timeout:100000
	});
}


//// anal.js

/** 필터 api */
var apiUrl_filter_1 = "http://"+ host_name + "/anal/anal.do?lang=filter&num=1";
var apiUrl_filter_2 = "http://"+ host_name + "/anal/anal.do?lang=filter&num=2";
var apiUrl_filter_3 = "http://"+ host_name + "/anal/anal.do?lang=filter&num=3";
var apiUrl_filter_4 = "http://"+ host_name + "/anal/anal.do?lang=filter&num=4";
var apiUrl_filter_5 = "http://"+ host_name + "/anal/anal.do?lang=filter&num=5";
var apiUrl_filter_6 = "http://"+ host_name + "/anal/anal.do?lang=filter&num=6";
var apiUrl_filter_7 = "http://"+ host_name + "/anal/anal.do?lang=filter&num=7";

/** 종합상황판 api */
var apiUrl_main_1 = "http://"+ host_name + "/anal/anal.do?lang=main&num=1";
var apiUrl_main_2 = "http://"+ host_name + "/anal/anal.do?lang=main&num=2";
var apiUrl_main_3 = "http://"+ host_name + "/anal/anal.do?lang=main&num=3";
var apiUrl_main_4 = "http://"+ host_name + "/anal/anal.do?lang=main&num=4";
var apiUrl_main_5 = "http://"+ host_name + "/anal/anal.do?lang=main&num=5";
var apiUrl_main_6 = "http://"+ host_name + "/anal/anal.do?lang=main&num=6";

/** 장치현황 api */
var apiUrl_device_1 = "http://"+ host_name + "/anal/anal.do?lang=device&num=1";
var apiUrl_device_2 = "http://"+ host_name + "/anal/anal.do?lang=device&num=2";
var apiUrl_device_3 = "http://"+ host_name + "/anal/anal.do?lang=device&num=3";
var apiUrl_device_4 = "http://"+ host_name + "/anal/anal.do?lang=device&num=4";
var apiUrl_device_5 = "http://"+ host_name + "/anal/anal.do?lang=device&num=5";

/** 하자현황 api */
var apiUrl_def_1 = "http://"+ host_name + "/anal/anal.do?lang=defective&num=1";
var apiUrl_def_2 = "http://"+ host_name + "/anal/anal.do?lang=defective&num=2";
var apiUrl_def_3 = "http://"+ host_name + "/anal/anal.do?lang=defective&num=3";
var apiUrl_def_4 = "http://"+ host_name + "/anal/anal.do?lang=defective&num=4";
var apiUrl_def_5 = "http://"+ host_name + "/anal/anal.do?lang=defective&num=5";
var apiUrl_def_6 = "http://"+ host_name + "/anal/anal.do?lang=defective&num=6";

/** 제작사 현황 api */
var apiUrl_maker_1 = "http://"+ host_name + "/anal/anal.do?lang=maker&num=1";
var apiUrl_maker_2 = "http://"+ host_name + "/anal/anal.do?lang=maker&num=2";
var apiUrl_maker_3 = "http://"+ host_name + "/anal/anal.do?lang=maker&num=3";
var apiUrl_maker_4 = "http://"+ host_name + "/anal/anal.do?lang=maker&num=4";
var apiUrl_maker_5 = "http://"+ host_name + "/anal/anal.do?lang=maker&num=5";
var apiUrl_maker_6 = "http://"+ host_name + "/anal/anal.do?lang=maker&num=6";
var apiUrl_maker_7 = "http://"+ host_name + "/anal/anal.do?lang=maker&num=7";

/** 언론 현황 api */
var apiUrl_news_1 = "http://"+ host_name + "/anal/anal.do?lang=news&num=1";
var apiUrl_news_2 = "http://"+ host_name + "/anal/anal.do?lang=news&num=2";
var apiUrl_news_3 = "http://"+ host_name + "/anal/anal.do?lang=news&num=3";
var apiUrl_news_4 = "http://"+ host_name + "/anal/anal.do?lang=news&num=4";
var apiUrl_news_5 = "http://"+ host_name + "/anal/anal.do?lang=news&num=5";
var apiUrl_news_6 = "http://"+ host_name + "/anal/anal.do?lang=news&num=6";
var apiUrl_news_7 = "http://"+ host_name + "/anal/anal.do?lang=news&num=7";
var apiUrl_news_8 = "http://"+ host_name + "/anal/anal.do?lang=news&num=8";
var apiUrl_news_9 = "http://"+ host_name + "/anal/anal.do?lang=news&num=9";

/** 모니터링 현황 api */
var apiUrl_monitoring_1 = "http://"+ host_name + "/anal/anal.do?lang=monitoring&num=1";
var apiUrl_monitoring_2 = "http://"+ host_name + "/anal/anal.do?lang=monitoring&num=2";
var apiUrl_monitoring_3 = "http://"+ host_name + "/anal/anal.do?lang=monitoring&num=3";
var apiUrl_monitoring_4 = "http://"+ host_name + "/anal/anal.do?lang=monitoring&num=4";
var apiUrl_monitoring_5 = "http://"+ host_name + "/anal/anal.do?lang=monitoring&num=5";
var apiUrl_monitoring_6 = "http://"+ host_name + "/anal/anal.do?lang=monitoring&num=6";

/** EWR 현황 api */
var apiUrl_ewr_1 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=1";
var apiUrl_ewr_2 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=2";
var apiUrl_ewr_3 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=3";
var apiUrl_ewr_4 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=4";
var apiUrl_ewr_5 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=5";
var apiUrl_ewr_6 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=6";
var apiUrl_ewr_7 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=7";
var apiUrl_ewr_8 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=8";
var apiUrl_ewr_9 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=9";
var apiUrl_ewr_10 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=10";
var apiUrl_ewr_11 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=11";
var apiUrl_ewr_12 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=12";
var apiUrl_ewr_13 = "http://"+ host_name + "/anal/anal.do?lang=ewr&num=13";


/** 위험도 현황 api */
var apiUrl_risk_1 = "http://"+ host_name + "/anal/anal.do?lang=risk&num=1";
var apiUrl_risk_2 = "http://"+ host_name + "/anal/anal.do?lang=risk&num=2";
var apiUrl_risk_3 = "http://"+ host_name + "/anal/anal.do?lang=risk&num=3";


/** 관계도 현황 api */
var apiUrl_relation_1 = "http://"+ host_name + "/anal/anal.do?lang=relation&num=1";
var apiUrl_relation_2 = "http://"+ host_name + "/anal/anal.do?lang=relation&num=2";
var apiUrl_relation_3 = "http://"+ host_name + "/anal/anal.do?lang=relation&num=3";
var apiUrl_relation_4 = "http://"+ host_name + "/anal/anal.do?lang=relation&num=4";
var apiUrl_relation_5 = "http://"+ host_name + "/anal/anal.do?lang=relation&num=5";
var apiUrl_relation_6 = "http://"+ host_name + "/anal/anal.do?lang=relation&num=6";


/** 외부정보 현황 api */
var apiUrl_information_1 = "http://"+ host_name + "/anal/anal.do?lang=information&num=1";
var apiUrl_information_2 = "http://"+ host_name + "/anal/anal.do?lang=information&num=2";
var apiUrl_information_3 = "http://"+ host_name + "/anal/anal.do?lang=information&num=3";
var apiUrl_information_4 = "http://"+ host_name + "/anal/anal.do?lang=information&num=4";
var apiUrl_information_5 = "http://"+ host_name + "/anal/anal.do?lang=information&num=5";
var apiUrl_information_6 = "http://"+ host_name + "/anal/anal.do?lang=information&num=6";
var apiUrl_information_7 = "http://"+ host_name + "/anal/anal.do?lang=information&num=7";
var apiUrl_information_8 = "http://"+ host_name + "/anal/anal.do?lang=information&num=8";
var apiUrl_information_9 = "http://"+ host_name + "/anal/anal.do?lang=information&num=9";


/** 국내외 리콜 현황 api */
var apiUrl_recall_1 = "http://"+ host_name + "/anal/anal.do?lang=recall&num=1";
var apiUrl_recall_2 = "http://"+ host_name + "/anal/anal.do?lang=recall&num=2";
var apiUrl_recall_3 = "http://"+ host_name + "/anal/anal.do?lang=recall&num=3";
var apiUrl_recall_4 = "http://"+ host_name + "/anal/anal.do?lang=recall&num=4";
var apiUrl_recall_5 = "http://"+ host_name + "/anal/anal.do?lang=recall&num=5";

var win;

/** 종합상황판 */
function MainService(){
	mainInit();					//기본세팅
	main1(apiUrl_main_1);		//1. 결함신고 발생건수
	//main2(apiUrl_main_2);		//2. 리스크 매트릭스
	main3(apiUrl_main_3);		//3. 결함신고 최근 내역
	
	/* 매트릭스 마우스 오버 위치 근처에 레이어가 나타난다. */
	$(".area_risk_matrics").children('.simplebar_wrap').find('tbody').children("tr").children('td').hover(function(e)
	{
		//alert($(this).next().html() + " : " + "이벤트 호출");
		var sWidth = window.innerWidth;
		var sHeight = window.innerHeight;
		
		var oWidth = $(this).children('span').next().width();
		var oHeight = $(this).children('span').next().height();
		
		// 레이어가 나타날 위치를 셋팅한다.
		var divLeft =  65;
		var divTop =  -75;

		// 레이어가 화면 크기를 벗어나면 위치를 바꾸어 배치한다.
		if( divLeft + oWidth > sWidth ) divLeft -= oWidth;
		if( divTop + oHeight > sHeight ) divTop -= oHeight;
		
		// 레이어 위치를 바꾸었더니 상단기준점(0,0) 밖으로 벗어난다면 상단기준점(0,0)에 배치하자.
		/*if( divLeft < 0 ) divLeft = 0;
		if( divTop < 0 ) divTop = 0;*/

		$(this).children('span').next().css({
			"top": divTop,
			"left": divLeft,
			"position": "absolute",
		}).show();
	},function(e){
		$(this).children('span').next().css({
			"position": "absolute",
		}).hide();
	});

}
function DetailService(){
	detailInit();				//기본세팅
	var detailDate =  $('.date');
	detailDate.html("<p>" + stedDate() + "</p>" );
	
	main4(apiUrl_main_4);		//4. 결함장치별 발생건수
	main5(apiUrl_main_5);		//5. 급상승검색어
	main6(apiUrl_main_6);		//6. 제작사별/장치별/하자별 비중
}

/** 장치 현황 */
function devMainService(){ 
	mainInit();					//기본세팅
	device1(apiUrl_device_1);	//1. 장치명
	//filterInit();				//필터 초기화
	

}
function devDetailService(){
	var title1 =  $('.area_degree').children(".title").children('.main_title');
	var title2 = $('.area_process').children(".title").children('.main_title');
	var title3 = $('.area_full').children(".title").children('.main_title');
	var detailDate =  $('.date');
	
	detailInit();													//기본세팅
	device3(apiUrl_device_3,device,startDate,endDate,'','');		//3. 발생추이
	device4(apiUrl_device_4,device);								//4. 상세 종류별
	device5(apiUrl_device_5,device);								//5. 결함이슈 상세 리스트
	//부제목 변경
	title1.children().eq(1).text(device);
	title2.children().eq(1).text(device);
	title3.children().eq(1).text(device);
	detailDate.html("<p>" + stedDate() + "</p>" );
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		storageSet();												//스토리지 세팅
		device3(apiUrl_device_3,device,startDate,endDate,'','');	//3. 발생추이
		device4(apiUrl_device_4,device);							//4. 상세 종류별
		device5(apiUrl_device_5,device);							//5 .결함이슈 상세 리스트 
		//부제목 변경
		title1.children().eq(1).text(device);
		title2.children().eq(1).text(device);
		title3.children().eq(1).text(device);
		detailDate.html("<p>" + stedDate() + "</p>" );
		
	},false);
}

/** 하자 현황 */
function defMainService(){
	mainInit();								//기본세팅
	defective1(apiUrl_def_1,"wordcloud"); 	//1. 클라우드 차트	
	//filterInit();							//필터 초기화
	
	/* 매트릭스 마우스 오버 위치 근처에 레이어가 나타난다. */
	$(".area_risk_matrics").children('.table').find('tbody').children("tr").children('td').hover(function(e)
	{
		//alert($(this).next().html() + " : " + "이벤트 호출");
		var sWidth = $(".area_risk_matrics").children('.table').innerWidth();
		var sHeight = $(".area_risk_matrics").children('.table').innerHeight();
		
		var wWidth = $("#textGraph").innerWidth();
		var wHeight = $("#textGraph").innerHeight();
		
		var oWidth = $(this).children('span').width();
		var oHeight = $(this).children('span').height();
		//alert($(this).children('span').text());
		
		//팝업 사이즈 
		var pWidth = $(this).children('span').next().width();
		var pHeight = $(this).children('span').next().height();
		
		// 레이어가 나타날 위치를 셋팅한다.
		var divLeft =  oWidth+45;
		var divTop =  oHeight+50;
		
		//alert(sWidth + " | " + sHeight + " / " + e.pageX +"-"+ wWidth + "+" + pWidth + " | " + (e.pageX-wWidth+pWidth));
		// 레이어가 화면 크기를 벗어나면 위치를 바꾸어 배치한다.
		if( e.pageX-wWidth+pWidth > sWidth ){
			divLeft = oWidth - pWidth +45;
			$(this).children('span').next().addClass('changed');
		}
		//if( divTop + oHeight > sHeight ) divTop -= oHeight;
		
		// 레이어 위치를 바꾸었더니 상단기준점(0,0) 밖으로 벗어난다면 상단기준점(0,0)에 배치하자.
		/*if( divLeft < 0 ) divLeft = 0;
		if( divTop < 0 ) divTop = 0;*/

		$(this).children('span').next().css({
			"bottom": divTop,
			"left": divLeft,
			"position": "absolute",
		}).show();
	},function(e){
		$(this).children('span').next().css({
			"position": "absolute",
		}).hide();
		$(".popupLayer").removeClass('changed');
	});
}
function defDetailService(){
	var title1 =  $('.area_degree').children(".title").children('.main_title');
	var title2 = $('.area_process').children(".title").children('.main_title');
	var title3 = $('.area_full').children(".title").children('.main_title');
	var detailDate =  $('.date');
	
	detailInit()													//기본세팅
	defective4(apiUrl_def_4,defective,startDate,endDate,'','');		//4. 발생 빈도수 (그래프용)
	defective5(apiUrl_def_5,defective,startDate,endDate,'','');		//5. 처리상태
	defective6(apiUrl_def_6,defective);								//6. 결함 이슈 상세 리스트
	//부제목 변경
	title1.children().eq(1).text(defective);
	title2.children().eq(1).text(defective);
	title3.children().eq(1).text(defective);
	detailDate.html("<p>" + stedDate() + "</p>" );
	
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		storageSet();													//스토리지 세팅
		defective4(apiUrl_def_4,defective,startDate,endDate,'','');		//4. 발생 빈도수 (그래프용)
		defective5(apiUrl_def_5,defective,startDate,endDate,'','');		//5. 처리 상태
		defective6(apiUrl_def_6,defective);								//6. 결함 이슈 상세 리스트
		//부제목 변경
		title1.children().eq(1).text(defective);
		title2.children().eq(1).text(defective);
		title3.children().eq(1).text(defective);
		detailDate.html("<p>" + stedDate() + "</p>" );
		
	},false);	
}

/** 제작사 현황 */
function makerMainService(){
	var mainDate = $(".desc");				//기간 설정
	mainInit();								//기본세팅
	maker1(apiUrl_maker_1); 				//1. 상위제작사 top 5
	maker2(apiUrl_maker_2); 				//2. 전체 제작사별	차량결함
	mainDate.text(stedDate());
}		
function makerDetailService(){
	var title1 =  $('.area_wrap').children(".title").children('.main_title');
	var title2 =  $('.area_full').children(".title").children('.main_title');
	var detailDate =  $('.date');
	
	detailInit();
	maker5(apiUrl_maker_5);					//5. 차량 결함(그래프용)
	maker6(apiUrl_maker_6);					//6. 차량 결함(장치용)
	maker7(apiUrl_maker_7);					//7. 결함이슈 상세 리스트
	//부제목 설정
	title1.children().eq(1).text(maker);
	title2.children().eq(1).text(maker);
	detailDate.html("<p>" + stedDate() + "</p>" );
	
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		storageSet();						//스토리지 세팅
		maker5(apiUrl_maker_5);				//5. 차량 결함(그래프용)
		maker6(apiUrl_maker_6);				//6. 차량 결함(장치용)
		maker7(apiUrl_maker_7);				//7. 결함이슈 상세 리스트
		//부제목 설정
		title1.children().eq(1).text(maker);
		title2.children().eq(1).text(maker);
		detailDate.html("<p>" + stedDate() + "</p>" );
	},false);
}

/** 언론 현황 */	
function newsMainService(){
	mainInit();								//기본세팅
	var tabNm =$(".tabs").children('ul').children('li.active').text();
	$.cookie('tabNm',tabNm);	
	news4(apiUrl_news_4,tabNm);					//4. 급상승 검색어
	
	//탭 클릭 이벤트
	$(".tabs").children('ul').children('li').click(function (){
		var tabNm ="";
		$(".tabs").children('ul').children('li').removeClass('active');
		$(this).addClass('active');
		tabNm = $(this).text();
		
		if(tabNm =="연관키워드"){
			$(".area_wrap").children('div').eq(0).removeClass('display-none');
			$(".area_wrap").children('div').eq(1).addClass('display-none');
			$(".area_wrap").children('div').eq(2).addClass('display-none');
			//news1(apiUrl_news_1,localStorage.kwd);
			news4(apiUrl_news_4,tabNm);					//4. 급상승 검색어
			
		}else if(tabNm =="이슈사이클"){
			$(".area_wrap").children('div').eq(0).addClass('display-none');
			$(".area_wrap").children('div').eq(1).removeClass('display-none');
			$(".area_wrap").children('div').eq(2).addClass('display-none');
			news2(apiUrl_news_2);
			//news2(apiUrl_news_2,localStorage.kwd);
		}else if(tabNm =="커뮤니티"){
			$(".area_wrap").children('div').eq(0).addClass('display-none');
			$(".area_wrap").children('div').eq(1).addClass('display-none');
			$(".area_wrap").children('div').eq(2).removeClass('display-none');
			//news3(apiUrl_news_3,localStorage.kwd);
			news7(apiUrl_news_7,tabNm);	//7. KWC 급상승 검색어
			
		}else{
			$(".area_wrap").children('div').eq(0).addClass('display-none');
			$(".area_wrap").children('div').eq(1).addClass('display-none');
			$(".area_wrap").children('div').eq(2).addClass('display-none');
		}
	});
	
	/*//조회 버튼 클릭 이벤트
	$(".btn").click(function (){
		var tabNm ="";					//언론현황 탭 이름
		tabNm = $(".tabs").children('ul').children('.active').text();
		kwd = $(".sort_input").children('input').val();
		
		if(kwd == ""){
			alert("키워드를 입력해주세요.");
			return false;
		}else{	
			localStorage.kwd = kwd;
			if(tabNm =="연관키워드"){
				news1(apiUrl_news_1,kwd);
			}else if(tabNm =="이슈사이클"){
				//news2(apiUrl_news_2,localStorage.kwd);
			}else if(tabNm =="커뮤니티"){
				news3(apiUrl_news_3,kwd);
			}else{
				
			}
		}
	});*/
}
function newsDetailService(){
	var title =  $('.area_col2').eq(0).children(".title").children('.main_title');
	var title1 =  $('.area_col2').eq(1).children(".title").children('.main_title');
	var detailDate =  $('.date');
	var tabNm = $.cookie('tabNm');	
	detailInit();							//기본세팅
	$(".word_ranking").html("");			//언론 상세현황 연관기사 초기화
	
	news5(apiUrl_news_5,kwd,pageNum);	//5. 연관 기사 (제목)
	news6(apiUrl_news_6,kwd,1);			//6. 기사 보기 (내용)

	//부제목 설정
	title.children().eq(1).text(kwd);
	detailDate.html("<p>" + stedDate() + "</p>" );
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		var tabNm = $.cookie('tabNm');	
		$(".word_ranking").html("");		//언론 상세현황 연관기사 초기화
		pageNum = 1;						//페이지 번호 초기화
		storageSet();						//스토리지 세팅
		
		if(tabNm== "연관키워드"){
			title.children().eq(2).text("연관 기사");
			title1.children().eq(1).text("기사보기");
			news5(apiUrl_news_5,kwd,pageNum);	//5. 연관 기사 (제목)
			news6(apiUrl_news_6,kwd,1);			//6. 기사 보기 (내용)
		}else if(tabNm =="이슈사이클" ){
			
		}else if(tabNm =="커뮤니티" ){
			title.children().eq(2).text("커뮤니티");
			title1.children().eq(1).text("본문보기");
			news8(apiUrl_news_8,kwd,pageNum);	//5. KWC 연관 기사 (제목)
			news9(apiUrl_news_9,kwd,1);			//6. KWC 기사 보기 (내용)
		}	

		//부제목 설정
		title.children().eq(1).text(kwd);
		detailDate.html("<p>" + stedDate() + "</p>" );
		//alert("페이지 번호 : "+pageNum);
	},false);
	
	//더보기 클릭이벤트
	$(".area_center").children('.btn').click(function (){
		if(tabNm== "연관키워드" ){
			news5(apiUrl_news_5,kwd,pageNum);	//5. 연관 기사 (제목)
		}else if(tabNm =="이슈사이클"){
			
		}else if(tabNm =="커뮤니티"){
			news8(apiUrl_news_8,kwd,pageNum);	//8. KWC 연관 기사 (제목)
		}	
	});
}

/** 모니터링 현황 */
function monMainService(){
	mainInit();								//기본세팅
	monitoring3(apiUrl_monitoring_3);		//3. 제작사별 모니터링 비율
	monitoring4(apiUrl_monitoring_4);		//4. 장치별 모니터링 비율
}
function monDetailService(){
	detailInit();							//기본세팅
	
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		storageSet();						//스토리지 세팅

		
	},false);
}

/** EWR 현황 */
function ewrMainService(){
	var tabNm ="";
	tabNm = $(".tabs").children('ul').children('.active').text();
	localStorage.ewrNm = tabNm;			//현재 탭이름 상새현황에 전달	
	
	mainInit();								//기본세팅
	
	if(tabNm =="무상수리"){
		$(".tab_contents").children('div').eq(0).removeClass('display-none');
		$(".tab_contents").children('div').eq(1).addClass('display-none');
		$(".tab_contents").children('div').eq(2).addClass('display-none');
		$(".tab_contents").children('div').eq(3).addClass('display-none');
		$(".tab_contents").children('div').eq(4).addClass('display-none');
		ewr1(apiUrl_ewr_1);				//1. 제작사/장치/ TOP10 무상수리 비중
		ewr2(apiUrl_ewr_2);				//2.[무상수리] 제작사 TOP10 무상수리 증가 추이 
	}else if(tabNm =="TSB"){
		$(".tab_contents").children('div').eq(0).addClass('display-none');
		$(".tab_contents").children('div').eq(1).removeClass('display-none');
		$(".tab_contents").children('div').eq(2).removeClass('display-none');
		$(".tab_contents").children('div').eq(3).addClass('display-none');
		$(".tab_contents").children('div').eq(4).addClass('display-none');
		ewr5(apiUrl_ewr_5);				//5. 제조사별 TSB 추이 TOP5
		ewr6(apiUrl_ewr_6);				//6. 제조사별 TSB 발생빈도
		ewr7(apiUrl_ewr_7);				//7. [TBS] 제조사별/이슈별 분포 (제조사 TOP10)
		ewr8(apiUrl_ewr_8);				//8. [TBS] 제조사별/이슈별 분포 (이슈구분)
	}else if(tabNm =="기술분석"){
		$(".tab_contents").children('div').eq(0).addClass('display-none');
		$(".tab_contents").children('div').eq(1).addClass('display-none');
		$(".tab_contents").children('div').eq(2).addClass('display-none');
		$(".tab_contents").children('div').eq(3).removeClass('display-none');
		$(".tab_contents").children('div').eq(4).removeClass('display-none');
		ewr10(apiUrl_ewr_10);			//10.[기술분석] 기술분석 추이
		ewr11(apiUrl_ewr_11);			//11.[기술분석] 기술분석 발생 빈도
		ewr12(apiUrl_ewr_12);			//12.[기술분석] 충돌/화재/기타 분포
	}else{
		$(".tab_contents").children('div').eq(0).removeClass('display-none');
		$(".tab_contents").children('div').eq(1).addClass('display-none');
		$(".tab_contents").children('div').eq(2).addClass('display-none');
		$(".tab_contents").children('div').eq(3).addClass('display-none');
		$(".tab_contents").children('div').eq(4).addClass('display-none');
		
	}
	
	$(".tabs").children('ul').children('li').click(function (){
		$(".tabs").children('ul').children('li').removeClass('active');
		$(this).addClass('active');
		tabNm = $(this).text();
		
		localStorage.ewrNm = tabNm;			//현재 탭이름 상새현황에 전달	
		
		if(tabNm =="무상수리"){
			$(".tab_contents").children('div').eq(0).removeClass('display-none');
			$(".tab_contents").children('div').eq(1).addClass('display-none');
			$(".tab_contents").children('div').eq(2).addClass('display-none');
			$(".tab_contents").children('div').eq(3).addClass('display-none');
			$(".tab_contents").children('div').eq(4).addClass('display-none');
			ewr1(apiUrl_ewr_1);				//1. 제작사/장치/ TOP10 무상수리 비중
			ewr2(apiUrl_ewr_2);				//2.[무상수리] 제작사 TOP10 무상수리 증가 추이 
		}else if(tabNm =="TSB"){
			$(".tab_contents").children('div').eq(0).addClass('display-none');
			$(".tab_contents").children('div').eq(1).removeClass('display-none');
			$(".tab_contents").children('div').eq(2).removeClass('display-none');
			$(".tab_contents").children('div').eq(3).addClass('display-none');
			$(".tab_contents").children('div').eq(4).addClass('display-none');
			ewr5(apiUrl_ewr_5);				//5. 제조사별 TSB 추이 TOP5
			ewr6(apiUrl_ewr_6);				//6. 제조사별 TSB 발생빈도
			ewr7(apiUrl_ewr_7);				//7. [TBS] 제조사별/이슈별 분포 (제조사 TOP10)
			ewr8(apiUrl_ewr_8);				//8. [TBS] 제조사별/이슈별 분포 (이슈구분)
		}else if(tabNm =="기술분석"){
			$(".tab_contents").children('div').eq(0).addClass('display-none');
			$(".tab_contents").children('div').eq(1).addClass('display-none');
			$(".tab_contents").children('div').eq(2).addClass('display-none');
			$(".tab_contents").children('div').eq(3).removeClass('display-none');
			$(".tab_contents").children('div').eq(4).removeClass('display-none');
			ewr10(apiUrl_ewr_10);			//10.[기술분석] 기술분석 추이
			ewr11(apiUrl_ewr_11);			//11.[기술분석] 기술분석 발생 빈도
			ewr12(apiUrl_ewr_12);			//12.[기술분석] 충돌/화재/기타 분포
		}else{
			$(".tab_contents").children('div').eq(0).removeClass('display-none');
			$(".tab_contents").children('div').eq(1).addClass('display-none');
			$(".tab_contents").children('div').eq(2).addClass('display-none');
			$(".tab_contents").children('div').eq(3).addClass('display-none');
			$(".tab_contents").children('div').eq(4).addClass('display-none');
			
		}
	});
}
function ewrDetailService(){
	detailInit();							//기본세팅
	var title1 =  $('.area_full').eq(0).children(".title").children('.main_title');	//무상수리 상세 부제목
	var title2 =  $('.area_full').eq(1).children(".title").children('.main_title');	//무상수리 상세 부제목
	var title3 =  $('.area_full').eq(2).children(".title").children('.main_title');	//TBS 상세 부제목
	var title4 =  $('.area_full').eq(3).children(".title").children('.main_title');	//기술정보 상세 부제목
	var detailDate =  $('.date');
	var tabNm = localStorage.ewrNm;
	
	detailDate.html("<p>" + stedDate() + "</p>" );
	title1.children().eq(1).text(maker);
	title2.children().eq(1).text(maker);
	
	if(tabNm =="무상수리"){
		$(".area_wrap").children('div').eq(0).removeClass('display-none');
		$(".area_wrap").children('div').eq(1).removeClass('display-none');
		$(".area_wrap").children('div').eq(2).addClass('display-none');
		$(".area_wrap").children('div').eq(3).addClass('display-none');
		ewr3(apiUrl_ewr_3);				//3.[무상수리] 장치별 무상수리 추이 
		ewr4(apiUrl_ewr_4);				//4.[무상수리] 결함 이슈 리스트
	}else if(tabNm =="TSB"){
		title3.children().eq(1).text(localStorage.techNm);	//기술정보 구분명
		$(".area_wrap").children('div').eq(0).addClass('display-none');
		$(".area_wrap").children('div').eq(1).addClass('display-none');
		$(".area_wrap").children('div').eq(2).removeClass('display-none');
		$(".area_wrap").children('div').eq(3).addClass('display-none');
		ewr9(apiUrl_ewr_9,localStorage.techNm);				////9.[TBS] 시정조치 내역
	}else if(tabNm =="기술분석"){
		title4.children().eq(1).text(localStorage.analNm);	//기술정보 구분명
		$(".area_wrap").children('div').eq(0).addClass('display-none');
		$(".area_wrap").children('div').eq(1).addClass('display-none');
		$(".area_wrap").children('div').eq(2).addClass('display-none');
		$(".area_wrap").children('div').eq(3).removeClass('display-none');
		ewr13(apiUrl_ewr_13,localStorage.analNm);				////9.[TBS] 시정조치 내역
	}
	
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		storageSet();						//스토리지 세팅
		tabNm = localStorage.ewrNm;
		$(".center").children(".main_title").text(tabNm  + " 상세현황");
		detailDate.html("<p>" + stedDate() + "</p>" );
		title1.children().eq(1).text(maker);
		title2.children().eq(1).text(maker);
		
		if(tabNm =="무상수리"){
			$(".area_wrap").children('div').eq(0).removeClass('display-none');
			$(".area_wrap").children('div').eq(1).removeClass('display-none');
			$(".area_wrap").children('div').eq(2).addClass('display-none');
			$(".area_wrap").children('div').eq(3).addClass('display-none');
			ewr3(apiUrl_ewr_3);				//3.[무상수리] 장치별 무상수리 추이 
			ewr4(apiUrl_ewr_4);				//4.[무상수리] 결함 이슈 리스트
		}else if(tabNm =="TSB"){
			title3.children().eq(1).text(localStorage.techNm);	//기술정보 구분명
			$(".area_wrap").children('div').eq(0).addClass('display-none');
			$(".area_wrap").children('div').eq(1).addClass('display-none');
			$(".area_wrap").children('div').eq(2).removeClass('display-none');
			$(".area_wrap").children('div').eq(3).addClass('display-none');
			ewr9(apiUrl_ewr_9,localStorage.techNm);				////9.[TBS] 시정조치 내역
		}else if(tabNm =="기술분석"){
			title4.children().eq(1).text(localStorage.analNm);	//기술정보 구분명
			$(".area_wrap").children('div').eq(0).addClass('display-none');
			$(".area_wrap").children('div').eq(1).addClass('display-none');
			$(".area_wrap").children('div').eq(2).addClass('display-none');
			$(".area_wrap").children('div').eq(3).removeClass('display-none');
			ewr13(apiUrl_ewr_13,localStorage.analNm);				////9.[TBS] 시정조치 내역
		}
		
	},false);
	
}

/** 위험도 현황 */
function riskMainService(){
	mainInit();								//기본세팅
	risk1(apiUrl_risk_1);					//1. 장치명
	
	/* 매트릭스 클릭시 클릭한 위치 근처에 레이어가 나타난다. */
	$(".area").children('.table').find('tbody').children("tr").children('td').children('a').click(function(e)
	{
		var sWidth = $(".area").children('.table').innerWidth();
		var sHeight = $(".area").children('.table').innerHeight();
		
		var oWidth = $(this).width();
		var oHeight = $(this).height();
		
		//팝업 사이즈 
		var pWidth = $(this).next().width();
		var pHeight = $(this).next().height();
		 
		// 레이어가 나타날 위치를 셋팅한다.
		var divLeft =  oWidth+75;
		var divTop =  oHeight+60;
		
		// 레이어가 화면 크기를 벗어나면 위치를 바꾸어 배치한다.
		if( e.clientX + pWidth > sWidth ){
			divLeft = oWidth - pWidth +75;
			$(this).next().addClass('changed');
		}else{
			
		}
		
		$(this).next().css({
			"bottom": divTop,
			"left": divLeft,
			"position": "absolute",
		}).show();
		
	});
	//영역 이외 클릭시 이벤트
	$('html').click(function(e){
		if($(e.target).prop('tagName') != 'A' && !$(e.target).hasClass('popupLayer')){
			$(".popupLayer").hide();
			$(".popupLayer").removeClass('changed');
		}
		
	});
	
	
}
function riskDetailService(){
	detailInit();							//기본세팅
	var title1 =  $('.area').children(".title").children('.main_title');
	var detailDate =  $('.date');
	
	risk3(apiUrl_risk_3,device,defective);	//3. 위험도 상세 리스트
	
	title1.children().eq(1).text(device);
	detailDate.html("<p>" + stedDate() + "</p>" );
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		storageSet();						//스토리지 세팅
		
		risk3(apiUrl_risk_3,device,defective);	//3. 위험도 상세 리스트
		
		title1.children().eq(1).text(device);
		detailDate.html("<p>" + stedDate() + "</p>" );

		
	},false);
}

/** 관계도 현황 */
function relMainService(){
	mainInit();								//기본세팅
	var title =  $('.area').children(".title").children('.main_title');
	var leftTab = $(".area_side").eq(0).children('ul').children('li');
	var rightTab = $(".area_side").eq(1).children('ul').children('li');
	var tabNm1 ="";
	var tabNm2 ="";
	var idx = 0;
	var ele1="";
	var ele2="";
	
	ele1 = $(".area_side").eq(0).children('ul').children('li.active').text();
	ele2 = $(".area_side").eq(1).children('ul').children('li.active').text();
	localStorage.ele1 = ele1;
	localStorage.ele2 = ele2;
	relation3(apiUrl_relation_3,ele1,ele2);	//3. 관계도 그래프
	
	//left 탭 클릭 이벤트
	leftTab.unbind();
	leftTab.click(function (){
		leftTab.removeClass('active');
		$(this).addClass('active');
		
		//해당 인덱스값 disable
		idx = $(this).index();
		rightTab.removeClass('disabled');
		rightTab.eq(idx).addClass('disabled');
		
		//오른쪽 탭 active 체크 
		if(idx == $(".area_side").eq(1).children('ul').children('li.active').index()){
			rightTab.removeClass('active');
			if(idx == 0){
				rightTab.eq(idx+1).addClass('active');
				title.children().eq(3).text($(".area_side").eq(1).children('ul').children('li.active').text());
			}else{
				rightTab.eq(0).addClass('active');
				title.children().eq(3).text($(".area_side").eq(1).children('ul').children('li.active').text());
			}
		}
		ele1 = $(".area_side").eq(0).children('ul').children('li.active').text();	//관계요소1
		ele2 = $(".area_side").eq(1).children('ul').children('li.active').text();	//관계요소2
		localStorage.ele1 = ele1;
		localStorage.ele2 = ele2;
		localStorage.removeItem('value1');
		localStorage.removeItem('value2');
		relation3(apiUrl_relation_3,ele1,ele2);	//3. 관계도 그래프
		
		tabNm1 = $(this).text();
		title.children().eq(1).text(tabNm1);
		
	});
	
	//right 탭 클릭 이벤트
	rightTab.unbind();
	rightTab.click(function (){
		if($(this).attr('class') != "disabled"){
			rightTab.removeClass('active');
			$(this).addClass('active');
			
			tabNm2 = $(this).text();
			title.children().eq(3).text(tabNm2);
			
			ele1 = $(".area_side").eq(0).children('ul').children('li.active').text();	//관계요소1
			ele2 = $(".area_side").eq(1).children('ul').children('li.active').text();	//관계요소2
			localStorage.ele1 = ele1;
			localStorage.ele2 = ele2;
			localStorage.removeItem('value1');
			localStorage.removeItem('value2');
			relation3(apiUrl_relation_3,ele1,ele2);	//3. 관계도 그래프
		}
	});
}
function relDetaiService(){
	detailInit();							//기본세팅
	var detailDate =  $('.date');
	detailDate.html("<p>" + stedDate() + "</p>" );
	
	var value1 = "";
	var value2 = "";
	if(localStorage.value1 !=null && localStorage.value1.length > 0){
		value1 =localStorage.value1;					//elq1 값
	}else{
		value1 = '';
	}
	
	if(localStorage.value2 !=null && localStorage.value2.length > 0){
		value2 =localStorage.value2;					//elq2 값
	}else{
		value2 = '';
	}
	
	relation4(apiUrl_relation_4,localStorage.ele1,localStorage.ele2,value1,value2); //4. 결함 이슈 상세 리스트
	
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		storageSet();						//스토리지 세팅
		if(localStorage.value1 !=null && localStorage.value1.length > 0){
			value1 =localStorage.value1;					//elq1 값
		}else{
			value1 = '';
		}
		
		if(localStorage.value2 !=null && localStorage.value2.length > 0){
			value2 =localStorage.value2;					//ele2 값
		}else{
			value2 = '';
		}
		
		relation4(apiUrl_relation_4,localStorage.ele1,localStorage.ele2,value1,value2);	//4. 결함 이슈 상세 리스트
	},false);
}

/** 외부정보 현황 */
function infMainService(){
	mainInit();								//기본세팅
	
	//information1(Url)						//1. 소방 파이 그래프
	
}
function infDetailService(){
	detailInit();							//기본세팅
	
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		storageSet();						//스토리지 세팅

		
	},false);
}

/** 국내외리콜 현황 */
function recMainService(){
	mainInit();								//기본세팅
	recall1(apiUrl_recall_1);				//1. 국산/수입 리콜 수
	recall2(apiUrl_recall_2);				//2. 국산 수입 리콜 분석
	recall3(apiUrl_recall_3);				//3. 리콜 시정조치
}
function recDetailService(){
	detailInit();		
	var detailDate =  $('.date');//기본세팅
	recall4(apiUrl_recall_4);				//4. 제작사별 시정율 (국산)
	recall5(apiUrl_recall_5);				//5. 제작사별 시정율 (수입)
	
	//상세 현황 시정률 년도 변경
	$(".area_full").children('.table').find('thead').children('tr').eq(0).children('th').eq(2).text(((date*1)-1)+"년");
	$(".area_full").children('.table').find('thead').children('tr').eq(0).children('th').eq(3).text(date+"년");
	detailDate.html("<p>" + date + "년</p>" );
	//스토리지 이벤트 리스너 
	window.addEventListener('storage',function(evt){
		storageSet();						//스토리지 세팅

		
	},false);
}


/** 현황 초기화 */
function mainInit(){
	localStorage.url=ctgr_detail_url;		//상세화면 초기화
	storageSet();							//스토리지 세팅
	setInit();								//설정 초기화 
	win = window.open("http://"+host_name+ctgr_detail_url,"detail","");
	//console.log(host_name+ " : " +ctgr_detail_url);
	
}

//상황판 설정 초기화
function setInit(){
	var list = new cookieList("cookieName");
	var itemInit = list.items();
	
	var setIdx=0;
	
	//초기 세팅 index ,check 값
	if($.cookie("setIdx")== null){
		$.cookie("setIdx",setIdx);
	}
	if($.cookie("check") ==null){
		$.cookie("check",$('.toggle_wrap').children('input').is(":checked"));
	}
	
	
	//설정값 초기화
	for(var i=0; i<itemInit.length; i++){
		$("span:contains('"+itemInit[i]+"')").parent().prev().attr("checked",true);
	}
	
	if($.cookie("check") == "true"){
		$('.toggle_wrap').children('input').attr("checked",true);
	}else{
		$('.toggle_wrap').children('input').attr("checked",false);
		clearInterval(timer);
	}

	
	//설정 버튼 클릭 이벤트
	$(".right_side").children("ul").children('li').eq(2).bind('click',function(){
		$(".popup_wrap").css("display","block") ;
	});
	
	//설정 종료 버튼
	$(".btn_close").bind('click',function(){
		$(".popup_wrap").css("display","none") ;
	});
	
	//취소 버튼
	$(".btn_group").children('a').eq(0).bind('click',function(){
		$(".popup_wrap").css("display","none") ;
	});
	
	//확인 버튼
	$(".btn_group").children('a').eq(1).bind('click',function(){
		$(".popup_wrap").css("display","none") ;
		list.clear();
		list = new cookieList("cookieName");
		$(".set_box input").each(function(){
			if($(this).is(":checked")){
				list.add($(this).next().children('span').eq(1).text());
			}
		});
		
		itemInit = list.items();
		
	});
	
	// 자동재생 버튼 이벤트
	$('.toggle_wrap').children('input').bind('click',function(){
		if($(this).is(":checked") == true){
			$.cookie("check","true");
			if(itemInit.length != 0){
				timer=setInterval(function(){
					setIdx = $.cookie("setIdx")*1;
					if(setIdx < (itemInit.length-1)){
						$.cookie("setIdx",(setIdx+1));
						//alert(setIdx +" : "+rtnCtgrUrl(itemInit[setIdx],0));
						setUrl(rtnCtgrUrl(itemInit[setIdx],0));
					}else{
						$.cookie("setIdx",0);
						//alert(setIdx +" : "+rtnCtgrUrl(itemInit[setIdx],0));
						setUrl(rtnCtgrUrl(itemInit[setIdx],0));
					}
					
				},5000);
			}
		}else{
			
			$.cookie("check","false");
			clearInterval(timer);
		}
	});
	
}
function detailInit(){
	localStorage.url=ctgr_main_url;		//메인화면 초기화
	storageSet();						//스토리지 세팅
	document.onkeydown = doNotReload;
	document.oncontextmenu = doNotMenu;
}

//상세화면 새로고침 방지
function doNotReload(){
	if(event.keyCode == 116){
		event.keyCode =2;
		return false;
	}else if(event.ctrlKey && (event.keyCode == 78 || event.keyCode == 82)){
		return false;
	}
}

//상세화면 마우스 우클릭 새로고침 막기
function doNotMenu(){
	if(event){
		event.preventDefault();
	}else{
		event.keyCode= 0;
		event.returnValue=false;
	}
}

/** 조회 버튼 초기화 */
function selectBtn(){
	//조회 버튼 클릭 이벤트
	$(".btn").click(function (){
		/** 언론 현황 */
		var tabNm ="";					//언론현황 탭 이름
		tabNm = $(".tabs").children('ul').children('.active').text();
		kwd = $(".sort_input").children('input').val();
		
		if(kwd == ""){
			alert("키워드를 입력해주세요.");
			return false;
		}else{	
			localStorage.kwd = kwd;
			if(tabNm =="연관키워드"){
				news1(apiUrl_news_1,kwd);
			}else if(tabNm =="이슈사이클"){
				//news2(apiUrl_news_2,localStorage.kwd);
			}else if(tabNm =="커뮤니티"){
				news3(apiUrl_news_3,kwd);
			}else{
				
			}
		}
		
		
	});
}
/** 필터 초기화 */
function filterInit(){
	$(".sort").children("select").html("");
	var filter1_size = 1;	//페이지 번호 
	var filter2_size = 1;
	var filter3_size = 1;
	var filter4_size = 1;
	var filter5_size = 1;
	filter1(apiUrl_filter_1,filter1_size);	
	filter2(apiUrl_filter_2,filter2_size);
	filter3(apiUrl_filter_3,filter3_size);
	filter4(apiUrl_filter_4,filter4_size);
	filter5(apiUrl_filter_5,filter5_size);
	
}
// 기간 (시작 ~ 종료) 문자열 받아오기 
function stedDate(){
	return startDate.substr(0,4) + ". " + startDate.substr(4,2) + ". " + startDate.substr(6,2) 
	+" ~ " + endDate.substr(0,4) + ". " + endDate.substr(4,2) + ". " + endDate.substr(6,2)
}

function setUrl(Url) {
	localStorage.clear();
	localStorage.url=Url;		//url 세팅
	$.ajax({
		type : "post",
		url : Url,
		dataType : "html",
		success: function(data){
			$("#wrap").html("");
			$("#wrap").html(data);
		}
		,beforeSend:function(){
			$('.wrap_loading').removeClass('display-none');
		}
		,complete:function(){
			$('.wrap_loading').addClass('display-none');
		}
		,timeout:100000
	});
}

// init.js
var path_name = window.location.pathname;


//0: 상환판 명, 1:상환판 코드, 2:Mian urlPath, 3: Detail urlPath 4: temp, 5: 설정 값
var ctgr_arr = [["종합상황판","device","/anal/Main.do","/anal/Detail.do","",0],
				["장치현황","device","/anal/devMain.do","/anal/devDetail.do","",0],
              ["하자현황","defectiv","/anal/defMain.do","/anal/defDetail.do","defMainService",0],
              ["제작사현황","maker","/anal/makerMain.do","/anal/makerDetail.do","",0],
              ["언론현황","news","/anal/newsMain.do","/anal/newsDetail.do","",0],
              ["모니터링현황","monitoring","/anal/monMain.do","/anal/monDetail.do","",0],
              ["EWR 현황","ewr","/anal/ewrMain.do","/anal/ewrDetail.do","",0],
              ["위험도현황","risk","/anal/riskMain.do","/anal/riskDetail.do","",0],
              ["관계도현황","relation","/anal/relMain.do","/anal/relDetail.do","",0],
              ["외부정보현황","information","/anal/infMain.do","/anal/infDetail.do","",0],
              ["리콜현황","recall","/anal/recMain.do","/anal/recDetail.do","",0]];

//해당 페이지 이름
var ctgr_cnt = ctgr_arr.length;
var ctgr_flag= 0;		//0 : 메인현황 1 :  상세현황
var ctgr_name= ""; 		//선택 카테고리 이름
var ctgr_main_url;		//상환판 Main url
var ctgr_detail_url;	//상환판 Detail url
var pageNum = 1;		//페이지 번호

//param
var kwd ="";				//언론 키워드
var device = "";			//장치
var defective ="";			//하자
var maker ="";				//제조사
var baegi ="";				//배기량
var year_type ="";			//연식
var covered_distance ="";	//주행거리
var engine_type ="";		//엔진타입
var date ="";				//기간 (개월)
var startDate ="";			//시작날짜 (년월일)
var endDate ="";			//종료날짜 (년월일)



/**
* 초기화 메인 메소드
*/
$(document).ready(function(){

});

//필터 날짜 초기화
function dateInit(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	//기간없을시 현재 날짜로 등록
	if( (localStorage.startDate ==null || localStorage.startDate =="" ) && (localStorage.endDate ==null || localStorage.endDate =="") ){
		if(mm <10){
			mm = '0' + mm;
		}
		if(dd <10){
			dd = '0' + dd;
		}
	
		endDate =""+yyyy+mm+dd;
		dd = today.getDate();
		mm = today.getMonth(today.getMonth(today.getMonth()-1));
		yyyy = today.getFullYear();
		if(mm <10){
			mm = '0' + mm;
		}
		if(dd <10){
			dd = '0' + dd;
		}
		startDate =""+yyyy+mm+dd;
		date = yyyy;
		
		localStorage.date = date;
		localStorage.startDate = startDate;
		localStorage.endDate = endDate;
	}
}

function dateSet(num){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	
	dd = today.getDate();
	mm = today.getMonth(today.setMonth(mm-num));
	
	yyyy = today.getFullYear();
	
	if(mm <10){
		mm = '0' + mm;
	}
	if(dd <10){
		dd = '0' + dd;
	}
	
	return  yyyy + "-" + mm + "-" + dd + '';
}

//통계_리콜현황 
function analys1(){
	var data = commonApiAjax(calcApiUrl, "num=1&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"");
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["inout_name"]=="국산"){
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["recall_year"]+"</td>";
			tmpHtml += "<td>"+this["recall_count"]+"</td>";
			tmpHtml += "<td>"+this["sum(recall_car_totcount)"]+"</td>";
			tmpHtml += "<td>"+this["sum(corec_totcount)"]+"</td>";
			tmpHtml += "<td>"+this["car_per"]+"</td>";			
		}else if(this.inout_name=="수입"){
			tmpHtml += "<td>"+this["recall_count"]+"</td>";
			tmpHtml += "<td>"+this["sum(recall_car_totcount)"]+"</td>";
			tmpHtml += "<td>"+this["sum(corec_totcount)"]+"</td>";
			tmpHtml += "<td>"+this["car_per"]+"</td>";			
		}else if(this.inout_name=="전체"){
			tmpHtml += "<td>"+this["recall_cnt"]+"</td>";
			tmpHtml += "<td>"+this["recall_car_totcount_Sum"]+"</td>";
			tmpHtml += "<td>"+this["corec_totcount_Sum"]+"</td>";
			tmpHtml += "<td>"+this["car_per"]+"</td>";	
			tmpHtml += "</tr>";			
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);
}

function analys2(){
	var data = commonApiAjax(calcApiUrl, "num=2&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"&maker="+$('[data-ax5select="maker"]').ax5select("getValue")[0].value+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		tmpHtml += "<tr>";
		tmpHtml += "<td>"+this["recall_year"]+"</td>";
		tmpHtml += "<td>"+this["division1_name"]+"</td>";
		tmpHtml += "<td>"+this["sum(recall_car_totcount)"]+"</td>";
		tmpHtml += "<td>"+this["sum(corec_totcount)"]+"</td>";
		tmpHtml += "<td>"+this["car_per"]+"</td>";	
		tmpHtml += "</tr>";			
	});
	$(".table-analy").find("tbody").html(tmpHtml);	
}

function analys3(){
	var data = commonApiAjax(calcApiUrl, "num=3&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"&maker="+$('[data-ax5select="maker"]').ax5select("getValue")[0].value+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		tmpHtml += "<tr>";
		tmpHtml += "<td>"+this["write_time_y"]+"</td>";
		tmpHtml += "<td>"+this["term1"]+"</td>";
		tmpHtml += "<td>"+this["term2"]+"</td>";
		tmpHtml += "<td>"+this["term3"]+"</td>";
		tmpHtml += "<td>"+this["term4"]+"</td>";
		tmpHtml += "<td>"+this["term5"]+"</td>";	
		tmpHtml += "<td>"+this["total"]+"</td>";	
		tmpHtml += "</tr>";			
	});
	$(".table-analy").find("tbody").html(tmpHtml);		
}

function analys4(){
	var data = commonApiAjax(calcApiUrl, "num=4&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"&maker="+$('[data-ax5select="maker"]').ax5select("getValue")[0].value+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		tmpHtml += "<tr>";
		tmpHtml += "<td>"+this["write_time_y"]+"</td>";
		tmpHtml += "<td>"+this["start_cnt"]+"</td>";
		tmpHtml += "<td>"+this["end_cnt"]+"</td>";
		tmpHtml += "<td>"+this["proportion"]+"</td>";
		tmpHtml += "</tr>";			
	});
	$(".table-analy").find("tbody").html(tmpHtml);		
}

function analys6(){
	var data = commonApiAjax(calcApiUrl, "num=6&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"&maker="+$('[data-ax5select="maker"]').ax5select("getValue")[0].value+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		tmpHtml += "<tr>";
		tmpHtml += "<td>"+this["year"]+"</td>";
		tmpHtml += "<td>"+this["count"]+"</td>";
		tmpHtml += "</tr>";			
	});
	$(".table-analy").find("tbody").html(tmpHtml);
}

function analys7(){
	var data = commonApiAjax(calcApiUrl, "num=7&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["write_time_ym"]==undefined){//년 계
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["write_time_y"]+"년 계</td>";
			tmpHtml += "<td>"+this[this["write_time_y"]+"_total"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";			
		}else{
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["write_time_ym"]+"</td>";
			tmpHtml += "<td>"+this["count(*)"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";				
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);	
}

function analys8(){
	var data = commonApiAjax(calcApiUrl, "num=8&def="+$('[name="defect"]').val()+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["inout_name"]==undefined){//
			tmpHtml += "<tr>";
			tmpHtml += "<td>계</td>";
			tmpHtml += "<td>"+this["total"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";			
		}else{
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["inout_name"]+"</td>";
			tmpHtml += "<td>"+this["count(*)"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";				
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);	
}

function analys9(){
	var data = commonApiAjax(calcApiUrl, "num=9&pageSize=10&def="+$('[name="defect"]').val()+"&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["car_name"]==undefined){//
			tmpHtml += "<tr>";
			tmpHtml += "<td>계</td>";
			tmpHtml += "<td>"+this["total"]+"</td>";
			tmpHtml += "</tr>";			
		}else{
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["car_name"]+"</td>";
			tmpHtml += "<td>"+this["count(*)"]+"</td>";
			tmpHtml += "</tr>";				
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);	
}

function analys10(){
	var data = commonApiAjax(calcApiUrl, "num=10&pageSize=10&def="+$('[name="defect"]').val()+"&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["maker_name"]==undefined){//
			tmpHtml += "<tr>";
			tmpHtml += "<td>계</td>";
			tmpHtml += "<td>"+this["total"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";			
		}else{
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["maker_name"]+"</td>";
			tmpHtml += "<td>"+this["count(*)"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";				
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);	
}

function analys11(){
	var data = commonApiAjax(calcApiUrl, "num=11&def="+$('[name="defect"]').val()+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["inout_name"]==undefined){//
			tmpHtml += "<tr>";
			tmpHtml += "<td>계</td>";
			tmpHtml += "<td>"+this["total"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";			
		}else{
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["inout_name"]+"</td>";
			tmpHtml += "<td>"+this["count(*)"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";				
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);		
}

function analys12(){
	var data = commonApiAjax(calcApiUrl, "num=12&def="+$('[name="defect"]').val()+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["inout_name"]==undefined){//
			tmpHtml += "<tr>";
			tmpHtml += "<td>계</td>";
			tmpHtml += "<td>"+this["total"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";			
		}else{
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["inout_name"]+"</td>";
			tmpHtml += "<td>"+this["count(*)"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";				
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);		
}

function analys13(){
	var data = commonApiAjax(calcApiUrl, "num=13&def="+$('[name="defect"]').val()+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["inout_name"]==undefined){//
			tmpHtml += "<tr>";
			tmpHtml += "<td>계</td>";
			tmpHtml += "<td>"+this["total"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";			
		}else{
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["inout_name"]+"</td>";
			tmpHtml += "<td>"+this["count(*)"]+"</td>";
			tmpHtml += "<td>"+this["proportion"]+"</td>";
			tmpHtml += "</tr>";				
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);		
}

function analys15(){
	var data = commonApiAjax(calcApiUrl, "num=15&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"&pageSize=10");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){

		tmpHtml += "<tr>";
		if(this["inout_name"]==undefined){
			tmpHtml += "<td>계</td>";
		}else{
			tmpHtml += "<td>"+this["inout_name"]+"</td>";
		}		
		
		tmpHtml += "<td>"+this["maker_name"]+"</td>";
		for(var ii=1; ii<=12; ii++){
			if(this[ii+"월"]==undefined){
				tmpHtml += "<td>0</td>";
			}else{
				tmpHtml += "<td>"+this[ii+"월"]+"</td>";
			}
		}
		if(this["합계"]==undefined){
			tmpHtml += "<td>-</td>";
		}else{
			tmpHtml += "<td>"+this["합계"]+"</td>";
		}				
		tmpHtml += "</tr>";	
	});

	$(".table-analy").find("tbody").html(tmpHtml);		
}

function analys17(){
	var data = commonApiAjax(calcApiUrl, "num=16&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["write_time_y"]==undefined){//
			tmpHtml += "<tr>";
			tmpHtml += "<td>계</td>";
			tmpHtml += "<td>"+this["total"]+"</td>";
			tmpHtml += "</tr>";			
		}else{
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["write_time_y"]+"</td>";
			tmpHtml += "<td>"+this["count(*)"]+"</td>";
			tmpHtml += "</tr>";				
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);		
	
	var mdata = commonApiAjax(calcApiUrl, "num=17&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"&pageSize=10");
	

	//테이블 타이틀 목록 생성
	var dvnData = [];
	$.each(mdata.result,function(idx, item){
		for(var key in this) {
		    console.log(key + ": " + this[key]); 
		    if(key!="합계" && key!="maker_name" && key!="maker_code"){
		    	var exist = "N";
		    	for(var dvnKey in dvnData){
		    		if(this[dvnKey]==key){
		    			exist = "Y";
		    		}
		    	}
		    	if(exist=="N"){
		    		dvnData.push({"dvn": key});
		    	}
		    }
		} 
	});	

	tmpHtml = "";
	tmpHtml += "<tr>";
	tmpHtml += "<th>제작사</th>";
	$.each(dvnData,function(idx, item){ //header
		tmpHtml += "<th>"+this["dvn"]+"</th>";
	});	
	tmpHtml += "</tr>";
	$(".table-analy2").find("thead").html(tmpHtml);
	
	tmpHtml = "";
	$.each(mdata.result,function(idx, item){ //body
		var tmp = this;
		
		tmpHtml += "<tr>";
		tmpHtml += "<td>"+this["maker_name"]+"</td>";
		
		$.each(dvnData,function(idx, item){ //header 만큼 돌려서 해당하는거 
			var eq = "N";
	    	for(var tkey in tmp){
	    		if(this["dvn"]==tkey){
	    			eq = "Y";
	    		}
	    	}			
	    	
	    	if(eq == "Y"){
	    		tmpHtml += "<td>"+tmp[this["dvn"]]+"</td>";
	    	}else{
	    		tmpHtml += "<td>0</td>";
	    	}
		});	

		tmpHtml += "</tr>";				
	});
	$(".table-analy2").find("tbody").html(tmpHtml);		
}

function analys18(){
	var data = commonApiAjax(calcApiUrl, "num=16&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		if(this["write_time_y"]==undefined){//
			tmpHtml += "<tr>";
			tmpHtml += "<td>계</td>";
			tmpHtml += "<td>"+this["total"]+"</td>";
			tmpHtml += "</tr>";			
		}else{
			tmpHtml += "<tr>";
			tmpHtml += "<td>"+this["write_time_y"]+"</td>";
			tmpHtml += "<td>"+this["count(*)"]+"</td>";
			tmpHtml += "</tr>";				
		}
	});
	$(".table-analy").find("tbody").html(tmpHtml);		
	
	var mdata = commonApiAjax(calcApiUrl, "num=18&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"&pageSize=10");
	
	//테이블 타이틀 목록 생성
	var dvnData = [];
	$.each(mdata.result,function(idx, item){
		for(var key in this) {
		    console.log(key + ": " + this[key]); 
		    if(key!="합계" && key!="maker_name" && key!="maker_code"){
		    	var exist = "N";
		    	for(var dvnKey in dvnData){
		    		if(this[dvnKey]==key){
		    			exist = "Y";
		    		}
		    	}
		    	if(exist=="N"){
		    		dvnData.push({"dvn": key});
		    	}
		    }
		} 
	});	

	tmpHtml = "";
	tmpHtml += "<tr>";
	tmpHtml += "<th>제작사</th>";
	$.each(dvnData,function(idx, item){ //header
		tmpHtml += "<th>"+this["dvn"]+"</th>";
	});	
	tmpHtml += "</tr>";
	$(".table-analy2").find("thead").html(tmpHtml);
	
	tmpHtml = "";
	$.each(mdata.result,function(idx, item){ //body
		var tmp = this;
		
		tmpHtml += "<tr>";
		tmpHtml += "<td>"+this["maker_name"]+"</td>";
		
		$.each(dvnData,function(idx, item){ //header 만큼 돌려서 해당하는거 
			var eq = "N";
	    	for(var tkey in tmp){
	    		if(this["dvn"]==tkey){
	    			eq = "Y";
	    		}
	    	}			
	    	
	    	if(eq == "Y"){
	    		tmpHtml += "<td>"+tmp[this["dvn"]]+"</td>";
	    	}else{
	    		tmpHtml += "<td>0</td>";
	    	}
		});	

		tmpHtml += "</tr>";				
	});
	$(".table-analy2").find("tbody").html(tmpHtml);		
}

function analys19(){}
function analys20(){}
function analys21(){}

function analys22(){
	var data = commonApiAjax(calcApiUrl, "num=22&startDate="+$('[data-ax5select="startYear"]').ax5select("getValue")[0].value+"&endDate="+$('[data-ax5select="endYear"]').ax5select("getValue")[0].value+"&pageSize=10");
	
	var tmpHtml = "";
	$.each(data.result,function(idx, item){
		tmpHtml += "<tr>";
		tmpHtml += "<td>"+this["write_time_y"]+"</td>";
		tmpHtml += "<td>"+this["count(*)"]+"</td>";
		tmpHtml += "</tr>";				
	});
	$(".table-analy").find("tbody").html(tmpHtml);		
}

//하자목록
function getPsList(){
	var psList = [];

	ajax(true, "/si/statsInfo/as/psList.do", 'body', '조회중입니다.', null, function(result){
		 if(result==null || result==""){
			 psList = [ {value: '', text: '결함선택'} ];
		 }else{
			 psList = result;
		 }
		 selectAx5("defect", psList, 'value', 'text', { stateChgFun: function(ths) {}, minWidth: 100, search: true}, true);
		 selectAx5("startYear", apiFilter7(), 'value', 'text', { stateChgFun: function(ths) {}, minWidth: 100, search: true}, true);
      }, function(error) {
        //alertDialog('오류 입니다.\n관리자에게 문의하세요.');
      });
	
}

