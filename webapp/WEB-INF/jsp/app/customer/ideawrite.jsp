<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
	function goSend(){
		if($.trim($("#title").val()) == ""){
			alertPopup("제목을 입력해주세요.");
			//$("#title").focus();
			return;
		}
		if($.trim($("#contents").val()) == ""){
			alertPopup("내용을 입력해주세요.");
			//$("#contents").focus();
			return;
		}		
		$("#frm").attr("method", "post");
		$("#frm").attr("action", "save.do");
		$("#frm").submit();
	}
</script>
	<form id="frm" name="frm">
        <div id="header">
            <div class="header_box">
                <div class="header_top">
                    <span class="header_left"><a href="javascript:goBack();" class="btn_back"></a></span>
                    <span class="header_title">의견접수</span>
                    <span class="header_right"></span>
                </div>
                <div class="header_tab">
                    <ul>
                        <li class="on"><a href="#">의견접수</a></li>
                        <li><a href="/app/faq/list.do">FAQ</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div id="container">
            <div class="content_sub_tab">
                <div class="opinion">
                    <span class="title"><input type="text" id="title" name="title" placeholder="제목을 입력해주세요." /></span>
                    <span class="note"><textarea id="contents" name="contents" placeholder="내용을 입력해 주세요."></textarea></span>
                    <span class="btn_area"><input type="button" value="보내기" onclick="goSend();" class="btn_send" /></span>
                </div>
            </div>
        </div>
    </form>