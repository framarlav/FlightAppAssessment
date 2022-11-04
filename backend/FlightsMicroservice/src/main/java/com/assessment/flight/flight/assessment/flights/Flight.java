package com.assessment.flight.flight.assessment.flights;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity 
public class Flight {
	
	private @Id @GeneratedValue Long id;
	private String airline;
	private LocalDate date;
	private String origin;
	private String destination;
	private List<String> scales;
	private Boolean luggage;
	private int numAsientos = 150;
	private int precio = 80;
	
	public Flight() {}
	
	public Flight(String airline,LocalDate date, String origin, String destination, List<String> scales, Boolean luggage) {
		this.airline = airline;
		this.date = date;
		this.origin = origin;
		this.destination = destination;
		this.scales = scales;
		this.luggage = luggage;
	}

	public String getAirline() {
		return airline;
	}

	public void setAirline(String airline) {
		this.airline = airline;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public List<String> getScales() {
		return scales;
	}

	public void setScales(List<String> scales) {
		this.scales = scales;
	}

	public Boolean getLuggage() {
		return luggage;
	}

	public void setLuggage(Boolean luggage) {
		this.luggage = luggage;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}
	
	public int getNumAsientos() {
		return numAsientos;
	}

	public void setNumAsientos(int numAsientos) {
		this.numAsientos = numAsientos;
	}
	
	public void cogeAsiento() {
		this.numAsientos--;
	}

	public int getPrecio() {
		return precio;
	}

	public void setPrecio(int precio) {
		this.precio = precio;
	}

	@Override
	public String toString() {
		return "Flight [id=" + id + ", airline=" + airline + ", date=" + date + ", origin=" + origin + ", destination="
				+ destination + ", scales=" + scales + ", luggage=" + luggage + ", numAsientos=" + numAsientos
				+ ", precio=" + precio + "]";
	}
	
}
