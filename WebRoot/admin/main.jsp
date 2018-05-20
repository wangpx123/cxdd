<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>企业信息管理系统</title>
<link rel="stylesheet" type="text/css" href="extjs4/resources/css/ext-all.css" />
<script type="text/javascript" src="extjs4/ext-all.js" ></script>
<script type="text/javascript">
var personInfo;
function doRefresh(){
	window.location.reload();
}
function doLogout(){
	if(confirm("您确定要退出系统？")){
		window.location.href = "../logout.action";
	}
}
function personInfo(){
	
}
Ext.onReady(function(){
	setTimeout(function(){
		var isFirst = true;
		var newSession = '';
		Ext.TaskManager.start({
			run : function() {
				if(isFirst) {newSession = 'Y'; isFirst = false} else {newSession = '';}
				Ext.Ajax.request({
				   url: '../onlineCheck.action',
				   params: {newSession:newSession},
				   success: function(response, opts) {
				      	var obj = Ext.decode(response.responseText);
				      	if(obj.success == false){
			                setTimeout(function() {
			                	window.location.href = '../manager.action';
			                },6000);
				      	}
				   },
				   failure: function(response, opts) {
				      //window.location.href = 'http://www.hong56.com';
				   }
				});
			},
			interval : 60000
		});
	},60000);
});  
</script>
</head>

<frameset id="mainSet" rows="98,*,8" frameborder="no" border="0" framespacing="0">
  <frame src="top.jsp" name="topFrame" scrolling="No" noresize="noresize" id="topFrame" />
  <frame src="center.jsp" name="mainFrame" id="mainFrame" />
  <frame src="down.html" name="bottomFrame" scrolling="No" noresize="noresize" id="bottomFrame" />
</frameset>
<noframes><body>
</body>
</noframes></html>
