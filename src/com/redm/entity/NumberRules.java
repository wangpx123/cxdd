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

@Entity
@Table(name = "NUMBER_RULES") 
public class NumberRules {

	private Integer id;
	private String name;
	private String typeserail;
	private Integer typeserialLen;
	private String year;
	private Integer yearLen;
	private String month;
	private Integer monthLen;
	private String day;
	private Integer dayLen;
	private String num;
	private Integer numberLen;
	private Date addDate;
	private String addWho;
	private Date editDate;
	private String editWho;	
   
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(length=30)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Column(length=8)
    public String getTypeserail() {
		return typeserail;
	}
	public void setTypeserail(String typeserail) {
		this.typeserail = typeserail;
	}
	
	@Column(name="typeserial_len")
	public Integer getTypeserialLen() {
		return typeserialLen;
	}
	public void setTypeserialLen(Integer typeserialLen) {
		this.typeserialLen = typeserialLen;
	}
	
	@Column(length=4)
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	@Column(name="year_len")
	public Integer getYearLen() {
		return yearLen;
	}
	public void setYearLen(Integer yearLen) {
		this.yearLen = yearLen;
	}
	
	@Column(length=4)
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	@Column(name="month_len")
	public Integer getMonthLen() {
		return monthLen;
	}
	public void setMonthLen(Integer monthLen) {
		this.monthLen = monthLen;
	}
	
	@Column(length=4)
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	@Column(name="day_len")
	public Integer getDayLen() {
		return dayLen;
	}
	public void setDayLen(Integer dayLen) {
		this.dayLen = dayLen;
	}
	
	@Column(length=20)
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
	@Column(name="number_len")
	public Integer getNumberLen() {
		return numberLen;
	}
	public void setNumberLen(Integer numberLen) {
		this.numberLen = numberLen;
	}
	
	@Column(name="add_date")
    @Temporal(value=TemporalType.TIMESTAMP)
    public Date getAddDate() {
        return addDate;
    }
    public void setAddDate(Date addDate) {
        this.addDate = addDate;
    }
    @Column(name="add_who",length=30)
    public String getAddWho() {
        return addWho;
    }
    public void setAddWho(String addWho) {
        this.addWho = addWho;
    }
    @Column(name="edit_date")
    @Temporal(value=TemporalType.TIMESTAMP)
    public Date getEditDate() {
        return editDate;
    }
    public void setEditDate(Date editDate) {
        this.editDate = editDate;
    }
    @Column(name="edit_who",length=30)
    public String getEditWho() {
        return editWho;
    }
    public void setEditWho(String editWho) {
        this.editWho = editWho;
    }
	
	
}
