package com.clinic.backend.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Clinic {

    @NotBlank(message = "Clinic ID is required")
    private String id;

    @NotBlank(message = "Clinic name is required")
    private String name;

    @NotBlank(message = "ZIP code is required")
    @Pattern(regexp = "\\d{5}", message = "ZIP code must contain exactly 5 digits")
    private String zip;
}
