package com.redm.dao.system;

import org.springframework.stereotype.Repository;
import com.jelly.help.commons.base.HibernateDao;
import com.redm.entity.CodeDetail;

@Repository
public class CodeDetailDao extends HibernateDao<CodeDetail>{
	
	public void saveCodeDetail(CodeDetail codeDetail){
		super.save(codeDetail);
	}
	public void updateCodeDetail(CodeDetail codeDetail){
		super.update(codeDetail);
	}	

}
