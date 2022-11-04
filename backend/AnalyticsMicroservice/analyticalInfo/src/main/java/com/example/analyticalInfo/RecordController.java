package com.example.analyticalInfo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//Record(Date searchDate, String action, String origen, String iP)

@RestController
public class RecordController {
	private final RecordRepository repository;
	
	RecordController(RecordRepository repository){
		this.repository=repository;
	}
	
	@GetMapping("/records/all")
	public List<Record> getAllRecords() {
		return repository.findAll();
	}
	
	@GetMapping("/records/date/{date}")
	public List<Record> getRecordsByDate(@PathVariable String date) throws ParseException{
		List<Record> listResult = new ArrayList<>();
		List<Record> listAll = repository.findAll();
		
		if(listAll!=null) {
			for(int i=0;i<listAll.size();i++) {
				if(new SimpleDateFormat("yyyy-MM-dd").parse(listAll.get(i).getDate().toString()).equals(new SimpleDateFormat("yyyy-MM-dd").parse(date))){
					listResult.add(listAll.get(i));
				}
			}
		}
		return listResult;
	}
	
	@GetMapping("/records/ip/{ip}")
	public List<Record> getRecordsByIP(@PathVariable String ip){
		List<Record> listResult = new ArrayList<>();
		List<Record> listAll = repository.findAll();
		if(listAll!=null) {
			for(int i=0;i<listAll.size();i++) {
				if(listAll.get(i).getIP().equals(ip)){
					listResult.add(listAll.get(i));
				}
			}
		}
		return listResult;
	}
	
	@PostMapping("/records/save")
	public String saveRecord(@RequestBody Record record) {
		if (record == repository.save(record))
			return "Record successfully.";
		else
			return "Record failed.";
	}

}
