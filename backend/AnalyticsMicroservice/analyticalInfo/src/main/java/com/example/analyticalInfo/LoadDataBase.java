package com.example.analyticalInfo;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
   
  @Bean
  CommandLineRunner initAnalyticalDatabase(RecordRepository repository) {

    return args -> {
      log.info("Preloading " + repository.save(new Record(new Date("11/01/2022"),"GET /booking/list BookingAPI","Sevilla","210.10.5.4")));
      log.info("Preloading " + repository.save(new Record(new Date("11/02/2022"),"POST /booking BookingAPI","Madrid","40.10.2.4")));
      log.info("Preloading " + repository.save(new Record(new Date("11/02/2022"),"GET /booking/list BookingAPI","Barcelona","120.10.5.4")));
    };
  }
}
