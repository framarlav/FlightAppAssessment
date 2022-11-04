package com.assessment.prices.microservice;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity 
public class Price {
	
	private @Id @GeneratedValue Long id;
	
	public Price() {}
	
}
