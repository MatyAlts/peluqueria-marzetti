package com.marzetti.peluqueria.controller;

import com.marzetti.peluqueria.dto.PromotionDTO;
import com.marzetti.peluqueria.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PromotionController {
    
    private final PromotionService promotionService;
    
    @GetMapping("/promotions")
    public ResponseEntity<List<PromotionDTO>> getActivePromotions() {
        return ResponseEntity.ok(promotionService.getActivePromotions());
    }
    
    @GetMapping("/admin/promotions")
    public ResponseEntity<List<PromotionDTO>> getAllPromotions() {
        return ResponseEntity.ok(promotionService.getAllPromotions());
    }
    
    @PostMapping("/admin/promotions")
    public ResponseEntity<PromotionDTO> createPromotion(@RequestBody PromotionDTO promotionDTO) {
        PromotionDTO created = promotionService.createPromotion(promotionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/admin/promotions/{id}")
    public ResponseEntity<PromotionDTO> updatePromotion(
            @PathVariable Long id,
            @RequestBody PromotionDTO promotionDTO
    ) {
        PromotionDTO updated = promotionService.updatePromotion(id, promotionDTO);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/admin/promotions/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Long id) {
        promotionService.deletePromotion(id);
        return ResponseEntity.noContent().build();
    }
}
