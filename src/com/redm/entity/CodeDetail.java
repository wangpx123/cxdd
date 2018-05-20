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
 * 数据字典从表
 * @author water
 */
@Entity
@Table(name = "CODE_DETAIL") 	
public class CodeDetail {
	private Integer id;
	private String codeType;
	private String codeValue;
	private String description;
	private Integer sort;
	private String codedef1;
	private String codedef2;
	private String codedef3;
	private String notes;
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
	@Column(length=20,name="code_type",nullable=false)
	public String getCodeType() {
		return codeType;
	}
	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}
	@Column(length=60,name="code_value",nullable=false)
	public String getCodeValue() {
		return codeValue;
	}
	public void setCodeValue(String codeValue) {
		this.codeValue = codeValue;
	}
	@Column(length=60,nullable=false)
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Column(nullable=false)
	public Integer getSort() {
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}
	@Column(length=20)
	public String getCodedef1() {
		return codedef1;
	}
	public void setCodedef1(String codedef1) {
		this.codedef1 = codedef1;
	}
	@Column(length=20)
	public String getCodedef2() {
		return codedef2;
	}
	public void setCodedef2(String codedef2) {
		this.codedef2 = codedef2;
	}
	@Column(length=20)
	public String getCodedef3() {
		return codedef3;
	}
	public void setCodedef3(String codedef3) {
		this.codedef3 = codedef3;
	}
	@Column(length=200)
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
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
