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
	
	//GetDestinations3daysbeforeandafter
	@GetMapping ("/flights/destinations/possibleFlights/{date}/{origin}/{destination}")
	public static List<Flight> getFlights_daysBeforeAndAfter_andActual(@PathVariable LocalDate date, @PathVariable String origin, @PathVariable String destination){
		List<Flight> flights = new ArrayList<>();
		List<Flight> newFlights = new ArrayList<>();	
		date = date.minusDays(3);
		for(int i = 7; i > 0; i--) {
			if(i == 0 && i<3) {
				flights = availableFlightsFromACityAndDate(date, origin, destination);
				newFlights.addAll(flights);
			}
			if(i == 3) {
				flights = availableFlightsFromACityAndDate(date, origin, destination);
				newFlights.addAll(flights);
			}
			if(i>3 && i<=7) {
				flights = availableFlightsFromACityAndDate(date, origin, destination);
				newFlights.addAll(flights);
			}
			date = date.plusDays(1);
		}
			
		return newFlights;
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
		List<Flight> destinos = new ArrayList<>();
		if(vuelos!=null) {
			for(Flight vuelo : vuelos) {
				System.out.println(origin);
				if(vuelo.getOrigin().equals(origin)) destinos.add(vuelo);
			}
			return destinos;
		}
		System.out.println("DESTINOS" + destinos);
		return destinos;
	}
	
	@GetMapping ("/flights/destinations/{destinations}")
	public static List<String> getDestinosSegunOrigen(@PathVariable String destinations){
		List<Flight> vuelos = repository.findAll();
		List<String> destinos = new ArrayList<>();
		for(Flight vuelo : vuelos) {
			if(vuelo.getOrigin().equals(destinations) && !destinos.contains(vuelo.getDestination())) destinos.add(vuelo.getDestination());
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
