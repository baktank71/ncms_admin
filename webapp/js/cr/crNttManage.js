(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$crNtt = W.$crNtt || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	var fileBuffer;							//전송될 파일배열
	
	var gridSubMap = {};					//달력 그리드 설정
	var oEditors = [];						//SmartEditor2
	
	$(document).ready(function(){
		
		$crNtt.event.selectValue();			//오른쪽 상단 위 SelectBox 이벤트
		$crNtt.event.setUIEvent();			//이벤트 SetUiEvent
		$crNtt.ui.pageLoad();				//최초 페이지 로드할 시 벌어지는 이벤트
		
	});
	
	$crNtt.ui = {
						
			/**
			 * @name		: pageLoad
			 * @description	: 페이지를 불러오면 벌어지는 이벤트
			 * @date		: 2019. 08. 23.
			 * @author		: 이성훈
			 */
			pageLoad : function() {

				// 오른쪽 상단 위, SelectBox의 값이 어디에 있는지에 대한 정보
				var divisionCode = $("#divisionCode").val();
				$("#selectBoxName").text("");
				var boxText = '<span uk-icon="chevron-down"></span>';
				
				//공통 그리드 달력 호출하기
				searchFormDatePeriod('date', 'crctDate', gridSubMap);

				if(divisionCode == '0402') {
					//$("#selectBoxName").text("공지사항");
					boxText = "공지사항" + boxText;
				} else if(divisionCode == '0401') {
					boxText = "리콜보도자료" + boxText;
				} else if(divisionCode == '0331' || divisionCode == '0333') {
					boxText = "FAQ" + boxText;
				} else if(divisionCode == '0337' || divisionCode == '0339') {
					boxText = "FAQ(Eng)" + boxText;
				} else if(divisionCode == '0701') {
					boxText = "관리자공지사항" + boxText;
				} else if(divisionCode == '0702') {
					boxText = "공지팝업" + boxText;
				}/* else if(divisionCode == '') {
					$("#selectBoxName").text("팝업존");
					boxText = "팝업존" + boxText;
				} else if(divisionCode == '0206'){
					$("#selectBoxName").text("리콜시정현황");
				} else if(divisionCode == '0312') {
					$("#selectBoxName").text("안전운전정보");
				}*/
				$("#selectBoxName").append(boxText);
								
				//FAQ 라디오버튼 수정하기 이벤트 0331 0333				
				var faqId = $("#divisionCode").val();

				if(faqId == "0331" || faqId == "0337") {
					$("#faqId1").prop("checked",true);
					$("#faqId2").prop("checked",false);
				} else if(faqId == "0333" || faqId == "0339") {
					$("#faqId1").prop("checked",false);
					$("#faqId2").prop("checked",true);
				}
				
				var writeFlag = $("#writeFlag").val();
				if(writeFlag=="Y"){
					$crNtt.ui.writeLoad(); 				//수정, 등록페이지 이벤트
				}
			},
			
			// contentsId가 없으면 등록, 있으면 수정페이지로 
			writeLoad : function() {
				var contents_id = nvl($("#contentsId").val());
				
				if(contents_id != "") {
					$("#registBtn").html("수정");
				}

				//SmartEditor2
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
			},
	}
	
	//Event 정의
	$crNtt.event = {
			
		/**
		* @name         : setUIEvent
		* @description  : 이벤트 세팅
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		setUIEvent : function(e) {
			$("#searchBtn").on('click', $crNtt.event.fn_search);		//게시판 검색 
			$("#checkAll").on('click', $crNtt.event.checkBoxAll);		//테이블 헤더 체크박스  이벤트
			
			$("#enrollBtn").on('click', $crNtt.event.goRegist);			//등록 및 수정버튼 클릭 이벤트
			
			$("#registBtn").on('click', $crNtt.event.registInfo);		//등록 및 수정버튼 클릭 처리 이벤트
			$("#cancelBtn").on('click', $crNtt.event.goList);			//목록으로
			
			$("#uploadfiles").on('change', $crNtt.event.findFile);		//파일 업로드할 시, 아래 하단에 파일 추가
			
		},

		/**
		* @name         : findFile
		* @description  : 사용자가 등록하기 누른 이후, 파일을 업로드할 시, 어떤 업로드를 하였는지에 대한 코드
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		findFile : function(){
			
			// modern browser
			/*
			if(window.FileReader) { 
			for(var i=0;i<$(this)[0].files.length;i++) {
				$("#fileList").prepend('<li id="default">' + $(this)[0].files[i].name + '<a href="javascript:void(0)" id="fileListIndex" onclick="$crNtt.event.removeFile(this)"> [X] </a></li>');
			}
			} else { // old IE
				var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
			}  // 추출한 파일명 삽입
			$(this).siblings('.fileName').text(filename);
			*/
			
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
		* @name         : goRegist
		* @description  : 등록페이지 이동
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		goRegist : function() {
			var data = fn_getFormData($("#searchFrm"));
			data.contentsId = "";
			postToURL(contextPath + "/cr/ntt/regist.do", data);
		},
		
		/**
		* @name         : fn_search
		* @description  : 검색하기
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		fn_search : function(pageNo) {
			if(isNull(pageNo)) {
				pageNo = 1;
			}
			$("#currentPageNo").val(pageNo);
			
			var data = fn_getFormData($("#searchFrm"));	//검색폼 			value에 params값을 집어넣으면 유지가 된다.
			
			postToURL(contextPath + "/cr/ntt/listView.do", data);
		},
		
		/**
		* @name         : selectValue
		* @description  : 위 상단 목록을 선택할 떄마다 해당 목록에 맞는 데이터들 보여주는 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		selectValue : function(data) {
			
			var params = {}; 
			
			//목록 버튼 클릭
			$('.nav-list li').click(function() {
				
				$('.nav-list li.uk-active').removeClass('uk-active');
				var activeNo = $(this).addClass("uk-active");	
				
				var diviCode = leadingZeros(activeNo[0].value, 4);
				params.divisionCode = diviCode;

		        postToURL(contextPath + "/cr/ntt/listView.do", params); 
			});
		},
		
		/**
		* @name         : detailView
		* @description  : 게시글 상세보기
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		detailView : function(result) {
			var data = fn_getFormData($("#searchFrm"));
			data.contentsId = result;

			postToURL(contextPath + "/cr/ntt/detailView.do", data);
		},
		
		/**
		* @name         : checkboxAll
		* @description  : <th>태그에 체크박스 클릭할 시, 체크박스 모두 활성화 되는 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		checkBoxAll : function() {
			if($("#checkAll").prop("checked")) {
				$("input[type=checkbox]").prop("checked", true);
			} else {
				$("input[type=checkbox]").prop("checked", false);
			}
		},
		
		/**
		* @name         : isOpenClick
		* @description  : 게시판 여부 변경 버튼 클릭 [라디오버튼 아님]
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		isOpenClick : function(result) {
			var params = fn_getFormData($("#searchFrm"));
			
			params.isOpen = result;
			
			var checkCnt = $('input:checkbox[id="checkId"]:checked').length;
			
			//console.log("체크박스 수량 :" + checkCnt);  			//테스트 완료
			
			if(checkCnt == 0) {								//만약, 체크박스를 선택안하고 버튼 누를 시, 알림창
				alert("선택된 항목이 없습니다.");
				return;
			}
			
			var contentsIdGroup = [];						//contentsIdGroup의 contentsId를 넣습니다.
			
			$('input:checkbox[id="checkId"]:checked').each(function(index) {
				contentsIdGroup.push($(this).val());
			});
			
			params.contentsIdList = contentsIdGroup;
			
			//console.log("체크 대상 확인... : " + contentsIdGroup);		//contentsId들이 줄줄히 나온다
			
			//=====================================
			if(confirm("공개 상태를 변경하시겠습니까?")) {
				ajax(true, contextPath + "/cr/ntt/process/updateOpenYn.do", 'body', '변경중입니다.', params, function(result){
					params.isOpen = "";
					postToURL(contextPath + "/cr/ntt/listView.do", params);
					
				});
			}
		},
		
		/**
		* @name         : goModify
		* @description  : 수정하기 버튼 클릭
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		goModify : function(result) {
			var data = fn_getFormData($("#searchFrm"));				
			postToURL(contextPath + "/cr/ntt/regist.do", data);
			
		},
		
		/**
		* @name         : goDelete
		* @description  : 삭제 버튼 클릭
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		goDelete : function(result) {
			var params = {};
			params.contentsId = result;
			params.divisionCode = $("#divisionCode").val();
			
			flagVal = "삭제";
			targetUrl = "/cr/ntt/process/delete.do";
			
			if(confirm(flagVal + " 하시겠습니까?!")) {
				ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', params, function(result){
					postToURL(contextPath + "/cr/ntt/listView.do", params);
				});
			}
		},
		
		/**
		* @name         : registInfo
		* @description  : 등록, 수정 버튼 클릭에 따른 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		registInfo : function() {
			var data = fn_getFormData($("#insertForm"));
			
			data.isOpen = $('input[name="isOpen"]:checked').val();
			data.title = $("#title").val();
			//SmartEdit2 텍스트적용
			oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);
			data.contents = $("#contents").val();		
			//주민번호, 전화번호 검출 추가... 임시 알람 처리
			//alert("내용에 개인정보(주민등록번호, 전화번호)가 포함되어 게시물 등록이 불가합니다.");
			
			data.divisonCode = $('input[name="divisionCode"]:checked').val();
			//contentsId의 값 유무에 따른 결과
			if(data.contentsId == "") {
				flagVal = "등록";
				targetUrl = "/cr/ntt/process/insert.do";
				
				if(data.isOpen == null) {
					alert("공개여부를 체크하여 주세요.");
					return;
				}
			} else {
				flagVal = "수정";
				targetUrl = "/cr/ntt/process/update.do";
			}
			
			//파일
			var fileCheck = $("#uploadfiles").val();
			var files = document.getElementById("uploadfiles").files;
			var contentsId = $("#contentsId").val();
			var resultMsg = "";
			
			if(confirm(flagVal + " 하시겠습니까?")) {
				ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', data, function(result) {
					
					if(files.length > 0) {	 
						
						if(flagVal == "등록") {
							var contentsIdIndex = result.contentsIdIndex;
							$("#contentsId").val(contentsIdIndex);
							//formData.append("contentsId", result.contentsIdIndex);		//파일 업로드할 시 중요한 시퀀스 번호	
						}
						
						var form = $("#insertForm")[0];
						var formData = new FormData(form);
						
						formData.append("folderid", "contents");
						formData.append("isUpload", true);
						formData.append("attachment","");
												
						fileAjax(contextPath + "/file/uploadFile", formData, function(response) {
							if(response != null) {
								
							}
						});
					}
					resultMsg = result.resultMsg;
			}, function() {
				if(resultMsg != "") {
					alert(flagVal + "에 " + resultMsg + " 하였습니다.");
					$crNtt.event.regBtnList();
				}
			});
				
			}
			
		},
		
		/**
		* @name         : regBtnList
		* @description  : 등록 및 수정을 처리 한 후 결과 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		regBtnList : function() {
			var data = fn_getFormData($("#searchFrm"));
			//var btnId = $("#registBtn").html();
			var contentsId = $("#contentsId").val();
			var divisionCode = $("#divisionCode").val();

			if(contentsId == "") {
				data.divisionCode = divisionCode;

				postToURL(contextPath + "/cr/ntt/listView.do", data);
			} else {
				data.contentsId = contentsId;
				data.divisionCode = divisionCode;
				postToURL(contextPath + "/cr/ntt/detailView.do", data);
			}
		},
		
		/**
		* @name         : goList
		* @description  : 목록으로 보여준다
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		goList : function() {
			var params = fn_getFormData($("#searchFrm"));;
			params.divisionCode = $("#divisionCode").val();
			postToURL(contextPath + "/cr/ntt/listView.do", params);
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
}(window,document, jQuery));

		/**
		* @name         : getStr
		* @description  : 
		* @date         :  
		* @author	    : 
		*/
		function getStr(date) {
			var returnStr = String(date);
			if(returnStr.length < 2) 
				returnStr = '0' + returnStr;
			return returnStr;
		}