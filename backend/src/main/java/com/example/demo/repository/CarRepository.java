package com.example.demo.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Car;

@Repository

public interface CarRepository extends MongoRepository<Car, List<Car>>{
	public Car findById(String id);
	public Car save(Car c);
}
