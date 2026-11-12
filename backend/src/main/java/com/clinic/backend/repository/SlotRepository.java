package com.clinic.backend.repository;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.clinic.backend.entity.Slot;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class SlotRepository {

    private final ObjectMapper objectMapper;

    public SlotRepository(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<Slot> getAllSlots() {

        try {

            File file = new File("src/main/resources/data/slots.json");

            return objectMapper.readValue(
                file,
                new TypeReference<List<Slot>>() {}
            );

        } catch (IOException e) {

            throw new RuntimeException("Unable to read slots.json", e);
        }
    }
}