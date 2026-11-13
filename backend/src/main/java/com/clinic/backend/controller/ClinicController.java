package com.clinic.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinic.backend.entity.Clinic;
import com.clinic.backend.service.ClinicService;

@RestController
@RequestMapping("/api/clinics")
@CrossOrigin(origins = "http://localhost:5173")
public class ClinicController {

    private final ClinicService clinicService;

    public ClinicController(ClinicService clinicService) {
        this.clinicService = clinicService;
    }

    @GetMapping
    public List<Clinic> getAllClinics() {

        return clinicService.getAllClinics();
    }
}