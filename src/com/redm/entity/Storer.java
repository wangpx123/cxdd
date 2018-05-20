package com.redm.entity;

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
 * 货主管理
 * @author water
 */
@Entity
@Table(name = "STORER") 
public class Storer implements Serializable{
	private static final long serialVersionUID = -5974977988781026522L;
	
	private Integer id;
	private String storerKey;            
	private String type;        
	private String company;            
	private String descr;
	private String nation;
	private String province;
	private String city;  
	private String county;  
	private String address1;            
	private String address2;            
	private String contact;
	private String mobile;
	private String tel;
	private String position;
	private String fax;
	private String email;
	private String cartonKey;
	private String packKey;
	private String locGenerate;
	private String lotKey;
	private String putawayStrategyKey;
	private String rotationStrategyKey;
	private String preAllocationStrategyKey;
	private String allocationStrategyKey;
	private String replenishmentStrategyKey;
	private String asnUom;
	private String soUom;
	private String asnCopy;
	private String soCopy;
	private String asnLabel;
	private String soLabel;
	private String route;
	private String carrier;
	private String prefix;
	private Integer putAllocate;
	private Integer excessAllowable ; 
	private Float excessRate;
	private Integer mustAsn; 
	private Integer mustSo;
	private Integer mustAsnSo;
	private Integer autoSku;
	private Integer autoStorer;
	private String duty;
	private String bankingAccount ;
	private Date dateClosing;
	private String billto;
	private String chargeType;
	private String chargeKey;
	private Float warehouseArea;
	private String areachargeType;
	private String chargeRank;
	private Float areaCharge;
	private String currency;
	private String cubeUom;
	private String wgtUom;
	private String invchargeRank;
	private Integer isOutboundInvcharge;
	private Integer isArea;
	private String userDefine1;
	private String userDefine2;
	private String userDefine3;
	private String userDefine4;
	private String userDefine5;
	private String notes;
	private Integer mailSend;
	private String addWho;
	private Date addDate;
	private String editWho;
	private Date editDate;
	
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@Column(name="storer_key",length=10)
	public String getStorerKey() {
		return storerKey;
	}
	public void setStorerKey(String storerKey) {
		this.storerKey = storerKey;
	}
	@Column(length=10)
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Column(length=255)
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	@Column(length=60)
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	@Column(length=10)
	public String getNation() {
		return nation;
	}
	public void setNation(String nation) {
		this.nation = nation;
	}
	@Column(length=30)
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	@Column(length=30)
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	@Column(length=20)
	public String getCounty() {
		return county;
	}
	public void setCounty(String county) {
		this.county = county;
	}
	@Column(length=255)
	public String getAddress1() {
		return address1;
	}
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	@Column(length=255)
	public String getAddress2() {
		return address2;
	}
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	@Column(length=20)
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	@Column(length=20)
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	@Column(length=20)
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	@Column(length=20)
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	@Column(length=20)
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	@Column(length=200)
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Column(name="carton_key",length=10)
	public String getCartonKey() {
		return cartonKey;
	}
	public void setCartonKey(String cartonKey) {
		this.cartonKey = cartonKey;
	}
	@Column(name="pack_key",length=20)
	public String getPackKey() {
		return packKey;
	}
	public void setPackKey(String packKey) {
		this.packKey = packKey;
	}
	@Column(name="loc_generate",length=10)
	public String getLocGenerate() {
		return locGenerate;
	}
	public void setLocGenerate(String locGenerate) {
		this.locGenerate = locGenerate;
	}
	@Column(name="lot_key",length=10)
	public String getLotKey() {
		return lotKey;
	}
	public void setLotKey(String lotKey) {
		this.lotKey = lotKey;
	}
	@Column(name="putaway_strategy_key",length=10)
	public String getPutawayStrategyKey() {
		return putawayStrategyKey;
	}
	public void setPutawayStrategyKey(String putawayStrategyKey) {
		this.putawayStrategyKey = putawayStrategyKey;
	}
	@Column(name="rotation_strategy_key",length=10)
	public String getRotationStrategyKey() {
		return rotationStrategyKey;
	}
	public void setRotationStrategyKey(String rotationStrategyKey) {
		this.rotationStrategyKey = rotationStrategyKey;
	}
	@Column(name="pre_allocation_strategy_key")
	public String getPreAllocationStrategyKey() {
		return preAllocationStrategyKey;
	}
	public void setPreAllocationStrategyKey(String preAllocationStrategyKey) {
		this.preAllocationStrategyKey = preAllocationStrategyKey;
	}
	@Column(name="allocation_strategy_key",length=10)
	public String getAllocationStrategyKey() {
		return allocationStrategyKey;
	}
	public void setAllocationStrategyKey(String allocationStrategyKey) {
		this.allocationStrategyKey = allocationStrategyKey;
	}
	@Column(name="replenishment_strategy_key",length=10)
	public String getReplenishmentStrategyKey() {
		return replenishmentStrategyKey;
	}
	public void setReplenishmentStrategyKey(String replenishmentStrategyKey) {
		this.replenishmentStrategyKey = replenishmentStrategyKey;
	}
	@Column(name="asn_uom",length=10)
	public String getAsnUom() {
		return asnUom;
	}
	public void setAsnUom(String asnUom) {
		this.asnUom = asnUom;
	}
	@Column(name="so_uom",length=10)
	public String getSoUom() {
		return soUom;
	}
	public void setSoUom(String soUom) {
		this.soUom = soUom;
	}
	@Column(name="asn_copy",length=10)
	public String getAsnCopy() {
		return asnCopy;
	}
	public void setAsnCopy(String asnCopy) {
		this.asnCopy = asnCopy;
	}
	@Column(name="so_copy",length=10)
	public String getSoCopy() {
		return soCopy;
	}
	public void setSoCopy(String soCopy) {
		this.soCopy = soCopy;
	}
	@Column(name="asn_label",length=10)
	public String getAsnLabel() {
		return asnLabel;
	}
	public void setAsnLabel(String asnLabel) {
		this.asnLabel = asnLabel;
	}
	@Column(name="so_label",length=10)
	public String getSoLabel() {
		return soLabel;
	}
	public void setSoLabel(String soLabel) {
		this.soLabel = soLabel;
	}
	@Column(length=10)
	public String getRoute() {
		return route;
	}
	public void setRoute(String route) {
		this.route = route;
	}
	@Column(length=10)
	public String getCarrier() {
		return carrier;
	}
	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}
	@Column(length=10)
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	@Column(name="put_allocate")
	public Integer getPutAllocate() {
		return putAllocate;
	}
	public void setPutAllocate(Integer putAllocate) {
		this.putAllocate = putAllocate;
	}
	@Column(name="excess_allowable")
	public Integer getExcessAllowable() {
		return excessAllowable;
	}
	public void setExcessAllowable(Integer excessAllowable) {
		this.excessAllowable = excessAllowable;
	}
	@Column(name="excess_rate")
	public Float getExcessRate() {
		return excessRate;
	}
	public void setExcessRate(Float excessRate) {
		this.excessRate = excessRate;
	}
	@Column(name="must_asn")
	public Integer getMustAsn() {
		return mustAsn;
	}
	public void setMustAsn(Integer mustAsn) {
		this.mustAsn = mustAsn;
	}
	@Column(name="must_so")
	public Integer getMustSo() {
		return mustSo;
	}
	public void setMustSo(Integer mustSo) {
		this.mustSo = mustSo;
	}
	@Column(name="must_asn_so")
	public Integer getMustAsnSo() {
		return mustAsnSo;
	}
	public void setMustAsnSo(Integer mustAsnSo) {
		this.mustAsnSo = mustAsnSo;
	}
	@Column(name="auto_sku")
	public Integer getAutoSku() {
		return autoSku;
	}
	public void setAutoSku(Integer autoSku) {
		this.autoSku = autoSku;
	}
	@Column(name="auto_storer")
	public Integer getAutoStorer() {
		return autoStorer;
	}
	public void setAutoStorer(Integer autoStorer) {
		this.autoStorer = autoStorer;
	}
	@Column(length=20)
	public String getDuty() {
		return duty;
	}
	public void setDuty(String duty) {
		this.duty = duty;
	}
	@Column(name="banking_account",length=20)
	public String getBankingAccount() {
		return bankingAccount;
	}
	public void setBankingAccount(String bankingAccount) {
		this.bankingAccount = bankingAccount;
	}
	@Column(name="date_closing")
	@Temporal(value=TemporalType.TIMESTAMP)
	public Date getDateClosing() {
		return dateClosing;
	}
	public void setDateClosing(Date dateClosing) {
		this.dateClosing = dateClosing;
	}
	@Column(length=10)
	public String getBillto() {
		return billto;
	}
	public void setBillto(String billto) {
		this.billto = billto;
	}
	@Column(name="charge_type",length=10)
	public String getChargeType() {
		return chargeType;
	}
	public void setChargeType(String chargeType) {
		this.chargeType = chargeType;
	}
	@Column(name="charge_key",length=10)
	public String getChargeKey() {
		return chargeKey;
	}
	public void setChargeKey(String chargeKey) {
		this.chargeKey = chargeKey;
	}
	@Column(name="warehouse_area")
	public Float getWarehouseArea() {
		return warehouseArea;
	}
	public void setWarehouseArea(Float warehouseArea) {
		this.warehouseArea = warehouseArea;
	}
	@Column(name="areacharge_type",length=10)
	public String getAreachargeType() {
		return areachargeType;
	}
	public void setAreachargeType(String areachargeType) {
		this.areachargeType = areachargeType;
	}
	@Column(name="charge_rank",length=10)
	public String getChargeRank() {
		return chargeRank;
	}
	public void setChargeRank(String chargeRank) {
		this.chargeRank = chargeRank;
	}
	@Column(name="area_charge")
	public Float getAreaCharge() {
		return areaCharge;
	}
	public void setAreaCharge(Float areaCharge) {
		this.areaCharge = areaCharge;
	}
	@Column(length=10)
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	@Column(name="cube_uom",length=10)
	public String getCubeUom() {
		return cubeUom;
	}
	public void setCubeUom(String cubeUom) {
		this.cubeUom = cubeUom;
	}
	@Column(name="wgt_uom",length=10)
	public String getWgtUom() {
		return wgtUom;
	}
	public void setWgtUom(String wgtUom) {
		this.wgtUom = wgtUom;
	}
	@Column(name="invcharge_rank",length=10)
	public String getInvchargeRank() {
		return invchargeRank;
	}
	public void setInvchargeRank(String invchargeRank) {
		this.invchargeRank = invchargeRank;
	}
	@Column(name="is_outbound_invcharge")
	public Integer getIsOutboundInvcharge() {
		return isOutboundInvcharge;
	}
	public void setIsOutboundInvcharge(Integer isOutboundInvcharge) {
		this.isOutboundInvcharge = isOutboundInvcharge;
	}
	@Column(name="is_area")
	public Integer getIsArea() {
		return isArea;
	}
	public void setIsArea(Integer isArea) {
		this.isArea = isArea;
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
	@Column(name="user_define4",length=20)
	public String getUserDefine4() {
		return userDefine4;
	}
	public void setUserDefine4(String userDefine4) {
		this.userDefine4 = userDefine4;
	}
	@Column(name="user_define5",length=20)
	public String getUserDefine5() {
		return userDefine5;
	}
	public void setUserDefine5(String userDefine5) {
		this.userDefine5 = userDefine5;
	}
	@Column(length=255)
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
	@Column(name="mail_send")
	public Integer getMailSend() {
		return mailSend;
	}
	public void setMailSend(Integer mailSend) {
		this.mailSend = mailSend;
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
