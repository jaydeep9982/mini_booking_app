package com.clinic.backend.dto;

import com.clinic.backend.entity.Patient;
import com.clinic.backend.entity.Answers;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class RecommendationRequest {

    @Valid
    @NotNull(message = "Patient details are required")
    private Patient patient;

    @Valid
    @NotNull(message = "Answers are required")
    private Answers answers;
}