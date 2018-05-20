package com.redm.service.support;

import java.io.File;
import java.util.Calendar;
import java.util.Date;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.struts2.ServletActionContext;

public class DeleteFiles extends TimerTask {
	private static final String targetPath1 = ServletActionContext
			.getServletContext().getRealPath("/attach");
	private static final String targetPath2 = ServletActionContext
			.getServletContext().getRealPath("/xls");
	Timer timer = new Timer();
	Calendar calendar = Calendar.getInstance();
	static Date date;
	private static DeleteFiles deleteFiles;

	private static void delFiles(String[] dir, int day) {
		for (int i = 0; i < dir.length; i++) {
			File f = new File(dir[i]);
			File[] files = null;
			if (f.exists()) {// 判断文件是否存在
				files = f.listFiles();
				for (int j = 0; j < files.length; j++) {
					if ((files[j].getName()).indexOf(".pdf") != -1) {// 判断文件后缀名是pdf的文件执行删除
						date = new Date(files[j].lastModified());
						try {
							Date d1 = new Date();
							Date d2 = date;
							long diff = d1.getTime() - d2.getTime();
							long dec = diff / (1000 * 60 * 60 * 24);// 得到的天数
							if (dec >= day) {
								files[j].delete();// 删除十天前的PDF或者XLS文件
								System.out.println("定时任务:删除pdf文件成功");
							}
						} catch (Exception e) {
							e.printStackTrace();
							System.out.println("定时任务:删除pdf文件失败");
						}
					} else if ((files[j].getName()).indexOf(".xls") != -1) {
						// 判断文件后缀名是xls的文件执行删除
						try {
							files[j].delete();// 删除十天前的PDF或者XLS文件
							System.out.println("定时任务:删除xls文件成功");
						} catch (Exception e) {
							e.printStackTrace();
							System.out.println("定时任务:删除xls文件失败");
						}

					} else {
						System.out.println("文件后缀必须为.pdf或者xls文件！");
					}
				}
			} else
				System.out.println("文件不存在");
		}
	}

	private void start() {
		System.out.println("方法开始！");
		calendar.set(Calendar.HOUR_OF_DAY, 02); // 控制时
		calendar.set(Calendar.MINUTE, 00); // 控制分
		calendar.set(Calendar.SECOND, 00); // 控制秒
		Date time = calendar.getTime(); // 得出执行任务的时间,此处为每天的02：00：00
		// 每隔一天执行删除一次
		timer.scheduleAtFixedRate(this, time, 1000 * 60 * 60 * 24);
	}

	@Override
	public void run() {
		delFiles(new String[] { targetPath1, targetPath2 }, 10);
	}

	public static void getInstance() {
		if (null == deleteFiles || deleteFiles.equals("")) {
			deleteFiles = new DeleteFiles();
			deleteFiles.start();
		}
	}
}
