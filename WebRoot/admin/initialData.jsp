<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="org.apache.struts2.ServletActionContext"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>数据初始化界面</title>

<script type="text/javascript">
	//执行按钮事件
  function getCheckBox(){
   	var obj = initaldata.box;
   	var array = new Array();
   	for(var i=0;i<obj.length;i++)
  	{
  		if(obj[i].checked){
  			array[i] = obj[i].value;
  		}
  	}
  	document.initaldata.method="post";
	document.initaldata.action="../login!initialData.action";
	document.initaldata.submit();
}
//初始化视图按钮事件
function initialView(){
  	document.initaldata.method="post";
	document.initaldata.action="../login!initialView.action";
	document.initaldata.submit();
}

	//全选事件
	var checkedAll = false;
  function selectAll(formName,checkboxName){
	var form = document.all.item(formName);
	var elements = form.elements[checkboxName];
	for (var i=0;i<elements.length;i++){ 
		var e = elements[i];
		if(checkedAll){
			e.checked = false;
			form.alls.checked = false;
		} else {
			e.checked = true;
			form.alls.checked = true;
		}
	}
	if(checkedAll){
		checkedAll = false;
	} else {
		checkedAll = true;
	}
}
//反选事件
function select1(formName,checkboxName){
	var form = document.all.item(formName);
	var elements = form.elements[checkboxName];
	for(var i=0;i<elements.length;i++){
		var e = elements[i];
		if(e.checked){
			e.checked = false;
			form.all.checked = false;
		} else {
			e.checked = true;
			form.all.checked = true;
		}
	}
}

function querry(){
		document.regiser.method="post";
		document.regiser.action="../login!querry.action";
		document.regiser.submit();
	}
	
function register(){
		document.regiser.method="post";
		document.regiser.action="../login!register.action";
		document.regiser.submit();
	}	
</script>
</head>
<body>
	<form action="" method="post" id="initaldata" name="initaldata">
		<table align="center" border="0" width="">
			<tr>
				<th style="font-size: 24px; font-style: normal;" align="center">
					REDM 数据初始化</th>
			<tr>
				<td align="left" style="font-size: 12px;">
					<br/>
					<input type="checkbox" name="alls" onClick="selectAll('initaldata','box')" title="全选/取消全选">全选/取消全选
					<input type="checkbox" name="all" onClick="select1('initaldata','box')" title="反选">反选
				</td>
			</tr>
			<tr>
				<td>
					<input type="checkbox"
					name="box" id="systemManager" value="systemManager">系统配置
					
					<input type="button" value="执行" onclick="getCheckBox()" />
					<hr style="borber: 1px blue solid;" />
				</td>
			</tr>
			<tr>
				<td align="left"><input type="button" value="初始化视图" onclick="initialView()"/>
				</td>
			</tr>
		</table>
	</form>
	<br/><br/>
<form action="login!register.action" method="post" id="regiser" name="regiser">
	<table align="center"  border="0" width="">
		<tr>
			<th title="">
				系统码：<input type="text" name="systemCode" id="systemCode" value ="${systemCode }" size="56"/>
			</th>
		</tr>
		<tr>
			<th>
				注册码：<input type="text" name="regCode" id="regCode"  size="56"/>
			</th>
		</tr>
		<tr>
			<th>
				<input type="button" value="查询" onclick="querry()"/>
				<input type="submit" value="注册" onclick="register()"/>
			</th>
		</tr>
	</table>
</form>
</body>
</html>