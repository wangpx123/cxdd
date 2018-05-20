<%@page import="java.util.Set"%>
<%@page import="java.util.Map"%>
<%@page import="com.redm.entity.UserInfo"%>
<%@page import="com.redm.actions.utility.Constants"%>
<%@page import="com.redm.entity.SystemPermission"%>
<%@page import="java.util.List"%>
<%@page import="com.redm.service.UserInfoManager"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>无标题文档</title>
<script type="text/javascript" src="extjs4/ext-all.js" ></script>
<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	overflow:hidden;
}
.STYLE1 {
	font-size: 12px;
	color: #FFFFFF;
}
.MM {
	font-size: 12px;
	color: #033d61;
}

.MM a:link {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 26px;
	color: #333333;
	text-decoration: none;
}
.MM a:visited {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 26px;
	color: #333333;
	text-decoration: none;
}
.MM a:active {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 26px;
	color: #333333;
	//overflow: hidden;
	text-decoration: none;
}
.MM a:hover {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 26px;
	font-weight: bold;
	color: #006600;
	text-decoration: none;
}


-->
</style>
</head>
<body style="overflow-y: scroll;">
<table width="165" height="100%" border="0" cellpadding="0" cellspacing="0" style="overflow: scroll;">
  <tr>
    <td height="28" background="images/main_40.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="19%">&nbsp;</td>
        <td width="81%" height="20"><span class="STYLE1">管理菜单</span></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td valign="top">
    <table width="151" border="0" align="center" cellpadding="0" cellspacing="0">
    <%
    	UserInfo userInfo = (UserInfo)session.getAttribute(Constants.USER_LOGIN);
    	Map<SystemPermission, List<SystemPermission>> systemPermissions =  UserInfoManager.getPermissions(userInfo.getUsername());
    	Set<SystemPermission> keySets = systemPermissions.keySet();
    	for(SystemPermission p : keySets){
    	%>
    	<tr>
	        <td>
	        <table width="100%" border="0" cellspacing="0" cellpadding="0">
	          <tr>
	            <td class="type" height="23" background="images/main_47.gif"  style="cursor:hand">
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td width="18%">&nbsp;</td>
	                <td width="82%" class="STYLE1"><%=p.getMenuName() %></td>
	              </tr>
	            </table>
	            </td>
	          </tr>
	          <tr>
	            <td background="images/main_51.gif">
				<div class="content">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td><table width="90%" border="0" align="center" cellpadding="0" cellspacing="0">
	                  <%
	                  List<SystemPermission> permissions = systemPermissions.get(p);
	                  for(SystemPermission permission : permissions){
	                	  %>
	                	  <tr>
		                    <td width="16%" height="25"><div align="center"><img src="images/left.gif" width="10" height="10" /></div></td>
		                    <td width="84%" height="23"><table width="95%" border="0" cellspacing="0" cellpadding="0">
		                        <tr>
		                          <td height="20" style="cursor:hand">
		                          <span class="MM">
		                               <a href="<%=permission.getMenuUrl() %>" target="center"><%=permission.getMenuName() %></a>
		                          </span>
		                          </td>
		                        </tr>
		                    </table></td>
		                  </tr>
	                	  <%
	                  }
	                  %>
	                  
	                </table></td>
	              </tr>
	              <tr>
	                <td height="5"><img src="images/main_52.gif" width="151" height="5" /></td>
	              </tr>
	            </table></div></td>
	          </tr>
	        </table>
	        </td>
	      </tr>
    	<%
    	}
    %>
    
      
      
    </table></td>
  </tr>
  
<script type="text/javascript">
  var contents = document.getElementsByClassName('content');
  var toggles = document.getElementsByClassName('type');
  
  for(var m = 0; m < contents.length; m++){
	  	if(m == 0){
	  		contents[0].style.display = '';
	  	}else{
	  		contents[m].style.display = 'none';
	  	}
  }
  
  //onReady
  Ext.onReady(function(){
		var i = 0;
		Ext.Array.each(toggles, function(el) {
			var elc = contents[i];
	        el.onclick = function(){
	        	var elcc = Ext.get(elc);
	        	elcc.setVisibilityMode(Ext.Element.DISPLAY);
	        	if(!elcc.isDisplayed()){
	        		elcc.setVisible(true,{
				       	duration: 1000,
				        to: {
				            opacity: 30
				        }});
	        	}
		        Ext.Array.each(contents, function(c) {
		        	if(c != elc){
			        	var cc = Ext.get(c);
			        	cc.setVisibilityMode(Ext.Element.DISPLAY);
			        	cc.setVisible(false,false);
		        	}
		        });
	        };
	        i++;
	    });
  });
  </script>
  <tr>
    <td height="18" background="images/main_58.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td height="18" valign="bottom"><div align="center" class="MM">版本：车险管理 V1.0</div></td>
      </tr>
    </table></td>
  </tr>
</table>
<script>

 
</script>
</body>
</html>