package com.redm.actions.system;

import java.sql.Timestamp;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.util.EntityUtils;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.opensymphony.xwork2.ActionContext;
import com.redm.actions.support.WmsCommon;
import com.redm.actions.utility.Constants;
import com.redm.base.AbstractAction;
import com.redm.entity.CodeDetail;
import com.redm.entity.SystemCode;
import com.redm.entity.UserInfo;
import com.redm.service.system.CodeDetailService;
import com.redm.service.system.SystemCodeService;

public class SystemCodeAction extends AbstractAction{

	private static final long serialVersionUID = 4220888202445855293L;
	
	@Autowired
	private SystemCodeService systemCodeService;
	
	@Autowired
	private CodeDetailService codeDetailService;
	
	//不用pageHelper的分页查询方法
	@Action(value="doQuerySystemCode",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQuerySystemCode(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传

		final String codeType = request.getParameter("codeType");
		final String descrip = request.getParameter("descrip");
		
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ID,CODE_TYPE,DESCRIP,MARK,add_date,add_who ");
		sql.append(" FROM SYSTEM_CODE ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(codeType)){
			sql.append(" AND code_type LIKE '%"+codeType+"%'");
		}
		if(UtilValidate.isNotEmpty(descrip)){
			sql.append(" AND descrip LIKE '%"+descrip+"%'");
		}
		
		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,sort,dir));
		
		return Constants.SUCCESS;
	}
	
	@Action(value="saveCode",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String saveCode(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		JSONObject entity = ParamsUtils.toJSONParams(params, true, (String[])null);
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			Timestamp dateTime = UtilDateTime.nowTimestamp();
			UserInfo user = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
			String codeId = (String) entity.get("codeId");
			String codeDetailId = (String)entity.get("codeDetailId");
			String daddWho = (String)entity.get("daddWho"); //主表，明细表重名，特殊处理
            Timestamp daddDate = WmsCommon.StringToTimestamp((String)entity.get("daddDate"));
			
			
			String codeType = (String)entity.get("codeType");
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT id FROM SYSTEM_CODE WHERE code_type = ? ");
			Map<String, Object> map = dbHelper.select(sql.toString(), new MapHandler(),codeType);
			if(UtilValidate.isEmpty(codeId)){
				if(UtilValidate.isNotEmpty(map)){
					codeId = (Integer)map.get("id")+"";
				}
			}
			entity.put("id", codeId);
			SystemCode systemCode = EntityUtils.toEntity(SystemCode.class,entity,null,null,true);
			if(UtilValidate.isNotEmpty(codeId)){
				systemCode.setEditDate(dateTime);
				systemCode.setEditWho(user.getRealname());
				systemCodeService.updateArea(systemCode);
				json.put("id", codeId);
			}else{
				systemCode.setAddDate(dateTime);
				systemCode.setAddWho(user.getRealname());
				systemCode.setEditDate(dateTime);
				systemCode.setEditWho(user.getRealname());
				systemCodeService.saveArea(systemCode);
			}
			entity.put("id", codeDetailId);
            entity.put("addWho", daddWho);      //重名，特殊处理
            entity.put("addDate", daddDate);    //重名，特殊处理
			CodeDetail codeDetail = EntityUtils.toEntity(CodeDetail.class,entity,null,null,true);
			if(UtilValidate.isNotEmpty(codeDetailId)){
				codeDetail.setEditDate(dateTime);
				codeDetail.setEditWho(user.getRealname());
				codeDetailService.updateCodeDetail(codeDetail);
			}else{
				
/*				String codeValue = (String)entity.get("codeValue");  //另外做了校验，这里无须校验了
				StringBuffer checksql = new StringBuffer();
				checksql.append(" SELECT id FROM CODE_DETAIL WHERE code_type = ? AND code_value = ? ");
				Map<String, Object> result = dbHelper.select(checksql.toString(), new MapHandler(), codeType,codeValue);
				if(UtilValidate.isNotEmpty(result)){
					throw new Exception();
				}*/
				codeDetail.setAddDate(dateTime);
				codeDetail.setAddWho(user.getRealname());
				codeDetail.setEditDate(dateTime);
				codeDetail.setEditWho(user.getRealname());
				codeDetailService.saveCodeDetail(codeDetail);
			}
			json.put("msg", "保存成功！");
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "保存失败！");
		}finally{
			dbHelper.freeConnection();
		}
		return Constants.SUCCESS;
		
	}
	
	
	
	@Action(value="deleteCodeAndDetail",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String deleteCodeAndDetail(){
		boolean isSuccess = true;
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		try {
//			String codeId = (String) context.get("id");
			String codeType = (String)context.get("codeType");
			boolean bool = dbHelper.delete(" DELETE SYSTEM_CODE WHERE code_type ='"+codeType+"'");
			if(!bool) isSuccess = false;
			dbHelper.delete(" DELETE CODE_DETAIL WHERE code_type ='"+codeType+"'");
			if(isSuccess){
				dbHelper.commitAndClose();
				json.put("msg", "删除成功  ！");
			}else{
				throw new Exception();
			}
		} catch (Exception e) {
			dbHelper.rollbackAndClose();
			json.put("msg", "删除失败！");
			e.printStackTrace();
		}finally{
			dbHelper.freeConnection();
		}
		return SUCCESS;
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
