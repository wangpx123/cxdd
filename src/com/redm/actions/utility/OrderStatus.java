package com.redm.actions.utility;

public class OrderStatus {
	//入库单据状态
	public static final String REVEIPT_CREATE = "REVEIPT_CREATED";
	public static final String REVEIPT_CANCLE = "REVEIPT_CANCLED";
	public static final String REVEIPT_FINISH = "REVEIPT_FINISHD";
	
	//采购单据状态
	public static final String PO_CREATE = "PO_CREATED";
	public static final String PO_CANCLE = "PO_CANCLED";
	public static final String PO_PLACKORDER = "PO_PLACKORDERD";
	public static final String PO_FINISH = "PO_FINISHD";
	public static final String PO_PART_FINISH = "PO_PART_FINISH";
	public static final String PO_PART_VERIFICATION = "PO_PART_VERIFICATION";
	public static final String PO_VERIFICATION = "PO_VERIFICATION";
	public static final String PO_NO_VERIFICATION = "PO_NO_VERIFICATION";
	
	
	//销售单据状态
	public static final String SALES_CREATE = "SALES_CREATED";
	public static final String SALES_CANCLE = "SALES_CANCLED";
	public static final String SALES_FINISH = "SALES_FINISHD";
	public static final String SALES_PM_Full_PAYMENT = "全支付";
	public static final String SALES_PM_PARTIAL_PAYMENT = "部分支付";
	public static final String SALES_PM_UNPAID = "未付";
	
	public static final String SALES_PM_VERIFICATION = "SALES_PM_VERIFICATION";
	public static final String SALES_PM_PART_VERIFICATION = "SALES_PM_PART_VERIFICATION";
	public static final String SALES_PM_NO_VERIFICATION = "SALES_PM_NO_VERIFICATION";
	
	
	//调整单据状态
	public static final String ADJUSTMENT_CREATE = "ADJUSTMENT_CREATED";
	public static final String ADJUSTMENT_CANCLE = "ADJUSTMENT_CANCLED";
	public static final String ADJUSTMENT_FINISH = "ADJUSTMENT_FINISHD";
	
	
	
	//领料单据状态
	public static final String FULL_DRAWS = "FULL_DRAWS";
	public static final String CANCLE_DRAWS = "CANCLE_DRAWS";
	public static final String CREATE_DRAWS = "CREATE_DRAWS";
	public static final String PART_DRAWS = "PART_DRAWS";
}
