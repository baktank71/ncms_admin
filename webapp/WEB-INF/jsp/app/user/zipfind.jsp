<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript">

	function doSearch() {
		if($.trim($("#dong").val()) == ""){
			alertPopup("검색어를 입력해주세요.");
			//$("#dong").focus();
			return;
		}
		
		$.ajax({
			url		: "/app/user/zipList.do",
			type 	: "post",
			dataType: "json",
			async	: false, 
	 		data	: "dong=" + $("#dong").val(),
			success : function(data){
				var list = "";
				
	 			$.each(data.list, function(i, r) {
					list += "<li><a href='javascript:selectAddr(\'" + r.addr + "\');'>";
					list += "<div class='b_head '>";
					list += "    <span class='title'>" + r.addr + "</span>";
					list += "</div>";
					list += "</a></li>";		
	 			});				
		    	
				$("#zip_list").html( list );
			},
			error 	: function(xhr, status, error){
				alertPopup(error);
			}
		});	
	}
	
	function selectAddr( addr ){
		alertPopup( addr );
	}
	
</script>
	<form id="frm" name="frm">
        <div id="container">
            <div class="content_sub">
                <div class="login_area">
                    <span class="mbs">읍/면/동<input type="text" id="dong" name="dong" placeholder="읍/면/동" /></span>
                    <a href="javascript:doSearch();" class="btn_l btn_gray">검색</a>
                </div>
                <div>
                </div>
            </div>
            <div class="content_sub_tab">
                <div class="board1">
                    <ul id="zip_list">
                    </ul>
                </div>
            </div>            
        </div>
	</form>


    