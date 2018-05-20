package com.redm.actions.utility;

public class Constants {
	public static final String SUCCESS = "success";
	public static final String MEMBER = "member";
	public static final String DOCTOR = "doctor";
	public static final String ADMIN = "admin";
	public static final String LOGIN = "login"; 
	public static final String INDEX = "index";
	public static final String INPUT = "input";
	public static final String APP = "app";
	public static final String QUERRY = "querry"; 
	
	public static final String JSON_TYPE = "json";
	public static final String USER_LOGIN = "userLogin";
	public static final String USER_PERMISSION = "systemMenus";
	public static final String OB = "/";
	public static final String WEB_CONTENT = "/WEB-INF/content/";
	public static final String WEB_CONTENT_DOCTOR = "/WEB-INF/content/doctor/";
	public static final String WEB_CONTENT_MEMBER = "/WEB-INF/content/member/";
	public static final String WEB_CONTENT_ADMIN = "/WEB-INF/content/admin/";
	public static final String WEB_ADMIN = "/WEB-INF/admin/";
	public static final String SUGGEST = "/WEB-INF/content/suggest/";
	public static final String BASICDATA = "/WEB-INF/content/basicdata/";
	public static final String HR = "/WEB-INF/content/hr/";
	public static final String CUSTOMER = "/WEB-INF/content/customer/";
	public static final String TORUN = "/WEB-INF/content/torun/";

	//第一个数据库用于兼容的参数配置
	
	//SQLSERVER 使用
	public static final String ROWNUMBER = "row_number()";
	public static final String DB2_XLOCK = "";
	public static final String SQLSERVER_XLOCK = " WITH (TABLOCKX) ";
	public static final String DB2_READLOCK = "";
	public static final String SQLSERVER_READLOCK = " WITH (HOLDLOCK) ";
	public static final String DB2_VIEWCREATE = "";
	public static final String SQLSERVER_VIEWCREATE = " select * from sysobjects ";
	//库龄分析报表用到的两个时间之间相差多少天（这里写死为LOTTABLE01）
	public static final String SQLSERVER_dateDiff =" datediff(day,LOTTABLE01,getdate()) ";
	public static final String DB2_dateDiff = "";
	public static final String SQLSERVER_regDateDiff =" datediff(day,EDIT_DATE,getdate()) ";
	public static final String DB2_regDateDiff = "";
	//DB2 使用
//	public static final String ROWNUMBER = "ROWNUMBER()";
//	public static final String DB2_XLOCK = " FOR UPDATE WITH RR ";
//	public static final String SQLSERVER_XLOCK = "";
//	public static final String DB2_READLOCK = " FOR READ ONLY WITH RR ";
//	public static final String SQLSERVER_READLOCK = "";
//	public static final String DB2_VIEWCREATE = " select * from sysibm.sysviews ";
//	public static final String SQLSERVER_VIEWCREATE = "";
//	//库龄分析报表用到的两个时间之间相差多少天（这里写死为LOTTABLE01）
//	public static final String SQLSERVER_dateDiff ="";
//	public static final String DB2_dateDiff = " TO_CHAR(days(CURRENT TIMESTAMP)-days(LOTTABLE01)) ";
//	public static final String SQLSERVER_regDateDiff ="";
//	public static final String DB2_regDateDiff = " (days(CURRENT TIMESTAMP)-days(EDIT_DATE)) ";
	
	
	//第二个数据库用于兼容的配置（待补充）
	
	//定义常用的提示机制;
	public static final String R0000= "操作成功！";
	public static final String R0001 = "";
	public static final String R0002 = "R0002没有查询结果";
	public static final String R0003 = "";
	public static final String R0004 = "";
	public static final String R0005 = "";
	public static final String R0006 = "";
	public static final String R0007 = "插入失败";
	public static final String R0008 = "R0008更新失败";
	public static final String R0009 = "";
	public static final String R0010 = "";
	public static final String R9999 = "R9999操作失败";
	
	
}
