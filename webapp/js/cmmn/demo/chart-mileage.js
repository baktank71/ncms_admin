var labels_data = [];
var in_data = [];
var out_data = [];
var cnt = [];
var maxVal = 0;

// 데이터 조회
$.ajax({
	url		: "/operator/stats/mileage_data.do",
	type 	: "post",
	dataType: "json",
	async	: false, 
	data	: "",
	success : function(data){
		$.each(data.mileageList, function(i, r) {
			labels_data[i] = r.title;
			in_data[i] = r.cnt_in;
			out_data[i] = r.cnt_out;
			cnt[i] = r.cnt;
			
			if(maxVal < parseInt(r.cnt_in)){
				maxVal = parseInt(r.cnt_in);
			}
			
			if(maxVal < parseInt(r.cnt_out)){
				maxVal = parseInt(r.cnt_out);
			}	
		});
	},
	error 	: function(xhr, status, error){
		alert(error);
	}
});

//Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels_data,
    datasets: [{
      label: "적립",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: in_data,
    },{
        label: "충전",
        backgroundColor: "rgba(174,0,0,1)",
        borderColor: "rgba(174,0,0,1)",
        data: out_data,
      },{
          label: "적립수",
          backgroundColor: "rgba(219, 164, 0, 1)",
          borderColor: "rgba(219, 164, 0, 1)",
          data: cnt,
        }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: maxVal,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
