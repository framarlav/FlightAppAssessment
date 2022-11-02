package com.assessment.flight.flight.assessment;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import io.restassured.matcher.RestAssuredMatchers.*;
import io.restassured.path.json.JsonPath;
import io.restassured.RestAssured;

@SpringBootTest
class ApplicationTests {

	@Test
	void getAllFlights() {
		Assert.assertNotNull(FlightController.AvailableFlights());
	}
	
	@Test
	void bookFlight_giveBookingObject_returnsSuccess() {

		RestAssured.baseURI = "http://localhost:8080";
		String response = given().log().all().header("Content-Type", "application/json").body(payload.addFlight())
				.when().post("/flights")
				.then().assertThat().statusCode(200).extract().asString();

		assertThat(response.equals("This is the only available flight:"));
		System.out.println(response);
	}
	
	@Test 
	void getAvailableFlights_givenOriginDateDest() {
		LocalDate date = LocalDate.of(2022, 10, 31);
		String origin = "Sevilla";
		String destination = "Madrid";
		
		Assert.assertNotNull(FlightController.availableFlightsFromACityAndDate(date, origin, destination));
	}
	
	@Test
	void getFlights_givenDateOriginDestination_returnsError() {

		RestAssured.baseURI = "http://localhost:8080";
		String response = given().log().all().when().get("/flight/2022-10-31+Sevilla+Madrid").then()
				.assertThat().statusCode(200).extract().asString();
		System.out.println(response);

		JsonPath js = new JsonPath(response);

		assertThat(js.getList(DEFAULT_BODY_ROOT_PATH).isEmpty());
	}
	
	@Test
	void bookSeat() {
		Assert.fail(FlightController.reservaAsiento(125), "No se ha encontrado ese vuelo");
	}
	
	@Test
	void getFlights_givenOrigin() {
		Assert.fail(FlightController.getVuelosSegunOrigen("Valencia"), "No existe ese destino");
	}
	
	@Test
	void getDestinations_givenOrigin() {
		String origin = "Sevilla";
		String[] possibleDestinations = {"Madrid", "Paris", "Berlin", "Barcelona"};
		
		Assert.isEsqual(getDestinosSegunOrigen("Sevilla"), possibleDestinations);
	}
	
	
}
