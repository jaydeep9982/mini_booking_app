package com.clinic.backend.entity;

import java.time.LocalDateTime;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @NotBlank(message = "Booking ID is required")
    private String id;

    @Valid
    @NotNull(message = "Patient details are required")
    private Patient patient;

    @Valid
    @NotNull(message = "Answers are required")
    private Answers answers;

    @NotBlank(message = "Slot ID is required")
    private String slotId;

    @NotNull(message = "Booking creation time is required")
    private LocalDateTime createdAt;
}
