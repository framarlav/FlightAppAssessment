package com.assesment.booking;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Booking {
	private @Id @GeneratedValue Long id;
	private String name;
	private String surname;
	private String nationality;
	private String identification;
	private int age;
	private float price;
	private Long id_flight;
	
	public Booking() {}
	public Booking(String name, String surname, String nationality, String identification, int age, float price,
			Long id_flight) {
		super();
		this.name = name;
		this.surname = surname;
		this.nationality = nationality;
		this.identification = identification;
		this.age = age;
		this.price = price;
		this.id_flight = id_flight;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getIdentification() {
		return identification;
	}

	public void setIdentification(String identification) {
		this.identification = identification;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Long getId_flight() {
		return id_flight;
	}

	public void setId_flight(Long id_flight) {
		this.id_flight = id_flight;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", name=" + name + ", surname=" + surname + ", nationality=" + nationality
				+ ", identification=" + identification + ", age=" + age + ", price=" + price + ", id_flight="
				+ id_flight + "]";
	}
	
}
