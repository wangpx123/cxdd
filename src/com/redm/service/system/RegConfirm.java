package com.redm.service.system;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
import java.sql.SQLException;
import java.util.Date;
import java.util.Map;
import java.util.Random;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.SendTest;
import com.Sys;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.utility.Constants;

@Service
public class RegConfirm {
	
	//随机字符串产生方法
	public static String getRandomString(int length) { //length表示生成字符串的长度
	    String base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";   
	    Random random = new Random();   
	    StringBuffer sb = new StringBuffer();   
	    for (int i = 0; i < length; i++) {   
	        int number = random.nextInt(base.length());   
	        sb.append(base.charAt(number));   
	    }   
	    return sb.toString();   
	 }  
	

	//windows下获取mac地址的方法 
	//此方法不支持在windows server 2008下使用，被替换
    public static String getWindowsMACAddress0() {   
        String mac = null;   
        String newMac;
        BufferedReader bufferedReader = null;   
        Process process = null;   
        try {   
            process = Runtime.getRuntime().exec("ipconfig /all");// windows下的命令，显示信息中包含有mac地址信息  
            bufferedReader = new BufferedReader(new InputStreamReader(process   
                    .getInputStream()));   
            String line = null;   
            int index = -1;   
            while ((line = bufferedReader.readLine()) != null) {   
                index = line.toLowerCase().indexOf("physical address");// 寻找标示字符串[physical address]  
                if (index >= 0) {// 找到了  
                    index = line.indexOf(":");// 寻找":"的位置  
                    if (index>=0) {   
                        mac = line.substring(index + 1).trim();//  取出mac地址并去除2边空格  
                    }   
                    break;   
                }   
            }   
        } catch (IOException e) {   
            e.printStackTrace();   
        } finally {   
            try {   
                if (bufferedReader != null) {   
                    bufferedReader.close();   
                }   
            } catch (IOException e1) {   
                e1.printStackTrace();   
            }   
            bufferedReader = null;   
            process = null;   
        }   
  
        newMac=mac.substring(0,2)+mac.substring(3,5)+mac.substring(6,8)+
        		mac.substring(9,11)+mac.substring(12,14)+mac.substring(15,17);
        return newMac;   
    }   
  
    
	public static String getWindowsMACAddress() {
    	
    	String macString;
    	String newMac="";

		try 
		{
	    	// 获得网络接口对象（即网卡），并得到mac地址，mac地址存在于一个byte数组中。
			InetAddress ia = InetAddress.getLocalHost();// 获取本地IP对象
	
			byte[] mac = NetworkInterface.getByInetAddress(ia).getHardwareAddress();
			
	    	// 下面代码是把mac地址拼装成String
	    	StringBuffer sb = new StringBuffer();
	    	for (int i = 0; i < mac.length; i++) {
		    	if (i != 0) 
		    	{
		    		sb.append("-");
		    	}
		    	// mac[i] & 0xFF 是为了把byte转化为正整数
		    	String s = Integer.toHexString(mac[i] & 0xFF);
		    	sb.append(s.length() == 1 ? 0 + s : s);
	    	}
	
	    	// 把字符串所有小写字母改为大写成为正规的mac地址并返回
	    	macString=sb.toString().toUpperCase();
	
	    	//取消间隔符号
	    	newMac=macString.substring(0,2)+macString.substring(3,5)+macString.substring(6,8)+
	        macString.substring(9,11)+macString.substring(12,14)+macString.substring(15,17);
	    	//System.out.println(newMac);  	    	
	    	
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	return newMac;
    }
    
    
	//windows下读取卷标序列号的方法  
    //获取卷标号的方法在自解压版本中出错（调试版本无此问题），改为4位固定字符串+8位随机字符串
    //卷标号的问题后续再查 qxue
    public static String getSerialNumber() {
    	String result = "";
//    	String drive ="C";
//    	int snNum;
//    	try {
//    	      File file = File.createTempFile("realhowto",".vbs");
//    	      file.deleteOnExit();
//    	      FileWriter fw = new java.io.FileWriter(file);
//
//    	      String vbs = "Set objFSO = CreateObject(\"Scripting.FileSystemObject\")\n"
//    	                  +"Set colDrives = objFSO.Drives\n"
//    	                  +"Set objDrive = colDrives.item(\"" + drive + "\")\n"
//    	                  +"Wscript.Echo objDrive.SerialNumber";  // see note
//    	      fw.write(vbs);
//    	      fw.close();
//    	      Process p = Runtime.getRuntime().exec("cscript //NoLogo " + file.getPath());
//    	      BufferedReader input =
//    	        new BufferedReader
//    	          (new InputStreamReader(p.getInputStream()));
//    	      String line;
//    	      while ((line = input.readLine()) != null) {
//
//    	    	  result += line;
//    	      }
//    	      input.close();
//    	    }
//    	    catch(Exception e){
//    	        e.printStackTrace();
//    	    }
//    	    snNum=Integer.parseInt(result.trim());
//    	    result=  Integer.toHexString(snNum).toUpperCase()+getRandomString(8);
    	result="T7UX"+getRandomString(8);
    	return result;
    }
    
    //windows下读取硬盘序列号的方法
    //待实现
    public static String getHdSerialNumber() 
    {
    	String retValue="";
		String serialNo=Sys.showHDSerial().toUpperCase();
//		System.out.println("serial no:"+serialNo);
		
		serialNo=serialNo.replaceAll(" ", "");
//		System.out.println("serial no2:"+serialNo);

		serialNo="ASDFQWER"+serialNo;  //如果不足8位，前边补充字符串
//		System.out.println("serial no3:"+serialNo);

		serialNo=serialNo.substring(serialNo.length()-8,serialNo.length());
		
//		System.out.println("serial no4:"+serialNo);
		char[] bArray = serialNo.toCharArray();
    	char ch0;
    	
    	for(int i=0;i<serialNo.length();i++)
    	{
    		ch0=serialNo.charAt(i);
    		if((ch0<48)||(ch0>90)||((ch0<65)&&(ch0>57)))
    		{
    			ch0= 88;
    		}
    		bArray[i]=ch0;
    	}
    	
    	retValue=String.valueOf(bArray);
//		System.out.println("serial no5:"+retValue);
		return retValue;
    }
    
    
    //加密，生成本地系统码
    public static String getLocalSysCode(int funcNum) 
    {
    	String retVal="";
    	String strFunc="";
    	
    	if(1==funcNum)      //WMS的代码
    	{
    		strFunc = "QWMS";
    	}
    	else if(2==funcNum) //RF的代码
    	{
    		strFunc = "XTRF";
    	}
    	else   //其他情况
    	{
    		strFunc = "ABCD";
    	}
    
    	String str0=getSerialNumber();
    	String strVer="V001";
    	String str1=getWindowsMACAddress();
    	String str2=getHdSerialNumber();
    	retVal=LocalCodeTrans(str0+strVer+strFunc+str1+str2);

    	return retVal;
    }

    //加密，生成本地注册码
    public static String getLocalRegCode(int funcNum) 
    {
    	String retVal="";
    
    	String strFunc="";
    	
    	if(1==funcNum)      //WMS的代码
    	{
    		strFunc = "QWMS";
    	}
    	else if(2==funcNum) //RF的代码
    	{
    		strFunc = "XTRF";
    	}
    	else   //其他情况，两种码不同，肯定校验失败
    	{
    		strFunc = "UVWX";   
    	}
    	
    	String str0=getSerialNumber();
    	String strVer="V001";
    	String str1=getWindowsMACAddress();
    	String str2=getHdSerialNumber();
    	retVal=RegCodeTrans(str0+strVer+strFunc+str1+str2);

    	return retVal;
    }    
    
    //本地码转换为本地系统码，
    //密钥见代码中    
    public static String LocalCodeTrans(String localCode) {
    	String retVal="";
    	retVal=localCode;
    	Integer len=localCode.length();
    	
        //判断长度
    	/*if(32!=len)
    	{
    		return retVal;
    	}*/
        
        //本地系统码的编解码密钥
    	String tableA="Q1WE2RT3YU@@@@@@@4IO5PA6SDF7GHJ8KLZ9XCV0BNM";
    	//String tableA="0123456789@@@@@@@ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    	char[] bArray = localCode.toCharArray();
    	
    	char ch0;
    	char ch1;
    	
    	for(int i=0;i<len;i++)
    	{
    		ch0=localCode.charAt(i);
    		ch1=tableA.charAt(ch0-48);
    		bArray[i]=ch1;
    	}
    	retVal=String.valueOf(bArray);
    	//System.out.println("retVal is:"+ retVal);
        
    	return retVal;
    }

    
    
    
    //本地系统码解码为本地码的解码方法
    //密钥见代码中    
    public static String LocalCodeDecode(String localCode) {
    	String retVal="";
    	retVal=localCode;
    	Integer len=localCode.length();
    	
    	/*if(32!=len)
    	{
    		return retVal;
    	}*/

        //本地系统码的编解码密钥
    	String tableA="Q1WE2RT3YU@@@@@@@4IO5PA6SDF7GHJ8KLZ9XCV0BNM";  
    	//String tableA="0123456789@@@@@@@ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    	char[] bArray = localCode.toCharArray();
    	
    	char ch0;
    	char ch1;
    	Integer loc;
    	for(int i=0;i<len;i++)
    	{
    		ch0=localCode.charAt(i);
    		loc= tableA.indexOf(ch0);
    		ch1=(char)(loc+48);
    		bArray[i]=ch1;
    	}
    	
    	retVal=String.valueOf(bArray);
    	//System.out.println("retVal is:"+ retVal);
    	
    	return retVal;
    }
    
    
    //本地码转换为注册码
    //密钥见代码中
    public static String RegCodeTrans(String localCode) {
    	String retVal="";
    	retVal=localCode;
    	Integer len=localCode.length();
    	
        //判断长度
    	/*if(32!=len)
    	{
    		return retVal;
    	}*/
        
        //本地系统码的编解码密钥
    	//String tableA="Q1WE2RT3YU@@@@@@@4IO5PA6SDF7GHJ8KLZ9XCV0BNM";
    	//String tableA="0123456789@@@@@@@ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    	String tableA="HJ81Z9XCV0@@@@@@@BRT3YU4IO5PLWE2QA6SDF7GMNK";
    	char[] bArray = localCode.toCharArray();
    	
    	char ch0;
    	char ch1;
    	
    	for(int i=0;i<len;i++)
    	{
    		ch0=localCode.charAt(i);
    		ch1=tableA.charAt(ch0-48);
    		bArray[i]=ch1;
    	}
    	retVal=String.valueOf(bArray);
    	
    	return retVal;
    }

    
    
    
    //注册检查方法，启动时检查是否做了注册
    //已经注册，返回true，没有注册，返回false
    
    @Transactional
	public static boolean  doConfirmRegInfo()
	{
        String localRegVal= getLocalRegCode(1);//WMS功能
        boolean bool=false;

        if(40!=localRegVal.length())
        {
        	return bool;
        }
        
        DBHelper dbHelper = DBHelper.getInstance(false);
        //查找数据表中的注册码
        try {
                StringBuffer sql = new StringBuffer();
                
				sql.append(" SELECT * ");
				sql.append(" FROM REG_INFO ");
				
                Map<String, Object> m = dbHelper.select(sql.toString(), new MapHandler());
                
			if(UtilValidate.isEmpty(m)){
				//查询记录失败，说明没有注册
				return bool;
			}
			else
			{
				//找到记录，返回本地数据库保存的注册码
               	String reg = (String) m.get("reg");
                if((null==reg)||(40!=reg.length()))
                {
                	return bool;
                }
                String newLocalRegVal=localRegVal.substring(12,40); 
                String newReg=reg.substring(12,40); 
				//判断本地保存的注册码与计算的是否一致，如果不一致，返回false
               	if(newLocalRegVal.equals(newReg))    
               	{
               		bool=true;
               	}
			}
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
			bool=false;
		}finally{
			dbHelper.freeConnection();   
		}
		return bool;
	}    
    
    //更新注册信息表，写入新的注册码
    public static boolean doUpdateRegInfo(String localSysCode, String regCode)
    {
        boolean retVal=false;
        boolean bool;
        Date dateTime =new Date();
        String usr="admin";
        
        //先判断注册码是否合法，如果不合法则直接返回
        String decode= LocalCodeDecode(localSysCode);  //根据本地系统码解码
        
        String localRegCode=RegCodeTrans(decode);  //计算本地注册码

        if(40!=localRegCode.length())             //如果长度错误，直接返回
        {
        	return retVal;
        }
        
        String newLocalRegVal=localRegCode.substring(12,40); //后28位是关键信息
        String newRegCode=regCode.substring(12,40); 
        
        if(!newRegCode.equals(newLocalRegVal))
        {
            return retVal;
        }
        
        DBHelper dbHelper = DBHelper.getInstance(false,false);
        
        try 
        {
			StringBuffer sql = new StringBuffer();
            sql.append(" SELECT LOCAL,REG FROM REG_INFO");

            Map<String, Object> m = dbHelper.select(sql.toString(), new MapHandler());

            if(UtilValidate.isNotEmpty(m)){
                StringBuffer sqlDel = new StringBuffer();
                
                sqlDel.append(" DELETE REG_INFO");
                bool = dbHelper.delete(sqlDel.toString());
                if(!bool)
                {
                    //存在记录，删除错误，直接退出
                    return retVal;
                }
            }

            //无须删除或者删除成功后，开始插入记录
            StringBuffer sqlInsert = new StringBuffer();
            sqlInsert.append(" INSERT INTO REG_INFO ");
            sqlInsert.append(" (LOCAL,REG,ADD_WHO,EDIT_WHO,ADD_DATE,EDIT_DATE) ");
            sqlInsert.append(" VALUES (?,?,?,?,?,?)");
            bool = dbHelper.insert(sqlInsert.toString(),localSysCode,regCode,usr,usr,WmsCommon.uToTsDate(dateTime),WmsCommon.uToTsDate(dateTime));
            if(bool){
                System.out.println("REG_INFO insert success");
                retVal=true;
            }
            else
            {
                System.out.println("REG_INFO insert fail");
            }

            //根据插入记录是否成功判断是否提交或者回退
            if(retVal)
            {
                dbHelper.commitAndClose();  
            }
            else
            {
                dbHelper.rollbackAndClose();                            
            }
		} catch (Exception e) {
            dbHelper.rollbackAndClose();                            
			e.printStackTrace();
		}
        finally
        {
			dbHelper.freeConnection();   
		}
    
        return retVal;
    }
    
    
    //收集信息，发送邮件  qxue
    //暂时先不用了
    public static void doSendRegInfoToRedm()
    {
    	String strFunc = "QWMS";
    	String strVer="V001";
    	String str1=getWindowsMACAddress();
    	String str2=getHdSerialNumber();
    	
    	String localSysCode= getLocalSysCode(1);
    	boolean isReg=doConfirmRegInfo();
    	
        InetAddress addr=null;
		try {
			addr = InetAddress.getLocalHost();
		//	System.out.println("主机名称: " + a.getHostName());
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}    	
    	
    	String mailString ="电脑名称："+addr.getHostName()+"\n功能名称："+strFunc+"\n地址1："+str1+"\n地址2："+str2+"\n本地系统码："+localSysCode+"\n是否注册："+isReg;
    	   
//		String mailToD= "jojy_dai@hong56.com";
//		SendTest.rSendTextMail(mailToD,mailString);
//		String mailTo= "qxue@hong56.com";
//		SendTest.rSendTextMail(mailTo,mailString);
    	
    	
    }
    
    
    //新的注册确认方法，增加了邮件发送判断条件
    public static boolean  doCheckAndSendRegInfo()
    {
    	boolean bResult=false;
    	
    	//检查是否做了注册，如果没有注册，不能使用，并发邮件通知
    	
    	String strFunc = "QWMS";
    	String strVer="V001";
    	String str1=getWindowsMACAddress();
    	String str2=getHdSerialNumber();
    	
    	String localSysCode= getLocalSysCode(1);
    	boolean isReg=doConfirmRegInfo();
    	
        InetAddress addr=null;
		try {
			addr = InetAddress.getLocalHost();
		//	System.out.println("主机名称: " + a.getHostName());
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}   
    	
    	if(!isReg)
    	{
    		System.out.println("REG FAIL!");
    		return bResult;
    	}
    	
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		Map<String, Object> data = null;
		Integer dateDiff;

    	//检查reg_info表中的editDate，如果差7天以上，发邮件通知
    	//并更新editDate
		try {

			StringBuffer sql = new StringBuffer();
			sql.append("SELECT "+Constants.SQLSERVER_regDateDiff+Constants.DB2_regDateDiff +" AS DATEDIFF "+ " FROM REG_INFO ");
			data = dbHelper.select(sql.toString(), new MapHandler());
	    	
			if(UtilValidate.isNotEmpty(data)){
				dateDiff=(Integer)data.get("datediff");
				if(dateDiff>7)
				{
			    	String mailString ="电脑名称："+addr.getHostName()+"\n功能名称："+strFunc+"\n地址1："+str1+"\n地址2："+str2+"\n本地系统码："+localSysCode+"\n是否注册："+isReg;
					String mailTo= "qxue@hong56.com";
					SendTest.rSendTextMail(mailTo,mailString);
			    	
	                StringBuffer sqlUp = new StringBuffer();
	                sqlUp.append(" UPDATE REG_INFO SET  EDIT_DATE= '"+UtilDateTime.nowTimestamp()+"'");
	                boolean bool = dbHelper.update(sqlUp.toString());
	                if(!bool)
	                {
	                	System.out.println("REG_INFO EDIT_DATE Update fail ");
	                    dbHelper.rollbackAndClose();                            
	                }
	                else
	                {
	                	dbHelper.commitAndClose();
	                }
				}
				bResult=true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			dbHelper.rollbackAndClose();
			e.printStackTrace();
		}finally{
			dbHelper.freeConnection();
		}
    	return bResult;
    }
    
}
