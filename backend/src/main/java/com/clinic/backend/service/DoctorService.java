package com.clinic.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.clinic.backend.entity.Doctor;
import com.clinic.backend.repository.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {

        return doctorRepository.getAllDoctors();
    }
}