package com.clinic.backend.dto;

import com.clinic.backend.entity.Answers;
import com.clinic.backend.entity.Patient;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class BookingRequest {

    @Valid
    @NotNull(message = "Patient details are required")
    private Patient patient;

    @Valid
    @NotNull(message = "Answers are required")
    private Answers answers;

    @NotBlank(message = "Slot ID is required")
    private String slotId;
}