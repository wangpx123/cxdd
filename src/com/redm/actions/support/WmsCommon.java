package com.redm.actions.support;

import net.sf.json.JSONObject;

import com.ibm.icu.math.BigDecimal;
import com.jelly.help.commons.base.BaseAction;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;


import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import org.springframework.transaction.annotation.Transactional;


import com.redm.actions.utility.Constants;



public class WmsCommon extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5130971169411952085L;
	
	/* 这是 basegrid中新的定义的wavekeycombo 需要用到的方法 ，移植自RMS，用的是sqlserver，需要重新改为DB2。
	 * 待进一步研究*/
	@Action(value="queryPickDetail",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String queryPickDetail(){
/*
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		String orderBy = request.getParameter("sort");
		String desc = request.getParameter("dir");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String orderKey = request.getParameter("orderKey");;
		PageInfo pageInfo = pickDetailManager.queryByPage(pageIndex, pageSize, orderBy, desc, PickDetail.class, new CriteriaCallBack() {
			@Override
			public void callback(Criteria c) {
				if(UtilValidate.isNotEmpty(orderKey)){
					c.add(Restrictions.eq("orderKey", orderKey));
				}
			}
		});
		List<?> results = pageInfo.getResult();
		JSONArray data = new JSONArray();
		if(UtilValidate.isNotEmpty(results)){
			JsonConfig config = EntityUtils.getDateJsonConfig(UtilDateTime.FORMAT_DATE_TIME);
			JSONArray array = JSONArray.fromObject(results, config);
			for (Object obj : array) {
				JSONObject o = (JSONObject) obj;
				data.add(o);
			}
		}
		json.put("data", data);
		json.put("totalCount", pageInfo.getTotalCount());*/
		return Constants.SUCCESS;
	}	

	//字符串转换为时间类型，考虑用下边的，本方法删除
/*	public static java.util.Date StringToTimeStamp(String str){
		DateFormat to_type = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date date=null;
		if(str=="" || str==null){
			return date=null;
		}
		try {
			 date=to_type.parse(str.toString().substring(0,10));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return date;
	}*/

	//从表中读取到的时间对象，转换为Date类型的时间
	public static java.util.Date ObjectToTimeStamp(Object obj){
		DateFormat to_type = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		DateFormat to_type = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date date=null;
		
		if(obj=="" || obj==null){
			return date=null;
		}
		try {
			 date=to_type.parse(obj.toString().substring(0,19));   //年月日是前10位，到时分秒是前19位
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return date;
	}
	
	
	//转为date类型的方法，在界面上必须限定日期格式为 "yyyy-MM-dd HH:mm:ss"
	//因与数据库有关，时间的定义转换情况较多，后续再研究
	public static java.util.Date ObjectToDate(Object obj){
		java.util.Date date=null;
		
		if(obj=="" || obj==null){
			return date=null;
		}
		
		date=(Date)obj;
		return date;
	}
	
	//日期存盘做特殊处理时使用 ，qxue
	   public static Timestamp StringToTimestamp(String str){
	       Timestamp ts=null;
	       DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	       format.setLenient(false);
	       //要转换字符串 str_test
	       if(null==str||str.equals("")){
	    	   return ts;
	       }
	       try {
	         ts = new Timestamp(format.parse(str).getTime());
	        System.out.println(ts.toString());
	       } catch (ParseException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	       }
	        return ts;
	    }
	    
	
	
	@Transactional
	public static Float doubleToFloat(Double doubleNum)
	{	Float fValue;

		if((null!=doubleNum))
		{
			Double num=new Double(doubleNum);
	        fValue = num.floatValue();
		}
		else
		{
		    fValue = 0.0F;
		}
		return fValue;
	
	}
	
	//如果参数为null，则返回""，否则的话强转为string类型并返回。
	public static String doHandleLottableValue(Object obj){
		if(null==obj){
			return "";
		}else{
			return (String) obj;
		}
	}
	
	
	//小写转换为大写
	public static String reverse(String str){
		StringBuffer sb=new StringBuffer();
		for(int i=0;i<=str.length()-1;i++){
			String temp=String.valueOf(str.charAt(i));
			sb.append(temp.toUpperCase());
		}
		return sb.toString();
	}
	
	//Float类型保留三位小数的方法
	public static Float acruateFloat(Float fValue){
		BigDecimal bd = new BigDecimal(fValue);  
		Float afValue=bd.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();  
		return afValue;
	}
	
	//String转为Float类型保留三位小数的方法
	public static Float acruateStringToFloat(String fValue){
		BigDecimal bd = new BigDecimal(fValue);  
		Float afValue=bd.setScale(3,BigDecimal.ROUND_HALF_UP).floatValue();  
		return afValue;
	}
	
	//四舍五入取整
	public static String acruateFloatByZero(Float fValue){
		BigDecimal bd = new BigDecimal(fValue);  
		Float afValue=bd.setScale(0,BigDecimal.ROUND_HALF_UP).floatValue();  
		String temp = afValue.toString();
		String temp2 = temp.substring(0,temp.indexOf("."));
		return temp2;
	}
	
	//四舍五入取小数点后一位
	public static String acruateFloatByLastOne(Float fValue){
		BigDecimal bd = new BigDecimal(fValue);  
		Float afValue=bd.setScale(1,BigDecimal.ROUND_HALF_UP).floatValue();  
		String temp = afValue.toString();
		return temp;
	}
	
	//四舍五入取小数点后两位
	public static String acruateFloatByLastTwo(Float fValue){
		BigDecimal bd = new BigDecimal(fValue);  
		Float afValue=bd.setScale(2,BigDecimal.ROUND_HALF_UP).floatValue();  
		String temp = afValue.toString();
		return temp;
	}
	
	//四舍五入取小数点后一位
	public static Float acruateFloatByOne(Float fValue){
		BigDecimal bd = new BigDecimal(fValue);  
		Float afValue=bd.setScale(1,BigDecimal.ROUND_HALF_UP).floatValue();  
		return afValue;
	}
	
	//四舍五入取小数点后两位
	public static Float acruateFloatByTwo(Float fValue){
		BigDecimal bd = new BigDecimal(fValue);  
		Float afValue=bd.setScale(2,BigDecimal.ROUND_HALF_UP).floatValue();  
		return afValue;
	}
	
	//Float类型抹零操作；
	public static Float SumAcruateFloat(Float fValue){
		BigDecimal bd = new BigDecimal(fValue);  
		Float afValue=bd.setScale(0,BigDecimal.ROUND_DOWN).floatValue();  
		return afValue;
	}
	
	//对中文进行转码（转换为UTF-8）,当EXT用url往后台传参数的时候，后台接到的中文参数会出现乱码。
	public static String ajaxParaEncoding(String str){
		try {
			str = (new String(str.getBytes("ISO-8859-1"), "UTF-8")).trim();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return str;
	}
	//java.util.Date转换为java.sql.Date(sqlserver数据库中不带时分秒)
	//以后不再使用了，先注释掉 qxue 2014-5-20
//	public static java.sql.Date uToSDate(java.util.Date date){
//		 java.sql.Date retDate;
//         if(null==date||date.equals("")){
//        	 retDate=null;
//         }else{
//        	 retDate=new java.sql.Date(date.getTime());
//         }
//         return retDate;
//	}
	
	//java.util.Date转换为java.sql.Timestamp(带时分秒)
	public static java.sql.Timestamp uToTsDate(java.util.Date date){
		 java.sql.Timestamp retDate;
         if(null==date||date.equals("")){
        	 retDate=null;
         }else{
        	 retDate=new java.sql.Timestamp(date.getTime());
         }
         return retDate;
	}

	//java.util.Date转换为java.sql.Timestamp(带时分秒)
	public static String  StringToDate(Map<String, Object> m,String date){
		  Timestamp  date1 = (Timestamp)m.get(date);
          String date2="";
          if(null == date1){
          	date2="";
          }else{
          	date2=date1.toString().substring(0,10);
          }
         return date2;
	}
	
	//String 转换为BigDecimal的方法
	//特别注意，这里的返回值类型是 java.math.BigDecimal，长阳科技使用的转换方法
	public static java.math.BigDecimal strToBigDecimal(String str){
		java.math.BigDecimal retVal = new java.math.BigDecimal(0);
		
		if((null!=str)&&!str.equals(""))
		{
			retVal = new java.math.BigDecimal(str);
		}
		return retVal;
	}
	
	
	//smallInt换Integer的方法
	public static Integer smallIntToInteger(Object obj)
	{
		Integer retVal=0;
		
		String str=obj.toString();
		if((null!=str)&&!str.equals(""))
		{
			retVal=Integer.parseInt(str);
		}
		return retVal;
	}
	
	@Override
	public JSONObject getJson() {
		return super.json;
	}

	@Override
	public boolean getSuccess() {
		return super.success;
	}
	
	
}
