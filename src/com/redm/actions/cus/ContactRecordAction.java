package com.redm.actions.cus;

import java.io.File;
import java.sql.Timestamp;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.util.EntityUtils;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.opensymphony.xwork2.ActionContext;
import com.redm.actions.utility.Constants;
import com.redm.base.AbstractAction;
import com.redm.entity.UserInfo;
import com.redm.entity.cus.ContactRecord;
import com.redm.service.cus.ContactRecordService;


public class ContactRecordAction extends AbstractAction{

	private static final long serialVersionUID = -4285681451909819674L;
	
	@Autowired
	private ContactRecordService contactRecordService;
	
	private File filedata;
	private String filedataFileName;
	
	private String txtfiledata;
	private String txtfiledataFileName;
	
	private String XMLfiledata;
	private String XMLfiledataFileName;
	
	public static Integer exErrLineNum=0;  //导入时出错行号 qxue
    public static Integer exErrRowNum=0;   //导入时出错列号 qxue
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryContactRecord",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryContactRecord(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
        final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		
        String userId = request.getParameter("userId");
        String cusId = request.getParameter("cusId");

		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ");
		sql.append(" * ");
		sql.append(" FROM CXDD_CONTACT_RECORD ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(userId)){
			sql.append(" AND user_id = '"+userId+"'");
		}
		if(UtilValidate.isNotEmpty(cusId)){
			sql.append(" AND cus_id = '"+cusId+"'");
		}		
		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,sort,dir));
		return Constants.SUCCESS;
	}	
	
	@Action(value="doSaveContactRecord",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveContactRecord(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		JSONObject entity = ParamsUtils.toJSONParams(params, true, (String[])null);
		try {
			Timestamp dateTime = UtilDateTime.nowTimestamp();
			UserInfo user = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
			ContactRecord contactRecord =  EntityUtils.toEntity(ContactRecord.class,entity,null,null,true);
			if(UtilValidate.isNotEmpty(contactRecord.getId())){
				contactRecord.setEditDate(dateTime);
				contactRecord.setEditWho(user.getRealname());
				contactRecordService.updateContactRecord(contactRecord);
				json.put("msg", "修改成功！");
			}else{
//				contactRecord.setUserId(user.getId());
				contactRecord.setAddDate(dateTime);
				contactRecord.setAddWho(user.getRealname());
				contactRecord.setEditDate(dateTime);
				contactRecord.setEditWho(user.getRealname());
				contactRecordService.saveContactRecord(contactRecord);
				json.put("msg", "保存成功！");
			}
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "保存失败！");
		}
		return Constants.SUCCESS;
		
	}
	
	
	@Action(value="doDeleteContactRecord",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doDeleteContactRecord(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String id = request.getParameter("id");
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			
			boolean bool = dbHelper.delete(" DELETE FROM CXDD_CUSTOMER WHERE ID = '"+id+"' ");
			if(bool){
				json.put("msg", "删除成功！");
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "删除失败！");
		}finally{
			dbHelper.freeConnection();
		}
		return SUCCESS;
	}

	
	//校验货主是否存在--不使用PageHelper的分页查询方法
	@Action(value="doValidateContactRecord",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doValidateContactRecord(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		
		final String carNo = request.getParameter("carNo");

		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ");
		sql.append(" * ");
		sql.append(" FROM CXDD_CUSTOMER ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(carNo)){
			sql.append(" AND car_no = '"+carNo+"'");
		}else{
            sql.append(" AND car_no = ''");
		}

		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,null,null));
		return Constants.SUCCESS;
	}
    
	public File getFiledata() {
		return filedata;
	}

	public void setFiledata(File filedata) {
		this.filedata = filedata;
	}

	public String getFiledataFileName() {
		return filedataFileName;
	}

	public void setFiledataFileName(String filedataFileName) {
		this.filedataFileName = filedataFileName;
	}

	public String getTxtfiledata() {
		return txtfiledata;
	}

	public void setTxtfiledata(String txtfiledata) {
		this.txtfiledata = txtfiledata;
	}

	public String getTxtfiledataFileName() {
		return txtfiledataFileName;
	}

	public void setTxtfiledataFileName(String txtfiledataFileName) {
		this.txtfiledataFileName = txtfiledataFileName;
	}

	public String getXMLfiledata() {
		return XMLfiledata;
	}

	public void setXMLfiledata(String xMLfiledata) {
		XMLfiledata = xMLfiledata;
	}

	public String getXMLfiledataFileName() {
		return XMLfiledataFileName;
	}

	public void setXMLfiledataFileName(String xMLfiledataFileName) {
		XMLfiledataFileName = xMLfiledataFileName;
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
