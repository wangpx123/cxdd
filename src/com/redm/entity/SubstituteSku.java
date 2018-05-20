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
 * 替代商品
 * @author water
 */
@Entity
@Table(name = "SUBSTITUTE_SKU") 
public class SubstituteSku {
	
	private Integer id;
	private String storerKey;
	private String sku;
	private String substituteSku;
	private String status;
	private Integer sequence;
	private String packKey;
	private Float uomQty;
	private String uom;
	private Float qty;
	private String subpackKey;
	private Float subuomQty;
	private String subuom;
	private Float subQty;
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
	@Column(name="storer_key",length=20)
	public String getStorerKey() {
		return storerKey;
	}
	public void setStorerKey(String storerKey) {
		this.storerKey = storerKey;
	}
	@Column(length=20)
	public String getSku() {
		return sku;
	}
	public void setSku(String sku) {
		this.sku = sku;
	}
	@Column(name="substitute_sku",length=20)
	public String getSubstituteSku() {
		return substituteSku;
	}
	public void setSubstituteSku(String substituteSku) {
		this.substituteSku = substituteSku;
	}
	@Column(length=1)
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Integer getSequence() {
		return sequence;
	}
	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}
	@Column(name="pack_key",length=20)
	public String getPackKey() {
		return packKey;
	}
	public void setPackKey(String packKey) {
		this.packKey = packKey;
	}
	@Column(name="uom_qty")
	public Float getUomQty() {
		return uomQty;
	}
	public void setUomQty(Float uomQty) {
		this.uomQty = uomQty;
	}
	public String getUom() {
		return uom;
	}
	public void setUom(String uom) {
		this.uom = uom;
	}
	public Float getQty() {
		return qty;
	}
	public void setQty(Float qty) {
		this.qty = qty;
	}
	@Column(name="subpack_key",length=20)
	public String getSubpackKey() {
		return subpackKey;
	}
	public void setSubpackKey(String subpackKey) {
		this.subpackKey = subpackKey;
	}
	@Column(name="subuom_qty")
	public Float getSubuomQty() {
		return subuomQty;
	}
	public void setSubuomQty(Float subuomQty) {
		this.subuomQty = subuomQty;
	}
	@Column(length=10)
	public String getSubuom() {
		return subuom;
	}
	public void setSubuom(String subuom) {
		this.subuom = subuom;
	}
	@Column(name="sub_qty")
	public Float getSubQty() {
		return subQty;
	}
	public void setSubQty(Float subQty) {
		this.subQty = subQty;
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
