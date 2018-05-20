package com.redm.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

/**
 * 用户权限组权限类
 * @author Jelly
 *
 */
//@Entity
//@Table(name="USER_SECURITY_GROUP_PERMISSION")
public class UserSecurityGroupPermission {
	private String id;
	private SystemPermission systemPermission;
	private SecurityGroup securityGroup;
	private UserInfo userInfo;
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
	@ManyToOne
	@JoinColumn(name="user_id")
	public UserInfo getUserInfo() {
		return userInfo;
	}
	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}
}
