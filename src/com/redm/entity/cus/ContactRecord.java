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
 * 客户联系记录表
 */
@Entity
@Table(name = "CXDD_CONTACT_RECORD")
public class ContactRecord implements Serializable {
	private static final long serialVersionUID = -5974977988781026522L;

	// 联系ID
	private Integer id;
	// CUS_ID 客户ID
	private Integer cusId;
	// USER_ID 用户ID
	private Integer userId;
	// CONTACT_DATE 联系日期
	private Date cantactDate;
	// NEXTDATE 预约下次时间
	private Date nextDate;
	// REMARKS 备注
	private String remark;

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

	@Column(name = "cus_id")
	public Integer getCusId() {
		return cusId;
	}

	public void setCusId(Integer cusId) {
		this.cusId = cusId;
	}

	@Column(name = "user_id")
	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Column(name = "cantact_date")
	@Temporal(value = TemporalType.TIMESTAMP)
	public Date getCantactDate() {
		return cantactDate;
	}

	public void setCantactDate(Date cantactDate) {
		this.cantactDate = cantactDate;
	}

	@Column(name = "next_date")
	@Temporal(value = TemporalType.TIMESTAMP)
	public Date getNextDate() {
		return nextDate;
	}

	public void setNextDate(Date nextDate) {
		this.nextDate = nextDate;
	}

	@Column(length = 250, name = "remark")
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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
