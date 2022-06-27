(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$main = W.$main || {};

	var dataSource = null;

	$(document).ready(function() {
		$("#tabs").tabs();
		$main.ui.pageLoad();
		//$main.ui.treeLoad();
		//$main.event.ajaxTest();
		$main.event.setUIEvent();
		
	});

	// jQuery custom function
	// 라이브러리를 사용하는 외부에서 접근할 수 있도록(전역함수) encapsulation
	// 객체 메소드는 jQuery.fn($.fn)으로 정의하여 사용함. jQuery.prototype 의 별칭
	$main.ui = {
			
		pageLoad : function() {
			
			var data = {};
			
			$("#list").jqGrid({
				url : '/view/board.do',
				mtype : "POST",
				datatype : 'json',
				loadonce: true,
				postData : JSON.stringify(data),
				ajaxGridOptions : {
					contentType : "application/json; charset=UTF-8"
				},
				colNames : [ '번호', '제목','내용' ],
				colModel : [ 
						{name : 'no',index : 'no'}, 
						{name : 'title',index : 'title'}, 
						{name : 'content',index : 'content'}, 
					],
				rowNum : 10,
				height : 'auto',
				width : 'auto',
				gridview : true,
				rowList : [ 10, 20, 50, 100 ],
				pager : '#pager',
				autowidth : true,
				jsonReader : {
					//page: "page",
					root : "row",
					total : 'totalPage',
					//records : 'records',
					//repeatitems : false
				},
				onCellSelect : function(rowId) {
					// 상세 번호 가져오는 방법
					var list = $("#list").getRowData(rowId);
					var data = {
						no: list.no,	
					};
					postToURL(contextPath + '/view/detailView.do', data);
					
										
				},onPaging: function(action){
					
					if (action == "user") {

					    var requestedPage = $("#grid").getGridParam("page");
					    var lastPage = $("#grid").getGridParam("lastpage");
					    alert("requestedPage: " + requestedPage + ", lastPage: " + lastPage);
 
					    if (eval(requestedPage) > eval(lastPage)) {
					      alert("Setting to " + lastPage);
					      $("#grid").setGridParam({page:lastPage}).trigger("reloadGrid");
					    }
					  }
				    }


			})
		},
		treeLoad : function() {
			$("#treegrid").jqGrid({
				url : './treeData.json',
				// datastr: result,
				datatype : "json",
				mtypd : 'POST',
				colNames : [ "ID", "Description", "Total" ],
				colModel : [ {
					name : 'id',
					index : 'id',
					width : 1,
					hidden : true,
					key : true
				}, {
					name : 'desc',
					index : 'desc',
					hidden : false,
					sortable : true
				}, {
					name : 'num',
					index : 'num',
					hidden : false,
					sortable : true
				}, ],
				treeGridModel : 'adjacency',
				height : 'auto',
				width : '500',
				pager : "#ptreegrid",
				treeGrid : true,
				ExpandColumn : 'desc',
				ExpandColClick : true,
				caption : "Tree Grid Example",
				tree_root_level : 0,
				jsonReader : {
					repeatitems : false,
					id : "id",
					root : function(obj) {
						return obj["rows"];
					},
					page : function(obj) {
						return 1;
					},
					total : function(obj) {
						return 1;
					}
				},
				treeReader : {
					level_field : "lv",
					parent_id_field : "pt",
					leaf_field : "lf",
					expanded_field : "ex"
				}
			})
		},
		insertBt : function() {
			postToURL(contextPath + '/view/insertView.do');
		},
	};
	// 이벤트 정의
	$main.event = {
		setUIEvent : function(e) {
			$('#btnList').on('click', $main.event.btnListClickHandler); // 목록으로
			$('#btnSave').on('click', $main.event.btnSaveClickHandler); // 저장하기
			$('#btnMod').on('click', $main.event.btnModClickHandler); // 저장하기
			$('#btnDel').on('click', $main.event.btnDelClickHandler); // 삭제하기
		},

		btnListClickHandler : function(e) {
			postToURL(contextPath + "/view/boardList.do");
			
		},

		btnSaveClickHandler : function() {
				var data = {};
				
				data.no = $("#no").val();
				data.title = $("#title").val();
				data.content = $("#content").val();

				$.ajax({
					url : '/view/insertBoard.do',
					type : 'POST',
					dataType : 'json',
					data : data,
					//contentType : 'application/json; carset=UTF-8',
					success : function(result) {
						console.log("request  ::: ", result);
						if(data != null) {
							postToURL(contextPath + "/view/boardList.do");
						}
					},
					error : function(request, status, error) {
						var msg = "ERROR :" + request.status + "<br>"
						msg += +"내용 : " + request.responseText + "<br>" + error;
						console.log(msg);
					}
				})
		},
		btnModClickHandler : function() {
			var data = {};
			
			data.no = $("#no").val();
			data.title = $("#title").val();
			data.content = $("#content").val();

			$.ajax({
				url : '/view/updateBoard.do',
				type : 'POST',
				dataType : 'json',
				data : data,
				//contentType : 'application/json; carset=UTF-8',
				success : function(result) {
					console.log("request  ::: ", result);
					if(data != null) {
						postToURL(contextPath + "/view/boardList.do");
					}
				},
				error : function(request, status, error) {
					var msg = "ERROR :" + request.status + "<br>"
					msg += +"내용 : " + request.responseText + "<br>" + error;
					console.log(msg);
				}
			})
		},
		btnDelClickHandler : function() {
			var data = {};
			
			data.no = $("#no").val();

			$.ajax({
				url : '/view/delBoard.do',
				type : 'POST',
				dataType : 'json',
				data : data,
				//contentType : 'application/json; carset=UTF-8',
				success : function(result) {
					console.log("request  ::: ", result);
					if(data != null) {
						postToURL(contextPath + "/view/boardList.do");
					}
				},
				error : function(request, status, error) {
					var msg = "ERROR :" + request.status + "<br>"
					msg += +"내용 : " + request.responseText + "<br>" + error;
					console.log(msg);
				}
			})
		}
	};

}(window, document, jQuery));