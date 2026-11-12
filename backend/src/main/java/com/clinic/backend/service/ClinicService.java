package com.clinic.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.clinic.backend.entity.Clinic;
import com.clinic.backend.repository.ClinicRepository;

@Service
public class ClinicService {

    private final ClinicRepository clinicRepository;

    public ClinicService(ClinicRepository clinicRepository) {
        this.clinicRepository = clinicRepository;
    }

    public List<Clinic> getAllClinics() {

        return clinicRepository.getAllClinics();
    }
}