package com.redm.service.cus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redm.dao.cus.ContactRecordDao;
import com.redm.entity.cus.ContactRecord;

@Service
public class ContactRecordService {
	@Autowired
	private ContactRecordDao contactRecordDao;

	@Transactional
	public void saveContactRecord(ContactRecord contactRecord) {
		contactRecordDao.saveContactRecord(contactRecord);
	}

	@Transactional
	public void updateContactRecord(ContactRecord contactRecord) {
		contactRecordDao.updateContactRecord(contactRecord);
	}
}
