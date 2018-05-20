<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}
-->
</style>
<style> 
.navPoint { 
COLOR: white; CURSOR: hand; FONT-FAMILY: Webdings; FONT-SIZE: 9pt 
} 
</style> 
<script>
function switchSysBar(){ 
var locate=location.href.replace('middel.jsp','');
var ssrc=document.getElementById("img1").src.replace(locate,'');
if (ssrc=="images/main_55.gif")
{ 
document.getElementById("img1").src="images/main_55_1.gif";
document.getElementById("frmTitle").style.display="none" 
document.getElementById("leftMenu").style.display="none" 
} 
else
{ 
document.getElementById("img1").src="images/main_55.gif";
document.getElementById("frmTitle").style.display="" 
document.getElementById("leftMenu").style.display="" 
} 
} 
function changeUL(c){
	parent.window.changeUL(c);
}
</script>

</head>

<body>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
  <tr>
    <td width="171" id="frmTitle" align="center" valign="top" bgcolor="#1873aa" style="width:6px;"> 
	    &nbsp;</td>
    <td width="165" id="leftMenu">
    	<iframe name="I1" width="165" height="100%" src="left.jsp"  frameborder="0" scrolling="yes"> 浏览器不支持嵌入式框架，或被配置为不显示嵌入式框架。</iframe>
    </td>
    <td width="6"  style="width:6px;"valign="middle" bgcolor="1873aa" onclick=switchSysBar()>
	    <SPAN class=navPoint id=switchPoint title=关闭/打开左栏>
		<img src="images/main_55.gif" name="img1" width=6 height=40 id=img1></SPAN>
	</td>
    <td width="100%" align="center" valign="top">
		<iframe id="center" name="center" height="100%" width="100%" frameborder="0" src="right.jsp">浏览器不支持嵌入式框架，或被配置为不显示嵌入式框架。</iframe>
   </td>
  </tr>
</table>
</body>
</html>
