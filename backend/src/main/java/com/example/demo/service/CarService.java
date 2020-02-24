package com.example.demo.service;

import com.example.demo.model.Car;
import com.example.demo.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

	@Autowired
	private CarRepository carRepository;
	
	//Create operation
	public Car create(Car c) {
		return carRepository.save(c);
	}
	
	//Retrieve operation
	public List<Car> getAll(){
		return carRepository.findAll();
	}

	public Car getById(String id) {
		return carRepository.findById(id);
	}

	//Update operation
	public Car update(Car c) {
		return carRepository.save(c);
	}
	
	//Delete operation
	public void deleteAll() {
		carRepository.deleteAll();
	}
	
	public void delete(String id) {
		Car c = carRepository.findById(id);
		carRepository.delete(c);
	}
}
