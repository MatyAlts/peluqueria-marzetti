package com.marzetti.peluqueria.controller;

import com.marzetti.peluqueria.dto.AddToCartRequest;
import com.marzetti.peluqueria.dto.CartDTO;
import com.marzetti.peluqueria.dto.CartItemDTO;
import com.marzetti.peluqueria.entity.User;
import com.marzetti.peluqueria.repository.UserRepository;
import com.marzetti.peluqueria.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {
    
    private final CartService cartService;
    private final UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<CartDTO> getCart(
            @RequestHeader(value = "X-Session-Id", required = false) String sessionId,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = resolveUserId(userDetails);
        CartDTO cart = cartService.getCart(resolveSessionId(sessionId, userId), userId);
        return ResponseEntity.ok(cart);
    }
    
    @PostMapping("/items")
    public ResponseEntity<CartItemDTO> addToCart(
            @RequestHeader(value = "X-Session-Id", required = false) String sessionId,
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody AddToCartRequest request
    ) {
        Long userId = resolveUserId(userDetails);
        String sid = resolveSessionId(sessionId, userId);
        CartItemDTO cartItem = cartService.addToCart(sid, userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(cartItem);
    }
    
    @PutMapping("/items/{id}")
    public ResponseEntity<CartItemDTO> updateCartItem(
            @PathVariable Long id,
            @RequestParam Integer quantity,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Long userId = resolveUserId(userDetails);
        CartItemDTO updated = cartService.updateCartItem(id, quantity, userId);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = resolveUserId(userDetails);
        cartService.removeCartItem(id, userId);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping
    public ResponseEntity<Void> clearCart(
            @RequestHeader(value = "X-Session-Id", required = false) String sessionId,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long userId = resolveUserId(userDetails);
        cartService.clearCart(resolveSessionId(sessionId, userId), userId);
        return ResponseEntity.noContent().build();
    }
    
    private Long resolveUserId(UserDetails userDetails) {
        if (userDetails == null) {
            return null;
        }
        return userRepository.findByUsername(userDetails.getUsername())
                .map(User::getId)
                .orElse(null);
    }
    
    private String resolveSessionId(String sessionId, Long userId) {
        if (sessionId != null && !sessionId.isBlank()) {
            return sessionId;
        }
        if (userId != null) {
            // canonical session id for authenticated carts
            return "user-" + userId;
        }
        throw new IllegalArgumentException("X-Session-Id header is required for guests");
    }
}
