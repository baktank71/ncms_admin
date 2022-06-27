(function(W, D, $) {
  // bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
  'use strict';
  
  W.$analys = W.$analys || {};

  var gridSubMap = {};
  
  $(document).ready(function() {
	  $analys.ui.pageLoad();
	  $analys.event.setUIEvent();
  });
    
  // jQuery custom function
  // 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
  // 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭
  $analys.ui = {
    
    pageLoad: function() {
    
      selectAx5("startYear", apiFilter7(), 'value', 'text', { stateChgFun: function(ths) {}, minWidth: 100, search: true}, true);
      selectAx5("endYear", apiFilter7(), 'value', 'text', { stateChgFun: function(ths) {}, minWidth: 100, search: true}, true);
      
      selectAx5("maker", apiFilter1(), 'value', 'text', { stateChgFun: function(ths) {}, minWidth: 100, search: true}, true);	      

      mainService();
    }
  };
  
  // 이벤트 정의
  $analys.event = {
    
    setUIEvent: function(e) {
      $('#btnSearch').on('click', function() {
    	  mainService();
      });

    }
  };
  
}(window, document, jQuery));


function mainService(){
	analys3();
}





