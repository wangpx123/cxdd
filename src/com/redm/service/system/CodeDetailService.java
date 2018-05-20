package com.redm.service.system;

import java.util.List;
import java.util.Map;

import javolution.util.FastMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jelly.help.commons.callback.CriteriaCallBack;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.util.UtilValidate;
import com.jelly.help.entity.PageInfo;
import com.redm.dao.system.CodeDetailDao;
import com.redm.entity.CodeDetail;
@Service
public class CodeDetailService {
	@Autowired
	private CodeDetailDao codeDetailDao;
	
	@Transactional
	public void saveCodeDetail(CodeDetail codeDetail){
		codeDetailDao.saveCodeDetail(codeDetail);
	}
	@Transactional
	public void updateCodeDetail(CodeDetail codeDetail){
		codeDetailDao.updateCodeDetail(codeDetail);
	}	
	
	//使用PageInfo的分页技术
	public PageInfo queryByPage(int start, int pageSize,String orderBy, String desc,final Class<?> clazz,CriteriaCallBack callback){
		return codeDetailDao.findPageByCriteria(start, pageSize, orderBy, desc, clazz, callback);
	}
	
	//查询数据字典中的中文描述;
	public static String doQueryCodeDetailDescr(String codeType,String codeValue){
		String retValue = "";
		DBHelper dbHelper = DBHelper.getInstance(false);
		try{
			StringBuffer sql = new StringBuffer();
			sql.append(" select id,code_type,code_value,codedef1,codedef2,codedef3,description,notes,sort ");
			sql.append(" FROM CODE_DETAIL ");
			sql.append(" WHERE 1 = 1 ");
			if(UtilValidate.isNotEmpty(codeType)){
				sql.append(" AND code_type = '"+codeType+"'");
			}
			if(UtilValidate.isNotEmpty(codeValue)){
				sql.append(" AND code_value = '"+codeValue+"'");
			}
			List<Map<String, Object>> data = dbHelper.select(sql.toString(), new MapListHandler());
			if(UtilValidate.isNotEmpty(data)){
	             Map<String, Object> m = FastMap.newInstance();
	             m = data.get(0);
	             retValue=(String)m.get("description");
			}
		}catch (Exception e)
		{
			e.printStackTrace();
			dbHelper.close();
		}finally
		{
			dbHelper.freeConnection();
		}
		return retValue;
	}
}
