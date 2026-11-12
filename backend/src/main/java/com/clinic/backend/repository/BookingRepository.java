package com.clinic.backend.repository;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.clinic.backend.entity.Booking;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class BookingRepository {

    private final ObjectMapper objectMapper;

    public BookingRepository(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    // Read all bookings
    public List<Booking> getAllBookings() {

        try {

            File file = new File("src/main/resources/data/bookings.json");

            return objectMapper.readValue(
                file,
                new TypeReference<List<Booking>>() {}
            );

        } catch (IOException e) {

            throw new RuntimeException("Unable to read bookings.json", e);
        }
    }

    // Save bookings into JSON file
    public void saveBookings(List<Booking> bookings) {

        try {

            File file = new File("src/main/resources/data/bookings.json");

            objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValue(file, bookings);

        } catch (IOException e) {

            throw new RuntimeException("Unable to save bookings.json", e);
        }
    }
    
    public Booking getBookingById(String id) {
        List<Booking> bookings = getAllBookings();

        for (Booking booking : bookings) {
            if (booking.getId().equals(id)) {
                return booking;
            }
        }

        return null;
    }
}