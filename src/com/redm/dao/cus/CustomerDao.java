package com.redm.dao.cus;

import org.springframework.stereotype.Repository;

import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.cus.Customer;

@Repository
public class CustomerDao extends HibernateDao<Customer>{
	
	public void saveCustomer(Customer customer){
		super.save(customer);
	}
	public void updateCustomer(Customer customer){
		super.update(customer);
	}	

}
