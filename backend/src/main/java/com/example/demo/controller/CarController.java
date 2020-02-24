package com.example.demo.controller;

import com.example.demo.model.Car;
import com.example.demo.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CarController {
	
	@Autowired
	private CarService carService;

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public Car create(@RequestBody Car car) {
		return carService.create(car);
	}
	
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public Car getMake(@RequestParam String Id) {
		return carService.getById(Id);
	}
	
	@RequestMapping("/getAll")
	public List<Car> getAll(){
		return carService.getAll();
	}
	
	@RequestMapping(value="/update", method= RequestMethod.PUT)
	public Car update(@RequestBody Car car) {
		return carService.update(car);
	}
	
	@RequestMapping("/delete")
	public String delete(@RequestParam String id) {
		carService.delete(id);
		return "Deleted "+id;
	}
	
	@RequestMapping ("/deleteAll")
	public String deleteAll() {
		carService.deleteAll();
		return "Deleted all records";
	}
}
