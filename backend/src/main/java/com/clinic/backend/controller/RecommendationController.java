
package com.clinic.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinic.backend.dto.RecommendationRequest;
import com.clinic.backend.entity.Slot;
import com.clinic.backend.service.RecommendationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(
            RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping
    public ResponseEntity<List<Slot>> getRecommendations(
            @Valid @RequestBody RecommendationRequest request) {

        List<Slot> recommendations =
                recommendationService.getRecommendations(request);

        return ResponseEntity.ok(recommendations);
    }
}
