package com.assesment.booking;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookingController { 
	private final BookingRepository repository;

	BookingController(BookingRepository repository) {
		this.repository = repository;
	}
	
	@PostMapping("/booking")
	public String bookFlight(@RequestBody Booking booking) {
		System.out.println(booking);
		if (booking == repository.save(booking))
			return "Booking made successfully.";
		else
			return "Booking made failed.";
	}

	@GetMapping("/booking/list")
	public List<Booking> bookingList() {
		return repository.findAll();
	}

	@GetMapping("/booking/list/{name}+{surname}")
	public List<Booking> bookingListByName(@PathVariable String name, @PathVariable String surname) {
		List<Booking> bookingList = repository.findAll();
		List<Booking> bookingListUser = new ArrayList<Booking>();

		for (int i = 0; i < bookingList.size(); i++) {
			if (bookingList.get(i).getName().equals(name) && bookingList.get(i).getSurname().equals(surname))
				bookingListUser.add(bookingList.get(i));
		}

		return bookingListUser;
	}	
}
