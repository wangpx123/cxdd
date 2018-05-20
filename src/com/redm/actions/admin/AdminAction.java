package com.redm.actions.admin;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;

import net.sf.json.JSONObject;

import com.jelly.help.commons.base.BaseAction;
import com.redm.actions.utility.Constants;

public class AdminAction extends BaseAction{
	private static final long serialVersionUID = -1255591033812167975L;
	private final Logger logger = LogManager.getLogger(AdminAction.class);
	@Action(value="admin-main",
			results={@Result(name=Constants.SUCCESS, 
					location="/admin/main.jsp")})		
	public String doAdminPage(){
		/**
		 * @Action(value="admin-main",
			results={@Result(name=Constants.SUCCESS, 
					location="admin-member.action", type="redirect")})	
		 */
		
		
		logger.info("doAdminPage");
		return Constants.SUCCESS;
	}

	@Override
	public JSONObject getJson() {
		return super.json;
	}

	@Override
	public boolean getSuccess() {
		return super.success;
	}

}
