package com.clinic.backend.entity;

import com.clinic.backend.entity.enums.*;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Answers {

    @NotNull(message = "Visit reason is required")
    private VisitReason reason;

    @NotNull(message = "Insurance type is required")
    private InsuranceType insurance;

    @NotNull(message = "Clinic preference is required")
    private ClinicPreference clinicId;

    @NotNull(message = "Time preference is required")
    private TimeOfDay timeOfDay;
}
