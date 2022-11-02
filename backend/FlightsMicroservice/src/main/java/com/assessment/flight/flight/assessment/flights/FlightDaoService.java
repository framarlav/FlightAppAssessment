package com.assessment.flight.flight.assessment.flights;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class FlightDaoService {
	
	public static List<Flight> getByDate(List<Flight> vuelos, LocalDate date, String origin, String destination) {
			List<Flight> listaDevolver = new ArrayList<>();
			for(Flight vuelo : vuelos) {
				if(vuelo.getDate().equals(date) && vuelo.getOrigin().equals(origin) && vuelo.getDestination().equals(destination)) {
					listaDevolver.add(vuelo);
				}
			}
			return listaDevolver;
	}

}
