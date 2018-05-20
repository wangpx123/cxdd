package com.redm.service.system;

import javax.servlet.http.HttpServlet;

import com.redm.service.support.DeleteFiles;

public class redmStart  extends HttpServlet{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5677442538832287612L;

	public void init(){

		//正版，恢复状态
        //TimerScan.resetPirateStatus();

        //启动定时器清理打印文件
        //删除文件需要获取路径，放在这里获取路径有问题，暂时先在登陆的地方调用
		//DeleteFiles.getInstance();
		
                
		//登陆发送邮件信息
		//RegConfirm.doSendRegInfoToRedm();

        System.out.println("REDM execute finish！");
		
	}
	
}
