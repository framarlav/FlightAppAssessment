package com.example.analyticalInfo;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.analyticalInfo.payload;

import io.restassured.RestAssured;
import io.restassured.path.json.JsonPath;

@SpringBootTest
class AnalyticalInfoApplicationTests {

	@Test
	void saveRecord_giveRecordObject_returnsSuccess() {
		RestAssured.baseURI = "http://localhost:8080";
		String response = given().log().all().header("Content-Type", "application/json").body(payload.addRecord())
				.when().post("/records/save")
				.then().assertThat().statusCode(200).extract().asString();
		
		assertThat(response.equals("Record successfully."));
		
	}
	
	@Test
	void getRecords_makeCall_returnsRecordList() {
		RestAssured.baseURI = "http://localhost:8080";
		String response = given().log().all()
				.when().get("/records/all")
				.then().assertThat().statusCode(200).extract().asString();
		JsonPath js = new JsonPath(response);
		System.out.println(js.getList("").toString());
		assertThat(!js.getList("").isEmpty());
		
	}

}
