package com.assesment.booking;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import io.restassured.matcher.RestAssuredMatchers.*;
import io.restassured.RestAssured;
import io.restassured.path.json.JsonPath;

@SpringBootTest
class BookingApplicationTests {

	@Test
	void bookFlight_giveBookingObject_returnsSuccess() {
		
		RestAssured.baseURI= "http://localhost:8080";
		String response=given().log().all().header("Content-Type","application/json")
		.body(payload.addBooking()).when().post("/booking")
		.then().assertThat().statusCode(200).extract().asString();
		
		System.out.println(response);
	}

}
