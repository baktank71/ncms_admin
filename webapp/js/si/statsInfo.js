(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$statsInfo = W.$statsInfo || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	$(document).ready(function(){

		$statsInfo.event.selectValue();			//오른쪽 SelectBox 이벤트
		$statsInfo.event.setUIEvent();			//이벤트 SetUiEvent
		$statsInfo.ui.pageLoad();				//최초 페이지 로드할 시 벌어지는 이벤트

	});
	
	$statsInfo.ui = {
			
			/**
			 * @name		: pageLoad
			 * @description	: 페이지를 불러오면 벌어지는 이벤트
			 * @date		: 2019. 11. 07.
			 * @author		: 박소희
			 */
			pageLoad : function() {

				// 오른쪽 상단 위, SelectBox의 값이 어디에 있는지에 대한 정보
				/*var useType = $("#useType").val();
				$("#selectBoxName").text("");
				var boxText = '<span uk-icon="chevron-down"></span>';

				if(useType == 'AS') {
					boxText = "분석시스템" + boxText;
				} else {
					boxText = "리콜통계" + boxText;
				}*/
				//$statsInfo.ui.makeCharts(); //월별,연도별 현황 차트 생성	
			},

			/**
			 * @name         : makeCharts
			 * @description  : 월별,연도별 현황 차트 생성	
			 * @date         : 2019. 11. 19.  
			 * @author	     : 박소희
			 */
			/*makeCharts: function() {

				//차트 값 생성
				var labels = new Array();
				var data1 = new Array();	//국내자동차대수
				var data2 = new Array();	//국내자동차수량
				var data3 = new Array();	//외국자동차대수
				var data4 = new Array();	//외국자동차수량

				labels = ['01','02','03','04'];
				data1 = ['9','9','12','6'];
				data2 = ['64411','193526','32546','12356'];
				data3 = ['153','127','86','36'];
				data4 = ['37911','95291','46253','77777'];
				
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
	            
				var ctx3 = document.getElementById('recallChart3').getContext('2d');
	            var myChart3 = new Chart(ctx3, {
	                type: 'pie',
	                data: {
	                    datasets: [{
	    					data: ['35','9','42','7'],
	    					backgroundColor: [
	    						'rgba(255, 99, 132, 0.8)'
	    						,'rgba(255, 206, 86, 0.8)'
	    						,'rgba(54, 162, 235, 0.8)'
	    						,'rgba(75, 192, 192, 0.8)'
	    					],
	    				}],
						labels: ['A장치','B장치','C장치','D장치']
	    			},
	                options: {
	    				responsive: true
	                }
	            });
	            

				var ctx4 = document.getElementById('recallChart4').getContext('2d');
	            var myChart4 = new Chart(ctx4, {
	                type: 'polarArea',
	                data: {
	                    datasets: [{
	    					data: ['35','42','80','12','35','9','42','7','9','32'],
	    					backgroundColor: [
	    						'rgba(75, 192, 192, 0.8)'
	    						,'rgba(255, 99, 132, 0.8)'
	    						,'rgba(54, 162, 235, 0.8)'
	    						,'rgba(75, 192, 192, 0.8)'
	    						,'rgba(255, 206, 86, 0.8)'
	    						,'rgba(155, 99, 132, 0.8)'
	    						,'rgba(155, 206, 86, 0.8)'
	    						,'rgba(154, 162, 235, 0.8)'
	    						,'rgba(175, 192, 192, 0.8)'
	    						,'rgba(15, 199, 182, 0.8)'
	    					],
	    				}],
						labels: ['A제조사','B제조사','C제조사','D제조사','E제조사'
							,'F제조사','G제조사','H제조사','I제조사','J제조사']
	    			},
	                options: {
	    				responsive: true
	                }
	            });
			},*/
	}
	
	//Event 정의
	$statsInfo.event = {
			
			/**
			* @name         : setUIEvent
			* @description  : 이벤트 세팅
			* @date         : 2019. 11. 07.
			* @author	    : 박소희
			*/
			setUIEvent : function(e) {
				//$("#searchBtn").on('click', $statsInfo.event.fn_search);		//게시판 검색 
				$("#checkAll").on('click', $statsInfo.event.checkboxAll);		//테이블 헤더 체크박스  이벤트
				
				
			},

			/**
			* @name         : checkboxAll
			* @description  : <th>태그에 체크박스 클릭할 시, 체크박스 모두 활성화 되는 이벤트
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			checkboxAll : function() {
				if($("#checkAll").prop("checked")) {
					$("input[type=checkbox]").prop("checked", true);
				} else {
					$("input[type=checkbox]").prop("checked", false);
				}
			},

			/**
			* @name         : isOpenClick
			* @description  : 컨텐츠 공유여부 변경버튼 클릭
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			isOpenClick : function(clickFlag) {
				var params = {};
				params.useType = $("#useType").val();
				params.isOpen = clickFlag;
				
				var ckCnt = $('input:checkbox[id="ckId"]:checked').length;
				
				if(ckCnt == 0){
					alert("선택한 항목이 없습니다.");
					return;
				}
				
				var contentsIdGroup = [];
				
				$('input:checkbox[id="ckId"]:checked').each(function(idx){
					contentsIdGroup.push($(this).val());
				});
				params.contentsIdList = contentsIdGroup;
				
				if(confirm("공개상태를 변경하시겠습니까?")) {
					ajax(true, contextPath + "/si/statsInfo/process/updateOpenYn.do"
							, 'body', '변경중입니다.', params, function(result){
						if(result!=null){
							alert("변경하였습니다.");
							postToURL(contextPath + "/si/statsInfo/listView.do", params);
						}
					});
				}
			},
			
			/**
			* @name         : detailView
			* @description  : 통계 상세 화면으로 이동
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			detailView : function(statsUrl) {
				var params = fn_getFormData($("#searchFrm"));
				params.statsUrl = statsUrl;

				params.type = statsUrl.substring(0,2);  ///리콜현황, 결함신고 구분
				params.rcType = statsUrl.substring(2,3); ///월별, 연도별 구분	
				params.statType = statsUrl.substring(4);  ///차량별, 장치별, 제작사별 구분	
				
				//alert(params.type+"/"+params.rcType+"/"+params.statType);
				
				var detailUrl = "";
				
				if(params.type == 'RC'){
					detailUrl = "/si/statsInfo/rcList.do";
				}else{
					detailUrl = "/si/statsInfo/scList.do";
				}

				postToURL(contextPath + detailUrl, params);
			},
			
			/**
			* @name         : detailView
			* @description  : 통계 상세 화면으로 이동
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			analysDetailView : function(statsUrl, statsTitl) {
				var params = fn_getFormData($("#searchFrm"));
				params.statsUrl = statsUrl;
				params.statsTitl = statsTitl;
				postToURL(contextPath + "/si/statsInfo/as/analys"+statsUrl+".do", params);
			},
			
			/**
			* @name         : goList
			* @description  : 통계 목록으로 이동
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			goList : function() {
				var params = fn_getFormData($("#searchFrm"));
				
				postToURL(contextPath + "/si/statsInfo/listView.do", params);
			},
			
			/**
			* @name         : fn_search
			* @description  : 검색하기
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			fn_search : function(pageNo) {
				var data = fn_getFormData($("#searchFrm"));
				
				postToURL(contextPath + "/si/statsInfo/listView.do", data);
			},
			
			/**
			 * @name		: selectValue
			 * @description	: 게시판 목록의 오른쪽 상단의 selectValue의 값에 따른 이벤트
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			selectValue : function(result) {
				var params = {};
				
				$('.nav-list li').click(function(){
					
					$('.nav-list li.uk-active').removeClass('uk-active');
					
					var activeNo = $(this).addClass('uk-active');
					var useType = activeNo[0].value;
					
					if(useType == 1){
						params.useType = 'HP';
					}else{
						params.useType = 'AS';
					}
					
					postToURL(contextPath + "/si/statsInfo/listView.do", params);
				});
			},
			
	}
}(window,document, jQuery));