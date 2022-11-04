package com.assessment.flight.flight.assessment.flights;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class LoadDatabase {
	private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
	
	@Bean
	CommandLineRunner initDatabase(FlightRepository repository) {
	  return args -> {
		List<Flight> load = preloadDatabase();
		for(Flight element : load) {
			log.info("Preloading" + repository.save(element));
		}
		
	    log.info("Preloading " + repository.save(new Flight("Vueling", LocalDate.of(2022, 10, 31), "Sevilla", "Madrid", null, true)));
	    log.info("Preloading " + repository.save(new Flight("Rayanair", LocalDate.of(2022, 10, 31), "Sevilla", "Berlin", Arrays.asList("Madrid", "Paris"), false)));
	    log.info("Preloading " + repository.save(new Flight("Iberia", LocalDate.of(2022, 11, 01), "Paris", "Barcelona", null, true)));
	   };
	}
	
	public List<Flight> preloadDatabase() {
		List<String> places = new ArrayList<>();
		places.add("Sevilla");
		places.add("Madrid");
		places.add("Paris");
		places.add("Berlin");
		places.add("Barcelona");
		
		List<String> airlines = new ArrayList<>();
		airlines.add("Vueling");
		airlines.add("Iberia");
		airlines.add("Ryanair");
		airlines.add("Fly Emirates");
		
		LocalDate date = LocalDate.now();
		String randomOrigin, randomDestination, randomAirline;
		boolean randomBoolean;
		List<Flight> response = new ArrayList<>();
		Random rand = new Random();
		
		for(int i = 0; i < 50; i++) {
			for(int j = 0; j < 3; j++) {
				randomAirline = airlines.get(rand.nextInt(airlines.size()));
				randomOrigin = places.get(rand.nextInt(places.size()));
				randomBoolean = new Random().nextBoolean();
				do {
					randomDestination = places.get(rand.nextInt(places.size()));
				}while(randomOrigin.equals(randomDestination));
 				response.add(new Flight(randomAirline, date, randomOrigin, randomDestination, null, randomBoolean));
			}
			date = date.plusDays(1);
		}
		
		return response;
	}
	
}
