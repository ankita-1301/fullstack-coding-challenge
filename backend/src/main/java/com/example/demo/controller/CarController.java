package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Car;
import com.example.demo.service.CarService;

@RestController
public class CarController {
	
	@Autowired
	private CarService carService;
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public Car create(@RequestBody Car c) {
		Car car = carService.create(c);
		return car;
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
	public Car update(@RequestBody Car c) {
		Car updatedCar = carService.update(c);
		return updatedCar;
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
