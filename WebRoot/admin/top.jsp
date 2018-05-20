<%@page import="java.util.Locale"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.util.Date"%>
<%@page import="com.jelly.help.commons.util.UtilDateTime"%>
<%@page import="com.redm.actions.utility.Constants"%>
<%@page import="com.redm.entity.UserInfo"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<head>


<html xmlns="http://www.w3.org/1999/xhtml"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>无标题文档</title>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
}

.STYLE1 {
	font-size: 12px;
	color: #FFFFFF;
}

.STYLE2 {
	font-size: 9px
}

.STYLE3 {
	color: #033d61;
	font-size: 12px;
}
-->
</style>
<script type="text/javascript"> 

function noHeaderMode(){
	location.href.replace('top.jsp','');
	var mainSet = parent.document.getElementById("mainSet");
	var displayMode = document.getElementById('displayMode').innerText;
	if(displayMode == '简洁模式'){
		document.getElementById('header').style.display = 'none';
		mainSet.rows = '28,*,8';
		document.getElementById('displayMode').innerHTML = '<b><font color=#2BA8CF>正常显示</font></b>';
	}else{
		document.getElementById('header').style.display = '';
		mainSet.rows = '98,*,8';
		document.getElementById('displayMode').innerText = '简洁模式';
	}
}
</script>
</head>

<%
	UserInfo userInfo = (UserInfo) session
			.getAttribute(Constants.USER_LOGIN);
	String currentDate = "";
	Calendar c = Calendar.getInstance(Locale.CHINESE);
	currentDate = UtilDateTime.toDateString(c.getTime(),
			"yyyy年MM月dd日 星期");
	int weekDay = c.get(Calendar.DAY_OF_WEEK);
	switch (weekDay) {
	case Calendar.SUNDAY:
		currentDate += "日";
		break;
	case Calendar.MONDAY:
		currentDate += "一";
		break;
	case Calendar.TUESDAY:
		currentDate += "二";
		break;
	case Calendar.WEDNESDAY:
		currentDate += "三";
		break;
	case Calendar.THURSDAY:
		currentDate += "四";
		break;
	case Calendar.FRIDAY:
		currentDate += "五";
		break;
	case Calendar.SATURDAY:
		currentDate += "六";
		break;
	}
%>
<body>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr id="header">
			<td height="70" background="images/main_05.gif"><table
					width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="24"><table width="100%" border="0"
								cellspacing="0" cellpadding="0">
								<tr>
									<td width="270" height="24" background="images/main_03.gif">&nbsp;</td>
									<td width="505" background="images/main_04.gif">&nbsp;</td>
									<td>&nbsp;</td>
									<td width="21"><img src="images/main_07.gif" width="21"
										height="24"></td>
								</tr>
							</table></td>
					</tr>
					<tr>
						<td height="38"><table width="100%" border="0"
								cellspacing="0" cellpadding="0">
								<tr>
									<td width="310" height="38" background="images/logo.gif">&nbsp;</td>
									<td><table width="100%" border="0" cellspacing="0"
											cellpadding="0">
											<tr>
												<td width="77%" height="25" valign="bottom">
                								<td width="220" valign="bottom" nowrap="nowrap"><div
														align="right">
														<span class="STYLE1"><span class="STYLE2">■</span>
															当前用户：<%=userInfo.getRealname()%></span>
													</div></td>
												<td width="220" valign="bottom" nowrap="nowrap"><div
														align="right">
														<span class="STYLE1"><span class="STYLE2">■</span>
															今天是：<%=currentDate%></span>
													</div></td>
											</tr>
										</table></td>
									<td width="21"><img src="images/main_11.gif" width="21"
										height="38"></td>
								</tr>
							</table></td>
					</tr>
					<tr>
						<td height="8" style="line-height: 8px;"><table width="100%"
								border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td width="270" background="images/main_29.gif"
										style="line-height: 8px;">&nbsp;</td>
									<td width="505" background="images/main_30.gif"
										style="line-height: 8px;">&nbsp;</td>
									<td style="line-height: 8px;">&nbsp;</td>
									<td width="21" style="line-height: 8px;"><img
										src="images/main_31.gif" width="21" height="8"></td>
								</tr>
							</table></td>
					</tr>
				</table></td>
		</tr>
		<tr>
			<td height="28" background="images/main_36.gif"><table
					width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="177" height="28" background="images/main_32.gif" style="background-repeat: no-repeat;"><table
								width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td width="20%" height="22">&nbsp;</td>
									<td width="59%" valign="bottom"><div align="center"
											class="STYLE1">
											<!--  当前用户：<%=userInfo.getRealname()%> -->
											</div></td>
									<td width="21%">&nbsp;</td>
								</tr>
							</table></td>
						<td><table width="100%" border="0" cellspacing="0"
								cellpadding="0">
								<tr>
									<td width="63"><table width="58" border="0" align="center"
											cellpadding="0" cellspacing="0">
											<tr>
												<td height="20" style="cursor: hand"
													onMouseOver="this.style.backgroundImage='url(images/bg.gif)';this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#a6d0e7'; "
													onmouseout="this.style.backgroundImage='url()';this.style.borderStyle='none'"><div
														align="center" class="STYLE3"
														onclick="parent.window.doLogout();">退出系统</div></td>
											</tr>
										</table></td>
									<!-- <td width="3"><img src="images/main_34.gif" width="3"
										height="28">
									</td>
									<td width="63"><table width="58" border="0" align="center"
											cellpadding="0" cellspacing="0">
											<tr>
												  <td height="20" style="cursor:hand" onMouseOver="this.style.backgroundImage='url(images/bg.gif)';this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#a6d0e7'; "onmouseout="this.style.backgroundImage='url()';this.style.borderStyle='none'"><div align="center" class="STYLE3">升级维护</div></td> 
											</tr>
										</table></td>-->
									<td width="3"><img src="images/main_34.gif" width="3"
										height="28"></td>
									<td width="63">
										<table width="58" border="0" align="center" cellpadding="0"
											cellspacing="0">
											<tr>
												<td height="20" style="cursor: hand"
													onMouseOver="this.style.backgroundImage='url(images/bg.gif)';this.style.borderStyle='solid';this.style.borderWidth='1';borderColor='#a6d0e7'; "
													onmouseout="this.style.backgroundImage='url()';this.style.borderStyle='none'"><div
														id="displayMode" align="center" class="STYLE3"
														onclick="noHeaderMode();">简洁模式</div></td>
											</tr>
										</table>
									</td>
									<td>&nbsp;</td>
								</tr>
							</table></td>
						<td width="21"><img src="images/main_37.gif" width="21"
							height="28"></td>
					</tr>
				</table></td>
		</tr>
	</table>
</body>
</html>
