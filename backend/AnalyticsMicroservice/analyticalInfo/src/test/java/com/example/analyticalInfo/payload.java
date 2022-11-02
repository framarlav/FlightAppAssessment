package com.example.analyticalInfo;

public class payload {
	
	public static String addRecord()
	{
		return "{\r\n"
				+ "    \"date\":\"2022-11-02\",\r\n"
				+ "    \"action\":\"GET /booking/list BookingAPI\",\r\n"
				+ "    \"origin\":\"Madrid\",\r\n"
				+ "    \"ip\":\"222.56.17.99\"\r\n"
				+ "}";

	}
}
