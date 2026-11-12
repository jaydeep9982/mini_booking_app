package com.clinic.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.clinic.backend.dto.BookingRequest;
import com.clinic.backend.entity.Booking;
import com.clinic.backend.entity.Slot;
import com.clinic.backend.repository.BookingRepository;
import com.clinic.backend.repository.SlotRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;

    public BookingService(
            BookingRepository bookingRepository,
            SlotRepository slotRepository) {

        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
    }

    public Booking createBooking(BookingRequest request) {

        // Get all available slot records
        List<Slot> slots = slotRepository.getAllSlots();

        // Check whether slot exists
        boolean slotExists = false;

        for (Slot slot : slots) {

            if (slot.getId().equals(request.getSlotId())) {
                slotExists = true;
                break;
            }
        }

        if (!slotExists) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Slot not found");
        }

        // Get existing bookings
        List<Booking> bookings = bookingRepository.getAllBookings();

        // Check whether slot is already booked
        for (Booking booking : bookings) {

            if (booking.getSlotId().equals(request.getSlotId())) {

                throw new ResponseStatusException(
                        HttpStatus.CONFLICT, "Slot already booked");
            }
        }

        // Create new booking
        Booking booking = new Booking();

        booking.setId(UUID.randomUUID().toString());
        booking.setPatient(request.getPatient());
        booking.setAnswers(request.getAnswers());
        booking.setSlotId(request.getSlotId());
        booking.setCreatedAt(LocalDateTime.now());

        // Add booking to existing list
        bookings.add(booking);

        // Save updated list in JSON file
        bookingRepository.saveBookings(bookings);

        return booking;
    }
    
    
    public List<Booking> getAllBookings() {
        return bookingRepository.getAllBookings();
    }
    
    
    public Booking getBookingById(String id) {
        Booking booking = bookingRepository.getBookingById(id);

        if (booking == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Booking not found"
            );
        }

        return booking;
    }
}