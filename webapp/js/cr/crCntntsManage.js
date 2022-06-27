(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$.crCntnts = W.$.crCntnts || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	var gridSubMap = {};					//달력 그리드 설정
	var oEditors = [];						//SmartEditor2
	
	$(document).ready(function(){
		
		$.crCntnts.event.setUIEvent();			//이벤트 SetUiEvent
		$.crCntnts.ui.pageLoad();				//최초 페이지 로드할 시 벌어지는 이벤트
		
	});
	
	$.crCntnts.ui = {
			
			/**
			 * @name		: pageLoad
			 * @description	: 페이지를 불러오면 벌어지는 이벤트
			 * @date		: 2019. 11. 07.
			 * @author		: 박소희
			 */
			pageLoad : function() {
				
				//공통 그리드 달력 호출하기
				searchFormDatePeriod('date', 'crtntsDate', gridSubMap);
				
				var writeFlag = $("#writeFlag").val();
				if(writeFlag=="Y"){
					$.crCntnts.ui.writeLoad(); 				//수정, 등록페이지 이벤트
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
			}
	}
	
	//Event 정의
	$.crCntnts.event = {
			
			/**
			* @name         : setUIEvent
			* @description  : 이벤트 세팅
			* @date         : 2019. 11. 07.
			* @author	    : 박소희
			*/
			setUIEvent : function(e) {
				$("#searchBtn").on('click', $.crCntnts.event.fn_search);		//게시판 검색 
				$("#checkAll").on('click', $.crCntnts.event.checkboxAll);		//테이블 헤더 체크박스  이벤트
				
				$("#popViewBtn").on('click', $.crCntnts.event.popView);			//미리보기 버튼 클릭 이벤트
				$("#enrollBtn").on('click', $.crCntnts.event.goRegist);			//등록 및 수정버튼 클릭 이벤트
				$("#deleteBtn").on('click', $.crCntnts.event.goDelete);			//삭제버튼 클릭 처리 이벤트
				
				$("#registBtn").on('click', $.crCntnts.event.registInfo);		//등록 및 수정버튼 클릭 처리 이벤트
				$("#cancelBtn").on('click', $.crCntnts.event.goList);			//목록으로
				
				
			},
			
			/**
			* @name         : goRegist
			* @description  : 등록/수정 페이지 이동
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			goRegist : function(contentsId) {
				
				var data = fn_getFormData($("#searchFrm"));
				postToURL(contextPath + "/cr/cntnts/regist.do", data);
			},
			
			/**
			* @name         : fn_search
			* @description  : 검색하기
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			fn_search : function(pageNo) {
				if(isNull(pageNo)) {
					pageNo = 1;
				}
				
				$("#currentPageNo").val(pageNo);
				
				var data = fn_getFormData($("#searchFrm"));
				
				postToURL(contextPath + "/cr/cntnts/listView.do", data);
			},
			
			/**
			* @name         : detailView
			* @description  : 컨텐츠 상세보기
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			detailView : function(result) {
				var data = fn_getFormData($("#searchFrm"));
				data.contentsId = result;
				postToURL(contextPath + "/cr/cntnts/detailView.do", data);
			},
			
			/**
			* @name         : detailView
			* @description  : 컨텐츠 미리보기(팝업창)
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			popView : function(result) {

				var url = contextPath + "/cr/cntnts/popView.do";
				url = url + "?contentsId=" + $("#contentsId").val();
				window.open(url, 'popView','width=1200,height=800,location=no,status=no,scrollbars=yes');
				
			},
			
			/**
			* @name         : checkboxAll
			* @description  : <th>태그에 체크박스 클릭할 시, 체크박스 모두 활성화 되는 이벤트
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
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
			* @description  : 컨텐츠 공유여부 변경버튼 클릭
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			isOpenClick : function(clickFlag) {
				var params = fn_getFormData($("#searchFrm"));
				
				params.isOpen = clickFlag;
				
				var ckCnt = $('input:checkbox[id="ckId"]:checked').length;
				
				console.log("체크박스수량 : " + ckCnt);
				
				if(ckCnt == 0){
					alert("선택한 항목이 없습니다.");
					return;
				}
				
				var contentsIdGroup = [];
				//var contentsIdGroup = $('input:checkbox[id="ckId"]:checked').val();
				//params.contentsIdGroup = contentsIdGroup;
				//params.contentsIdList = 
				$('input:checkbox[id="ckId"]:checked').each(function(idx){
					contentsIdGroup.push($(this).val());
				});
				params.contentsIdList = contentsIdGroup;
				
				console.log("체크대상확인..." + contentsIdGroup);

				if(confirm("공유상태를 변경하시겠습니까?")) {
					ajax(true, contextPath + "/cr/cntnts/process/updateOpenYn.do", 'body', '변경중입니다.', params, function(result){
						params.isOpen = "";
						postToURL(contextPath + "/cr/cntnts/listView.do", params);
					});
				}
			},
			
			/**
			* @name         : goDelete
			* @description  : 삭제 버튼 클릭
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			goDelete : function() {
				var params = fn_getFormData($("#searchFrm"));
				/*params.contentsId = result;
				params.divisionCode = $("#divisionCode").val();*/
				
				flagVal = "삭제";
				targetUrl = "/cr/cntnts/process/delete.do";
				
				if(confirm(flagVal + " 하시겠습니까?")) {
					ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', params, function(result){
						postToURL(contextPath + "/cr/cntnts/listView.do", params);
					});
				}
			},
			
			/**
			* @name         : registInfo
			* @description  : 등록, 수정 버튼 클릭에 따른 이벤트
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			registInfo : function() {
				var data = fn_getFormData($("#insertForm"));
				
				data.isOpen = $('input[name="isOpen"]:checked').val();
				data.title = $("#title").val();
				//SmartEdit2 텍스트적용
				oEditors.getById["contents"].exec("UPDATE_CONTENTS_FIELD", []);
				data.contents = $("#contents").val();		
				
				//contentsId의 값 유무에 따른 결과
				if(data.contentsId == "") {
					flagVal = "등록";
					targetUrl = "/cr/cntnts/process/insert.do";
					
				} else {
					flagVal = "수정";
					targetUrl = "/cr/cntnts/process/update.do";
				}
			    
				if(confirm(flagVal + " 하시겠습니까?")) {
					ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', data, function(result) {
						$.crCntnts.event.regBtnList();
					});
				}
			},
			
			/**
			* @name         : regBtnList
			* @description  : 등록 및 수정을 처리 한 후 결과 이벤트
			* @date         : 2019. 10. 18. 
			* @author	    : 박소희
			*/
			regBtnList : function() {
				var data = fn_getFormData($("#searchFrm"));
				data.divisionCode = $("#divisionCode").val();
				
				var btnId = $("#registBtn").html();
				
				if(btnId == "등록") {
					postToURL(contextPath + "/cr/cntnts/listView.do", data);
				} else if(btnId == "수정") {
					data.contentsId = $("#contentsId").val();
					postToURL(contextPath + "/cr/cntnts/detailView.do", data);
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
				
				postToURL(contextPath + "/cr/cntnts/listView.do", params);
			}
			
	}
}(window,document, jQuery));