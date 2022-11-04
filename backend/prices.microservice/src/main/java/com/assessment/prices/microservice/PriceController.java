package com.assessment.prices.microservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.json.*;

@RestController 
public class PriceController{
	
	//Metodo restar asiento
	@GetMapping ("/price/{price}/{children0}/{children2}/{children9}")
	public static int addPrice(@PathVariable String price, @PathVariable String children0, @PathVariable String children2, @PathVariable String children9) {
		
		int precio = Integer.parseInt(price);
	
		for(int i = 0; i < Integer.parseInt(children9); i++) {
			precio = precio+20;
		}
		for(int i = 0; i < Integer.parseInt(children2); i++) {
			precio = precio+30;
		}
		for(int i = 0; i < Integer.parseInt(children9); i++) {
			precio = precio+40;
		}
		return precio;
	}
	
	
	
}
