package com.redm.actions.system;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import net.sf.json.JSONObject;

import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.utility.Constants;
import com.redm.entity.UserInfo;

public class Password extends BaseAction{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1275435334554956710L;

	
	
	@Action(value="doUpdatePass",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doUpdatePass(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
		final String oldPassOrigin = request.getParameter("oldPass");
		final String newPass1Origin = request.getParameter("newPass1");
		final String newPass2Origin = request.getParameter("newPass2");

		String oldPass = Password.getPassMD5(oldPassOrigin);
		String newPass1 = Password.getPassMD5(newPass1Origin);
		String newPass2 = Password.getPassMD5(newPass2Origin);
		
		UserInfo user = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
		String usrName = user.getUsername();
		boolean bool=true;
		String passValue="";
		String id="";
		
		
		DBHelper dbHelper = DBHelper.getInstance(false);
		
		try
		{
		
			StringBuffer sql = new StringBuffer();
	        sql.append(" SELECT ID,PASSWORD ");
	        sql.append(" FROM USER_INFO ");
	        sql.append(" WHERE  USERNAME='"+usrName + "'");
	        
	        Map<String, Object> m = dbHelper.select(sql.toString(), new MapHandler());
	        if(UtilValidate.isEmpty(m)){
	            //找不到记录，出错
	            System.out.println("can't find the user!");
	            bool=false;
				setSuccess(false);
				json.put("msg", "修改失败！");
	        }
	        else
	        {   //旧的密码和系统中的不一致或者两次输入的新密码不一致，也是修改失败
	        	passValue=(String)m.get("password");
	        	id=(String)m.get("id");
	        	if(!oldPass.equals(passValue))
	        	{
		            bool=false;
					setSuccess(false);
					json.put("msg", "原密码输入错误，修改失败！");
	        	}
	        	else if (!newPass1.equalsIgnoreCase(newPass2) )
	        	{
		            bool=false;
					setSuccess(false);
					json.put("msg", "新密码不一致，修改失败！");
	        	}
	        }
		} catch (Exception e) {
			setSuccess(false);
			json.put("msg", "修改失败！");
			dbHelper.rollbackAndClose();
			e.printStackTrace();
		}finally
		{
			dbHelper.freeConnection();
		}

		//各项参数正确，更新密码
		if(bool)
		{
			DBHelper dbHelper2 = DBHelper.getInstance();

			try
			{
                StringBuffer sqlUpdate = new StringBuffer();
                sqlUpdate.append(" UPDATE USER_INFO SET PASSWORD ='"+newPass1 +"', UPDATE_TIME= '"+UtilDateTime.nowTimestamp()+"' WHERE ID = ? ");
                bool = dbHelper2.update(sqlUpdate.toString(), id);
                if(!bool){
                    System.out.println("USER_INFO update fail");
                    bool=false;
    				setSuccess(false);
        			json.put("msg", "修改失败！");
                }
                else
                {
        			json.put("msg", "修改成功！");
                }
				
				
			} catch (Exception e) {
				setSuccess(false);
				json.put("msg", "修改失败！");
				e.printStackTrace();
			}finally
			{
				dbHelper2.freeConnection();
			}
		}
		return SUCCESS;	
	}
	
	
    private static final String ALGORITHM_MD5 = "MD5";
    /**
     * Encrypt the password with MD5
     * @param pass the password to encryption
     * @return encryption string
     */
    public static String getPassMD5(String pass) {
        String keys = null;
        try {
            MessageDigest md = MessageDigest.getInstance(ALGORITHM_MD5);
            if (pass == null) {
                pass = "";
            }
            byte[] bPass = pass.getBytes("UTF-8");
            md.update(bPass);
//            keys = new String(md.digest(), "GBK");
            keys = bytesToHexString(md.digest());
        }
        catch (NoSuchAlgorithmException aex) {
 //           logger.error("there is no " + ALGORITHM_MD5 + " Algorithm!");
        }
        catch (java.io.UnsupportedEncodingException uex) {
//            logger.error("can not encode the password - " + uex.getMessage());
        }
        return keys;
    }
    
    /**
     * 将beye[]转换为十六进制字符串
     * @param bArray
     * @return
     */
   public static final String bytesToHexString(byte[] bArray) {
     StringBuffer sb = new StringBuffer(bArray.length);
     String sTemp;
     for (int i = 0; i < bArray.length; i++) {
      sTemp = Integer.toHexString(0xFF & bArray[i]);
      if (sTemp.length() < 2){
       sb.append(0);
      }
      sb.append(sTemp.toUpperCase());
     }
     return sb.toString();
  }
	
   public static Object getPassMD5(Object pass) {
       Object keys = null;
       try {
           MessageDigest md = MessageDigest.getInstance(ALGORITHM_MD5);
           if (pass == null) {
               pass = "";
           }
           String pa=(String)pass;
           byte[] bPass = pa.getBytes("UTF-8");
           md.update(bPass);
//           keys = new String(md.digest(), "GBK");
           keys = bytesToHexString(md.digest());
       }
       catch (NoSuchAlgorithmException aex) {
//           logger.error("there is no " + ALGORITHM_MD5 + " Algorithm!");
       }
       catch (java.io.UnsupportedEncodingException uex) {
//           logger.error("can not encode the password - " + uex.getMessage());
       }
       return keys;
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
