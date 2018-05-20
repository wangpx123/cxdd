package com.redm.dao.cus;

import org.springframework.stereotype.Repository;

import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.cus.ContactRecord;

@Repository
public class ContactRecordDao extends HibernateDao<ContactRecord>{
	
	public void saveContactRecord(ContactRecord contactRecord){
		super.save(contactRecord);
	}
	public void updateContactRecord(ContactRecord contactRecord){
		super.update(contactRecord);
	}	

}
