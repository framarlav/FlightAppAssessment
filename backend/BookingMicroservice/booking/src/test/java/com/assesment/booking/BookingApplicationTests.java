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

		RestAssured.baseURI = "http://localhost:8080";
		String response = given().log().all().header("Content-Type", "application/json").body(payload.addBooking())
				.when().post("/booking").then().assertThat().statusCode(200).extract().asString();

		assertThat(response.equals("Booking made successfully."));
		System.out.println(response);
	}

	@Test
	void bookingListByName_giveNameAndSurname_returnsListBookings() {

		Booking objectTest = new Booking("Francisco Javier", "Marquez Lavado", "Spanish", "20965500B", 22, 150.0f, 1L);
		objectTest.toString();
		RestAssured.baseURI = "http://localhost:8080";
		String response = given().log().all().when().get("/booking/list/Francisco Javier+Marquez Lavado").then()
				.assertThat().statusCode(200).extract().asString();
		//System.out.println(response);
		JsonPath js = new JsonPath(response);
		String res = js.getList(DEFAULT_BODY_ROOT_PATH).get(0).toString();

		/*
		System.out.println(js.getString("age"));
		System.out.println(js.getString("name")+js.getString("surname")+js.getString("nationality")+
				js.getString("identification")+js.getString("age"));
		Booking res = new Booking(js.getString("name"), js.getString("surname"), js.getString("nationality"),
				js.getString("identification"), 22, 15.0f, 1L);*/
		//res.setId(1L);
		System.out.println(res.toString());
		assertThat(objectTest.equals(res));
	}

	@Test
	void bookingListByName_giveInvalidNameAndSurname_returnsError() {

		RestAssured.baseURI = "http://localhost:8080";
		String response = given().log().all().when().get("/booking/list/Francisco Javier+Mrrrrr Lavado").then()
				.assertThat().statusCode(200).extract().asString();
		System.out.println(response);

		JsonPath js = new JsonPath(response);

		assertThat(js.getList(DEFAULT_BODY_ROOT_PATH).isEmpty());
	}

}
