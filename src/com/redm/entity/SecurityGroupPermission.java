package com.redm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 权限组权限类
 * @author Jelly
 *
 */
@Entity
@Table(name="SECURITY_GROUP_PERMISSION")
public class SecurityGroupPermission {
	private String id;
	private SystemPermission systemPermission;
	private SecurityGroup securityGroup;
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
	@ManyToOne
	@JoinColumn(name="permission_id")
	public SystemPermission getSystemPermission() {
		return systemPermission;
	}
	public void setSystemPermission(SystemPermission systemPermission) {
		this.systemPermission = systemPermission;
	}
	@ManyToOne
	@JoinColumn(name="security_group_id")
	public SecurityGroup getSecurityGroup() {
		return securityGroup;
	}
	public void setSecurityGroup(SecurityGroup securityGroup) {
		this.securityGroup = securityGroup;
	}
}
