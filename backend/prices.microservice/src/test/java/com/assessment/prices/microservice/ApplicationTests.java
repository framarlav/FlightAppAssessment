package com.assessment.prices.microservice;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApplicationTests {
	
	@Test
	public void givenPriceAndFlight_returnsNewPrice() {
		String price = "80";
		String child1 = "1";
		String child2 = "1";
		String child3 = "1";
		int precio = PriceController.addPrice(price, child1, child2, child3);
		Assertions.assertEquals(170, precio);
		
	}
	
}

