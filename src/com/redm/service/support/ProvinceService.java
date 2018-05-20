package com.redm.service.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redm.dao.support.ProvinceDao;
import com.redm.entity.Province;

@Service
public class ProvinceService {

	@Autowired
	private ProvinceDao provinceDao;
	
	@Transactional
	public void saveProvince(Province province){
		provinceDao.saveProvince(province);
	}
	@Transactional
	public void updateProvince(Province province){
		provinceDao.updateProvince(province);
	}	
	
}
