
package com.clinic.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.clinic.backend.dto.RecommendationRequest;
import com.clinic.backend.entity.Answers;
import com.clinic.backend.entity.Booking;
import com.clinic.backend.entity.Clinic;
import com.clinic.backend.entity.Doctor;
import com.clinic.backend.entity.Slot;

import com.clinic.backend.repository.BookingRepository;
import com.clinic.backend.repository.ClinicRepository;
import com.clinic.backend.repository.DoctorRepository;
import com.clinic.backend.repository.SlotRepository;

@Service
public class RecommendationService {

    private final SlotRepository slotRepository;
    private final DoctorRepository doctorRepository;
    private final ClinicRepository clinicRepository;
    private final BookingRepository bookingRepository;

    public RecommendationService(
            SlotRepository slotRepository,
            DoctorRepository doctorRepository,
            ClinicRepository clinicRepository,
            BookingRepository bookingRepository) {

        this.slotRepository = slotRepository;
        this.doctorRepository = doctorRepository;
        this.clinicRepository = clinicRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<Slot> getRecommendations(RecommendationRequest request) {

        // Get data from repositories
        List<Slot> slots = slotRepository.getAllSlots();
        List<Doctor> doctors = doctorRepository.getAllDoctors();
        List<Clinic> clinics = clinicRepository.getAllClinics();
        List<Booking> bookings = bookingRepository.getAllBookings();

        Answers answers = request.getAnswers();

        // 1. Find required doctor type
        String requiredType;

        if (answers.getReason().name().equals("EYE_PROBLEM")) {
            requiredType = "Ophthalmologist";
        } else {
            requiredType = "Optometrist";
        }

        // 2. Get booked slot IDs
        List<String> bookedSlotIds = new ArrayList<>();

        for (Booking booking : bookings) {
            bookedSlotIds.add(booking.getSlotId());
        }

        // 3. Filter available slots by doctor type
        // Also remove already booked slots
        List<Slot> result = new ArrayList<>();

        for (Slot slot : slots) {

            if (bookedSlotIds.contains(slot.getId())) {
                continue;
            }

            for (Doctor doctor : doctors) {

                if (doctor.getId().equals(slot.getDoctorId())
                        && doctor.getType().equalsIgnoreCase(requiredType)) {

                    result.add(slot);
                    break;
                }
            }
        }

        // 4. Filter by selected clinic
        String selectedClinic = answers.getClinicId().name();

        if (!selectedClinic.equals("ANY")) {

            List<Slot> clinicSlots = new ArrayList<>();

            for (Slot slot : result) {

                for (Doctor doctor : doctors) {

                    if (doctor.getId().equals(slot.getDoctorId())
                            && doctor.getClinicId().equals(selectedClinic)) {

                        clinicSlots.add(slot);
                        break;
                    }
                }
            }

            result = clinicSlots;
        }

        // 5. Sort using all remaining priorities
        int patientZip = Integer.parseInt(request.getPatient().getZip());

        String timePreference = answers.getTimeOfDay().name();

        result.sort((s1, s2) -> {

            // Priority 1: Closest ZIP code (only for ANY clinic)
            if (selectedClinic.equals("ANY")) {

                int distance1 = getZipDistance(
                        s1, doctors, clinics, patientZip);

                int distance2 = getZipDistance(
                        s2, doctors, clinics, patientZip);

                if (distance1 != distance2) {
                    return Integer.compare(distance1, distance2);
                }
            }

            // Priority 2: Matching time preference
            if (!timePreference.equals("ANY")) {

                boolean match1 = isTimeMatching(s1, timePreference);
                boolean match2 = isTimeMatching(s2, timePreference);

                if (match1 != match2) {
                    return Boolean.compare(match2, match1);
                }
            }

            // Priority 3: Earliest appointment
            return s1.getStart().compareTo(s2.getStart());
        });

        // 6. Return only top 3 slots
        if (result.size() > 3) {
            return new ArrayList<>(result.subList(0, 3));
        }

        return result;
    }

    // Calculate ZIP-code difference
    private int getZipDistance(
            Slot slot,
            List<Doctor> doctors,
            List<Clinic> clinics,
            int patientZip) {

        for (Doctor doctor : doctors) {

            if (doctor.getId().equals(slot.getDoctorId())) {

                for (Clinic clinic : clinics) {

                    if (clinic.getId().equals(doctor.getClinicId())) {

                        int clinicZip = Integer.parseInt(clinic.getZip());

                        return Math.abs(patientZip - clinicZip);
                    }
                }
            }
        }

        return Integer.MAX_VALUE;
    }

    // Check time preference
    private boolean isTimeMatching(Slot slot, String preference) {

        int hour = slot.getStart().getHour();

        if (preference.equals("MORNING")) {
            return hour < 12;
        }

        if (preference.equals("AFTERNOON")) {
            return hour >= 12;
        }

        return true;
    }
}
