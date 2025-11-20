package com.marzetti.peluqueria.service;

import com.marzetti.peluqueria.dto.PromotionDTO;
import com.marzetti.peluqueria.entity.Promotion;
import com.marzetti.peluqueria.repository.PromotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PromotionService {
    
    private final PromotionRepository promotionRepository;
    
    public List<PromotionDTO> getActivePromotions() {
        return promotionRepository.findByActiveTrueOrderByCreatedAtDesc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    
    public List<PromotionDTO> getAllPromotions() {
        return promotionRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public PromotionDTO createPromotion(PromotionDTO dto) {
        Promotion promotion = new Promotion();
        promotion.setTitle(dto.getTitle());
        promotion.setDescription(dto.getDescription());
        promotion.setCode(dto.getCode());
        promotion.setImageUrl(dto.getImageUrl());
        promotion.setActionUrl(dto.getActionUrl());
        promotion.setActive(dto.getActive() != null ? dto.getActive() : Boolean.TRUE);
        
        Promotion saved = promotionRepository.save(promotion);
        return toDto(saved);
    }
    
    @Transactional
    public PromotionDTO updatePromotion(Long id, PromotionDTO dto) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found with id: " + id));
        
        if (dto.getTitle() != null) promotion.setTitle(dto.getTitle());
        if (dto.getDescription() != null) promotion.setDescription(dto.getDescription());
        if (dto.getCode() != null) promotion.setCode(dto.getCode());
        if (dto.getImageUrl() != null) promotion.setImageUrl(dto.getImageUrl());
        if (dto.getActionUrl() != null) promotion.setActionUrl(dto.getActionUrl());
        if (dto.getActive() != null) promotion.setActive(dto.getActive());
        
        Promotion updated = promotionRepository.save(promotion);
        return toDto(updated);
    }
    
    @Transactional
    public void deletePromotion(Long id) {
        if (!promotionRepository.existsById(id)) {
            throw new RuntimeException("Promotion not found with id: " + id);
        }
        promotionRepository.deleteById(id);
    }
    
    private PromotionDTO toDto(Promotion promotion) {
        PromotionDTO dto = new PromotionDTO();
        dto.setId(promotion.getId());
        dto.setTitle(promotion.getTitle());
        dto.setDescription(promotion.getDescription());
        dto.setCode(promotion.getCode());
        dto.setImageUrl(promotion.getImageUrl());
        dto.setActionUrl(promotion.getActionUrl());
        dto.setActive(promotion.getActive());
        return dto;
    }
}
