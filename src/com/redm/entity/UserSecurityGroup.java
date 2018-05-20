package com.redm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * 用户权限组类
 * @author Jelly
 *
 */
@Entity
@Table(name="USER_SECURITY_GROUP")
public class UserSecurityGroup {
	private String id;
	private UserInfo userInfo;
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
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	public UserInfo getUserInfo() {
		return userInfo;
	}
	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="security_group_id")
	public SecurityGroup getSecurityGroup() {
		return securityGroup;
	}
	public void setSecurityGroup(SecurityGroup securityGroup) {
		this.securityGroup = securityGroup;
	}
}
