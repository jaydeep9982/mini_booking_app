package com.clinic.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.clinic.backend.entity.Booking;
import com.clinic.backend.entity.Slot;
import com.clinic.backend.repository.BookingRepository;
import com.clinic.backend.repository.SlotRepository;

@Service
public class SlotService {

    private final SlotRepository slotRepository;
    private final BookingRepository bookingRepository;

    public SlotService(
            SlotRepository slotRepository,
            BookingRepository bookingRepository) {

        this.slotRepository = slotRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<Slot> getAvailableSlots() {

        List<Slot> allSlots = slotRepository.getAllSlots();

        List<Booking> allBookings = bookingRepository.getAllBookings();

        List<Slot> availableSlots = new ArrayList<>();

        for (Slot slot : allSlots) {

            boolean isBooked = false;

            for (Booking booking : allBookings) {

                if (slot.getId().equals(booking.getSlotId())) {
                    isBooked = true;
                    break;
                }
            }

            if (!isBooked) {
                availableSlots.add(slot);
            }
        }

        return availableSlots;
    }
}