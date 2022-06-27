(function(W, D,$){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$mpNtt = W.$mpNtt || {};
	
	var dataSource = null;
	
	var flagVal = "";					//등록 수정 구분 짓는 변수
	var targetUrl = "";					//등록 수정 구분 짓는 URL 
	
	var fileBuffer;						//전송될 파일배열
	var gridSubMap = {};				//달력 그리드 설정
	var oEditors = [];					//SmartEditor2
	
	$(document).ready(function(){
		
		$mpNtt.event.selectValue();		//오른쪽 SelectBox 이벤트
		$mpNtt.event.setUIEvent();		//이벤트 setUIEvent();
		$mpNtt.ui.pageLoad();			//최초 페이지 로드할 시, 이벤트
		
	});
	
	$mpNtt.ui = {
			
			/**
			 * @name		: pageLoad
			 * @description	: 페이지를 불러오면 벌어지는 이벤트
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			pageLoad : function() {
				var isOpen = $("#isOpen").val();
				
				if(isOpen == "") {
					$("#isOpenY").removeClass("uk-active");
					$("#isOpenN").removeClass("uk-acitve");
				} else if(isOpen == "Y") {
					$("#isOpenY").addClass("uk-active");
					$("#isOpenN").removeClass("uk-active");
				} else {
					$("#isOpenY").removeClass("uk-active");
					$("#isOpenN").addClass("uk-active");
				}
				
				var divisionCode = $("#divisionCode").val();
				
				$("#selectBoxName").text("");
				
				if(divisionCode == '0412') {
					$("#selectBoxName").text("공지사항");
				} else if(divisionCode == '0413') {
					$("#selectBoxName").text("FAQ");
				} else {
					$("#selectBoxName").text("Q & A");
				}
				$("#selectBoxName").append('<span uk-icon="chevron-down"></span>');
				
				//공통 그리드 달력 호출하기
				searchFormDatePeriod('date', 'mpNttDate', gridSubMap);

				var writeFlag = $("#writeFlag").val();
				if(writeFlag=="Y"){
					$mpNtt.ui.writeLoad();			//수정, 등록페이지 이벤트
				}
			},
			
			/**
			 * @name		: writeLoad
			 * @description	: contentsId의 값에 따라 등록일지 수정일지 구분해줌.
			 * @date		: 2019. 11. 14
			 * @author		: 이성훈
			 */
			writeLoad : function() {
				var contents_id = nvl($("#contentsId").val());
				
				if(contents_id != "") {
					$("#registBtn").html("수정");
				}

				nhn.husky.EZCreator.createInIFrame({
				    oAppRef: oEditors,
				    elPlaceHolder: "contents", //textarea에서 지정한 id와 일치해야 합니다. 
				    //SmartEditor2Skin.html 파일이 존재하는 경로
				    sSkinURI: "/ext/SE2/SmartEditor2Skin.html",  
				    htParams : {
				      // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
				      bUseToolbar : true,             
				      // 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
				      bUseVerticalResizer : true,     
				      // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
				      bUseModeChanger : true,         
				      fOnBeforeUnload : function(){
				           
				      }
				    }, 
				    fOnAppLoad : function(){
				      //기존 저장된 내용의 text 내용을 에디터상에 뿌려주고자 할때 사용
				      //oEditors.getById["contents"].exec("PASTE_HTML", ["기존 DB에 저장된 내용을 에디터에 적용할 문구"]);
				    },
				    fCreator: "createSEditor2"
				});
			}
	}
	
	//제작자 게시판 관련된 이벤트 모음들.
	$mpNtt.event = {
			
			/**
			 * @name		: setUIEvent
			 * @description	: 이벤트 클릭 세팅
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			setUIEvent : function(e) {
				$("#searchBtn").on('click', $mpNtt.event.listSearch);			//제작자 게시판 검색
				$("#checkAll").on('click', $mpNtt.event.checkBoxAll);			//테이블 헤더 체크박스 이벤트
				
				$("#enrollBtn").on('click', $mpNtt.event.goRegist);				//등록 및 수정버튼 클릭 이벤트
				
				$("#registBtn").on('click', $mpNtt.event.registInfo);			//등록 및 수정버튼 클릭 처리이벤트 
				$("#cancelBtn").on('click', $mpNtt.event.goList);				//목록으로
				
				$("#uploadfileList").on('change', $mpNtt.event.findFile);		//파일 업로드할 시, 아래 하단에 파일 추가 
			},
			
			/**
			 * @name		: checkBoxAll
			 * @description	: <th>상단에 체크박스를 누를 시, 전체 선택 혹은 전체 해제
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			checkBoxAll : function() {
				if($("#checkAll").prop("checked")) {
					$("input[type=checkbox]").prop("checked", true);	
				} else {
					$("input[type=checkbox]").prop("checked", false);
				}
			},
			
			/**
			 * @name		: isOpenClick
			 * @description	: 각 게시글마다 있는 체크박스를 누르고, 공개 & 비공개 누르면 나타나는 이벤트
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			isOpenClick : function(result) {
				var params = fn_getFormData($("#searchFrm"));
				
				params.isOpen = result;
				
				var checkCnt = $('input:checkbox[id="checkId"]:checked').length;
				
				if(checkCnt == 0) {			
					alert("선택된 항목이 없습니다.");
					return;
				}
				
				var contentsIdGroup = [];
				
				$('input:checkbox[id="checkId"]:checked').each(function(index){
					contentsIdGroup.push($(this).val());
				});
				
				params.contentsIdList = contentsIdGroup;
				
				if(confirm("공유 상태를 변경하시겠습니까?")) {
					ajax(true, contextPath + "/mp/ntt/process/updateOpenYn.do", 'body', '변경중입니다.', params, function(result){
						params.isOpen = "";
						postToURL(contextPath + "/mp/ntt/listView.do", params);
					});
				}
				
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
					var divisionCode = leadingZeros(activeNo[0].value, 4);
					
					params.divisionCode = divisionCode;
					
					postToURL(contextPath + "/mp/ntt/listView.do", params);
				});
			},
			
			/**
			 * @name		: listSearch
			 * @description	: 게시판 목록에 있는 검색 이벤트
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			listSearch : function(pageNo) {
				if(isNull(pageNo)) {
					pageNo = 1;
				}
				
				$("#currentPageNo").val(pageNo);
				var data = fn_getFormData($("#searchFrm"));
				
				postToURL(contextPath + "/mp/ntt/listView.do", data);				
			},
			
			/**
			 * @name		: detailView
			 * @description	: 게시판 목록 중 하나를 클릭할 시, 상세보기
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			detailView : function(result) {
				var data = fn_getFormData($("#searchFrm"));
				data.contentsId = result;

				postToURL(contextPath + "/mp/ntt/detailView.do", data);
			},
			
			/**
			 * @name		: goRegist
			 * @description	: 등록하기 버튼 클릭 (contentsId의 값이 없을 시)
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			goRegist : function(result) {
				var data = fn_getFormData($("#searchFrm"));
				data.contentsId = "";
				postToURL(contextPath + "/mp/ntt/regist.do", data);
			},
			
			/**
			 * @name		: goList
			 * @description	: 게시판 목록으로 이동
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			goList : function() {
				var params = {};
				params.divisionCode = $("#divisionCode").val();
				postToURL(contextPath + "/mp/ntt/listView.do", params);
			},
			
			/**
			 * @name		: goModify
			 * @description	: 수정하기 버튼
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			goModify : function(result) {
				var data = fn_getFormData($("#searchFrm"));
				postToURL(contextPath + "/mp/ntt/regist.do", data);
			},
			
			/**
			 * @name		: goDelete
			 * @description	: 삭제버튼 누를 시, 삭제 하기 
			 * @date		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			goDelete : function(result) {
				var params = {};
				params.contentsId = result;
				params.divisionCode = $("#divisionCode").val();
				
				flagVal = "삭제";
				targetUrl = "/mp/ntt/process/delete.do";
				
				if(confirm(flagVal + " 하시겠습니까?")) {
					ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', params, function(result){
						postToURL(contextPath + "/mp/ntt/listView.do", params);
					});
				}
			},
			
			/**
			 * @name		: registInfo
			 * @description	: 등록, 수정 버튼에 따른 이벤트
			 * @data		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			registInfo : function() {
				var data = fn_getFormData($("#insertForm"));
				
				data.isOpen = $('input[name="isOpen"]:checked').val();
				data.title =  $("#title").val();
				//SmartEdit2 텍스트적용
				oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);
				data.contents = $("#contents").val();
				data.divisionCode = $("#divisionCode").val();
				
//				var divisioncode = $("#divisionCode").val();
//				if(divisionCode == '0402') {
//					data.divisionCode = $("#divisionCode").val();
//				} else if(divisionCode == '0331') {
//					data.divisionCode = $('input[name="divisionCode"]:checked').val();
//				}
				
				if(data.contentsId == "") {
					flagVal = "등록";
					targetUrl = "/mp/ntt/process/insert.do";
					
					if(data.isOpen == null) {
						alert("공개여부를 체크하여 주세요.");
						return;
					}
				} else {
					flagVal = "수정";
					targetUrl = "/mp/ntt/process/update.do";
				}
				
				//첨부파일 관련 코드=============================
				var fileCheck = $("#uploadfileList").val();
				var files = document.getElementById("uploadfileList").files;
				var contentsId = $("#contentsId").val();
				var resultMsg = "";
			
				if(confirm(flagVal + " 하시겠습니까?")) {
					ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', data, function(result) {
				
						if(files.length > 0) {
							
							if(flagVal == "등록") {
								var contentsIdIndex = result.contentsIdIndex;
								$("#contentsId").val(contentsIdIndex);
								//formData.append("contentsId", result.contentsIdIndex);
							}

							var form = $("#insertForm")[0];
							var formData = new FormData(form);
							
							formData.append("folderid", "contents");
							formData.append("isUpload", true);
							formData.append("attachment", "");

							fileAjax(contextPath + "/file/uploadFile", formData, function(response) {
								if(response != null) {
									
								}
							});
						}
						resultMsg = result.resultMsg;
						
					}, function() {
						if(resultMsg != "") {
							alert(flagVal + "에 " + resultMsg + " 하였습니다.");
							$mpNtt.event.registList();
						}
					});
				}
			},
			
			/**
			 * @name		: registList
			 * @description	: 등록, 수정 처리를 한 후 결과 이벤트
			 * @data		: 2019. 11. 14.
			 * @author		: 이성훈
			 */
			
			registList : function() {
				var data = fn_getFormData($("#searchFrm"));
				
				var contentsId = $("#contentsId").val();
				var divisionCode = $("#divisionCode").val();
				
				if(contentsId == "") {
					data.divisionCode = divisionCode;
					
					postToURL(contextPath + "/mp/ntt/listView.do", data);
				} else {
					data.contentsId = contentsId;
					data.divisionCode = divisionCode;
					postToURL(contextPath + "/mp/ntt/detailView.do", data);
				}
			},
			
			/**
			 * @name		: findFile
			 * @description	: 사용자가 등록하기 누르고, 파일 업로드할 시, 어떤 파일을 업로드하였는지에 대한 이벤트
			 * @date		: 2019. 11. 18.
			 * @name		: 이성훈
			 */
			findFile : function() {

				fileBuffer = [];
				const target = document.getElementsByName('uploadfiles');
				
				Array.prototype.push.apply(fileBuffer, target[0].files);

	            $("#fileList_add").empty();

				$.each(target[0].files, function(index, file) {
					const fileName = file.name;					//첨부파일의 이름					
					var html = '<li id="default">' + fileName + '</li>';
					$("#fileList_add").append(html);
				});
			},
			
			/**
			 * @name		: deleteFile
			 * @description	: 사용자가 등록하기 누르고, 파일 업로드할 시, 어떤 파일을 업로드하였는지에 대한 이벤트
			 * @date		: 2019. 11. 18.
			 * @name		: 이성훈			 
			 */
			
			deleteFile : function(fileId, btype) {

				if(confirm("해당 파일을 삭제하시겠습니까?")) {
					var data = {};
					data.btype = btype;
					data.atchFileSn = fileId;
					
					var arg = {};
					
					ajax(true, contextPath + '/file/deleteFile', 'body', '파일 삭제중입니다.', data, function(result){
						if(result.resultCnt > 0) {
							$("#fileList_" + fileId).remove();
						}
					});
				}
				
			}
	}
}(window, document, jQuery));