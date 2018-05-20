<%@page import="com.jelly.help.commons.email.EmailHelper"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<% 
response.setHeader("Pragma","No-Cache"); 
response.setHeader("Cache-Control","No-Cache"); 
response.setDateHeader("Expires", 0);    
%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<META HTTP-EQUIV="Refresh" CONTENT="0;URL=login!index.action">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache"> 
<META HTTP-EQUIV="Expires" CONTENT="0"> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="shortcut icon" type="image/ico" href="images/logo.ico" />
    <style type="text/css">
    #loading-mask{
        background-color:white;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        width:100%;
        z-index:20000;
    }
    #loading{
        height:auto;
        position:absolute;
        left:45%;
        top:40%;
        padding:2px;
        z-index:20001;
    } 
    #loading a {
        color:#225588;
    }
    #loading .loading-indicator{
        background:white;
        color:#444;
        font:bold 13px Helvetica, Arial, sans-serif;
        height:auto;
        margin:0;
        padding:10px;
    }
    #loading-msg {
        font-size: 10px;
        font-weight: normal;
    }
    </style>
</head>
<body style="text-align: center; ">
	<div id="loading-mask" style=""></div>
	<div id="loading">
        <div class="loading-indicator">
            <img src="images/loading.gif" width="25" height="25" style="margin-right:8px;float:left;vertical-align:top;"/>系统加载中，请稍候...</a>
            <br /><span id="loading-msg">Loading styles and images...</span>
        </div>
    </div>
</body>
</html>
