package com.redm.service.support;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;


import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.dbutils.handlers.MapListHandler;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.utility.Constants;
import com.redm.dao.support.SkuDao;
import com.redm.entity.Sku;
@Service
public class SkuService {
	@Autowired
	private SkuDao skuDao; 
	
	@Transactional
	public void saveSku(Sku sku){
		skuDao.saveSku(sku);
	}
	@Transactional
	public void updateSku(Sku sku){
		skuDao.updateSku(sku);
	}	
	
	
	//后台方法调用的校验方法，校验sku表中，货主，商品是否存在，true，存在，false，不存在
	@Transactional
	public static boolean doValidateStorerSku(String storerKey,String sku)
    {
        boolean retVal=false;
        
		DBHelper dbHelper = DBHelper.getInstance();
		
		try
		{
        
	        StringBuffer sqlReceipt = new StringBuffer();
			sqlReceipt.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID DESC) AS ROWNUM,");
			sqlReceipt.append(" ID,STORER_KEY,SKU  ");
			sqlReceipt.append(" FROM SKU ");
			sqlReceipt.append(" WHERE 1 = 1 ");
			if(UtilValidate.isNotEmpty(storerKey)){
				sqlReceipt.append(" AND STORER_KEY = '"+storerKey+"' ");
			}
			if(UtilValidate.isNotEmpty(sku)){
				sqlReceipt.append(" AND SKU = '"+sku+"' ");
			}
	
			List<Map<String, Object>> dataReceipt = dbHelper.select(sqlReceipt.toString(), new MapListHandler());
								
			if(UtilValidate.isEmpty(dataReceipt)){
                //没有查到记录，返回为false
                retVal=false;
	        }
	        else
	        { 
                //sku表输入时做了校验，保证只有一条，不会重复
                retVal=true;
	        }
	        
		}
        catch(Exception e)
        {
			e.printStackTrace();
			dbHelper.close();
        }
        finally
        {
			dbHelper.freeConnection();
        }
		
		return retVal;
	
	}    

	//根据sku查询整条记录的数据
	public static  Map<String, Object> getNameBySku(String sku,String storerKey){
		DBHelper dbHelper=DBHelper.getInstance();
		Map<String, Object> data = new HashMap<String, Object>();
		StringBuffer sql=new StringBuffer();
		sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID DESC) AS ROWNUM,");
		sql.append(" id,abc,allocation_strategy_key,alt_sku,carry_cost,carton_group,conveyable,cost, ");
		sql.append(" cycle_class,date_codedays,descr,flow_thru_item,freight_class,gross_weight,hazmat_code, ");
		sql.append(" height,hscode,last_cyclecount,leng,lot_key,manufacturer_sku,max_point,name,net_weight, ");
		sql.append(" notes1,notes2,onreceipt_copypack_key,order_cost,pack_key,pre_allocation_strategy_key, ");
		sql.append(" price,put_code,putaway_loc,putaway_strategy_key,putaway_zone,quality_strategy_key, ");
		sql.append(" receipt_holdcode,reorder_point,reorder_qty,replenishment_strategy_key,retail_sku, ");
		sql.append(" rf_pack,rf_uom,rotateby,rotation,rotation_strategy_key,shelflife,shelflife_codetype, ");
		sql.append(" shelflife_indicator,shelflife_onreceiving,shelflife_onshipping,shippable_container, ");
		sql.append(" sku,sku_group1,sku_group2,sku_type,status,storer_key,tare_weight,tariff_key,transportation_mode, ");
		sql.append(" user_define1,user_define10,user_define11,user_define12,user_define13,user_define14,user_define15, ");
		sql.append(" user_define2,user_define3,user_define4,user_define5,user_define6,user_define7,user_define8, ");
		sql.append(" user_define9,vendor1,vendor2,width ");
		sql.append(" FROM SKU ");
		sql.append(" WHERE 1 = 1 ");
		if(UtilValidate.isNotEmpty(sku)){
			sql.append(" AND sku = '"+sku+"'");
		}
		if(UtilValidate.isNotEmpty(storerKey)){
			sql.append(" AND STORER_KEY = '"+storerKey+"'");
		}
		
		try {
			data = dbHelper.select(sql.toString(), new MapHandler());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return data;
	}
}
