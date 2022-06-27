(function(W, D, $){
	// bjlee, IE 10 부터 지원하는 strict mode 선언. 안전하지 않은 액션들에 대해 예외를 발생시킴
	'use strict';
	
	W.$crNttPop = W.$crNttPop || {};
	
	var dataSource = null;
	
	var flagVal = "";						//등록 수정 구분
	var targetUrl = "";						//등록 수정 URL
	
	var gridSubMap = {};					//달력 그리드 설정
	
	$(document).ready(function(){
		
		$crNttPop.event.selectValue();			//오른쪽 상단 위 SelectBox 이벤트
		$crNttPop.event.setUIEvent();			//이벤트 SetUiEvent
		$crNttPop.ui.pageLoad();				//최초 페이지 로드할 시 벌어지는 이벤트
		$crNttPop.ui.writeLoad(); 				//수정, 등록페이지 이벤트
		
	});
	
	$crNttPop.ui = {
			
			/**
			 * @name		: pageLoad
			 * @description	: 페이지를 불러오면 벌어지는 이벤트
			 * @date		: 2019. 11. 13.
			 * @author		: 박소희
			 */
			pageLoad : function() {
				
				//공용 그리드 달력 호출하기 (시작일자)
				searchFormDatePeriod('date', 'crNttPopDate1', gridSubMap);
				
				//공용 그리드 달력 호출하기 (끝일자)
				searchFormDatePeriod('date', 'crNttPopDate2', gridSubMap);
				
			},
			
			// bannerId가 없으면 등록, 있으면 수정페이지로 
			writeLoad : function() {
				var banner_id = nvl($("#bannerId").val());
				
				if(banner_id != "") {
					$("#registBtn").html("수정");
				}

				// 링크URL찾기 레이어 팝업 생성
				$crNttPop.ui.searchTargetList(1);
				$("#srchTrgDivCd").change($crNttPop.ui.targetChangeEvent);			//목록으로
				
			},

			/**
			* @name         : targetChangeEvent
			* @description  : 리콜보도자료 <<>> 공지사항 리스트 변경
			* @date         : 2019. 12. 24. 
			* @author	    : 박소희
			*/
			targetChangeEvent: function(e) {
				$("#srchWrd").val("");
				$crNttPop.ui.searchTargetList(1);
			},
			
			/**
			* @name         : searchTargetList
			* @description  : 링크URL 찾기 팝업
			* @date         : 2019. 07. 22. 
			* @author	    : 박소희
			*/
			searchTargetList : function(pageIndex) {

	            var codeData = {}
	            codeData.srchTrgDivCd = $("#srchTrgDivCd").val();  
	            codeData.pageIndex = pageIndex;  
	            codeData.srchWrd = $("#srchWrd").val();
	            codeData.recordCount = 8;  

	            ajax(true, contextPath + '/cr/ntt/json/targetList.do', 'body', '조회중입니다.', codeData, function(data) {
		            //console.log("code test : " + JSON.stringify(data));
	            	data.pageIndex = pageIndex;
	            	$crNttPop.ui.makeTargetList(data); 
				});
			},

			/**
			 * @name         : makeTargetList
			 * @description  : 링크URL 목록 생성
			 * @date         : 2020. 01. 16. 
			 * @author	     : 박소희
			 */
			makeTargetList : function(data) {
				var body = $("#targetList");
				body.empty(); 
				var totalCount = data.list[0].totalCount;
				   
	        	/** paging start **/
				var params = { 
					  divId : "pagingUi"
					, pageIndex : data.pageIndex
					, totalCount : totalCount
					, eventName : "$crNttPop.ui.searchTargetList" 
				} 
				navi_renderPaging(params);
	        	/** paging end **/
				
				if(totalCount == 0){ 
					var str = "<tr>" + "<td class='uk-text-center' colspan='2'>조회된 결과가 없습니다.</td>" + "</tr>"; 
					body.append(str); 
				} else{
					
					var str = ""; 
					$.each(data.list, function(key, value){ 
						str +=  "<tr style='cursor: pointer;'>" +
									"<td class='uk-text-center'>" + value.contentsId + 
									"<input type='hidden' id='subcode' value='"+value.contentsId+"'/>" + "</td>" +
									"<td>" + value.title + "</td>" +
								"</tr>";				
					});
					body.append(str);
					
					$("#searchTable1 tbody tr").click(function(){     

						var linkUrl = "";
				        	
				        var tr = $(this);
				        var td = tr.children();

						//console.log(td.eq(0).text()); //contentsId
				        
				        //var subcode = $(this).find('#subcode').val();
				        //var codeName = td.eq(1).text();
						
						var srchContentsId = td.eq(0).text();
						
						var srchTrgDivCd = $("#srchTrgDivCd").val();
						if(srchTrgDivCd == '0401'){
							//리콜보도자료
							linkUrl = "/sd/newsDta/detail.do";
							linkUrl += "?divisionCode="+srchTrgDivCd+"&contentsId="+srchContentsId;
						}else if(srchTrgDivCd == '0402'){
							//공지사항
							linkUrl = "/rs/nct/detail.do";
							linkUrl += "?divisionCode="+srchTrgDivCd+"&contentsId="+srchContentsId;
						}
						
				        
				        $("#bannerLinkUrl").val(linkUrl); 

				        //var modal = new $.UIkit.modal.Modal("#find-prdct")
				        //modal.toggle();
				        UIkit.modal("#find-prdct").hide();

					 });

				}

			},

			
	}
	
	//Event 정의
	$crNttPop.event = {
			
		/**
		* @name         : setUIEvent
		* @description  : 이벤트 세팅
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		setUIEvent : function(e) {
			$("#searchBtn").on('click', $crNttPop.event.fn_search);			//게시판 검색 
			$("#fnonUseBtn").on('click', $crNttPop.event.fn_fnon_use);		//팝업존Max설정
			
			$("#checkAll").on('click', $crNttPop.event.checkboxAll);		//테이블 헤더 체크박스  이벤트
			
			$("#enrollBtn").on('click', $crNttPop.event.goRegist);			//등록 및 수정버튼 클릭 이벤트
			
			$("#registBtn").on('click', $crNttPop.event.registInfo);		//등록 및 수정버튼 클릭 처리 이벤트(PopupZone)
			$("#cancelBtn").on('click', $crNttPop.event.goList);			//목록으로
			
			//$("#uploadfiles").on('change', $crNttPop.event.findFile);			//찾아보기 체인지 이벤트
		},

		/**
		* @name         : findFile
		* @description  : 사용자가 등록하기 누른 이후, 파일을 업로드할 시, 어떤 업로드를 하였는지에 대한 코드
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		findFile : function(e){
			
			if(window.FileReader) { // modern browser
				
				//파일 
				for(var i=0;i<$(this)[0].files.length;i++) {
					$("#fileList").prepend('<li id="default">' + $(this)[0].files[i].name + '<a href="javascript:void(0)" id="fileListIndex" onclick="$crNttPop.event.removeFile(this)"> [X] </a></li>');
				}
			} else { // old IE

				 var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출

			}  // 추출한 파일명 삽입

//				$(this).siblings('.fileName').text(filename);
			

	        fileBuffer = [];
	        const target = document.getElementsByName('uploadfiles');
	        
	        Array.prototype.push.apply(fileBuffer, target[0].files);
		    //console.log("fileBuffer:"+fileBuffer);
            
	        $.each(target[0].files, function(index, file){
	            const fileName = file.name;
	            var html  = '<li id="default">' + fileName;
	            	//html += '<a href="javascript:void(0)" id="fileListIndex" onclick="$crNtt.event.removeFile(this)"> [X] </a></li>'
	            html += '</li>'
	            
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
			data.bannerId = "";
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
		* @name         : fn_fnon_use
		* @description  : 팝업존Max변경
		* @date         : 2019. 12. 10. 
		* @author	    : 박소희
		*/
		fn_fnon_use : function() {
			
			var data = {};
			data.maxPopCnt = $("#popupMax").val();

			if(confirm("팝업존의 최대값을 변경하시겠습니까?")) {
				ajax(true, contextPath + "/cr/ntt/process/updateMaxPopCount.do", 'body', '변경중입니다.', data, function(result){

					if(result != null){
						alert("변경하였습니다.");
					}
					
				});
			}
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
				var activeNo = $(this).addClass("uk-active");	;
				
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
			data.bannerId = result;
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
			params.bannerId = result;
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
		* @name         : regBtnList
		* @description  : 등록 및 수정을 처리 한 후 결과 이벤트
		* @date         : 2019. 10.18. 
		* @author	    : 이성훈
		*/
		regBtnList : function() {
			var data = fn_getFormData($("#searchFrm"));
			//var btnId = $("#registBtn").html();
			var bannerId = $("#bannerId").val();
			var divisionCode = $("#divisionCode").val();

			if(bannerId == "") {
				data.divisionCode = divisionCode;

				postToURL(contextPath + "/cr/ntt/listView.do", data);
			} else {
				data.bannerId = bannerId;
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
		* @name         : registInfo
		* @description  : 팝업존 등록 [단일 파일]
		* @date         : 2019. 12. 11. 
		* @author	    : 박소희
		*/
		registInfo :  function() {
					
			//validation check
			if(!valick($("#insertForm"))){
				return;
			}

			var data = fn_getFormData($("#insertForm"));
			
			//기간설정
			//var bPeriodCk = $("input:radio[name=bannerPeriod]:checked").val();
			//console.log(bPeriodCk);
			//if(bPeriodCk=='N'){
				
				var start_date = $("#bannerStartDate").val();
				var end_date = $("#bannerEndDate").val();
				
				if(!isValidDate( $("#bannerStartDate"), "YYYY-MM-DD") 
						|| !isValidDate( $("#bannerEndDate"), "YYYY-MM-DD")){
					return;
				}
				
				var bannerStartHour = $("#bannerStartHour").val();
				if(bannerStartHour != ''){
					if(parseInt(bannerStartHour, 10) > 23){
						alert('시간을 00~23시 사이로 입력해주세요.');
						return;	
					}
					start_date += leadingZeros(bannerStartHour, 2);
				}else{
					start_date += '00';
				}
				
				var bannerStartMinute = $("#bannerStartMinute").val();
				if(bannerStartMinute != ''){
					if(parseInt(bannerStartMinute, 10) > 59){
						alert('분을 00~59분 사이로 입력해주세요.');
						return;	
					}
					start_date += leadingZeros(bannerStartMinute, 2);
				}else{
					start_date += '00';
				}

				var bannerEndHour = $("#bannerEndHour").val();
				if(bannerEndHour != ''){
					if(parseInt(bannerEndHour, 10) > 23){
						alert('시간을 00~23시 사이로 입력해주세요.');
						return;	
					}
					end_date += leadingZeros(bannerEndHour, 2);
				}else{
					end_date += '00';
				}
				
				var bannerEndMinute = $("#bannerEndMinute").val();
				if(bannerEndMinute != ''){
					if(parseInt(bannerEndMinute, 10) > 59){
						alert('분을 00~59분 사이로 입력해주세요.');
						return;	
					}
					end_date += leadingZeros(bannerEndMinute, 2);
				}else{
					end_date += '00';
				}

				if (start_date > end_date) {
					alert('기간시작일은 기간종료일보다 빠르게 입력해주세요.');
					return;
				}
				
				data.bannerStartDate = start_date.replace(/\-/g,'')+'00';
				data.bannerEndDate = end_date.replace(/\-/g,'')+'00';
			//}
 
			//배너이미지
		    var fileCheck = $("#uploadfiles").val();						//파일체크 이름						
		    var files = document.getElementById("uploadfiles").files;    	// var files = $("#uploadfiles")[0].files;

		    var bannerId = $("#bannerId").val();

			if(files.length == 0 && bannerId =="") {
				alert("배너용 이미지 파일을 첨부해주세요.");
				$("#uploadfile").focus();
				return;
			}
			
		    if(files.length > 0){
			    //팝업은 이미지 파일로 제한한다 
				var ext = fileCheck.split('.').pop().toLowerCase();
			
			    if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
			    	alert('배너는 이미지 파일만 업로드 할수 있습니다.\n(gif, png, jpg, jpeg)');
			    	return;
		        }
		    }
			//END validation check
			
			//bannerId의 값 유무에 따른 결과
			if(data.bannerId == "") {
				flagVal = "등록";
				targetUrl = "/cr/ntt/process/insert.do";
				
			} else {
				flagVal = "수정";
				targetUrl = "/cr/ntt/process/update.do";
			}
			
		    var procFlg = false; //성공여부
		    
			if(confirm(flagVal + " 하시겠습니까?")) {
				ajax(true, contextPath + targetUrl, 'body', flagVal + '중입니다.', data
					, function(result) {

					if (result != null) {
						procFlg = true;
						
						//등록 후 파일이 있을 경우 업로드
						if(files.length > 0){

							if(flagVal == "등록") {
								var contentsIdIndex = result.contentsIdIndex;
								$("#bannerId").val(contentsIdIndex);
								//formData.append("bannerId", result.contentsIdIndex);		//파일 업로드할 시 중요한 시퀀스 번호	
							}
							
							var form = $('#insertForm')[0];
							var formData = new FormData(form);
							
							if(flagVal == "등록") {
								formData.append("updFlg","N");
							}else{
								formData.append("updFlg","Y");	
							}
							formData.append("isUpload", true);
							formData.append("attachment", "");
					 
							fileAjax(contextPath + "/cr/ntt/procPopzn/uploadImg", formData
								, function(response) {
									if (response != null) {
										//업로드 후 체크할 것이 있다면 실행
									}else{
										procFlg = false;
									}
							});
						}
					}

				}, function(){
					//완료 후 화면 이동
					if(procFlg){
						alert(flagVal+"을 완료하였습니다.");
						$crNttPop.event.regBtnList();	
					}						
				});
			}
		},
		
		
	}
}(window,document, jQuery));