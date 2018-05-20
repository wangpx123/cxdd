package com.redm.entity.cus;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * 车辆客户表
 */
@Entity
@Table(name = "CXDD_CUSTOMER")
public class Customer implements Serializable {
	private static final long serialVersionUID = -5974977988781026522L;

	// 客户ID
	private Integer id;
	// CAR_NO 车牌
	private String carNo;
	// BRAND 品牌
	private String brand;
	// BRAND_MODEL 品牌型号
	private String brandModel;
	// CARJIA_NO 车架号
	private String carjiaNo;
	// ENGINE_NO 发动机号
	private String engineNo;
	// ID_CARD 身份证号
	private String idCard;
	// CUS_NAME 姓名
	private String cusName;
	// CUS_ADDRESS 地址
	private String cusAddress;
	// CUS_TEL1 电话1
	private String cusTel1;
	// CUS_TEL2 电话2
	private String cusTel2;
	// FISRT_DATE 初登日期
	private Date firstDate;
	// USER_ID 用户ID
	private String userId;

	private String addWho;
	private Date addDate;
	private String editWho;
	private Date editDate;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(length = 50, name = "car_no")
	public String getCarNo() {
		return carNo;
	}

	public void setCarNo(String carNo) {
		this.carNo = carNo;
	}

	@Column(length = 50, name = "brand")
	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	@Column(length = 50, name = "brand_model")
	public String getBrandModel() {
		return brandModel;
	}

	public void setBrandModel(String brandModel) {
		this.brandModel = brandModel;
	}

	@Column(length = 50, name = "carjia_no")
	public String getCarjiaNo() {
		return carjiaNo;
	}

	public void setCarjiaNo(String carjiaNo) {
		this.carjiaNo = carjiaNo;
	}

	@Column(length = 50, name = "engine_no")
	public String getEngineNo() {
		return engineNo;
	}

	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
	}

	@Column(length = 50, name = "id_card")
	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	@Column(length = 50, name = "cus_name")
	public String getCusName() {
		return cusName;
	}

	public void setCusName(String cusName) {
		this.cusName = cusName;
	}

	@Column(length = 50, name = "cus_address")
	public String getCusAddress() {
		return cusAddress;
	}

	public void setCusAddress(String cusAddress) {
		this.cusAddress = cusAddress;
	}

	@Column(length = 50, name = "cus_tel1")
	public String getCusTel1() {
		return cusTel1;
	}

	public void setCusTel1(String cusTel1) {
		this.cusTel1 = cusTel1;
	}

	@Column(length = 50, name = "cus_tel2")
	public String getCusTel2() {
		return cusTel2;
	}

	public void setCusTel2(String cusTel2) {
		this.cusTel2 = cusTel2;
	}

	@Column(name = "first_date")
	@Temporal(value = TemporalType.TIMESTAMP)
	public Date getFirstDate() {
		return firstDate;
	}

	public void setFirstDate(Date firstDate) {
		this.firstDate = firstDate;
	}

	@Column(length = 50, name = "user_id")
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Column(length = 20, name = "add_who")
	public String getAddWho() {
		return addWho;
	}

	public void setAddWho(String addWho) {
		this.addWho = addWho;
	}

	@Column(length = 20, name = "edit_who")
	public String getEditWho() {
		return editWho;
	}

	public void setEditWho(String editWho) {
		this.editWho = editWho;
	}

	@Column(name = "add_date")
	@Temporal(value = TemporalType.TIMESTAMP)
	public Date getAddDate() {
		return addDate;
	}

	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	@Column(name = "edit_date")
	@Temporal(value = TemporalType.TIMESTAMP)
	public Date getEditDate() {
		return editDate;
	}

	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}

}
