package com.redm.dao.support;

import org.springframework.stereotype.Repository;

import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.NumberRules;

@Repository
public class NumberRuleDao extends HibernateDao<NumberRules> {

	public void saveNumberRules(NumberRules numberRules){
		super.save(numberRules);
	}
	public void updateNumberRules(NumberRules numberRules){
		super.update(numberRules);
	}
}
