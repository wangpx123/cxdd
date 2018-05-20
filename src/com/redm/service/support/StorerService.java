package com.redm.service.support;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.generate.EntityModel;
import com.jelly.help.commons.dbutils.generate.GenerateValue.CommandTypes;
import com.jelly.help.commons.dbutils.generate.GenerateValue.SQLValues;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.utility.Constants;
import com.redm.dao.support.StorerDao;
import com.redm.entity.Storer;
import com.redm.entity.UserInfo;
@Service
public class StorerService {
	@Autowired
	private StorerDao storerDao;
	
	@Transactional
	public void saveStorer(Storer storer){
		storerDao.saveStorer(storer);
	}
	@Transactional
	public void updateStorer(Storer storer){
		storerDao.updateStorer(storer);
	}	
	
	//根据货主storerKey查询货主名称storerDescr
	public static String getStorerDescrByStorerKey(String storerKey){
		DBHelper dbHelper = DBHelper.getInstance(false);
		String storerDescr="";
		try{
	        StringBuffer sql = new StringBuffer();
	        sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID ) AS ROWNUM,");
			sql.append(" id,storer_key,type,company,descr ");
			sql.append(" FROM STORER ");
			sql.append(" WHERE 1 = 1 ");
			if(UtilValidate.isNotEmpty(storerKey)){
				sql.append(" AND storer_key = '"+storerKey+"'");
			}
	
			Map<String, Object> map = dbHelper.select(sql.toString(), new MapHandler());
								
			if(UtilValidate.isEmpty(map)){
	        //明细表无对应的记录
	        }
	        else{
	        	storerDescr=(String) map.get("descr");
	        }
		}catch(Exception e){
			e.printStackTrace();
			dbHelper.close();
        }finally{
			dbHelper.freeConnection();
        }
		return storerDescr;
	}
	
	
	//查找收货人是否存在，返回"0"则代表不存在，"1"代表已经存在
	public static int doValidateConsigneeKey(String consigneeKey){
		DBHelper dbHelper = DBHelper.getInstance(false);
		int count=0;
		try{
	        StringBuffer sql = new StringBuffer();
	        sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID ) AS ROWNUM,");
			sql.append(" id,storer_key,type,company,descr ");
			sql.append(" FROM STORER ");
			sql.append(" WHERE 1 = 1 ");
			if(UtilValidate.isNotEmpty(consigneeKey)){
				sql.append(" AND storer_key = '"+consigneeKey+"'");
			}
	
			Map<String, Object> map = dbHelper.select(sql.toString(), new MapHandler());
								
			if(UtilValidate.isEmpty(map)){
	        //明细表无对应的记录
	        }
	        else{
	        	count=1;
	        }
		}catch(Exception e){
			e.printStackTrace();
			dbHelper.close();
        }finally{
			dbHelper.freeConnection();
        }
		return count;
	}

	
	//根据货主storerKey查询货主整条信息
	public static Map<String, Object> queryStorerInfoByStorerKey(String storerKey){
		DBHelper dbHelper = DBHelper.getInstance(false);
		Map<String, Object> map = new HashMap<String, Object>();
		try{
	        StringBuffer sql = new StringBuffer();
	        sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID ) AS ROWNUM,");
	        sql.append(" id, add_date, add_who, coalesce (address1,'') AS address1, coalesce (address2,'') AS address2,");
	        sql.append(" allocation_strategy_key, area_charge,");
	        sql.append(" areacharge_type, asn_copy, asn_label, asn_uom, auto_sku, auto_storer, banking_account,");
	        sql.append(" billto, coalesce (carrier,'') AS carrier, coalesce (carton_key,'') AS carton_key, charge_key, ");
	        sql.append(" charge_rank,charge_type, coalesce (city,'') AS city, coalesce (company,'') AS company,  coalesce (contact,'') AS contact,");
	        sql.append(" cube_uom, currency, date_closing, coalesce (descr,'') AS descr, duty, edit_date, edit_who, coalesce (email,'') AS email,mail_send,");
	        sql.append(" excess_allowable, excess_rate, coalesce (fax,'') AS fax, invcharge_rank, is_area, is_outbound_invcharge, loc_generate, ");
	        sql.append(" lot_key, coalesce (mobile,'') AS mobile, must_asn, must_asn_so, must_so, coalesce (nation,'') AS nation, ");
	        sql.append(" coalesce (notes,'') AS notes, coalesce (pack_key,'') AS pack_key, coalesce (position,'') AS position,");
	        sql.append(" pre_allocation_strategy_key,prefix, coalesce (province,'') AS province, put_allocate, putaway_strategy_key, ");
	        sql.append(" replenishment_strategy_key,rotation_strategy_key,route, so_copy, so_label, so_uom, storer_key, coalesce (tel,'') AS tel,");
	        sql.append(" coalesce (type,'') AS type, coalesce (user_define1,'') AS user_define1,coalesce (user_define2,'') AS user_define2,");
	        sql.append(" coalesce (user_define3,'') AS user_define3,coalesce (user_define4,'') AS user_define4,");
	        sql.append(" coalesce (user_define5,'') AS user_define5, warehouse_area,wgt_uom");
			sql.append(" FROM STORER ");
			sql.append(" WHERE 1 = 1 ");
			sql.append(" AND storer_key = '"+storerKey+"'");
			map = dbHelper.select(sql.toString(), new MapHandler());
		}catch(Exception e){
			e.printStackTrace();
			dbHelper.close();
        }finally{
			dbHelper.freeConnection();
        }
		return map;
	}
	
	//货主信息的插入操作;
	public static Boolean doInsertStorerInfo(Map<String, Object> list,UserInfo user,String flag){
		DBHelper dbHelper = DBHelper.getInstance(false);
		boolean bool =false;
		Timestamp dateTime = UtilDateTime.nowTimestamp();
		try{
			EntityModel model = new EntityModel("storer");
			if(flag.equals("billTo")){
				model.setField("storerKey",list.get("billToKey"));
				model.setField("company",list.get("billToCompany"));
				model.setField("address1",list.get("billToAddress"));
				model.setField("contact",list.get("billToContact"));
				model.setField("tel",list.get("billToTel"));
				model.setField("mobile",list.get("billToMobile"));
				model.setField("email",list.get("billToEmail"));
				model.setField("userDefine1",list.get("billToKey"));
				model.setField("userDefine2",list.get("billToID"));
			}else{
				model.setField("storerKey",list.get("consigneeKey"));
				model.setField("company",list.get("consigneeCompany"));
				model.setField("address1",list.get("consigneeAddress"));
				model.setField("contact",list.get("consigneeContact"));
				model.setField("tel",list.get("consigneeTel"));
				model.setField("mobile",list.get("consigneeMobile"));
				model.setField("email",list.get("consigneeEmail"));
				model.setField("userDefine1",list.get("consigneeKey"));
				model.setField("userDefine2",list.get("consigneeID"));
			}
			model.setField("type","4");
			model.setField("addDate",dateTime);
			model.setField("addWho",user.getRealname());
			model.setField("editDate",dateTime);
			model.setField("editWho",user.getRealname());
			
			SQLValues<Object> sqlValues = dbHelper
					.buildSQLValues(CommandTypes.INSERT, model);
			bool = dbHelper.insert(sqlValues.getSql(),
					sqlValues.getParams());
		}catch(Exception e){
			e.printStackTrace();
			dbHelper.close();
        }finally{
			dbHelper.freeConnection();
        }
		return bool;
	}
}
