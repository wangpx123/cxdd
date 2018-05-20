package com.redm.actions.system;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import javolution.util.FastList;
import javolution.util.FastMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;

import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.callback.CriteriaCallBack;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.json.PageHelper;
import com.jelly.help.commons.util.EntityUtils;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.jelly.help.entity.PageInfo;
import com.opensymphony.xwork2.ActionContext;
import com.redm.actions.utility.Constants;
import com.redm.entity.CodeDetail;
import com.redm.service.support.WmsCommonService;
import com.redm.service.system.CodeDetailService;

public class CodeDetailAction extends BaseAction{

	private static final long serialVersionUID = 7244615311048735646L;
	
	@Autowired
	private CodeDetailService codeDetailService;
	
	//使用PageHelper的分页查询方法
	@Action(value="queryCodeDetailPh",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String queryCodeDetailPh(){
		HttpServletRequest request = ServletActionContext.getRequest();
		final String codeType = request.getParameter("codeType");
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		PageHelper pageHelper = PageHelper.getInstance();
		pageHelper.initPageInfo(context);
		List<String> fieldNamesList = FastList.newInstance();
		fieldNamesList.add("codeType");
		fieldNamesList.add("codeValue");
		fieldNamesList.add("description");
		fieldNamesList.add("sort");
		fieldNamesList.add("codedef1");
		fieldNamesList.add("codedef2");
		fieldNamesList.add("codedef3");
		fieldNamesList.add("notes");
		fieldNamesList.add("id");
		fieldNamesList.add("addDate");
		fieldNamesList.add("addWho");			
		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override
			public void onQuery(StringBuffer sql) {
				sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY code_type,sort,code_value ASC) AS ROWNUM,");
				sql.append(" id,code_type,code_value,codedef1,codedef2,codedef3,description,notes,sort,add_date,add_who ");
				sql.append(" FROM CODE_DETAIL ");
				sql.append(" WHERE 1 = 1 ");
				if(UtilValidate.isNotEmpty(codeType)){
					sql.append(" AND code_type = '"+codeType+"'");
				}
				else
				{
                    sql.append(" AND code_type = ''");   //加强查询条件 qxue
				}
			}
			@Override
			public void onStorage(Map<String, Object> data, String key, String value) {
				if(UtilValidate.isNotEmpty(value)){
					
				}else{
					value = "";
				}
				super.onStorage(data, key, value);
			}
		});
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
		return SUCCESS;
	}
	
	
	//不用pageHelper的分页查询方法
	@Action(value="queryCodeDetail",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String queryCodeDetail(){
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		DBHelper dbHelper = DBHelper.getInstance();
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		Connection conn=dbHelper.getConnection();

		final String codeType = request.getParameter("codeType");

		JSONArray data = new JSONArray();

		//sql 查询语句
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT id,code_type,code_value,codedef1,codedef2,codedef3,description,notes,sort,add_date,add_who ");
		sql.append(" FROM CODE_DETAIL ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(codeType)){
			sql.append(" AND code_type = '"+codeType+"'");
		}else{
            sql.append(" AND code_type = ''");   //加强查询条件 qxue
		}
		sql.append(" ORDER BY sort,code_type,code_value ASC ");
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		try 
		{
			list = dbHelper.select(sql.toString(), new MapListHandler());
			 //转换为json
	        data = WmsCommonService.ListToJson(list);
		}                                                                                            
		catch (Exception e) {
		   e.printStackTrace();
		}finally
		{
		}
		
		json.put("data", data);
		json.put("totalCount", list.size());
		return Constants.SUCCESS;
	}
	//使用pageInfo的分页技术,暂时不用
	@Action(value="queryCodeDetailPi",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String queryCodeDetailPi(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		String orderBy = request.getParameter("sort");
		String desc = request.getParameter("dir");
		int pageIndex = ParamsUtils.toInteger(page, 1);  
		int pageSize = ParamsUtils.toInteger(limit, 20);
		final String codeType = request.getParameter("codeType");
		
		PageInfo pageInfo = codeDetailService.queryByPage(pageIndex, pageSize, orderBy, desc, CodeDetail.class, new CriteriaCallBack() {
			@Override
			public void callback(Criteria c) {

				if(UtilValidate.isNotEmpty(codeType)){
					c.add(Restrictions.eq("codeType", codeType));
				}
				else
				{
					c.add(Restrictions.eq("codeType", ""));
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
		json.put("totalCount", pageInfo.getTotalCount());
		return SUCCESS;
	}
		
	@Action(value="deleteCodeDetail",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String deleteCodeDetail(){
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			String codeDetail = (String) context.get("id");
			boolean bool = dbHelper.delete(" DELETE CODE_DETAIL WHERE ID = '"+codeDetail+"'");
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
	
	
	//由codeValue查找description的方法，临时保存
	@Action(value="doQueryCodeDetailDescr0",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String queryCodeDetailDescr0(){
		HttpServletRequest request = ServletActionContext.getRequest();
		final String codeType = request.getParameter("codeType");
		final String codeValue = request.getParameter("codeValue");
		
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		PageHelper pageHelper = PageHelper.getInstance();
		pageHelper.initPageInfo(context);
		List<String> fieldNamesList = FastList.newInstance();
		
		fieldNamesList.add("codeType");
		fieldNamesList.add("codeValue");
		fieldNamesList.add("description");


		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override
			public void onQuery(StringBuffer sql) {
				sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY code_type,sort,code_value ASC) AS ROWNUM,");
				sql.append(" id,code_type,code_value,codedef1,codedef2,codedef3,description,notes,sort ");
				sql.append(" FROM CODE_DETAIL ");
				sql.append(" WHERE 1 = 1 ");
				if(UtilValidate.isNotEmpty(codeType)){
					sql.append(" AND code_type = '"+codeType+"'");
				}
				if(UtilValidate.isNotEmpty(codeValue)){
					sql.append(" AND code_value = '"+codeValue+"'");
				}
			}
			@Override
			public void onStorage(Map<String, Object> data, String key, String value) {
				if(UtilValidate.isNotEmpty(value)){
					
					if(key.equals("code_value")){

						
					}
					
				}else{

					value = "";
				}
				super.onStorage(data, key, value);
			}
		});
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
		return SUCCESS;
	}
	
	//由codeValue查找description的方法，临时保存
	@Action(value="doQueryCodeDetailDescr",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doQueryCodeDetailDescr(){
		
		HttpServletRequest request = ServletActionContext.getRequest();
		final String codeType = request.getParameter("codeType");
		final String codeValue = request.getParameter("codeValue");
		
		DBHelper dbHelper = DBHelper.getInstance(false);
		final String sort= request.getParameter("sort");//要排序的列名--无需定义，ext自动后传
	    final String dir= request.getParameter("dir");//要排序的方式--无需定义，ext自动后传
		try{
		StringBuffer sql = new StringBuffer();
		if(UtilValidate.isNotEmpty(sort)){
			String columnName=WmsCommonService.entityToDbColumn(sort);
			sql.append("SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY "+columnName+" "+dir+") AS ROWNUM,");
		}else{
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY code_type,sort,code_value ASC) AS ROWNUM,");
		}	
		sql.append(" id,code_type,code_value,codedef1,codedef2,codedef3,description,notes,sort ");
		sql.append(" FROM CODE_DETAIL ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(codeType)){
			sql.append(" AND code_type = '"+codeType+"'");
		}
		if(UtilValidate.isNotEmpty(codeValue)){
			sql.append(" AND code_value = '"+codeValue+"'");
		}
		System.out.println(sql);
		String retValue;
        
		List<Map<String, Object>> data = dbHelper.select(sql.toString(), new MapListHandler());
			  if(UtilValidate.isNotEmpty(data)){
                    Map<String, Object> m = FastMap.newInstance();
                    m = data.get(0);
                    retValue=(String)m.get("description");
                    System.out.println("retValue is:"+retValue);
        			setSuccess(true);
                    json.put("descr",retValue);
				}
                else
                {	
        			setSuccess(true);
                    json.put("descr","");
                }
		}catch (Exception e)
		{
			e.printStackTrace();
			dbHelper.close();
		}finally
		{
			dbHelper.freeConnection();
		}
		return SUCCESS;
	}

	//本方法的目的是校验在codedetail表中，CodeType+CodeValue是唯一的。如果重复需要提示，清空codeVaue，重新输入
/*	@Action(value="doCheckCodeTypeValue0",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String doCheckCodeTypeValue0(){
		HttpServletRequest request = ServletActionContext.getRequest();
		Map<String, Object> params =  ActionContext.getContext().getParameters();
		Map<String, Object> context = ParamsUtils.toParams(params);
		PageHelper pageHelper = PageHelper.getInstance();
		final String codeType = request.getParameter("codeType");
		final String codeValue = request.getParameter("codeValue");

		pageHelper.initPageInfo(context);
		List<String> fieldNamesList = FastList.newInstance();
		fieldNamesList.add("id");
		fieldNamesList.add("codeType");
		fieldNamesList.add("codeValue");
        
		JSONArray data = pageHelper.getJSONObject(fieldNamesList, pageHelper.new CallBack() {
			@Override
			public void onQuery(StringBuffer sql) {
				sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID DESC) AS ROWNUM,");
				sql.append(" ID, CODE_TYPE, CODE_VALUE  ");
				sql.append(" FROM CODE_DETAIL ");
				sql.append(" WHERE 1 = 1 ");
				if(UtilValidate.isNotEmpty(codeType)){
					sql.append(" AND CODE_TYPE = '"+codeType+"'");
				}
				if(UtilValidate.isNotEmpty(codeValue)){
					sql.append(" AND CODE_VALUE = '"+codeValue+"'");
				}
			}
			@Override
			public void onStorage(Map<String, Object> data, String key, String value) {
				if(UtilValidate.isNotEmpty(value)){
					setSuccess(false);
					json.put("msg", "记录重复");
				}else{
					value = "";
					setSuccess(true);    //本语句表示json返回到前台的success字段是true，也是MessageBox显示的内容
					json.put("msg", "校验成功！");
				}
				super.onStorage(data, key, value);
			}
		});
		json.put("data", data);
		json.put("totalCount", pageHelper.getTotalCount());
//		System.out.println(data);
		return SUCCESS;
	}*/
    
	
    //本方法的目的是校验在codedetail表中，CodeType+CodeValue是唯一的。如果重复需要提示，清空codeVaue，重新输入
    @Action(value="doCheckCodeTypeValue",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
    public String doCheckCodeTypeValue(){
        HttpServletRequest request = ServletActionContext.getRequest();
        final String codeType = request.getParameter("codeType");
        final String codeValue = request.getParameter("codeValue");
        
        DBHelper dbHelper = DBHelper.getInstance();
        try {
        
            StringBuffer sql = new StringBuffer();
            sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID DESC) AS ROWNUM,");
            sql.append(" ID, CODE_TYPE, CODE_VALUE  ");
            sql.append(" FROM CODE_DETAIL ");
            sql.append(" WHERE 1 = 1 ");
            if(UtilValidate.isNotEmpty(codeType)){
                sql.append(" AND CODE_TYPE = '"+codeType+"'");
            }
            if(UtilValidate.isNotEmpty(codeValue)){
                sql.append(" AND CODE_VALUE = '"+codeValue+"'");
            }
        
            List<Map<String, Object>> data = dbHelper.select(sql.toString(), new MapListHandler());

            if(UtilValidate.isEmpty(data)){
                //找不到记录，可以输入
                setSuccess(true);    
                //json.put("msg", "记录不存在！");
            }
            else
            {  //找到了，记录重复
                setSuccess(false);    //库位存在
                json.put("msg", "记录重复！");
            }

        } catch (Exception e) {
            setSuccess(false);
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
