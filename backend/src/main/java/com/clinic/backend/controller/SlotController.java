package com.clinic.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinic.backend.entity.Slot;
import com.clinic.backend.service.SlotService;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:5173")
public class SlotController {

    private final SlotService slotService;

    public SlotController(SlotService slotService) {
        this.slotService = slotService;
    }

    @GetMapping
    public List<Slot> getAvailableSlots() {

        return slotService.getAvailableSlots();
    }
}