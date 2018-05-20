package com.redm.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="NATION")
public class Nation {

	private Integer id;
	private String  nationKey;
	private String  descr;
	private String  endescr;
	private String  userDefine1;
	private String  userDefine2;
	private String  userDefine3;
	private Date addDate;
	private String  addWho;
	private Date editDate;
	private String  editWho;
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@Column(name="nation_key",length=20)
	public String getNationKey() {
		return nationKey;
	}

	public void setNationKey(String nationKey) {
		this.nationKey = nationKey;
	}
	@Column(length=100)
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	@Column(length=100)
	public String getEndescr() {
		return endescr;
	}
	public void setEndescr(String endescr) {
		this.endescr = endescr;
	}
	@Column(name="user_define1",length=20)
	public String getUserDefine1() {
		return userDefine1;
	}
	public void setUserDefine1(String userDefine1) {
		this.userDefine1 = userDefine1;
	}
	@Column(name="user_define2",length=20)
	public String getUserDefine2() {
		return userDefine2;
	}
	public void setUserDefine2(String userDefine2) {
		this.userDefine2 = userDefine2;
	}
	@Column(name="user_define3",length=20)
	public String getUserDefine3() {
		return userDefine3;
	}
	public void setUserDefine3(String userDefine3) {
		this.userDefine3 = userDefine3;
	}
	@Column(name="add_date")
	@Temporal(value=TemporalType.TIMESTAMP)
	public Date getAddDate() {
		return addDate;
	}
	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}
	@Column(name="add_who",length=20)
	public String getAddWho() {
		return addWho;
	}
	public void setAddWho(String addWho) {
		this.addWho = addWho;
	}
	@Column(name="edit_date")
	@Temporal(value=TemporalType.TIMESTAMP)
	public Date getEditDate() {
		return editDate;
	}
	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}
	@Column(name="edit_who",length=20)
	public String getEditWho() {
		return editWho;
	}
	public void setEditWho(String editWho) {
		this.editWho = editWho;
	}
	
	
	
	
	
	
	
}
