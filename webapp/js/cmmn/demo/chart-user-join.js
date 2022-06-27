var labels_data = [];
var value_data = [];
var maxVal = 0;

// 데이터 조회
$.ajax({
	url		: "/operator/stats/join_data.do",
	type 	: "post",
	dataType: "json",
	async	: false, 
	data	: "",
	success : function(data){
		$.each(data.joinList, function(i, r) {
			labels_data[i] = r.title;
			value_data[i] = r.cnt;
			if(maxVal < parseInt(r.cnt)){
				maxVal = parseInt(r.cnt);
			}
		});
	},
	error 	: function(xhr, status, error){
		alert(error);
	}
});

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    //labels: ["8/12", "9/11", "9/12"],
	labels: labels_data,
    datasets: [{
      label: "회원가입수",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      //data: [1, 1, 2],
      data: value_data,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: maxVal + 10,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
