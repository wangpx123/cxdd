package com.redm.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

import javolution.util.FastList;

import net.sf.json.JSONObject;

import org.apache.commons.mail.EmailException;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import com.jelly.help.commons.dbutils.DBHelper;
import com.jelly.help.commons.dbutils.handlers.MapHandler;
import com.jelly.help.commons.email.EmailHelper;
import com.jelly.help.commons.listener.SimpleParser.InfoKey;
import com.jelly.help.commons.message.MessageHelper;
import com.jelly.help.commons.util.UtilDateTime;
import com.jelly.help.commons.util.UtilValidate;

public class SendEmailService {
	private static final Logger logger = LogManager.getLogger(SendEmailService.class);
	private static String emailTpl = null;
	private static String readEmailTpl() throws IOException{
		if(UtilValidate.isEmpty(emailTpl)){
			StringBuffer sb = new StringBuffer();
			InputStreamReader inputStreamReader = null;
			BufferedReader bufferReader = null;
			try {
				String path = SendEmailService.class.getResource("").getPath();
				File file = new File(path + "Email.tpl");
				inputStreamReader = new InputStreamReader(new FileInputStream(file),"UTF-8"); 
				bufferReader = new BufferedReader(inputStreamReader);
				while (bufferReader.ready()) {
					String data = bufferReader.readLine();
					sb.append(data);
				}
			}finally{
				if(bufferReader != null)
					bufferReader.close();
				if(inputStreamReader != null)
					inputStreamReader.close();
			}
			emailTpl = sb.toString();
		}
		return emailTpl;
	}

	public static synchronized void send(final JSONObject json,final String id) 
							throws IOException, EmailException{
		new Thread(new Runnable() {
			@Override
			public void run() {
				String content;
				try {
					//读取邮件模板，把检测数据填充完整，然后发送短消息。
					content = readEmailTpl();
					String st = json.get(InfoKey.ST) == null ? "" : json.get(InfoKey.ST).toString();
					String cardId = json.get(InfoKey.CARD_ID) == null ? "" : json.get(InfoKey.CARD_ID).toString();
					content = content.replace("{name}", json.get(InfoKey.NAME).toString())
						.replace("{sex}", json.get(InfoKey.SEX).toString())
						.replace("{age}", json.get(InfoKey.AGE).toString())
						.replace("{cardId}", cardId)
						.replace("{checktime}", json.get(InfoKey.CHECKTIME).toString())
						.replace("{insurance}", json.get(InfoKey.INSURANCE).toString())
						.replace("{moblie}", json.get(InfoKey.MOBILE).toString())
						.replace("{hr}", json.get(InfoKey.HR).toString())
						.replace("{resp}", json.get(InfoKey.RESP).toString())
						.replace("{st}", st)
						.replace("{bloodPressure}", json.get(InfoKey.BLOOD_PRESSURE).toString())
						.replace("{bloodPressure1}", json.get(InfoKey.BLOOD_PRESSURE1).toString())
						.replace("{bloodPressure2}", json.get(InfoKey.BLOOD_PRESSURE2).toString())
						.replace("{bloodPressure3}", json.get(InfoKey.BLOOD_PRESSURE3).toString())
						.replace("{spo2}", json.get(InfoKey.SPO2).toString())
						.replace("{pr}", json.get(InfoKey.PR).toString())
						.replace("{temp}", json.get(InfoKey.TEMP).toString())
						.replace("{fetalHr}", json.get(InfoKey.FETAL_HR).toString())
						.replace("{lung}", json.get(InfoKey.LUNG).toString())
						.replace("{forcedLung}", json.get(InfoKey.FORCED_LUNG).toString())
						.replace("{id}", id);
					
					if(cardId != null){
						DBHelper dbHelper = DBHelper.getInstance();
						try {
							StringBuffer sql = new StringBuffer();
							sql.append(" SELECT m.MOBILE1,m.EMAIL2,m.EMAIL3,m.EMAIL1,m.EMAIL2,m.EMAIL3,m.REALNAME");
							sql.append(" FROM MEMBER_INFO m");
							sql.append(" WHERE 1 = 1");
							sql.append(" AND m.CARD_ID = ?");
							Map<String, Object> member = dbHelper.select(sql, new MapHandler(),cardId);
							StringBuffer msg = new StringBuffer();
							msg.append(json.get(InfoKey.NAME).toString());
							
							//格式化检测日期为：MM-dd HH:mm
							if(UtilValidate.isNotEmpty(json.get(InfoKey.CHECKTIME).toString())){
								msg.append("(");
								msg.append(UtilDateTime.toDateString(
										UtilDateTime.toDate(
												json.get(InfoKey.CHECKTIME).toString(),
												UtilDateTime.FORMAT_DATE_TIME,
												true), "MM-dd HH:mm"));
								msg.append(")");
							}else{
								msg.append(":");
							}
							if(UtilValidate.isNotEmpty(json.get(InfoKey.HR))){
								msg.append("心率");
								msg.append(json.get(InfoKey.HR).toString());
							}
							if(UtilValidate.isNotEmpty(json.get(InfoKey.RESP))){
								msg.append(",呼吸");
								msg.append(json.get(InfoKey.RESP).toString());
							}
							if(UtilValidate.isNotEmpty(json.get(InfoKey.BLOOD_PRESSURE))){
								msg.append(",血压平均");
								msg.append(json.get(InfoKey.BLOOD_PRESSURE).toString());
							}
							if(UtilValidate.isNotEmpty(json.get(InfoKey.SPO2))){
								msg.append(",血氧");
								msg.append(json.get(InfoKey.SPO2).toString());
							}
							if(UtilValidate.isNotEmpty(json.get(InfoKey.PR))){
								msg.append(",脉搏");
								msg.append(json.get(InfoKey.PR).toString());
							}
							if(UtilValidate.isNotEmpty(json.get(InfoKey.TEMP))){
								msg.append(",体温");
								msg.append(json.get(InfoKey.TEMP).toString());
							}
							if(UtilValidate.isNotEmpty(json.get(InfoKey.FETAL_HR))){
								msg.append(",胎心");
								msg.append(json.get(InfoKey.FETAL_HR).toString());
							}
							if(UtilValidate.isNotEmpty(json.get(InfoKey.LUNG))){
								msg.append(",肺活量");
								msg.append(json.get(InfoKey.LUNG).toString());
							}
							if(UtilValidate.isNotEmpty(st)){
								msg.append(",电位");
								msg.append(st);
							}
							//
							List<String> mobiles = FastList.newInstance();
							List<String> emails = FastList.newInstance();
							if(UtilValidate.isNotEmpty(json.get(InfoKey.MOBILE))){
								mobiles.add(json.get(InfoKey.MOBILE).toString());
							}
							String mobile = null;
							mobile = json.get(InfoKey.MOBILE).toString();
							if(UtilValidate.isNotEmpty(mobile)){
								MessageHelper.send(mobile, msg.toString());
							}
							if(member != null){
								//如果是会员，获取会员信息表中登记的手机号码
								String mobile1 = (String) member.get("mobile1");
								String mobile2 = (String) member.get("mobile2");
								String mobile3 = (String) member.get("mobile3");
								
								if(UtilValidate.isNotEmpty(mobile1)){
									if(!mobiles.contains(mobile1)){
										mobiles.add(mobile1);
									}
								}
								if(UtilValidate.isNotEmpty(mobile2)){
									if(!mobiles.contains(mobile2)){
										mobiles.add(mobile2);
									}
								}
								if(UtilValidate.isNotEmpty(mobile3)){
									if(!mobiles.contains(mobile3)){
										mobiles.add(mobile3);
									}
								}
								
								//发送短消息
								try {
									for (String mob : mobiles) {
										MessageHelper.send(mob, msg.toString());
									}
								} catch (Exception e) {
									logger.error("Send mobile message except exception for : " + e.getMessage());
								}
								
								String email1 = (String) member.get("email1");
								String email2 = (String) member.get("email2");
								String email3 = (String) member.get("email3");
								String name = (String) member.get("realname");
								String title = "万诊宝数据采集报告";
								
								if(UtilValidate.isNotEmpty(email1)){
									emails.add(email1);
								}
								if(UtilValidate.isNotEmpty(email2)){
									emails.add(email2);
								}
								if(UtilValidate.isNotEmpty(email3)){
									emails.add(email3);
								}
								//发送邮件
								try {
									for (String email : emails) {
										EmailHelper.send(email, name, title, content);
									}
								} catch (Exception e) {
									logger.error("Send email except exception for : " + e.getMessage());
								}
							}
							dbHelper.close();
						} catch (Exception e) {
							logger.error("Send email or mobile message except exception for : " + e.getMessage());
							e.printStackTrace();
						}finally{
							dbHelper.freeConnection();
						}
					}
				} catch (Exception e) {
					logger.error("Read Data except exception for : " + e.getMessage());
					e.printStackTrace();
				}
			}
		}).start();
	}
	public static void main(String[] args) throws IOException {
		System.out.println(readEmailTpl());
	}
}
