package com.assessment.flight.flight.assessment.flights;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController 
public class FlightController{
	@Autowired
	private static FlightRepository repository;
	
	public FlightController(FlightRepository repository){
		this.repository = repository;
	}
	
	@GetMapping ("/flights")
	public static List<Flight> availableFlights(){
		return repository.findAll();
	}
	
	@GetMapping ("/flight/{id}")
	public Flight getFlightById(@PathVariable long id) {
		Optional<Flight> myFlight = repository.findById(id);
		return myFlight.get();
	}
	
	//Metodo para devolver los vuelos en una fecha
	@GetMapping ("/flight/{date}/{origin}/{destination}")
	public static List<Flight> availableFlightsFromACityAndDate
	(@PathVariable LocalDate date, @PathVariable String origin, @PathVariable String destination) {
		if(repository.findAll()!=null) {
			return FlightDaoService.getByDate(repository.findAll(), date, origin, destination);
		}
		return null;
	}
	
	//Metodo restar asiento
	@PutMapping ("/flight/reserva/{id}")
	public static void reservaAsiento(@PathVariable Long id) {
		Optional<Flight> myFlight = repository.findById(id);
		if(myFlight!=null) myFlight.get().cogeAsiento();	
		System.out.println(myFlight.get().getNumAsientos());
	}
	
	//Get flights from origin
	@GetMapping ("/flights/{origin}")
	public static List<Flight> getVuelosSegunOrigen(@PathVariable String origin){
		List<Flight> vuelos = repository.findAll();
		System.out.println(vuelos);
		List<Flight> destinos = new ArrayList<>();
		if(vuelos!=null) {
			for(Flight vuelo : vuelos) {
				if(vuelo.getOrigin() == origin) destinos.add(vuelo);
			}
		}
		return destinos;
	}
	
	@GetMapping ("/flights/{destinations}")
	public static List<String> getDestinosSegunOrigen(@PathVariable String origin){
		List<Flight> vuelos = repository.findAll();
		List<String> destinos = new ArrayList<>();
		for(Flight vuelo : vuelos) {
			if(vuelo.getOrigin() == origin) destinos.add(vuelo.getDestination());
		}
		return destinos;
	}
	
	@PostMapping ("/flights/save")
	public String bookFlight(@RequestBody Flight flight) {
		if (flight == repository.save(flight))
			return "Booking made successfully.";
		else
			return "Booking made failed.";
	}
	
	
}
