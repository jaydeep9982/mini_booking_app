package com.clinic.backend.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @NotBlank(message = "Doctor ID is required")
    private String id;

    @NotBlank(message = "Doctor name is required")
    private String name;

    @NotBlank(message = "Doctor type is required")
    private String type;

    @NotBlank(message = "Clinic ID is required")
    private String clinicId;
}
