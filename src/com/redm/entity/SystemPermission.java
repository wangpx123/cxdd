package com.redm.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 系统中所有的菜单权限，一般是直接添加菜单数据．
 * @author Jelly
 *
 */
@Entity
@Table(name="SYSTEM_PERMISSION")
public class SystemPermission implements Serializable{
	private static final long serialVersionUID = 2248478165110811606L;
	private Integer id;
	private String images;
	private String menuUrl;
	private String menuName;
	private Integer menuSort;
	private Integer parentId;
	private String menuType;
	private String remark;
	private String companyPermission;
	
	@Id
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	@Column(length=50)
	public String getImages() {
		return images;
	}
	public void setImages(String images) {
		this.images = images;
	}
	@Column(name="menu_url",length=50)
	public String getMenuUrl() {
		return menuUrl;
	}
	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}
	@Column(name="menu_name",length=30)
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	@Column(name="menu_sort")
	public Integer getMenuSort() {
		return menuSort;
	}
	public void setMenuSort(Integer menuSort) {
		this.menuSort = menuSort;
	}
	@Column(name="parent_id")
	public Integer getParentId() {
		return parentId;
	}
	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	@Column(name="menu_type",length=40)
	public String getMenuType() {
		return menuType;
	}
	public void setMenuType(String menuType) {
		this.menuType = menuType;
	}
	@Column(name="company_permission",length=1)
	public String getCompanyPermission() {
		return companyPermission;
	}
	public void setCompanyPermission(String companyPermission) {
		this.companyPermission = companyPermission;
	}
	public String getRemark() {
		return remark;
	}
	@Column(length=100)
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
