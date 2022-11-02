package com.assessment.flight.flight.assessment.flights;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface FlightRepository extends JpaRepository<Flight, Long>{
	
	//public  List<Flight> getByDate(LocalDate date, String origin, String destination) ;
	
}
