(function(W, D, $) {
  // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
  'use strict';
  
  W.$main = W.$main || {};
  
  var dataSource = null;
  
  $(document).ready(function() {
    $main.ui.pageLoad();
    $main.event.setUIEvent();
  });
  
  // jQuery custom function
  // 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
  // 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭
  $main.ui = {
    pageLoad: function() {
      
      /* dash(-)로 구분되는 날짜 포맷터 */
      ax5.ui.grid.formatter["date"] = function() {
        var date = this.value;
        if(date.length == 8) {
          return date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6);
        } else {
          return date;
        }
      };
      
      /* 그리드 객체 생성 */
      var firstGrid = new ax5.ui.grid(); /* 그리드 설정 지정 */
      firstGrid.setConfig({
        target: $('[data-ax5grid="first-grid"]'),
        showLineNumber: false,
        showRowSelector: true,
        multipleSelect: false,
        lineNumberColumnWidth: 40,
        rowSelectorColumnWidth: 27,
        columns: [{key: "date", label: "날짜", formatter: "date", align: "center"}, {
          key: "type",
          label: "구분",
          align: "center"
        }, {key: "amount", label: "<strong>주유량</strong>", align: "center"}, {
          key: "mileage",
          label: "주행거리(km)",
          align: "center"
        }, {key: "price", label: "금액(원)", formatter: "money", align: "center"}, {
          key: "repair",
          label: "정비내역",
          align: "center"
        }, {key: "note", label: "비고", align: "center"}]
      });
      
      /* 테스트용 데이터 생성 */
      var list = [];
      for(var i = 0; i < 50; i ++) {
        list.push({
          date: "20170101",
          type: "주유",
          amount: 25,
          mileage: (i + 1) * 100,
          price: 45000,
          repair: "-",
          note: "-"
        });
      }
      
      /* 그리드에 데이터 설정 */
      firstGrid.setData(list);
      
      
      /*var API_SERVER = "http://api-demo.ax5.io";
      var firstGrid = new ax5.ui.grid();
      
      firstGrid.setConfig({
        target: $('[data-ax5grid="first-grid"]'),
        columns: [
          {key: "a", label: "field A"},
          {key: "b", label: "field B"},
          {key: "c", label: "numbers C"},
          {key: "d", label: "field D"},
          {key: "e", label: "field E"},
          {key: "f", label: "field F"},
          {key: "g", label: "field G"},
          {key: "h", label: "field H"}
        ]
      });
      
      var gridList = [
        {key: "a", label: "field A"},
        {key: "b", label: "field B"},
        {key: "c", label: "numbers C"},
        {key: "d", label: "field D"},
        {key: "e", label: "field E"},
        {key: "f", label: "field F"},
        {key: "g", label: "field G"},
        {key: "h", label: "field H"}
      ];
      
      // {a: "A", b: "A01", c:"C", d:"D", e:"E", f:"F", g:"G"}
      // 값이 없는 h 는 표현안됨
      firstGrid.setData(gridList);
      // 그리드 데이터 가져오기
      /!*
      $.ajax({
          method: "GET",
          url: API_SERVER + "/api/v1/ax5grid",
          success: function (res) {
              firstGrid.setData(res);
          }
      });
      *!/*/
      
      
    }
  };
  // 이벤트 정의
  $main.event = {
    setUIEvent: function(e) {
      // $('#btnSearch').on('click', $main.event.btnSearchClickHandler); // 검색
    },
    
    main: function() {
      if($.trim($("#userId").val()) == "") {
        return false;
      }
      if($.trim($("#userPw").val()) == "") {
        return false;
      }
      
      $("#mainFrm").submit();
    }
  };
  
}(window, document, jQuery));