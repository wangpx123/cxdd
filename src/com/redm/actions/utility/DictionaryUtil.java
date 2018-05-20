package com.redm.actions.utility;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javolution.util.FastList;
import javolution.util.FastMap;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.util.UtilValidate;

public class DictionaryUtil {
	/**
	 * 字典数据缓存集合
	 */
	private static Map<String,Object> dictonaryCache = FastMap.newInstance();
	/**
	 * 字典数据类型缓存集合
	 */
	private static List<String> typeCache = FastList.newInstance();
	/**
	 * 根据需要的字典类型查询数据，查询后的数据会被缓存，以供下次使用。
	 * @param dictType 数据类型参数,可以指定多个类型,如果值为null查询类型的数据
	 */
	public static void required(String... dictType){
		if(UtilValidate.isNotEmpty(dictType)) {
			List<String> list = FastList.newInstance();
			for (String type : dictType) {
				if(!typeCache.contains(type)){
					list.add(type);
				}
			}
			if(UtilValidate.isNotEmpty(list)){
				String[] dictTypes = new String[list.size()];
				int m  = 0;
				for (String dict : list) {
					dictTypes[m] = dict;
					m++;
				}
				Map<String,Object> dictonary = getValues(dictTypes);
				Set<String> keySets = dictonary.keySet();
				for (String key : keySets) {
					dictonaryCache.put(key, dictonary.get(key));
				}
			}
		} else {
			dictonaryCache = getValues();
		}
	}
	public static boolean hasData(){
		return UtilValidate.isNotEmpty(dictonaryCache);
	}
	/**
	 * 根据类型和代码获取字典的文字信息
	 * @param dictType数据类型
	 * @param code数据代码
	 * @return 文字信息
	 */
	public static String getText(String dictType,Object code){
		Object obj = dictonaryCache.get(dictType + code);
		if(obj != null) 
			return (String)obj;
		return "";
	}
	/**
	 * 获取数据字典中按指定的参数的字典数据
	 * @param dictType 数据类型参数,可以指定多个类型,如果值为null查询类型的数据
	 * @return 查询后的数据集合，只包括type + code,description字段
	 */
	public static Map<String,Object> getValues(String... dictType){
		StringBuffer inTypes = null;
		if(UtilValidate.isNotEmpty(dictType)) {
			inTypes = new StringBuffer();
			String[] types = dictType;
			int m = 1;
			for (String type : types) {
				inTypes.append("'");
				inTypes.append(type);
				if(m == types.length)
					inTypes.append("'");
				else
					inTypes.append("',");
				m++;
			}
		}
		DBHelper dbHelper = DBHelper.getInstance();
		Map<String,Object> codes = FastMap.newInstance();
		try {
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT ID,DICT_VALUE FROM DICTIONARYS ");
			sql.append(" WHERE 1 = 1 ");
			if(UtilValidate.isNotEmpty(inTypes)){
				sql.append(" AND DICT_TYPE IN (" + inTypes + ")");
			}
			List<Map<String,Object>> codeLists = dbHelper.select(sql.toString(), new MapListHandler());
			if(UtilValidate.isNotEmpty(codeLists)){
				for (Map<String, Object> map : codeLists) {
					codes.put((String)map.get("id"), map.get("dictValue"));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			dbHelper.freeConnection();
		}
		return codes;
	}
}
