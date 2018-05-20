<%@page import="com.jelly.help.commons.util.UtilValidate"%>
<%@page import="org.apache.struts2.ServletActionContext"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
	HttpServletRequest re = ServletActionContext.getRequest();
	Cookie[] cookies = re.getCookies();
	boolean remberPwd = true;
	String pwd = "";
	String userName = "";
	for(Cookie c : cookies){
		String key = c.getName();
		String value = c.getValue();
		if(key.equals("remberPwd")){
			remberPwd = true;
		}
		if(key.equals("userName")){
			userName = value;
		}
		if(key.equals("pwd")){
			pwd = value;
		}
	}
	if(UtilValidate.isEmpty(remberPwd)){
		remberPwd = true;
	}
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<!--IE8使用IE7进行渲染-->
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<META http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="shortcut icon" type="image/ico" href="resources/images/logo.ico" />
<META content="用户登录" name=keywords>
<META content="用户登录" name=description>
	<head>
		<title>登录 
		</title>
		<link type="text/css" href="css/default.css" rel="Stylesheet" />
	</head>
	<body leftmargin=0 topmargin=0 marginwidth=0 marginheight=0>
		<div class="containerfix cont">
			<s:form action="login!login.action" name="memberLoginForm">
				<div id="cont_left">
					<div class="input_area_img"></div>
					<div class="input_area">
						<div class="input_area4">
							<ul>
								<li>
									<input type="text" name="user.username" value ="<%=userName%>" class="input_style1 required"/>
								</li>
								<li>
								<input type="password" name="user.password" value = "<%=pwd%>" class="input_style1 required"/>
								</li>
								<!li>
									<input type="checkbox" name="_checkbox_remberPwd" value = <%=remberPwd%> id="_checkbox_remberPwd" style="width:15px; height:15px; border:0;"/>
									<input type="hidden" id="_checkbox_loginForm_autoLogin" name="_checkbox_autoLogin" value="true" /> 
									记住密码
								</li>
								<li><font color="red"></font></li>
							</ul>
						</div>
						<div class="login_enter">
							<input type="hidden" name="from" value="" id="loginForm_from"/>
							<input type="image" alt="Submit" src="images/login_enter.gif" id="loginForm_loginSystem" name="action:login" value="Submit" alt="login"/>

						</div>
						<div class="point_text clear" style="COLOR: red;font-size: 10pt; text-align: center;">
							<p style="height: 10px;"></p>
							<s:actionerror labelposition="left" cssStyle="height:4px;text-align: left; margin-left: 50px;"/>
						</div>
					</div>
				</div>
			</s:form>
		</div>
		<div>
		</div>
	</body>
</html>
