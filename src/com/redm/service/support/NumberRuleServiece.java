package com.redm.service.support;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redm.actions.utility.Constants;
import com.redm.dao.support.NumberRuleDao;
import com.redm.entity.NumberRules;
import com.ibm.icu.text.DecimalFormat;
import com.ibm.icu.text.SimpleDateFormat;
import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.util.UtilValidate;

import java.util.Date;

@Service
public class NumberRuleServiece {
	@Autowired
	private NumberRuleDao numberRuleDao;
	
	@Transactional
	public void saveNumberRules(NumberRules numberRules){
		numberRuleDao.saveNumberRules(numberRules);
	}
	
	@Transactional
	public void updateNumberRules(NumberRules numberRules){
		numberRuleDao.updateNumberRules(numberRules);
	}

	//数字格式化日期时间
	public static final SimpleDateFormat formateDate = new SimpleDateFormat("yyyyMMdd");
	//数字格式化四位流水号对象
	public static final DecimalFormat formatFourNum = new DecimalFormat("0000");
	//数字格式化六位流水号
	public static final DecimalFormat formatSixNum = new DecimalFormat("000000");
	//数字格式化八位流水号
	public static final DecimalFormat formatEightNum = new DecimalFormat("00000000");
	//数字格式化十位流水号
	public static final DecimalFormat formatTenNum = new DecimalFormat("0000000000");
	//数字格式化十二位流水号
	public static final DecimalFormat formatSelNum = new DecimalFormat("000000000000");
	
	//产生一个号码
	public static String doCreatNumber(Map<String, Object> datas) {
		DBHelper dbHelper = DBHelper.getInstance(false,false);
		String name=(String) datas.get("name");
		String typeserail=(String) datas.get("typeserail");
		int typeserialLen=(Integer) datas.get("typeserialLen");
		String year=(String) datas.get("year");
		int yearLen=(Integer) datas.get("yearLen");
		String month=(String) datas.get("month");
		int monthLen=(Integer) datas.get("monthLen");
		String day=(String) datas.get("day");
		int dayLen=(Integer) datas.get("dayLen");
		String num=(String) datas.get("num");
		int numberLen=(Integer) datas.get("numberLen");
		
		String currentTime = formateDate.format(new Date());//格式化当前日期 如20140412
		String currentYear=currentTime.substring(2,4);
		String currentLyear=currentTime.substring(0,4);
		String currentMonth=currentTime.substring(4,6);
		String currentDay=currentTime.substring(6,8);
		
		int number=Integer.parseInt(num);//转换为数字形式
		StringBuffer serialNumber=new StringBuffer();
		if(UtilValidate.isNotEmpty(typeserialLen) || typeserialLen!=0){
			//先把序号拼接在前
			serialNumber.append(typeserail);
		}
		//判断是否是同一年
		StringBuffer sqlUpdate = new StringBuffer();
		sqlUpdate.append(" UPDATE NUMBER_RULES SET NAME='"+name+"',");
		
		if(yearLen==0){
			
		}else if(yearLen==2){
			serialNumber.append(currentYear);
			if(!(currentYear.equals(year))){
				number=0;
				sqlUpdate.append(" YEAR = '"+currentYear+"',");
			}
		}else if(yearLen==4){
			serialNumber.append(currentLyear);
			if(!(currentLyear.equals(year))){
				number=0;
				sqlUpdate.append(" YEAR = '"+currentLyear+"',");
			}
		}
		//判断是否是同一月
		if(monthLen==0){
			
		}else if(monthLen==2){
			serialNumber.append(currentMonth);
			if(!(currentMonth.equals(month))){
				number=0;
				sqlUpdate.append(" MONTH = '"+currentMonth+"',");
			}
		}
		//判断是否是同一日
		if(dayLen==0){
			
		}else if(dayLen==2){
			serialNumber.append(currentDay);
			if(!(currentDay.equals(day))){
				number=0;
				sqlUpdate.append(" DAY = '"+currentDay+"',");
			}
		}
		
		String numberStr="";
		if(numberLen==4){
			if(num.equals("9999")){
				number=0;
			}
			number++;
			numberStr=formatFourNum.format(number);
		}else if(numberLen==6){
			if(num.equals("999999")){
				number=0;
			}
			number++;
			numberStr=formatSixNum.format(number);
		}else if(numberLen==8){
			if(num.equals("99999999")){
				number=0;
			}
			number++;
			numberStr=formatEightNum.format(number);
		}else if(numberLen==10){
			if(num.equals("9999999999")){
				number=0;
			}
			number++;
			numberStr=formatTenNum.format(number);
		}else if(numberLen==12){
			if(num.equals("999999999999")){
				number=0;
			}
			number++;
			numberStr=formatSelNum.format(number);
		}
		sqlUpdate.append(" NUM = '"+numberStr+"'");
		sqlUpdate.append(" WHERE NAME = ?  AND TYPESERAIL = ?");
		try {
			boolean bool = dbHelper.update(sqlUpdate.toString(),name,typeserail);
			if(bool){
                //调用查询方法再次查询一遍		
				dbHelper.commitAndClose();
				//把流水号拼接到最后
				serialNumber.append(numberStr);
			}else{
				dbHelper.rollbackAndClose(); 
				serialNumber.setLength(0);
				throw new Exception();
			}
		} catch (Exception e) {
			dbHelper.rollbackAndClose();     
			e.printStackTrace();
		}finally{
            dbHelper.freeConnection();
        }
		
		return serialNumber.toString();
	}
	
	//产生一个号码
	public static String doCreateNumber2(String name,String typeserail) {
		String modifyNum ="";
		DBHelper dbHelper = DBHelper.getInstance(false,false);

		try {
			StringBuffer sql = new StringBuffer();
			sql.append(" SELECT "+Constants.ROWNUMBER+" OVER(ORDER BY ID DESC) AS ROWNUM,");
			sql.append(" ID, ADD_DATE, ADD_WHO, DAY, DAY_LEN, EDIT_DATE, EDIT_WHO, MONTH, MONTH_LEN, NAME,");
			sql.append(" NUM, NUMBER_LEN, TYPESERAIL, TYPESERIAL_LEN, YEAR, YEAR_LEN ");
			sql.append(" FROM NUMBER_RULES ");
			sql.append(" WHERE 1 = 1 ");
			if(UtilValidate.isNotEmpty(name)){
				sql.append(" AND NAME  = '"+name+"' ");
			}
			if(UtilValidate.isNotEmpty(typeserail)){
				sql.append(" AND TYPESERAIL  = '"+typeserail+"' ");
			}

			//name 不会有重复，只有一条记录
			Map<String, Object> datas = dbHelper.select(sql.toString(), new MapHandler());

			if(UtilValidate.isEmpty(datas))
			{
				System.out.println("Number_Rules表出错，无此记录");
			}
			else
			{
				String num = (String) datas.get("num");

				if(num != null){
					
					//查询出的值设定规则
					modifyNum = NumberRuleServiece.doCreatNumber(datas);
					if(modifyNum.equals("")){
						System.out.println("查询modifyNum的值出错！");
					}
				} 
			}
		} catch (Exception e) {
			dbHelper.close();
			e.printStackTrace();
		}finally{
			dbHelper.freeConnection();   
		}

		return modifyNum;
	}
	
	
	/*public static void main(String[] args) {
		Map<String, Object> datas=new HashMap<String, Object>();
		datas.put("name","LOT" );
		datas.put("typeserail","0" );
		datas.put("year", "2014");
		datas.put("yearLen",4 );
		datas.put("month", "04");
		datas.put("monthLen",2);
		datas.put("day", "10");
		datas.put("dayLen", 2);
		datas.put("num", "048911");
		datas.put("numberLen",6 );
		String s=doCreatNumber(datas);
		System.out.println(s+"=====");
	}*/
}
