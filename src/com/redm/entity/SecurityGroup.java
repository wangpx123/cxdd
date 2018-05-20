package com.redm.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 权限组类
 * @author Jelly
 *
 */
@Entity
@Table(name="SECURITY_GROUP")
public class SecurityGroup {
	private String id;
	private String name;
	private String state;
	private String remark;
	private String companyId;
	private Set<UserSecurityGroup> userSecurityGroups = new HashSet<UserSecurityGroup>();
	private Set<SecurityGroupPermission> securityGroupPermissions = new HashSet<SecurityGroupPermission>();
	@Id     
	@Column(length=40)
    @GeneratedValue(generator = "system-uuid")     
    @GenericGenerator(name = "system-uuid", strategy = "uuid") 
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Column(unique=true)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	@OneToMany(mappedBy="securityGroup",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	public Set<UserSecurityGroup> getUserSecurityGroups() {
		return userSecurityGroups;
	}
	public void setUserSecurityGroups(Set<UserSecurityGroup> userSecurityGroups) {
		this.userSecurityGroups = userSecurityGroups;
	}
	@OneToMany(mappedBy="securityGroup",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	public Set<SecurityGroupPermission> getSecurityGroupPermissions() {
		return securityGroupPermissions;
	}
	public void setSecurityGroupPermissions(
			Set<SecurityGroupPermission> securityGroupPermissions) {
		this.securityGroupPermissions = securityGroupPermissions;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	@Column(name="company_id",length=40)
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	
}
