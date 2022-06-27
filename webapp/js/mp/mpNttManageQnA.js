(function(W, D, $) {
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';

	W.$mpNttQnA = W.$mpNttQnA || {};

	var dataSource = null;

	var flagVal = ""; 						// 등록 수정 구분 짓는 변수
	var targetUrl = ""; 					// 등록 수정 구분 짓는 URL

	var fileBuffer; 						// 전송될 파일배열

	var gridSubMap = {};					//달력 그리드 설정
	var oEditors = [];						//SmartEditor2
	
	$(document).ready(function() {
		$mpNttQnA.event.selectValue(); 		// 오른쪽 SelectBox 이벤트
		$mpNttQnA.event.setUIEvent(); 		// 이벤트 setUIEvent();
		$mpNttQnA.ui.pageLoad(); 			// 최초 페이지 로드할 시, 이벤트
	});

	$mpNttQnA.ui = {

		/**
		 * @name : pageLoad
		 * @description : 페이지를 불러오면 벌어지는 이벤트
		 * @date : 2019. 11. 14.
		 * @author : 이성훈
		 */
		pageLoad : function() {
			var divisionCode = $("#divisionCode").val();
			
			$("#selectBoxName").text("");

			if (divisionCode == '0412') {
				$("#selectBoxName").text("공지사항");
			} else if (divisionCode == '0413') {
				$("#selectBoxName").text("FAQ");
			} else {
				$("#selectBoxName").text("Q & A");
			}
			$("#selectBoxName").append('<span uk-icon="chevron-down"></span>');
			
			//공통 그리드 달력 호출하기
			searchFormDatePeriod('date', 'mpNttQnADate', gridSubMap);

			//수정 버튼 변경
			if($("#replyYn").val()=="Y"){
				$("#registBtn").html("답변 수정");
			}
			
			/*nhn.husky.EZCreator.createInIFrame({
			    oAppRef: oEditors,
			    elPlaceHolder: "replyContents", //textarea에서 지정한 id와 일치해야 합니다. 
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
			});*/
		}
	}

	// 제작자 게시판 관련된 이벤트 모음들.
	$mpNttQnA.event = {

		/**
		 * @name : setUIEvent
		 * @description : 이벤트 클릭 세팅
		 * @date : 2019. 11. 14.
		 * @author : 이성훈
		 */
		setUIEvent : function(e) {
			$("#searchBtn").on('click', $mpNttQnA.event.listSearch); // 검색 버튼
			$("#cancelBtn").on('click', $mpNttQnA.event.goList); // 목록으로
			
			$("#uploadfileList").on('change', $mpNttQnA.event.findFile);		//파일 업로드할 시, 아래 하단에 파일 추가
		},

		/**
		 * @name : selectValue
		 * @description : 게시판 목록의 오른쪽 상단의 selectValue의 값에 따른 이벤트
		 * @date : 2019. 11. 14.
		 * @author : 이성훈
		 */
		selectValue : function(result) {
			var params = {};

			$('.nav-list li').click(function() {

				$('.nav-list li.uk-active').removeClass('uk-active');

				var activeNo = $(this).addClass('uk-active');
				var divisionCode = leadingZeros(activeNo[0].value, 4);

				params.divisionCode = divisionCode;
				
				postToURL(contextPath + "/mp/ntt/listView.do", params);
			});
		},

		/**
		 * @name : listSearch
		 * @description : QnA 검색 이벤트
		 * @date : 2019. 11. 14.
		 * @author : 이성훈
		 */
		listSearch : function(pageNo) {
			if (isNull(pageNo)) {
				pageNo = 1;
			}

			$("#currentPageNo").val(pageNo);
			var data = fn_getFormData($("#searchFrm"));

			postToURL(contextPath + "/mp/qna/listView.do", data);
		},

		/**
		 * @name : detailView
		 * @description : 게시판 목록 중 하나를 클릭할 시, 상세보기
		 * @date : 2019. 11. 14.
		 * @author : 이성훈
		 */
		detailView : function(result1, result2) {
			var data = fn_getFormData($("#searchFrm"));
			data.contentsId = result1;
			data.replyYn = result2;
			
			if(data.replyYn == "Y") {				//답변이 달려있으면, 상세보기로
				postToURL(contextPath + "/mp/qna/detailView.do", data);
			} else {								//답변이 달렬있지 않으면, 바로 수정으로 돌아가기
				postToURL(contextPath + "/mp/qna/regist.do", data);
			}
		},

		/**
		 * @name : goList
		 * @description : 게시판 목록으로 이동
		 * @date : 2019. 11. 14.
		 * @author : 이성훈
		 */
		goList : function() {
			
			postToURL(contextPath + "/mp/qna/listView.do");
		},

		/**
		 * @name : goAnswer
		 * @description : 답변하기 버튼
		 * @date : 2019. 11. 14.
		 * @author : 이성훈
		 */
		goAnswer : function(result) {
			var data = fn_getFormData($("#searchFrm"));
			data.contentsId = result;

			postToURL(contextPath + "/mp/qna/regist.do", data);
		},

		/**
		 * @name : goDelete
		 * @description : 삭제버튼 누를 시, 삭제 하기
		 * @date : 2019. 11. 14.
		 * @author : 이성훈 
		 */
		goDelete : function(result) {
			var params = {};
			params.contentsId = result;
			flagVal = "삭제";
			targetUrl = "/mp/qna/process/delete.do";

			if (confirm(flagVal + " 하시겠습니까?")) {
				ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.',
						params, function(result) {
							postToURL(contextPath + "/mp/qna/listView.do",params);
						});
			}
		},
		/**
		 * @name		: answerRegist
		 * @description	: 답변 달아주기
		 * @date		: 2019. 11. 14
		 * @author		: 이성훈
		 */
		answerRegist : function(result) {
			var data = fn_getFormData($("#insertForm"));
			
			data.replyWriteName = $("#loginName").val();
			data.replyWriteUserId = $("#loginId").val();
			//SmartEdit2 텍스트적용
			//oEditors.getById["replyContents"].exec("UPDATE_CONTENTS_FIELD", []);
			data.replyContents = $("#replyContents").val();
			data.contentsId = result;
			
			flagVal = "답변";
			targetUrl = "/mp/qna/process/answer.do";
			
			//첨부파일 관련 코드=============================
			var fileCheck = $("#uploadfileList").val();
			var files = document.getElementById("uploadfileList").files;
			//var contentsId = $("#contentsId").val();
			var resultMsg = "";
			
			if(confirm(flagVal + " 하시겠습니까?")) {
				ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.',
					data, function(result) {

					if(files.length > 0) {
							
						var form = $("#insertForm")[0];
						var formData = new FormData(form);
						
						formData.append("folderid", "qna");
						formData.append("isUpload", true);
						formData.append("attachment", "");
						formData.append("replyType", "2");
												
						fileAjax(contextPath + "/file/uploadFile", formData, function(response) {
							if(response != null) {
								
							}
						});
					}
					resultMsg = result.resultMsg;
					
				}, function() {
					if(resultMsg != "") {
						alert(flagVal + "에 " + resultMsg + " 하였습니다.");
						postToURL(contextPath + "/mp/qna/detailView.do", data);
					}
				});
			}
		},

		/**
		* @name         : findFile
		* @description  : 사용자가 등록하기 누른 이후, 파일을 업로드할 시, 어떤 업로드를 하였는지에 대한 코드
		* @date         : 2019. 10.18. 
		* @author	    : 박소희
		*/
		findFile : function(){
						
	        fileBuffer = [];
	        const target = document.getElementsByName('uploadfiles');
	        
	        Array.prototype.push.apply(fileBuffer, target[0].files);

            $("#fileList_add").empty();
            
	        $.each(target[0].files, function(index, file) {
	            const fileName = file.name;					//첨부파일의 이름
	            var html  = '<li id="default">' + fileName + '</li>';
	            $("#fileList_add").append(html);
	        });
		},
		
		/**
		* @name         : deleteFile
		* @description  : 해당 파일 삭제
		* @date         : 2019. 10. 30. 
		* @author	    : 박소희
		*/
		deleteFile : function(fileId, btype){

			console.log("파일 삭제 : "+ fileId + " Btype : " + btype);
			
			if(confirm("해당 파일을 삭제하시겠습니까?")) {
				var data = {};
				data.btype = btype;
				data.atchFileSn = fileId;

		        var arg = {};
		        //console.log(JSON.stringify(data));

				ajax(true, contextPath + '/file/deleteFile', 'body', '파일 삭제중입니다.', data, function(result) {
					
					console.log("파일 삭제 "+result.resultMsg);
					if(result.resultCnt > 0){
						$("#fileList_"+fileId).remove();							
					}						
				});
			}
		}
	}
}(window, document, jQuery));
