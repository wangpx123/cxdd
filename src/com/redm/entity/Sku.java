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
 * 商品管理
 * @author water
 */
@Entity
@Table(name = "SKU") 
public class Sku implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2484050844008046968L;
	
	
	private Integer id;
	private String storerKey; 
	private String sku;
	private String skuType;
	private Integer status;
	private String name;
	private String descr;
	private String manufacturerSku;
	private String altSku; 
	private String retailSku ;
	private Float leng; 
	private Float width;
	private Float height;
	private Float cube;
	private Float grossWeight;
	private Float netWeight;
	private Float tareWeight;
	private Float cost;
	private Float price;
	private Float orderCost;
	private Float carryCost;
	private String packKey;
	private String putCode;
	private String shippableContainer;
	private String cartonGroup;
	private String rotateby;
	private String rotation;
	private String abc;
	private String putawayStrategyKey;
	private String rotationStrategyKey;
	
	private String preAllocationStrategyKey;
	private String allocationStrategyKey;
	private String replenishmentStrategyKey;
	private String qualityStrategyKey;
	private String rfPack;
	private String rfUom;
	private String lotKey;
	private Integer dateCodedays; 
	private String shelflifeIndicator ;
	private String shelflifeCodetype;
	private Integer shelflifeOnreceiving; 
	private Integer shelflifeOnshipping ; 
	private Integer shelflife;
	private Date lastCyclecount; 
	private Float reorderPoint;
	private Float maxPoint;
	private Float reorderQty;
	private String putawayLoc ;
	private String skuGroup1;
	private String skuGroup2;
	private String hscode;
	private String vendor1;
	private String vendor2;
	private String hazmatCode;
	private String tariffKey;
	private String putawayZone;
	private String transportationMode;
	private String freightClass;
	private String cycleClass;
	private String receiptHoldcode;
	private String onreceiptCopypackKey;
	private String flowThruItem;
	private String conveyable;
	private String userDefine1;
	private String userDefine2;
	private String userDefine3;
	private String userDefine4;
	private String userDefine5;
	private String userDefine6;
	private String userDefine7;
	private String userDefine8;
	private String userDefine9;
	private String userDefine10;
	private String userDefine11;
	private String userDefine12;
	private String userDefine13;
	private String userDefine14;
	private String userDefine15;
	private String notes1;
	private String notes2;
	private String model;
	private String specification;
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
	@Column(name="sku_type",length=20)
	public String getSkuType() {
		return skuType;
	}
	public void setSkuType(String skuType) {
		this.skuType = skuType;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	@Column(length=60)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column(length=60)
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	@Column(name="manufacturer_sku",length=20)
	public String getManufacturerSku() {
		return manufacturerSku;
	}
	public void setManufacturerSku(String manufacturerSku) {
		this.manufacturerSku = manufacturerSku;
	}
	@Column(name="alt_sku",length=20)
	public String getAltSku() {
		return altSku;
	}
	public void setAltSku(String altSku) {
		this.altSku = altSku;
	}
	@Column(name="retail_sku",length=20)
	public String getRetailSku() {
		return retailSku;
	}
	public void setRetailSku(String retailSku) {
		this.retailSku = retailSku;
	}
	public Float getLeng() {
		return leng;
	}
	public void setLeng(Float leng) {
		this.leng = leng;
	}
	public Float getWidth() {
		return width;
	}
	public void setWidth(Float width) {
		this.width = width;
	}
	public Float getHeight() {
		return height;
	}
	public void setHeight(Float height) {
		this.height = height;
	}
	
	public Float getCube() {
		return cube;
	}
	public void setCube(Float cube) {
		this.cube = cube;
	}
	@Column(name="gross_weight")
	public Float getGrossWeight() {
		return grossWeight;
	}
	public void setGrossWeight(Float grossWeight) {
		this.grossWeight = grossWeight;
	}
	@Column(name="net_weight")
	public Float getNetWeight() {
		return netWeight;
	}
	public void setNetWeight(Float netWeight) {
		this.netWeight = netWeight;
	}
	@Column(name="tare_weight")
	public Float getTareWeight() {
		return tareWeight;
	}
	public void setTareWeight(Float tareWeight) {
		this.tareWeight = tareWeight;
	}
	public Float getCost() {
		return cost;
	}
	public void setCost(Float cost) {
		this.cost = cost;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	@Column(name="order_cost")
	public Float getOrderCost() {
		return orderCost;
	}
	public void setOrderCost(Float orderCost) {
		this.orderCost = orderCost;
	}
	@Column(name="carry_cost")
	public Float getCarryCost() {
		return carryCost;
	}
	public void setCarryCost(Float carryCost) {
		this.carryCost = carryCost;
	}
	@Column(name="pack_key",length=20)
	public String getPackKey() {
		return packKey;
	}
	public void setPackKey(String packKey) {
		this.packKey = packKey;
	}
	@Column(name="put_code",length=10)
	public String getPutCode() {
		return putCode;
	}
	public void setPutCode(String putCode) {
		this.putCode = putCode;
	}
	@Column(name="shippable_container",length=10)
	public String getShippableContainer() {
		return shippableContainer;
	}
	public void setShippableContainer(String shippableContainer) {
		this.shippableContainer = shippableContainer;
	}
	@Column(name="carton_group",length=10)
	public String getCartonGroup() {
		return cartonGroup;
	}
	public void setCartonGroup(String cartonGroup) {
		this.cartonGroup = cartonGroup;
	}
	@Column(length=10)
	public String getRotateby() {
		return rotateby;
	}
	public void setRotateby(String rotateby) {
		this.rotateby = rotateby;
	}
	@Column(length=10)
	public String getRotation() {
		return rotation;
	}
	public void setRotation(String rotation) {
		this.rotation = rotation;
	}
	@Column(length=5)
	public String getAbc() {
		return abc;
	}
	public void setAbc(String abc) {
		this.abc = abc;
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
	@Column(name="pre_allocation_strategy_key",length=10)
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
	@Column(name="quality_strategy_key",length=10)
	public String getQualityStrategyKey() {
		return qualityStrategyKey;
	}
	public void setQualityStrategyKey(String qualityStrategyKey) {
		this.qualityStrategyKey = qualityStrategyKey;
	}
	@Column(name="rf_pack",length=10)
	public String getRfPack() {
		return rfPack;
	}
	public void setRfPack(String rfPack) {
		this.rfPack = rfPack;
	}
	@Column(name="rf_uom",length=10)
	public String getRfUom() {
		return rfUom;
	}
	public void setRfUom(String rfUom) {
		this.rfUom = rfUom;
	}
	@Column(name="lot_key",length=10)
	public String getLotKey() {
		return lotKey;
	}
	public void setLotKey(String lotKey) {
		this.lotKey = lotKey;
	}
	@Column(name="date_codedays")
	public Integer getDateCodedays() {
		return dateCodedays;
	}
	public void setDateCodedays(Integer dateCodedays) {
		this.dateCodedays = dateCodedays;
	}
	@Column(name="shelflife_indicator",length=10)
	public String getShelflifeIndicator() {
		return shelflifeIndicator;
	}
	public void setShelflifeIndicator(String shelflifeIndicator) {
		this.shelflifeIndicator = shelflifeIndicator;
	}
	@Column(name="shelflife_codetype",length=1)
	public String getShelflifeCodetype() {
		return shelflifeCodetype;
	}
	public void setShelflifeCodetype(String shelflifeCodetype) {
		this.shelflifeCodetype = shelflifeCodetype;
	}
	@Column(name="shelflife_onreceiving")
	public Integer getShelflifeOnreceiving() {
		return shelflifeOnreceiving;
	}
	public void setShelflifeOnreceiving(Integer shelflifeOnreceiving) {
		this.shelflifeOnreceiving = shelflifeOnreceiving;
	}
	@Column(name="shelflife_onshipping")
	public Integer getShelflifeOnshipping() {
		return shelflifeOnshipping;
	}
	public void setShelflifeOnshipping(Integer shelflifeOnshipping) {
		this.shelflifeOnshipping = shelflifeOnshipping;
	}
	public Integer getShelflife() {
		return shelflife;
	}
	public void setShelflife(Integer shelflife) {
		this.shelflife = shelflife;
	}
	@Column(name="last_cyclecount")
	@Temporal(value=TemporalType.TIMESTAMP)
	public Date getLastCyclecount() {
		return lastCyclecount;
	}
	public void setLastCyclecount(Date lastCyclecount) {
		this.lastCyclecount = lastCyclecount;
	}
	@Column(name="reorder_point")
	public Float getReorderPoint() {
		return reorderPoint;
	}
	public void setReorderPoint(Float reorderPoint) {
		this.reorderPoint = reorderPoint;
	}
	@Column(name="max_point")
	public Float getMaxPoint() {
		return maxPoint;
	}
	public void setMaxPoint(Float maxPoint) {
		this.maxPoint = maxPoint;
	}
	@Column(name="reorder_qty")
	public Float getReorderQty() {
		return reorderQty;
	}
	public void setReorderQty(Float reorderQty) {
		this.reorderQty = reorderQty;
	}
	@Column(name="putaway_loc",length=10)
	public String getPutawayLoc() {
		return putawayLoc;
	}
	public void setPutawayLoc(String putawayLoc) {
		this.putawayLoc = putawayLoc;
	}
	@Column(name="sku_group1",length=10)
	public String getSkuGroup1() {
		return skuGroup1;
	}
	public void setSkuGroup1(String skuGroup1) {
		this.skuGroup1 = skuGroup1;
	}
	@Column(name="sku_group2",length=10)
	public String getSkuGroup2() {
		return skuGroup2;
	}
	public void setSkuGroup2(String skuGroup2) {
		this.skuGroup2 = skuGroup2;
	}
	@Column(length=10)
	public String getHscode() {
		return hscode;
	}
	public void setHscode(String hscode) {
		this.hscode = hscode;
	}
	@Column(length=10)
	public String getVendor1() {
		return vendor1;
	}
	public void setVendor1(String vendor1) {
		this.vendor1 = vendor1;
	}
	@Column(length=10)
	public String getVendor2() {
		return vendor2;
	}
	public void setVendor2(String vendor2) {
		this.vendor2 = vendor2;
	}
	@Column(name="hazmat_code",length=10)
	public String getHazmatCode() {
		return hazmatCode;
	}
	public void setHazmatCode(String hazmatCode) {
		this.hazmatCode = hazmatCode;
	}
	@Column(name="tariff_key",length=10)
	public String getTariffKey() {
		return tariffKey;
	}
	public void setTariffKey(String tariffKey) {
		this.tariffKey = tariffKey;
	}
	@Column(name="putaway_zone",length=10)
	public String getPutawayZone() {
		return putawayZone;
	}
	public void setPutawayZone(String putawayZone) {
		this.putawayZone = putawayZone;
	}
	@Column(name="transportation_mode",length=10)
	public String getTransportationMode() {
		return transportationMode;
	}
	public void setTransportationMode(String transportationMode) {
		this.transportationMode = transportationMode;
	}
	@Column(name="freight_class",length=10)
	public String getFreightClass() {
		return freightClass;
	}
	public void setFreightClass(String freightClass) {
		this.freightClass = freightClass;
	}
	@Column(name="cycle_class",length=10)
	public String getCycleClass() {
		return cycleClass;
	}
	public void setCycleClass(String cycleClass) {
		this.cycleClass = cycleClass;
	}
	@Column(name="receipt_holdcode",length=10)
	public String getReceiptHoldcode() {
		return receiptHoldcode;
	}
	public void setReceiptHoldcode(String receiptHoldcode) {
		this.receiptHoldcode = receiptHoldcode;
	}
	@Column(name="onreceipt_copypack_key",length=10)
	public String getOnreceiptCopypackKey() {
		return onreceiptCopypackKey;
	}
	public void setOnreceiptCopypackKey(String onreceiptCopypackKey) {
		this.onreceiptCopypackKey = onreceiptCopypackKey;
	}
	@Column(name="flow_thru_item",length=1)
	public String getFlowThruItem() {
		return flowThruItem;
	}
	public void setFlowThruItem(String flowThruItem) {
		this.flowThruItem = flowThruItem;
	}
	@Column(length=1)
	public String getConveyable() {
		return conveyable;
	}
	public void setConveyable(String conveyable) {
		this.conveyable = conveyable;
	}
	@Column(name="user_define1",length=30)
	public String getUserDefine1() {
		return userDefine1;
	}
	public void setUserDefine1(String userDefine1) {
		this.userDefine1 = userDefine1;
	}
	@Column(name="user_define2",length=30)
	public String getUserDefine2() {
		return userDefine2;
	}
	public void setUserDefine2(String userDefine2) {
		this.userDefine2 = userDefine2;
	}
	@Column(name="user_define3",length=30)
	public String getUserDefine3() {
		return userDefine3;
	}
	public void setUserDefine3(String userDefine3) {
		this.userDefine3 = userDefine3;
	}
	@Column(name="user_define4",length=30)
	public String getUserDefine4() {
		return userDefine4;
	}
	public void setUserDefine4(String userDefine4) {
		this.userDefine4 = userDefine4;
	}
	@Column(name="user_define5",length=30)
	public String getUserDefine5() {
		return userDefine5;
	}
	public void setUserDefine5(String userDefine5) {
		this.userDefine5 = userDefine5;
	}
	@Column(name="user_define6",length=30)
	public String getUserDefine6() {
		return userDefine6;
	}
	public void setUserDefine6(String userDefine6) {
		this.userDefine6 = userDefine6;
	}
	@Column(name="user_define7",length=30)
	public String getUserDefine7() {
		return userDefine7;
	}
	public void setUserDefine7(String userDefine7) {
		this.userDefine7 = userDefine7;
	}
	@Column(name="user_define8",length=30)
	public String getUserDefine8() {
		return userDefine8;
	}
	public void setUserDefine8(String userDefine8) {
		this.userDefine8 = userDefine8;
	}
	@Column(name="user_define9",length=30)
	public String getUserDefine9() {
		return userDefine9;
	}
	public void setUserDefine9(String userDefine9) {
		this.userDefine9 = userDefine9;
	}
	@Column(name="user_define10",length=30)
	public String getUserDefine10() {
		return userDefine10;
	}
	public void setUserDefine10(String userDefine10) {
		this.userDefine10 = userDefine10;
	}
	@Column(name="user_define11",length=30)
	public String getUserDefine11() {
		return userDefine11;
	}
	public void setUserDefine11(String userDefine11) {
		this.userDefine11 = userDefine11;
	}
	@Column(name="user_define12",length=30)
	public String getUserDefine12() {
		return userDefine12;
	}
	public void setUserDefine12(String userDefine12) {
		this.userDefine12 = userDefine12;
	}
	@Column(name="user_define13",length=30)
	public String getUserDefine13() {
		return userDefine13;
	}
	public void setUserDefine13(String userDefine13) {
		this.userDefine13 = userDefine13;
	}
	@Column(name="user_define14",length=30)
	public String getUserDefine14() {
		return userDefine14;
	}
	public void setUserDefine14(String userDefine14) {
		this.userDefine14 = userDefine14;
	}
	@Column(name="user_define15",length=30)
	public String getUserDefine15() {
		return userDefine15;
	}
	public void setUserDefine15(String userDefine15) {
		this.userDefine15 = userDefine15;
	}
	@Column(length=200)
	public String getNotes1() {
		return notes1;
	}
	public void setNotes1(String notes1) {
		this.notes1 = notes1;
	}
	@Column(length=200)
	public String getNotes2() {
		return notes2;
	}
	public void setNotes2(String notes2) {
		this.notes2 = notes2;
	}
	@Column(length=30)
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	@Column(length=30)
	public String getSpecification() {
		return specification;
	}
	public void setSpecification(String specification) {
		this.specification = specification;
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
