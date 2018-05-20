package com.redm.actions;

import java.io.PrintWriter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.jelly.help.commons.base.BaseAction;
import com.jelly.help.commons.dbutils.DBManager;
import com.jelly.help.commons.dbutils.generate.GenerateValue;
import com.jelly.help.commons.util.ParamsUtils;
import com.jelly.help.commons.util.UtilValidate;
import com.redm.actions.system.Password;
import com.redm.actions.utility.Constants;
import com.redm.entity.UserInfo;
import com.redm.service.UserInfoManager;
import com.redm.service.support.DeleteFiles;
import com.redm.service.system.InitialData;
import com.redm.service.system.RegConfirm;
import com.redm.service.system.ViewCreate;
//@Results({@Result(name=Constants.APP, location=Constants.WEB_CONTENT + "register.jsp")})
/**
 * 检测本软件是否已经注册
 * @return 注册与否的result对应的页面
 */
@Results({@Result(name=Constants.LOGIN, location=Constants.WEB_CONTENT + "admin-login.jsp"),//跳转到登录页面
	@Result(name=Constants.QUERRY, location=Constants.WEB_CONTENT + "initialData.jsp")})
public class LoginAction extends BaseAction{
	private static final long serialVersionUID = 1442342342355L;
	private final Logger logger = LogManager.getLogger(LoginAction.class);
	private UserInfo user;
	private String type;
	private String regCode;
	private String systemCode;
	
	@Autowired
	private DataSource dataSource;
	@Autowired
	private DataSource dataSourceB;
	
	public UserInfo getUser() {
		return user;
	}
	public void setUser(UserInfo user) {
		this.user = user;
	}
	//点击登录按钮时调用的方法
	@Override
	public String execute(){
		return login();
	}
	/**
	 * 处理用户登陆请求
	 * @return 成功、失败的result对应的页面
	 */
	@Action(value=Constants.LOGIN,results={
			@Result(name=Constants.LOGIN, location=Constants.WEB_CONTENT + "admin-login.jsp"),//登录失败，停留在本页面
			@Result(name=Constants.SUCCESS, location="admin/admin-main.action", type="redirect")})//登录成功，跳转到主页
	public String login(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		//默认设置的是bSessionFactory，就把dataSourceB放在前面
		DBManager.activateProxool(dataSource);
		DBManager.activateProxool(dataSourceB);
		logger.info("login method start work...");
		final String userName = user.getUsername();
		String password0 = user.getPassword();
		String password = Password.getPassMD5(password0);    //MD5加密后登陆
//		String password = user.getPassword();  //明文密码登陆
		
		String remberPwd = request.getParameter("_checkbox_remberPwd");
		if(StringUtils.isEmpty(userName)){
			if(!this.hasErrors())
				this.addActionError(this.getText("login.username.empty"));
		}
		if(StringUtils.isEmpty(password)){
			if(!this.hasErrors())
				this.addActionError(this.getText("login.password.empty"));
		}
		if (UtilValidate.isNotEmpty(remberPwd)&&remberPwd.trim().equals("true")) {
			Cookie userNameCookie = new Cookie("userName", userName);
			userNameCookie.setMaxAge(1000*60*60*24*365);
			Cookie pwdCookie = new Cookie("pwd", password0);
			pwdCookie.setMaxAge(1000*60*60*24*365);
			Cookie remberPwdCookie = new Cookie("remberPwd", remberPwd);
			remberPwdCookie.setMaxAge(1000*60*60*24*365);
			response.addCookie(userNameCookie);
			response.addCookie(pwdCookie);
			response.addCookie(remberPwdCookie);
		}
		 
		 
		// get client ip address
		String ip = ParamsUtils.getIpAddr(request);
		// validate user name or password is valid
		UserInfoManager userManaer = new UserInfoManager();
		UserInfo userInfo = null;
		String uuid = GenerateValue.getRandomUUId();
		if (StringUtils.isNotEmpty(userName) && StringUtils.isNotEmpty(password)) {
			String previousId = LOGINIDS.get(userName);
			userInfo = userManaer.login(userName, password, ip, uuid, previousId);
			if(UtilValidate.isNotEmpty(previousId)){
				if(LOGOUTED.equals(previousId)){
					//重复登陆注销，移除过期的缓存信息
					SESSIONS.remove(ONLINE.get(userName));
					ONLINE.remove(userName);
					LOGINIDS.remove(userName);
				}
			}
		}
		
		if(userInfo == null){
			logger.error("login failure! username or password error.");
			if(!this.hasErrors())
				this.addActionError(this.getText("login.userinfo.error"));
		}
		if(userInfo != null){
			String enable = userInfo.getEnable();
			if(!"Y".equals(enable)){
				if(!this.hasErrors())
					this.addActionError(this.getText("login.enable.error"));
			}
		}
		if (this.hasErrors()) {
			logger.error("login failure! username :" + userName);
			return LOGIN;
        } 
		HttpSession session = request.getSession();
		session.setAttribute(Constants.USER_LOGIN,userInfo);
		logger.info("login method work end ! session keys:" + session.getId());
		
		SESSIONS.put(session.getId(), System.currentTimeMillis());
		ONLINE.put(userName, session.getId());
		LOGINIDS.put(userName, uuid);
		//在登陆的时候触发定时器运行
		DeleteFiles.getInstance();  //因需要删除的路径，还不能移到启动时设置，需要再找解决方法，暂时放在这里 qxue
		
		//boolean bool=RegConfirm.doCheckAndSendRegInfo();
		boolean bool=true;
		if(bool)
		{
			return Constants.SUCCESS;
		}
		else
		{
			return Constants.LOGIN;
		}
		
	}
	
	
	@Action(value="manager",results={
			@Result(name=Constants.SUCCESS, location=Constants.WEB_CONTENT + "admin-login.jsp")})
	public String manager(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		if(session != null){
			if(SESSIONS.containsKey(session.getId())){
				UserInfo userLogin = (UserInfo) session.getAttribute(Constants.USER_LOGIN);
//				session.invalidate();   //sqlserver 下出错，暂时禁用  qxue
				session.removeAttribute(Constants.USER_LOGIN);
				//这里的userLogin为空，因此下面这句话执行时是回报错的，注释掉
				//logger.info("session timeout : " + userLogin.getUsername());
			}
		}
		return Constants.SUCCESS;
	}
	/**
	 * 登陆成功跳转到欢迎页面
	 * @return
	 */
	@Action("login-home")
	public String welcome(){
		logger.info("login success redirect home page ! ");
		return Constants.APP;
	}
	@Action(value="actionError",
			results={@Result(name="success",location=Constants.WEB_CONTENT + "action-error.jsp")})
	public String actionError(){
		return Constants.SUCCESS;
	}
	
	/**
	 * 主页面请求跳转
	 * 直接跳转到登陆页面 qxue
	 * @return
	 */
	public String index(){
		logger.info("go to index page ! ");
		return Constants.LOGIN;//直接 跳转到登录页面
	}
	/**
	 * 注销用户
	 * @return
	 */
	@Action("logout")
	public String logout(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		if(session != null){
			if(SESSIONS.containsKey(session.getId())){
				UserInfo userLogin = (UserInfo) session.getAttribute(Constants.USER_LOGIN);
//				session.invalidate();   //sqlserver 下出错，暂时禁用 qxue 
				session.removeAttribute(Constants.USER_LOGIN);
				logger.info("user logout : " + userLogin.getUsername() + " is destroy!");
			}
		}
		return Constants.LOGIN;    //系统推出以后跳转到登录页面
	}
	/**
	 * 检查Session会话是否可用
	 * @return
	 */
	@Action(value="onlineCheck",results={@Result(name=Constants.SUCCESS,type=Constants.JSON_TYPE)})
	public String onlineCheck(){
		logger.info("check online .");
		boolean bool = false;
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		if(session != null && SESSIONS.containsKey(session.getId())){
			UserInfo userLogin = (UserInfo) session.getAttribute(Constants.USER_LOGIN);
			if(userLogin != null){
				String sessionId = ONLINE.get(userLogin.getUsername());
				if(UtilValidate.isNotEmpty(sessionId)){
					if(sessionId.equals(session.getId())){
						long startTime = SESSIONS.get(session.getId());
						if(System.currentTimeMillis() - startTime < INVALID_TIME){
							bool = true;
						}
					}
				}
			}
		}
		setSuccess(bool);
		if(!bool) //session.invalidate();  // 有异常，暂时注释掉 qxue
			session.removeAttribute(Constants.USER_LOGIN);
		logger.info("Online users size of " + ONLINE.size() + " : " + ONLINE + " --> " + SESSIONS);
		return Constants.SUCCESS;
	}
	
	/**
	 * 处理用户注册请求
	 * @return 成功、失败的result对应的页面
	 */
	@Action(value="register")
	public String register(){
		boolean b=RegConfirm.doUpdateRegInfo(systemCode, regCode);
		HttpServletResponse response=ServletActionContext.getResponse();
		HttpServletRequest request = ServletActionContext.getRequest();
		try {
			PrintWriter out =response.getWriter();
			String url=request.getContextPath();
			if(b){
				out.println("<script>alert('注册成功!');</script>");
				out.println("<script>window.location.href='"+url+"/admin/initialData.jsp'</script>");
			}else{
				out.println("<script>alert('注册失败!');</script>");
				out.println("<script>window.location.href='"+url+"/admin/initialData.jsp'</script>");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return NONE;
	}
	
	@Action(value="querry")
	public String querry(){
		systemCode=RegConfirm.getLocalSysCode(1);  //WMS功能
		return Constants.QUERRY;
	}
	
	//初始化数据
	@Action(value="initialData")
	public String initialData(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response=ServletActionContext.getResponse();
		String[] box=request.getParameterValues("box");
		//初始化选中的数据
		boolean isSuccess=InitialData.doInitialData(box);
		try {
			PrintWriter out =response.getWriter();
			String url=request.getContextPath();
			if(isSuccess){
				out.println("<script>alert('执行成功!');</script>");
				out.println("<script>window.location.href='"+url+"/admin/initialData.jsp'</script>");
			}else{
				out.println("<script>alert('执行失败!');</script>");
				out.println("<script>window.location.href='"+url+"/admin/initialData.jsp'</script>");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return NONE;
	}
	
	//初始化视图
	@Action(value="initialView")
	public String initialView(){
		//创建视图
		boolean isSuccess=InitialData.doCreateAllView();
		HttpServletResponse response=ServletActionContext.getResponse();
		HttpServletRequest request = ServletActionContext.getRequest();
		try {
			PrintWriter out =response.getWriter();
			String url=request.getContextPath();
			if(isSuccess){
				out.println("<script>alert('视图创建成功!');</script>");
				out.println("<script>window.location.href='"+url+"/admin/initialData.jsp'</script>");
			}else{
				out.println("<script>alert('视图创建失败!');</script>");
				out.println("<script>window.location.href='"+url+"/admin/initialData.jsp'</script>");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return NONE;
	}
	
	/**
	 * Ajax请求时用到的JSON数据
	 */
	@Override
	public JSONObject getJson() {
		return super.json;
	}
	@Override
	public boolean getSuccess() {
		return super.success;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getRegCode() {
		return regCode;
	}
	public void setRegCode(String regCode) {
		this.regCode = regCode;
	}
	public String getSystemCode() {
		return systemCode;
	}
	public void setSystemCode(String systemCode) {
		this.systemCode = systemCode;
	}
	
}
