package com.marzetti.peluqueria.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PromotionDTO {
    private Long id;
    private String title;
    private String description;
    private String code;
    private String imageUrl;
    private String actionUrl;
    private Boolean active;
}
