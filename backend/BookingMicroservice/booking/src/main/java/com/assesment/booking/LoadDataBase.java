package com.assesment.booking;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
   
  @Bean
  CommandLineRunner initBookingDatabase(BookingRepository repository) {

    return args -> {
      log.info("Preloading " + repository.save(new Booking("Francisco Javier","Marquez Lavado","Spanish","20965500B",22,150.00f,1L)));
      log.info("Preloading " + repository.save(new Booking("Joao Felix","Silva","Portuguese","15205500Y",24,80.00f,2L)));
      log.info("Preloading " + repository.save(new Booking("Maria","Sanchez Garcia","Spanish","20915570C",45,120.00f,3L)));
      log.info("Preloading " + repository.save(new Booking("Almudena","Adamez Fuentes","Spanish","20471500F",36,130.00f,4L)));
    };
  }
}
