package com.clinic.backend.repository;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.clinic.backend.entity.Doctor;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class DoctorRepository {

    private final ObjectMapper objectMapper;

    public DoctorRepository(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<Doctor> getAllDoctors() {

        try {

            File file = new File("src/main/resources/data/doctors.json");

            return objectMapper.readValue(
                file,
                new TypeReference<List<Doctor>>() {}
            );

        } catch (IOException e) {

            throw new RuntimeException("Unable to read doctors.json", e);
        }
    }
}