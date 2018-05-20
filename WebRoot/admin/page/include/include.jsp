<%@page import="com.redm.entity.UserInfo"%>
<%@page import="com.redm.actions.utility.Constants"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort() + path;
UserInfo userLogin = (UserInfo) session.getAttribute(Constants.USER_LOGIN);
%>
<script type="text/javascript">
var basePath = '<%=basePath%>';
var $BasePath = basePath;
var $LoginName = '<%=userLogin.getRealname()%>';
var $CompanyId = '<%=userLogin.getCompanyId()%>';
var $username = '<%=userLogin.getUsername()%>';

</script>
<link rel="stylesheet" type="text/css" href="../extjs4/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="../css/icon.css" />
<!-- javascipt -->
<script type="text/javascript" src="../extjs4/ext-all-debug-w-comments.js"></script>
<script type="text/javascript" src="../extjs4/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/BaseGrid.js"></script>
<script type="text/javascript" src="js/Lottable.js"></script>
<style type="text/css" media="screen">
    .x-grid-row-summary .x-grid-cell-inner {
        font-weight: bold;
        font-size: 11px;
        background-color: #E1E6E9;
    }
</style>