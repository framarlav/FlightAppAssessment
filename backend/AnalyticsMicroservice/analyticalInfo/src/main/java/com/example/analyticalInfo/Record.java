package com.example.analyticalInfo;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Record {
	
	private @Id @GeneratedValue Long id; 
	private Date date; 
	private String action; 
	private String origin; 
	private String IP;
	
	public Record() {}
	
	public Record(Date date, String action, String origin, String IP) {
		super();
		this.date = date;
		this.action = action;
		this.origin = origin;
		this.IP = IP;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origen) {
		this.origin = origen;
	}

	public String getIP() {
		return IP;
	}

	public void setIP(String iP) {
		this.IP = iP;
	} 
	
	 @Override
	    public String toString() {
	        return "Record{" +
	                "id=" + id +
	                ", Date='" + date + '\'' +
	                ", make='" + action + '\'' +
	                ", model='" + origin + '\'' +
	                ", status='" + IP + '\'' +
	                '}';
	    }
	
	
	
	

}
