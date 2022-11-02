package com.assessment.flight.flight.assessment.flights;

import java.time.LocalDate;
import java.util.Arrays;

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
	      log.info("Preloading " + repository.save(new Flight("Vueling", LocalDate.of(2022, 10, 31), "Sevilla", "Madrid", null, true)));
	      log.info("Preloading " + repository.save(new Flight("Rayanair", LocalDate.of(2022, 10, 31), "Sevilla", "Berlin", Arrays.asList("Madrid", "Paris"), false)));
	      log.info("Preloading " + repository.save(new Flight("Iberia", LocalDate.of(2022, 11, 01), "Paris", "Barcelona", null, true)));

	    };
	  }
}
