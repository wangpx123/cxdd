package com.redm.service.system;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javolution.util.FastList;

import com.MailSenderInfo;
import com.SimpleMailSender;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.utility.Constants;
import com.redm.entity.UserInfo;
import com.redm.service.UserInfoManager;

public class RedmMail {

	
	//支持多个收件人，待调试
	public static boolean redmSendFileMail(String mailTo, String mailStr,String file,UserInfo user)
    {
		String serverHost=getMailSendInfoFromCD("MAILSEND","IPADDR");
		String serverPort=getMailSendInfoFromCD("MAILSEND","PORT");
		String mailUsr=getMailSendInfoFromCD("MAILSEND","USER");
		String mailPass=getMailSendInfoFromCD("MAILSEND","PASS");
		boolean bool =true;
		
		String[] strs=mailTo.split(";");   //用分号区分多个收件人

		for(Integer loop=0;loop<strs.length;loop++)
		{
		    MailSenderInfo mailInfo = new MailSenderInfo();    
//		    mailInfo.setMailServerHost("211.152.50.166");
		    mailInfo.setMailServerHost(serverHost);
//		    mailInfo.setMailServerPort("25");    
		    mailInfo.setMailServerPort(serverPort);    
		    mailInfo.setValidate(true);    
//		    mailInfo.setUserName("yuanc@hong56.com");    
//		    mailInfo.setFromAddress("yuanc@hong56.com");    
		    mailInfo.setUserName(mailUsr);    
		    mailInfo.setFromAddress(mailUsr);    
//		    mailInfo.setPassword("redm");//您的邮箱密码    
		    mailInfo.setPassword(mailPass);//您的邮箱密码    
		    
		    mailInfo.setToAddress(strs[loop].trim());   //支持多个收件人    
		    //mailInfo.setSubject("附件邮件测试");
		    mailInfo.setSubject(mailStr);
		    mailInfo.setContent(mailStr);
		    
		    bool=SimpleMailSender.sendFileMail(mailInfo,file);//发送带附件的邮件
		    //	邮件发送成功后，写入邮件日志表中
		    if(bool)
		    {
			    emaillogInsert(mailTo,mailStr,file,user);
		    }
		    else
		    {
		    	break;
		    }
		}
		
	     return bool;
    }
	
	//从数据字典查邮件发送信息
    public static String getMailSendInfoFromCD(String codeType,String codeValue)
    {
    	String retValue="";
    	
		DBHelper dbHelper=DBHelper.getInstance();
		Map<String, Object> data = new HashMap<String, Object>();
		StringBuffer sql=new StringBuffer();
		sql.append(" select id,code_type,code_value,notes,description ");
		sql.append(" FROM CODE_DETAIL ");
		sql.append(" WHERE 1 = 1 ");
		sql.append(" AND code_type = '"+codeType+"'");
		sql.append(" AND code_value = '"+codeValue+"'");
			
		try 
		{
			data = dbHelper.select(sql.toString(), new MapHandler());
			if(null!=data )
			{
				retValue=(String)data.get("notes");
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}    	
    	return retValue;
    }
	
	
	
	public static void main(String[] args){   
		
		String mailTo= "qxue@hong56.com";
		String mailStr= "This is a test!";
//		rSendTextMail(mailTo,mailStr);
//		rSendFileMail(mailTo,mailStr,"g:/xx.txt");
   } 
	
	
	//邮件发送日志表插入方法
	public static boolean  emaillogInsert(String mailTo, String mailStr,String file,UserInfo user)
	{
		boolean retBool=true;
		boolean bool;
		Date dateTime =new Date();
		DBHelper dbHelper = DBHelper.getInstance();
		try 
		{
	        StringBuffer sql = new StringBuffer();
	        sql.append(" INSERT INTO EMAILLOG ");
	        sql.append(" (UDF1,UDF2, UDF3, ");  
	        sql.append(" ADD_WHO, EDIT_WHO, ADD_DATE, EDIT_DATE) ");
	        sql.append(" VALUES (?, ?, ?, ?, ?, ?, ?)");
	        bool = dbHelper.insert(sql.toString(),mailStr,mailTo,file,
	            user.getRealname(),user.getRealname(),WmsCommon.uToTsDate(dateTime),WmsCommon.uToTsDate(dateTime));
	        if(bool){
	            System.out.println("EMAILLOG insert success");
	        }
	        else
	        {
	            System.out.println("EMAILLOG insert fail");
	            retBool=false;
	            return retBool;  
	        }
		}catch (SQLException e) 
        {
			retBool=false;
			e.printStackTrace();
		}
		
		
		return retBool;
	}
	
	
}
