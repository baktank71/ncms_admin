(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$main = W.$main || {};

	var dataSource = null;

	$(document).ready(function() {
		$main.ui.pageLoad();		//최초 페이지 로드 시
		$main.event.setUIEvent();
		
	});
	// jQuery custom function
	// 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
	// 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭
	$main.ui = {
			
		pageLoad : function() {

			var statType = $("#statType").val();
			
			if(statType == 'CG'){
				// 차종별
				//$main.ui.searchPrdctList(1);
			}
		},
		
		changeCharts: function(target, value) {
			
			//console.log(value);

			if(target == 'One'){
				for(var i=1; i<4; i++){
					$("#recallChart1-"+i+"Div").hide();
					$("#recallChart2-"+i+"Div").hide();
				}
				$("#recallChart1-"+value+"Div").show();
				$("#recallChart2-"+value+"Div").show();
			}
			else if(target == 'Two'){
				for(var i=1; i<4; i++){
					$("#recallChart3-"+i+"Div").hide();
					$("#recallChart4-"+i+"Div").hide();
				}
				$("#recallChart3-"+value+"Div").show();
				$("#recallChart4-"+value+"Div").show();
			}
			else if(target == 'Thr'){
				for(var i=1; i<4; i++){
					$("#recallChart5-"+i+"Div").hide();
					$("#recallChart6-"+i+"Div").hide();
				}
				$("#recallChart5-"+value+"Div").show();
				$("#recallChart6-"+value+"Div").show();
			}
			else if(target == 'Five'){
				console.log("#recallChart9-"+value+"Div");
				for(var i=1; i<4; i++){
					$("#recallChart9-"+i+"Div").hide();
				}
				$("#recallChart9-"+value+"Div").show();
			}
		},

		/**
		 * @name         : makeCharts
		 * @description  : 월별,연도별 현황 차트 생성	
		 * @date         : 2019. 11. 19.  
		 * @author	     : 박소희
		 */
		makeCharts: function() {
		
			// 차종
			var ctx = document.getElementById('recallChart1').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '국내',
                        data: data1,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: '국외',
                        data: data3,
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    },
                    ]
                },
                options: {
		        	scales: { yAxes: [{ ticks: { beginAtZero:true } }] }   // 데이터값 시작을 0부터시작
                }
            });
			var ctx1_2 = document.getElementById('recallChart1-2').getContext('2d');
            var myChart1_2 = new Chart(ctx1_2, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '국내',
                        data: data1,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 0.2)',
                        pointBackgroundColor: dynamicColors()
                    },
                    {
                        label: '국외',
                        data: data3,
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                        pointBackgroundColor: dynamicColors()
                    },
                    ]
                },
                options: {
    				legend: {
    					position: 'top',
    				},
    				scale: {
    					ticks: {
    						beginAtZero: true
    					}
    				}
                }
            });
            
			// 대수
			var ctx2 = document.getElementById('recallChart2').getContext('2d');
            var myChart2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '국내',
                        data: data2,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 1
                    },
                    {
                        label: '국외',
                        data: data4,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 0.2)',
                        borderWidth: 1
                    },
                    ]
                },
                options: {
		        	scales: { yAxes: [{ ticks: { beginAtZero:true } }] }   // 데이터값 시작을 0부터시작
                }
            });
			var ctx2_2 = document.getElementById('recallChart2-2').getContext('2d');
            var myChart2_2 = new Chart(ctx2_2, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '국내',
                        data: data2,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 0.2)',
                        pointBackgroundColor: dynamicColors()
                    },
                    {
                        label: '국외',
                        data: data4,
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 0.2)',
                        pointBackgroundColor: dynamicColors()
                    },
                    ]
                },
                options: {
    				legend: {
    					position: 'top',
    				},
    				scale: {
    					ticks: {
    						beginAtZero: true
    					}
    				}
                }
            });
		},

		/**
		 * @name         : makeCharts2
		 * @description  : 월별,연도별 제조사 현황 차트 생성	
		 * @date         : 2019. 12. 07.  
		 * @author	     : 박소희
		 */
		makeCharts2: function() {
			
			var params = fn_getFormData($("#srchFrm"));
            params.statType = 'RC'; //리콜
            params.chartType = 'MK'; //제조사별
            
			ajax(true, contextPath + '/si/statsInfo/chartList.do', 'body', '처리중입니다.', params, function(dataAjax) {
				if(dataAjax != null) {

				    //국산
					var labels2_1 = new Array();
					var cData2_1 = new Array();

			        $.each(dataAjax.korList, function(index, data){
			        	labels2_1.push(data.makerName);
			        	cData2_1.push(data.recallCarCount);
			        });
			        
			        makeDoughnutCharts(labels2_1, cData2_1, 'recallChart3');
					makeBarCharts(labels2_1, cData2_1, 'recallChart3-2', '국산');
					makeLineCharts(labels2_1, cData2_1, 'recallChart3-3', '국산');

				    //수입
					var labels2_2 = new Array();
					var cData2_2 = new Array();
					
			        $.each(dataAjax.forList, function(index, data){
			        	labels2_2.push(data.makerName);
			        	cData2_2.push(data.recallCarCount);
			        });
			        
			        makeDoughnutCharts(labels2_2, cData2_2, 'recallChart4');
					makeBarCharts(labels2_2, cData2_2, 'recallChart4-2', '수입');
					makeLineCharts(labels2_2, cData2_2, 'recallChart4-3', '수입');
			        
				}
				
			});
		},
		
		/**
		 * @name         : makeCharts3
		 * @description  : 월별,연도별 장치별 현황 차트 생성	
		 * @date         : 2019. 12. 07.  
		 * @author	     : 박소희
		 */
		makeCharts3: function() {

			var params = fn_getFormData($("#srchFrm"));
            params.statType = 'RC'; //리콜
            params.chartType = 'PD'; //장치별
            
			ajax(true, contextPath + '/si/statsInfo/chartList.do', 'body', '처리중입니다.', params, function(dataAjax) {
				if(dataAjax != null) {

			        //국산
					var labels3_1 = new Array();
					var cData3_1 = new Array();

			        $.each(dataAjax.korList, function(index, data){
			        	labels3_1.push(data.divisionName);
			        	cData3_1.push(data.recallCarCount);
			        });
			        
			        makeDoughnutCharts(labels3_1, cData3_1, 'recallChart5');
					makeBarCharts(labels3_1, cData3_1, 'recallChart5-2', '국산');
					makeLineCharts(labels3_1, cData3_1, 'recallChart5-3', '국산');


		            //수입
					var labels3_2 = new Array();
					var cData3_2 = new Array();
					
			        $.each(dataAjax.forList, function(index, data){
			        	labels3_2.push(data.divisionName);
			        	cData3_2.push(data.recallCarCount);
			        });
			        
			        makeDoughnutCharts(labels3_2, cData3_2, 'recallChart6');
					makeBarCharts(labels3_2, cData3_2, 'recallChart6-2', '수입');
					makeLineCharts(labels3_2, cData3_2, 'recallChart6-3', '수입');
			        
				}
				
			});
            
		},

		/**
		 * @name         : makeCharts5
		 * @description  : 월별,연도별 차량별 현황 차트 생성	
		 * @date         : 2019. 12. 07.  
		 * @author	     : 박소희
		 */
		makeCharts5: function() {

			var params = fn_getFormData($("#srchFrm"));
            params.statType = 'RC'; //리콜
            params.chartType = 'CG'; //차량별
            
			ajax(true, contextPath + '/si/statsInfo/chartList.do', 'body', '처리중입니다.', params, function(dataAjax) {
				if(dataAjax != null) {

			        //국산
					var labels5_1 = new Array();
					var cData5_1 = new Array();

			        $.each(dataAjax.korList, function(index, data){
			        	labels5_1.push(data.groupCarName);
			        	cData5_1.push(data.recallCarCount);
			        });
			        
			        makeDoughnutCharts(labels5_1, cData5_1, 'recallChart9');
					makeBarCharts(labels5_1, cData5_1, 'recallChart9-2', '차량별');
					makeLineCharts(labels5_1, cData5_1, 'recallChart9-3', '차량별');

		            //수입
					/*var labels5_2 = new Array();
					var cData5_2 = new Array();
					
			        $.each(dataAjax.forList, function(index, data){
			        	labels5_2.push("["+data.makerName+"]"+data.groupCarName);
			        	cData5_2.push(data.recallCarCount);
			        });
			        
			        makeDoughnutCharts(labels5_2, cData5_2, 'recallChart10');*/
			        
				}
				
			});
            
		},

		/**
		* @name         : searchPrdctList
		* @description  : 제작사 찾기 팝업
		* @date         : 2019. 07. 22. 
		* @author	    : 박소희
		*/
		searchPrdctList : function(pageIndex) {

            var codeData = {}
            codeData.srchCategory = $("#srchCategory").val();  
            codeData.srchWrd = $("#srchWrd").val();
            codeData.statsFlag = 'R'; //리콜현황
            codeData.pageIndex = pageIndex;  
            codeData.recordCount = 8;  

            ajax(true, contextPath + '/cmmn/json/prdctList.do', 'body', '조회중입니다.', codeData, function(data) {
	            //console.log("code test : " + JSON.stringify(data));
            	data.pageIndex = pageIndex;
            	$main.ui.makePrdctList(data); 
			});
		},

		/**
		 * @name         : makePrdctList
		 * @description  : 제작사 목록 생성
		 * @date         : 2020. 01. 16. 
		 * @author	     : 박소희
		 */
		makePrdctList : function(data) {
			var body = $("#prdctList");
			body.empty(); 
			var totalCount = data.list[0].totalCount;
			   
        	/** paging start **/
			var params = { 
				  divId : "pagingUi"
				, pageIndex : data.pageIndex
				, totalCount : totalCount
				, eventName : "$main.ui.searchPrdctList" 
			} 
			navi_renderPaging(params);
        	/** paging end **/
			
			if(totalCount == 0){ 
				var str = "<tr>" + "<td class='uk-text-center' colspan='3'>조회된 결과가 없습니다.</td>" + "</tr>"; 
				body.append(str); 
			} else{
				
				var str = ""; 
				$.each(data.list, function(key, value){ 
					str +=  "<tr style='cursor: pointer;'>" +
								"<td class='uk-text-center'>" + value.category + 
								"<input type='hidden' id='subcode' value='"+value.subcode+"'/>" + "</td>" +
								"<td class='uk-text-center'>" + value.subcode + "</td>" +
								"<td>" + value.codeValue + "</td>" +
							"</tr>";				
				});
				body.append(str);
				
				$("#searchTable1 tbody tr").click(function(){     
			        	
			        var tr = $(this);
			        var td = tr.children();

					//console.log(td.eq(0).text()); //contentsId
			        
			        var subcode = $(this).find('#subcode').val();
			        var codeName = td.eq(2).text();
					
			        $("#makerCode").val(subcode); 
			        $("#makerName").val(codeName); 

			        //var modal = new $.UIkit.modal.Modal("#find-prdct")
			        //modal.toggle();
			        UIkit.modal("#find-prdct").hide();
			        
			        //제조사 검색 후 바로 찾기
			        //$main.event.fn_search();
				 });

			}

		},
		
	};
	
	// 이벤트 정의
	$main.event = {
			
			/**
			 * @name         : setUIEvent
			 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
			 * @date         : 2019. 07. 15.  
			 * @author	     : 박소희
			 */	
			setUIEvent : function(e) {			
				$('#srchBtn').on('click', $main.event.fn_search); // 검색 버튼 클릭
				$('#listBtn').on('click', $main.event.goList); // 목록으로 이동
				
			},

			/**
			 * @name         : openTable
			 * @description  : 더보기 버튼 클릭
			 * @date         : 2019. 01. 08.  
			 * @author	     : 박소희
			 */	
			openTable : function(target) {
				
				$("#openDiv"+target).css("display","");
				$("#open"+target+"Btn").css("display","none");
				$("#close"+target+"Btn").css("display","");
				$("#selectChart"+target).css("display","");

				var trArr = $("#openTr"+target).find('tr');
				$.each(trArr, function(index, item){
					if($( this ).hasClass('openTr'+target)){ 
						$(item).css("display","");
					}
				});
				
				if(target == 'One'){
					$main.ui.makeCharts();
				}else if(target == 'Two'){
					$main.ui.makeCharts2();
				}else if(target == 'Thr'){
					$main.ui.makeCharts3();
				}else if(target == 'Five'){
					$main.ui.makeCharts5();
				}
			},

			/**
			 * @name         : closeTable
			 * @description  : 감추기 버튼 클릭
			 * @date         : 2019. 01. 08.  
			 * @author	     : 박소희
			 */	
			closeTable : function(target) {
				
				$("#openDiv"+target).css("display","none");
				$("#open"+target+"Btn").css("display","");
				$("#close"+target+"Btn").css("display","none");
				$("#selectChart"+target).css("display","none");

				var trArr = $("#openTr"+target).find('tr');
				$.each(trArr, function(index, item){
					$(item).css("display","none");
				});

				$("#openTrTot"+target).css("display","");
			},

			/**
			 * @name         : subOpenTable
			 * @description  : 소계 더보기 클릭
			 * @date         : 2019. 01. 08.  
			 * @author	     : 박소희
			 */	
			subOpenTable : function(target, maker) {

				var trArr = $("#openTr"+target).find('tr');
				$.each(trArr, function(index, item){
					if($( this ).hasClass('tr_'+maker)){ 
						$(item).css("display","");
					}
				});
				$("#label"+target+"_open_"+maker).css("display","none");
				$("#label"+target+"_close_"+maker).css("display","");
			},

			/**
			 * @name         : subOpenTable
			 * @description  : 소계 감추기 클릭
			 * @date         : 2019. 01. 08.  
			 * @author	     : 박소희
			 */	
			subCloseTable : function(target, maker) {

				var trArr = $("#openTr"+target).find('tr');
				$.each(trArr, function(index, item){
					if($( this ).hasClass('tr_'+maker)){ 
						$(item).css("display","none");
					}
				});
				$("#label"+target+"_open_"+maker).css("display","");
				$("#label"+target+"_close_"+maker).css("display","none");	
			},

			/**
			 * @name         : selectChart
			 * @description  : 차트 변경 
			 * @date         : 2019. 01. 08.  
			 * @author	     : 박소희
			 */	
			selectChart : function(target) {

				console.log("#selectChart"+target+" option:selected");
				console.log($("#selectChart"+target+" option:selected").val());
				
			},
			
			/**
			 * @name         : fn_search
			 * @description  : 목록 검색
			 * @date         : 2019. 08. 02.  
			 * @author	     : 박소희
			 */	
			fn_search : function() {

				var recallMonth = $("#recallMonth").val();
				var recallYear = $("#recallYear").val();
				
				$("#recallDateFrom").val("");

				var statType = $("#statType").val();

				if(statType == '') {	//차량별
					if(recallMonth=="0"){
						$("#recallMonth").val("");	
						$main.event.btnListClickHandler();					
					}else{
						$main.event.btnListClickHandler();							
					}
					
				}else{
					if(statType == 'CG' && $("#makerCode").val() == ''){
						alert("차종별 통계 검색 시 제작사를 선택해주세요");
						return;
					}
					$main.event.btnListClickHandler();		
					
				}

			},
			
			/**
			 * @name         : btnListClickHandler
			 * @description  : 목록으로 버튼 클릭 핸들러
			 * @date         : 2019. 08. 07
			 * @author	     : 박소희
			 */
			btnListClickHandler : function() {

				var data = fn_getFormData($("#srchFrm"));
	    		postToURL(contextPath+'/si/statsInfo/rcList.do', data);
	    		
			},

			/**
			* @name         : goList
			* @description  : 통계 목록으로 이동
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			goList : function() {
				var params = fn_getFormData($("#srchFrm"));
				
				postToURL(contextPath + "/si/statsInfo/listView.do", params);
			},
									
	};

}(window, document, jQuery));

/**
 * @name         : makeDoughnutCharts
 * @description  : 도넛형 기본 차트 생성	
 * @date         : 2019. 12. 07.  
 * @author	     : 박소희
 */
function makeDoughnutCharts(labels, cData, targetId){

	var cnt = cData.length;

	var backgroundColor = new Array();
	for(var i=0; i<cnt; i++){
		backgroundColor.push(dynamicColors()); //랜덤색상
	}
	
	var ctx = document.getElementById(targetId).getContext('2d');
	var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
				data: cData,
				backgroundColor: backgroundColor,
			}],
			labels: labels
		},
        options: {
			responsive: true
        }
    });
}

function makeBarCharts(labels, cData, targetId, label){

	var ctx = document.getElementById(targetId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: cData,
                backgroundColor: dynamicColors(),
                borderColor: dynamicColors(),
                borderWidth: 1
            },
            ]
        },
        options: {
        	scales: { yAxes: [{ ticks: { beginAtZero:true } }] }   // 데이터값 시작을 0부터시작
        }
    });
}

function makeLineCharts(labels, cData, targetId, label){
	var ctx = document.getElementById(targetId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: cData,
                backgroundColor: dynamicColors(),
                borderColor: dynamicColors(),
                borderWidth: 1
            },
            ]
        },
        options: {
        	scales: { yAxes: [{ ticks: { beginAtZero:true } }] }   // 데이터값 시작을 0부터시작
        }
    });
}

/**
 * @name         : dynamicColors
 * @description  : 차트 랜덤 색상 생성	
 * @date         : 2019. 12. 07.  
 * @author	     : 박소희
 */
function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ",0.8)";
}
