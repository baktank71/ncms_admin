(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$menuStat = W.$menuStat || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	var gridSubMap = {};					//달력 그리드 설정
	
	$(document).ready(function(){

		$menuStat.event.selectValue();			//오른쪽 SelectBox 이벤트
		$menuStat.event.setUIEvent();			//이벤트 SetUiEvent
		$menuStat.ui.pageLoad();				//최초 페이지 로드할 시 벌어지는 이벤트

	});
	
	$menuStat.ui = {
			
		/**
		 * @name		: pageLoad
		 * @description	: 페이지를 불러오면 벌어지는 이벤트
		 * @date		: 2019. 11. 07.
		 * @author		: 박소희
		 */
		pageLoad : function() {

			// 오른쪽 상단 위, SelectBox의 값이 어디에 있는지에 대한 정보
			/*var category = $("#category").val();
			$("#selectBoxName").text("");
			var boxText = '<span uk-icon="chevron-down"></span>';

			if(category == 'set') {
				boxText = "메뉴별 설정" + boxText;
			} else {
				boxText = "메뉴별 통계" + boxText;
			}
			$("#selectBoxName").append(boxText);*/
			
			//공통 그리드 달력 호출하기
			searchFormDatePeriod('date', 'crctDate', gridSubMap);
			
			$menuStat.ui.makeCharts();
			$menuStat.event.fn_change();
		},

		/**
		 * @name         : makeCharts
		 * @description  : 통계 차트 생성	
		 * @date         : 2019. 12. 09.  
		 * @author	     : 박소희
		 */
		makeCharts: function() {

			var h4 = "통계";
			var searchType = $("#searchType").val();

			if(searchType=='2'){ //월별
				h4 = "월별 "+h4;
			}else if(searchType=='3'){ //일별
				h4 = "일별 "+h4;		
			}else { //년도별	
				h4 = "연간 "+h4;				
			}
			$("#hTitle").html(h4);	
			
			var ctx = document.getElementById('sChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '페이지뷰',
                        data: cData,
                        //backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        backgroundColor: dynamicColors(),
                        //borderColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    },
                    ]
                },
                options: {
		        	scales: { yAxes: [{ ticks: { beginAtZero:true } }] }   // 데이터값 시작을 0부터시작
                }
            });

		}
	}
	
	//Event 정의
	$menuStat.event = {
			
		/**
		* @name         : setUIEvent
		* @description  : 이벤트 세팅
		* @date         : 2019. 11. 07.
		* @author	    : 박소희
		*/
		setUIEvent : function(e) {
			$("#searchBtn").on('click', $menuStat.event.fn_search);		//게시판 검색 			
			$("#searchType").change($menuStat.event.fn_change);			//검색조건선택

		},
		
		/**
		* @name         : fn_search
		* @description  : 검색하기
		* @date         : 2019. 10. 18. 
		* @author	    : 박소희
		*/
		fn_search : function(pageNo) {
			
			var data = fn_getFormData($("#searchFrm"));

			var searchType = $("#searchType").val();
			if(searchType=='2'){ //월별검색
				data.searchDate= $("#searchYear").val() + $("#searchMonth").val();
			}
			
			if(searchType=='3'){ //일별검색
				/*if(!isValidDate($("#searchFromDate"),"YYYY-MM-DD") || !isValidDate($("#searchToDate"),"YYYY-MM-DD")){
					return;
				}*/
				if(!valickFromtoDate($("#searchFromDate").val(), $("#searchToDate").val())){
					return;
				}
			}
			
			
			postToURL(contextPath + "/cs/menuStat/listView.do", data);
		},
		
		/**
		* @name         : fn_change
		* @description  : selectbox 조건변경
		* @date         : 2019. 10. 18. 
		* @author	    : 박소희
		*/
		fn_change : function() {
			
			var searchType = $("#searchType").val();
			
			if(searchType=='2'){ //월별
				$("#searchTypeM").show();
				$("#searchTypeD").hide();
			}else if(searchType=='3'){ //일별
				$("#searchTypeM").hide();
				$("#searchTypeD").show();			
			}else { //년도별	
				$("#searchTypeM").hide();
				$("#searchTypeD").hide();			
			}
		},
		
		/**
		* @name         : goList
		* @description  : 목록으로 이동
		* @date         : 2019. 10. 18. 
		* @author	    : 박소희
		*/
		goList : function() {
			var params = fn_getFormData($("#searchFrm"));
			
			postToURL(contextPath + "/cs/menuStat/listView.do", params);
		},
				
		/**
		 * @name		: selectValue
		 * @description	: 게시판 목록의 오른쪽 상단의 selectValue의 값에 따른 이벤트
		 * @date		: 2019. 11. 14.
		 * @author		: 박소희
		 */
		selectValue : function(result) {
			var params = {};
			
			$('.nav-list li').click(function(){
				
				$('.nav-list li.uk-active').removeClass('uk-active');
				
				var activeNo = $(this).addClass('uk-active');
				var category = activeNo[0].value;

				if(category == 1){
					params.category = 'STAT';
				}else{
					params.category = 'SET';
				}
				
				postToURL(contextPath + "/cs/menuStat/listView.do", params);
			});
		},

	}
}(window,document, jQuery));

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
