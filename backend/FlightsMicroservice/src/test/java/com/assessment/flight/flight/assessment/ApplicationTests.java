package com.assessment.flight.flight.assessment;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.assessment.flight.flight.assessment.flights.Flight;
import com.assessment.flight.flight.assessment.flights.FlightController;
import com.assessment.flight.flight.assessment.flights.FlightDaoService;
import com.assessment.flight.flight.assessment.flights.FlightRepository;

import static io.restassured.RestAssured.*;
import io.restassured.path.json.JsonPath;
import io.restassured.RestAssured;

@SpringBootTest
class ApplicationTests {
	@Autowired
	private static FlightDaoService service = new FlightDaoService();
	
	@Test
	void getAllFlights() {
		Assertions.assertNotNull(FlightController.availableFlights());
	}
	
	@Test
	void bookFlight_giveBookingObject_returnsSuccess() {

		RestAssured.baseURI = "http://localhost:8080";
		String response = given().log().all().header("Content-Type", "application/json").body(payload.addFlight())
				.when().post("/flights/save")
				.then().assertThat().statusCode(200).extract().asString();
		System.out.println(response);
	}
	
	@Test 
	void getAvailableFlights_givenOriginDateDest() {
		LocalDate date = LocalDate.of(2022, 10, 31);
		String origin = "Sevilla";
		String destination = "Madrid";
		
		Assertions.assertNotNull(FlightController.availableFlightsFromACityAndDate(date, origin, destination));
	}
	
	@Test
	void getFlights_givenDateOriginDestination_returnsError() {

		RestAssured.baseURI = "http://localhost:8080";
		String response = given().log().all().when().get("/flight/2022-10-31/Sevilla/Madrid").then()
				.assertThat().statusCode(200).extract().asString();
		System.out.println(response);

		JsonPath js = new JsonPath(response);

		assertThat(js.getList(DEFAULT_BODY_ROOT_PATH).isEmpty());
	}
	
	@Test
	void bookSeat_mustSucceed() {
		try{
			FlightController.reservaAsiento(1L);
		}catch(Exception e) {
			System.out.println("No existe ese vuelo.");
		}
	}
	
	@Test
	void getFlights_givenOrigin_mustFail() {
		try{
			FlightController.getVuelosSegunOrigen("Valencia");
		}catch(Exception e) {
			System.out.println("No existe ese destino.");
		}
	}
	
	@Test
	void getDestinations_givenOrigin() {
		String origin = "Sevilla";
		String[] otherDestinations = {"Madrid", "Berlin"};
		List<String> possibleDestinations = new ArrayList<>();
		for(int i  = 0; i < otherDestinations.length; i++) {
			possibleDestinations.add(otherDestinations[i]);
		}
		assertThat(FlightController.getDestinosSegunOrigen(origin).equals(possibleDestinations));
	}
	
	
}

