package com.redm.service.cus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redm.dao.cus.CustomerDao;
import com.redm.entity.cus.Customer;

@Service
public class CustomerService {
	@Autowired
	private CustomerDao customerDao;

	@Transactional
	public void saveCustomer(Customer customer) {
		customerDao.saveCustomer(customer);
	}

	@Transactional
	public void updateCustomer(Customer customer) {
		customerDao.updateCustomer(customer);
	}
}
