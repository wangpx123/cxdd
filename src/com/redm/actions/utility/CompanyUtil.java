package com.redm.actions.utility;

import java.util.List;
import java.util.Map;

import javolution.util.FastMap;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.util.UtilValidate;

public class CompanyUtil {
	/**
	 * 字典数据缓存集合
	 */
	private static Map<String,Object> companyKeyValuesCache = FastMap.newInstance();
	public static void initKeyValues(String inCodes){
		DBHelper dbHelper = DBHelper.getInstance();
		try {
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT COMPANY_CODE,COMPANY_NAME FROM COMPANY ");
			sql.append(" WHERE 1 = 1 ");
			//sql.append(" AND ENABLE = 'Y' ");
			List<Map<String,Object>> codeLists = dbHelper.select(sql.toString(), new MapListHandler());
			if(UtilValidate.isNotEmpty(codeLists)){
				for (Map<String, Object> map : codeLists) {
					String companyCode = (String)map.get("companyCode");
					String companyName = (String)map.get("companyName");
					companyKeyValuesCache.put(companyCode, companyName);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			dbHelper.freeConnection();
		}
	}
	public static String get(Object key){
		if(UtilValidate.isEmpty(key)) return "";
		if(!companyKeyValuesCache.containsKey(key)){
			initKeyValues(null);
		}
		if(!companyKeyValuesCache.containsKey(key)){
			return "";
		}
		return (String)companyKeyValuesCache.get(key);
	}
}
