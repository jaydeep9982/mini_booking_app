
package com.clinic.backend.repository;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.clinic.backend.entity.Clinic;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class ClinicRepository {

    private final ObjectMapper objectMapper;

    public ClinicRepository(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<Clinic> getAllClinics() {

        try {
            File file = new File("src/main/resources/data/clinics.json");

            List<Clinic> clinics = objectMapper.readValue(
                file,
                new TypeReference<List<Clinic>>() {}
            );

            return clinics;

        } catch (IOException e) {
            throw new RuntimeException("Unable to read clinics.json", e);
        }
    }
}
