(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$crNttRg = W.$crNttRg || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	var fileBuffer;							//전송될 파일배열
	
	var gridSubMap = {};					//달력 그리드 설정
	var oEditors = [];						//SmartEditor2
	
	$(document).ready(function(){
		
		$crNttRg.event.selectValue();			//오른쪽 상단 위 SelectBox 이벤트
		$crNttRg.event.setUIEvent();			//이벤트 SetUiEvent
		$crNttRg.ui.pageLoad();					//최초 페이지 로드할 시 벌어지는 이벤트
		
	});
	
	$crNttRg.ui = {
			/**
			 * @name		: pageLoad
			 * @description	: 페이지를 불러오면 벌어지는 이벤트
			 * @date		: 2019. 11. 13.
			 * @author		: 박소희
			 */
			pageLoad : function() {

				//공통 그리드 달력 호출하기
				searchFormDatePeriod('date', 'crNttRgDate', gridSubMap);
				
				//var isOpen = $("#isOpen").val();
				
				var writeFlag = $("#writeFlag").val();
				if(writeFlag=="Y"){
					$crNttRg.ui.writeLoad(); 				//수정, 등록페이지 이벤트
				}
				
			},
		// contentsId가 없으면 등록, 있으면 수정페이지로 
		writeLoad : function() {
			var contents_id = nvl($("#contentsId").val());
			
			if(contents_id != "") {
				$("#registBtn").html("수정");
				
				   var fileBuffer = [];
			       const target = document.getElementsByName('uploadfiles');
			        
			       Array.prototype.push.apply(fileBuffer, target[0].files);
				   //console.log("fileBuffer:"+fileBuffer);
		            
			       $.each(target[0].files, function(index, file){
			          const fileName = file.name;
			          var html  = '<li id="default">' + fileName;
			          	//html += '<a href="javascript:void(0)" id="fileListIndex" onclick="$crNttRgevent.removeFile(this)"> [X] </a></li>'
			          html += '</li>'
			          $("#fileList_add").append(html);
			       });
			}
			
			var jbsource = $("#jbsource").val();
			if(jbsource=='2'){
				$("#jbsourceDiv1").hide();
				$("#jbsourceDiv2").show();
			}else{
				$("#jbsourceDiv1").show();
				$("#jbsourceDiv2").hide();
			}

			//대표이미지/동영상 전환
	    	  $crNttRg.event.jbsourceChange();
		      $("#jbsource").change(function(){
		    	  $crNttRg.event.jbsourceChange();
		      });
			
			
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
	
	//Event 정의
	$crNttRg.event = {
			
		/**
		* @name         : setUIEvent
		* @description  : 이벤트 세팅
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		setUIEvent : function(e) {
			$("#searchBtn").on('click', $crNttRg.event.fn_search);		//게시판 검색 
			$("#checkAll").on('click', $crNttRg.event.checkboxAll);		//테이블 헤더 체크박스  이벤트
			
			$("#enrollBtn").on('click', $crNttRg.event.goRegist);			//등록 및 수정버튼 클릭 이벤트
			
			$("#registRgBtn").on('click', $crNttRg.event.registInfoRg);	//등록 및 수정버튼 클릭 처리 이벤트(Rg)
			$("#cancelBtn").on('click', $crNttRg.event.goList);			//목록으로
			
			$("#uploadfiles").on('change', $crNttRg.event.findFile);		//파일 업로드할 시, 아래 하단에 파일 추가
		},

		/**
		* @name         : findFile
		* @description  : 사용자가 등록하기 누른 이후, 파일을 업로드할 시, 어떤 업로드를 하였는지에 대한 코드
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
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
			
			var data = fn_getFormData($("#searchFrm"));
			
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
		detailView : function(result, result2) {
			var data = fn_getFormData($("#searchFrm"));
			data.contentsId = result;
			data.divisionCode = result2;
			postToURL(contextPath + "/cr/ntt/detailView.do", data);
		},
		
		/**
		* @name         : checkboxAll
		* @description  : <th>태그에 체크박스 클릭할 시, 체크박스 모두 활성화 되는 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
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
		* @description  : 공개 비공게 변경버튼 클릭
		* @date         : 2019. 10. 18. 
		* @author	    : 박소희
		*/
		isOpenClick : function(clickFlag) {
			var params = fn_getFormData($("#searchFrm"));
			
			params.isOpen = clickFlag;
			
			var ckCnt = $('input:checkbox[id="ckId"]:checked').length;
			
			//console.log("체크박스수량 : " + ckCnt);
			
			if(ckCnt == 0){
				alert("선택한 항목이 없습니다.");
				return;
			}
			
			var contentsIdGroup = [];
			$('input:checkbox[id="ckId"]:checked').each(function(idx){
				contentsIdGroup.push($(this).val());
			});
			params.contentsIdList = contentsIdGroup;
			
			//console.log("체크대상확인..." + contentsIdGroup);

			if(confirm("공유상태를 변경하시겠습니까?")) {
				ajax(true, contextPath + "/cr/ntt/process/updateOpenYn.do", 'body', '변경중입니다.', params, function(result){
					params.isOpen = "";
					alert("변경되었습니다.");
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
			params.contentsId = $("#contentsId").val();
			params.divisionCode = $("#divisionCode").val();
			
			flagVal = "삭제";
			targetUrl = "/cr/ntt/process/delete.do";
			
			if(confirm(flagVal + " 하시겠습니까?")) {
				ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', params, function(result){
					if(result!=null){
						alert(flagVal + "에 " + result.resultMsg + " 하였습니다.");
						postToURL(contextPath + "/cr/ntt/listView.do", params);
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
		* @name         : registInfoRg
		* @description  : 리콜시행 및 무상수리 정보 등록 [단일]
		* @date         : 2019. 10. 30. 
		* @author	    : 박소희
		*/
		registInfoRg :  function() {
							
			var data = fn_getFormData($("#insertForm"));

			data.isOpen = $('input[name="isOpen"]:checked').val();
			data.title = $("#title").val();
			//SmartEdit2 텍스트적용
			oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);
			data.contents = $("#contents").val();
			
			//contentsId의 값 유무에 따른 결과
			if(data.contentsId == "") {
				flagVal = "등록";
				targetUrl = "/cr/ntt/process/insert.do";
				
				if(data.isOpen == null) {
					alert("공개여부를 선택해주세요.");
					return;
				}
			} else {
				flagVal = "수정";
				targetUrl = "/cr/ntt/process/update.do";
			}
 
			//파일 관련 내용
		    var fileCheck = $("#uploadfileRep").val();						//파일체크 이름						
		    var uploadfileRep = document.getElementById("uploadfileRep").files;    	// var files = $("#uploadfiles")[0].files;
		    var files = document.getElementById("uploadfiles").files;    	// var files = $("#uploadfiles")[0].files;

		    var contentsId = $("#contentsId").val();

			var jbsource = $("#jbsource").val();
			if(jbsource=='2'){

				$("#titleDc").val("");
				if(uploadfileRep.length == 0 && contentsId =="") {
					alert("대표이미지를 등록해주시길 바랍니다.");
					$("#uploadfile").focus();
					return;
				}
			}else{
				
				$("#uploadfileRep").val("");
				if($.trim($("#titleDc").val())==""){
					alert("대표URL을 입력해주시길 바랍니다.");
					$("#titleDc").focus();
					return;
				}
			}
			
		    if(uploadfileRep.length > 0){
			    //대표이미지일 경우 이미지 파일로 제한한다
				var ext = fileCheck.split('.').pop().toLowerCase();
			
			    if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
			    	alert('이미지파일만 업로드 할수 있습니다.\n(gif, png, jpg, jpeg)');
			    	return;
		        }/*else{
		        	//alert($.inArray(ext, ['mp4']));
		        	if($.inArray(ext, ['mp4']) > -1){
		        		data.jbsource = 2;
		        	}else{
		        		data.jbsource = 1;
		        	}
		        }
			    console.log(data.jbsource);*/
		    }
		    
		    var resultMsg = ""; //완료상태 체크용

			if(confirm(flagVal + " 하시겠습니까?")) {
				ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', data
					, function(result) {
					
					if(flagVal == "등록") {
						var contentsIdIndex = result.contentsIdIndex;
						$("#contentsId").val(contentsIdIndex);
						//formData.append("contentsId",result.contentsIdIndex);
					}

					var form = $('#insertForm')[0];
					var formData = new FormData(form);

					if(flagVal == "등록") {
						formData.append("updFlg","N");
					}else{
						formData.append("updFlg","Y");	
					}
					
					formData.append("folderid", "contents");
					formData.append("isUpload", true);
					formData.append("attachment", "");
					
					//대표이미지가 있을경우 업로드
					if(jbsource=='2' && uploadfileRep.length > 0){

						fileAjax(contextPath + "/cr/ntt/procRep/uploadImg", formData
							, function(response) {
								if (response != null) {
									//업로드 후 체크할 것이 있다면 실행
								}
						});
					}
					
					//등록 후 파일이 있을 경우 업로드
					if(files.length > 0){
				 
						fileAjax(contextPath + "/file/uploadFile", formData
							, function(response) {
								if (response != null) {
									//업로드 후 체크할 것이 있다면 실행
								}
						});
					}
					resultMsg = result.resultMsg;

				}, function(){
//					완료 후 화면 이동
					if(resultMsg != ""){
						alert(flagVal + "에 " + resultMsg + " 하였습니다.");
						$crNttRg.event.regBtnList();						
					}							
				});
			}
		},

		/**
		* @name         : deleteFile
		* @description  : 해당 파일 삭제
		* @date         : 2019. 10. 30. 
		* @author	    : 박소희
		*/
		deleteFile : function(fileId, btype){

			//console.log("파일 삭제 : "+fileId + " Btype : " + btype);
			
			if(confirm("해당 파일을 삭제하시겠습니까?")) {
				var data = {};
				data.btype = btype;
				data.atchFileSn = fileId;

		        var arg = {};
		        //console.log(JSON.stringify(data));

				ajax(true, contextPath + '/file/deleteFile', 'body', '파일 삭제중입니다.', data, function(result) {
					
					//console.log("파일 삭제 "+result.resultMsg);
					if(result.resultCnt > 0){
						$("#fileList_"+fileId).remove();							
					}						
				});
			}
		},

		/**
		* @name         : jbsourceChange
		* @description  : 대표이미지,동영상 전환시
		* @date         : 2020. 02. 21. 
		* @author	    : 박소희
		*/
		jbsourceChange: function(e) {
			var jbsource = $("#jbsource").val();
			if(jbsource=='2'){
				$("#jbsourceDiv1").hide();
				$("#jbsourceDiv2").show();
			}else{
				$("#jbsourceDiv1").show();
				$("#jbsourceDiv2").hide();
			}
		},
		
	}
}(window,document, jQuery));