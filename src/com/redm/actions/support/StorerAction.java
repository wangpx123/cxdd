package com.redm.actions.support;

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
import com.redm.entity.Storer;
import com.redm.entity.UserInfo;
import com.redm.service.support.StorerService;
import com.redm.service.support.WmsCommonService;


public class StorerAction extends AbstractAction{

	private static final long serialVersionUID = -4285681451909819674L;
	
	@Autowired
	private StorerService storerService;
	
	private File filedata;
	private String filedataFileName;
	
	private String txtfiledata;
	private String txtfiledataFileName;
	
	private String XMLfiledata;
	private String XMLfiledataFileName;
	
	public static Integer exErrLineNum=0;  //导入时出错行号 qxue
    public static Integer exErrRowNum=0;   //导入时出错列号 qxue
	
	//不使用PageHelper的分页查询方法
	@Action(value="doQueryStorers",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryStorers(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
        final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		
        final String storerKey = request.getParameter("storerKey");
		final String type = request.getParameter("type");
		final String company = request.getParameter("company");
		final String descr = request.getParameter("descr");

		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ");
		sql.append(" * ");
		sql.append(" FROM STORER ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND storer_key LIKE '%"+storerKey+"%'");
		}
		if(UtilValidate.isNotEmpty(type)){
			sql.append(" AND type LIKE '%"+type+"%'");
		}
		if(UtilValidate.isNotEmpty(company)){
			sql.append(" AND company LIKE '%"+company+"%'");
		}		
		if(UtilValidate.isNotEmpty(descr)){
			sql.append(" AND descr LIKE '%"+company+"%'");
		}
		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,sort,dir));
		return Constants.SUCCESS;
	}	
	
	@Action(value="doSaveStorers",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doSaveStorers(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		JSONObject entity = ParamsUtils.toJSONParams(params, true, (String[])null);
		try {
			Timestamp dateTime = UtilDateTime.nowTimestamp();
			UserInfo user = (UserInfo) request.getSession().getAttribute(Constants.USER_LOGIN);
			Storer storer =  EntityUtils.toEntity(Storer.class,entity,null,null,true);
			if(UtilValidate.isNotEmpty(storer.getId())){
				storer.setEditDate(dateTime);
				storer.setEditWho(user.getRealname());
				storerService.updateStorer(storer);
				json.put("msg", "修改成功！");
			}else{
				storer.setAddDate(dateTime);
				storer.setAddWho(user.getRealname());
				storer.setEditDate(dateTime);
				storer.setEditWho(user.getRealname());
				storerService.saveStorer(storer);
				json.put("msg", "保存成功！");
			}
		} catch (Exception e) {
			e.printStackTrace();
			setSuccess(false);
			json.put("msg", "保存失败！");
		}
		return Constants.SUCCESS;
		
	}
	
	
	@Action(value="doDeleteStorer",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doDeleteStorer(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String id = request.getParameter("id");
		
		//先判断是否能删除
		Map<String, Object> map=WmsCommonService.baseDataGetValue("storer", "storer_Key", id);
		String storerKey=(String) map.get("storerKey");
		boolean isExist=WmsCommonService.baseDataDeleteCheck("sku", "storer_Key", storerKey);
		//如果返回true则不能删除。
		if(isExist){
			setSuccess(false);
			json.put("msg", "此货主下存在商品,不可以删除！");
			return SUCCESS;
		}
		
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			
			boolean bool = dbHelper.delete(" DELETE STORER WHERE ID = '"+id+"'");
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
	@Action(value="doValidateStorers",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doValidateStorers(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		
		final String storerKey = request.getParameter("storerKey");

		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ");
		sql.append(" ID, ADD_DATE, ADD_WHO, ADDRESS1, ADDRESS2, ALLOCATION_STRATEGY_KEY, AREA_CHARGE, AREACHARGE_TYPE,");
		sql.append(" ASN_COPY, ASN_LABEL, ASN_UOM, AUTO_SKU, AUTO_STORER, BANKING_ACCOUNT, BILLTO, CARRIER, CARTON_KEY, ");
		sql.append(" CHARGE_KEY, CHARGE_RANK, CHARGE_TYPE, CITY, COUNTY,COMPANY, CONTACT, CUBE_UOM, CURRENCY, DATE_CLOSING,");
		sql.append(" DESCR, DUTY, EDIT_DATE, EDIT_WHO, EMAIL, EXCESS_ALLOWABLE, EXCESS_RATE, FAX, INVCHARGE_RANK,");
		sql.append(" IS_AREA, IS_OUTBOUND_INVCHARGE, LOC_GENERATE, LOT_KEY, MOBILE, MUST_ASN, MUST_ASN_SO, MUST_SO,");
		sql.append(" NATION, NOTES, PACK_KEY, POSITION, PRE_ALLOCATION_STRATEGY_KEY, PREFIX, PROVINCE, PUT_ALLOCATE,");
		sql.append(" PUTAWAY_STRATEGY_KEY, REPLENISHMENT_STRATEGY_KEY, ROTATION_STRATEGY_KEY, ROUTE, SO_COPY, SO_LABEL,");
		sql.append(" SO_UOM,STORER_KEY,TEL,TYPE,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3,USER_DEFINE4,USER_DEFINE5,WAREHOUSE_AREA,WGT_UOM");
		sql.append(" FROM STORER ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND storer_key = '"+storerKey+"'");
		}
		else
		{
            sql.append(" AND storer_key = ''");
		}

		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,null,null));
		return Constants.SUCCESS;
	}
	
	//校验货主是否存在--不使用PageHelper的分页查询方法
	@Action(value="doValidateStorers2",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doValidateStorers2(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		
		final String storerKey = request.getParameter("storerKey");

		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ");
		sql.append(" ID, ADD_DATE, ADD_WHO, ADDRESS1, ADDRESS2, ALLOCATION_STRATEGY_KEY, AREA_CHARGE, AREACHARGE_TYPE,");
		sql.append(" ASN_COPY, ASN_LABEL, ASN_UOM, AUTO_SKU, AUTO_STORER, BANKING_ACCOUNT, BILLTO, CARRIER, CARTON_KEY, ");
		sql.append(" CHARGE_KEY, CHARGE_RANK, CHARGE_TYPE, CITY, COUNTY,COMPANY, CONTACT, CUBE_UOM, CURRENCY, DATE_CLOSING,");
		sql.append(" DESCR, DUTY, EDIT_DATE, EDIT_WHO, EMAIL, EXCESS_ALLOWABLE, EXCESS_RATE, FAX, INVCHARGE_RANK,");
		sql.append(" IS_AREA, IS_OUTBOUND_INVCHARGE, LOC_GENERATE, LOT_KEY, MOBILE, MUST_ASN, MUST_ASN_SO, MUST_SO,");
		sql.append(" NATION, NOTES, PACK_KEY, POSITION, PRE_ALLOCATION_STRATEGY_KEY, PREFIX, PROVINCE, PUT_ALLOCATE,");
		sql.append(" PUTAWAY_STRATEGY_KEY, REPLENISHMENT_STRATEGY_KEY, ROTATION_STRATEGY_KEY, ROUTE, SO_COPY, SO_LABEL,");
		sql.append(" SO_UOM,STORER_KEY,TEL,TYPE,USER_DEFINE1,USER_DEFINE2,USER_DEFINE3,USER_DEFINE4,USER_DEFINE5,WAREHOUSE_AREA,WGT_UOM,nDESCR,pDESCR,cDESCR,codescr");
		sql.append(" FROM ");
		sql.append("( ");
		sql.append(" SELECT c.NATION_KEY AS NATION_KEY,c.PROVINCE_KEY AS PROVINCE_KEY,c.CITY_KEY AS CITY_KEY,co.COUNTY_KEY AS "); 
		sql.append(" COUNTY_KEY,nDESCR,pDESCR,cDESCR,co.descr AS codescr ");
		sql.append(" FROM ");
		sql.append("( ");
		sql.append(" SELECT b.NATION_KEY AS NATION_KEY,b.PROVINCE_KEY AS PROVINCE_KEY,ci.CITY_KEY AS CITY_KEY,nDESCR,pDESCR,ci.DESCR AS cDESCR "); 
		sql.append(" FROM ");
		sql.append("( ");
		sql.append(" SELECT a.NATION_KEY AS NATION_KEY,a.PROVINCE_KEY AS PROVINCE_KEY,nDESCR,pDESCR ");
		sql.append(" FROM ");
		sql.append(" ( ");
		sql.append(" SELECT n.NATION_KEY AS NATION_KEY,p.PROVINCE_KEY AS PROVINCE_KEY,n.DESCR AS nDESCR,p.DESCR AS pDESCR ");			
		sql.append(" FROM NATION n ");
		sql.append(" LEFT JOIN PROVINCE p ");
		sql.append(" ON n.NATION_KEY = p.NATION_KEY ");
		sql.append(" )a	");
		sql.append(" LEFT JOIN ");		
		sql.append(" PROVINCE p ON p.PROVINCE_KEY = a. PROVINCE_KEY ");
		sql.append(" )b ");		
		sql.append(" LEFT JOIN CITY ci ON  b.PROVINCE_KEY = ci.PROVINCE_KEY ");  
		sql.append(" )c "); 
		sql.append(" LEFT JOIN county co ON c.CITY_KEY = co.CITY_KEY "); 
		sql.append(" )d ");
		sql.append(" LEFT JOIN STORER  ON STORER.NATION = d.NATION_KEY AND STORER.PROVINCE = d.PROVINCE_KEY AND STORER.CITY = d.CITY_KEY AND ");
		sql.append(" STORER.COUNTY = d.COUNTY_KEY ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND STORER.STORER_KEY = '"+storerKey+"'");
		}
		else
		{
            sql.append(" AND STORER.STORER_KEY = ''");
		}

		json.put("totalCount", getCountForQueryPage(sql));
		json.put("data", getListForQueryPage(sql, pageIndex, pageSize,null,null));
		return Constants.SUCCESS;
	}
	
	//storers2combo专用查询--不使用PageHelper的分页查询方法
	@Action(value="doQueryStorersCombo",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryStorersCombo(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		
		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT ");
		sql.append(" id,storer_key,allocation_strategy_key,area_charge,areacharge_type,asn_copy,address1,address2, ");
		sql.append(" asn_label,asn_uom,auto_sku,auto_storer,banking_account,billto,carrier,carton_key, ");
		sql.append(" charge_key,charge_rank,charge_type,city,company,contact,cube_uom,currency, ");
		sql.append(" date_closing,descr,duty,email,excess_allowable,excess_rate,fax,invcharge_rank, ");
		sql.append(" is_area,is_outbound_invcharge,loc_generate,lot_key,mobile,must_asn,must_asn_so, ");
		sql.append(" must_so,nation,notes,pack_key,position,pre_allocation_strategy_key,prefix, ");
		sql.append(" province,put_allocate,putaway_strategy_key,replenishment_strategy_key, ");
		sql.append(" rotation_strategy_key,route,so_copy,so_label,so_uom,tel,type,user_define1, ");
		sql.append(" user_define2,user_define3,user_define4,user_define5,warehouse_area,wgt_uom ");
		sql.append(" FROM STORER ");
		sql.append(" WHERE 1 = 1 ");
		sql.append(" AND type ='1' ");     // 只查询货主类型的

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
