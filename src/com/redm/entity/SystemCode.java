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

/**
 * 数据字典主表
 * @author water
 */
@Entity
@Table(name = "SYSTEM_CODE") 
public class SystemCode {
//	private String id;
	private Integer id;
	private String codeType;
	private String descrip;
	private String mark;
	private String addWho;
	private String editWho;
	private Date addDate;
	private Date editDate;
	

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name="code_type",length=20,nullable=false,unique=true)
	public String getCodeType() {
		return codeType;
	}
	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}
	@Column(length=60,nullable=false)
	public String getDescrip() {
		return descrip;
	}
	public void setDescrip(String descrip) {
		this.descrip = descrip;
	}
	@Column(length=200)
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	@Column(length=20,name="add_who")
	public String getAddWho() {
		return addWho;
	}
	public void setAddWho(String addWho) {
		this.addWho = addWho;
	}
	@Column(length=20,name="edit_who")
	public String getEditWho() {
		return editWho;
	}
	public void setEditWho(String editWho) {
		this.editWho = editWho;
	}
	@Column(name="add_date")
	@Temporal(value=TemporalType.TIMESTAMP)
	public Date getAddDate() {
		return addDate;
	}
	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}
	@Column(name="edit_date")
	@Temporal(value=TemporalType.TIMESTAMP)
	public Date getEditDate() {
		return editDate;
	}
	public void setEditDate(Date editDate) {
		this.editDate = editDate;
	}

}
