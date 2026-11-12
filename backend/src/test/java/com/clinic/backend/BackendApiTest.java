
package com.clinic.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.nio.file.Files;
import java.nio.file.Path;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final Path bookingsFile =
            Path.of("src/main/resources/data/bookings.json");

    @Test
    void testAllEndpoints() throws Exception {

        // Backup bookings.json before testing
        byte[] originalData = Files.readAllBytes(bookingsFile);

        try {

            // 1. GET Clinics
            mockMvc.perform(get("/api/clinics"))
                    .andExpect(status().isOk());

            // 2. GET Doctors
            mockMvc.perform(get("/api/doctors"))
                    .andExpect(status().isOk());

            // 3. GET Available Slots
            MvcResult slotsResult = mockMvc.perform(get("/api/slots"))
                    .andExpect(status().isOk())
                    .andReturn();

            JsonNode slots = objectMapper.readTree(
                    slotsResult.getResponse().getContentAsString());

            assertTrue(slots.size() > 0, "No available slots found");

            // Select first available slot
            String slotId = slots.get(0).get("id").asText();

            // 4. GET All Bookings
            mockMvc.perform(get("/api/bookings"))
                    .andExpect(status().isOk());

            // 5. POST Recommendations
            String recommendationRequest = """
                    {
                      "patient": {
                        "firstName": "Riya",
                        "lastName": "Shah",
                        "phone": "5551234567",
                        "zip": "90015"
                      },
                      "answers": {
                        "reason": "ROUTINE_EXAM",
                        "insurance": "VISION",
                        "clinicId": "ANY",
                        "timeOfDay": "MORNING"
                      }
                    }
                    """;

            MvcResult recommendationResult = mockMvc.perform(
                    post("/api/recommendations")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(recommendationRequest))
                    .andExpect(status().isOk())
                    .andReturn();

            JsonNode recommendations = objectMapper.readTree(
                    recommendationResult.getResponse().getContentAsString());

            assertTrue(recommendations.size() <= 3);

            // 6. POST Booking
            String bookingRequest = """
                    {
                      "patient": {
                        "firstName": "Riya",
                        "lastName": "Shah",
                        "phone": "5551234567",
                        "zip": "90015"
                      },
                      "answers": {
                        "reason": "ROUTINE_EXAM",
                        "insurance": "VISION",
                        "clinicId": "ANY",
                        "timeOfDay": "MORNING"
                      },
                      "slotId": "%s"
                    }
                    """.formatted(slotId);

            MvcResult bookingResult = mockMvc.perform(
                    post("/api/bookings")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(bookingRequest))
                    .andExpect(status().isCreated())
                    .andReturn();

            JsonNode booking = objectMapper.readTree(
                    bookingResult.getResponse().getContentAsString());

            String bookingId = booking.get("id").asText();

            assertNotNull(bookingId);

            // 7. GET Booking By ID
            mockMvc.perform(get("/api/bookings/" + bookingId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").value(bookingId));

            // 8. GET All Bookings After Creating Booking
            mockMvc.perform(get("/api/bookings"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0]").exists());

            // 9. Try Booking Same Slot Again
            mockMvc.perform(
                    post("/api/bookings")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(bookingRequest))
                    .andExpect(status().isConflict());

            // 10. Try Booking Invalid Slot
            String invalidBookingRequest = bookingRequest.replace(
                    slotId, "INVALID_SLOT");

            mockMvc.perform(
                    post("/api/bookings")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(invalidBookingRequest))
                    .andExpect(status().isNotFound());

            // 11. Test Validation Error
            String invalidPatientRequest = """
                    {
                      "patient": {
                        "firstName": "",
                        "lastName": "Shah",
                        "phone": "5551234567",
                        "zip": "90015"
                      },
                      "answers": {
                        "reason": "ROUTINE_EXAM",
                        "insurance": "VISION",
                        "clinicId": "ANY",
                        "timeOfDay": "MORNING"
                      },
                      "slotId": "%s"
                    }
                    """.formatted(slotId);

            mockMvc.perform(
                    post("/api/bookings")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(invalidPatientRequest))
                    .andExpect(status().isBadRequest());

        } finally {

            // Restore original bookings.json
            Files.write(bookingsFile, originalData);
        }
    }
}
