package com.marzetti.peluqueria.controller;

import com.marzetti.peluqueria.dto.CreateOrderRequest;
import com.marzetti.peluqueria.dto.OrderDTO;
import com.marzetti.peluqueria.entity.User;
import com.marzetti.peluqueria.repository.UserRepository;
import com.marzetti.peluqueria.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    
    private final OrderService orderService;
    private final UserRepository userRepository;
    
    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(
            @RequestHeader("X-Session-Id") String sessionId,
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateOrderRequest request
    ) {
        Long userId = resolveUserId(userDetails);
        OrderDTO order = orderService.createOrder(sessionId, userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
    
    @GetMapping
    public ResponseEntity<java.util.List<OrderDTO>> getAllOrders() {
        java.util.List<OrderDTO> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/{orderNumber}")
    public ResponseEntity<OrderDTO> getOrderByNumber(@PathVariable String orderNumber) {
        OrderDTO order = orderService.getOrderByNumber(orderNumber);
        return ResponseEntity.ok(order);
    }
    
    @PutMapping("/{orderNumber}/status")
    public ResponseEntity<?> updateOrderStatus(
            @PathVariable String orderNumber,
            @RequestParam String status) {
        try {
            System.out.println("Updating order status: orderNumber=" + orderNumber + ", status=" + status);
            com.marzetti.peluqueria.entity.Order.OrderStatus newStatus = 
                com.marzetti.peluqueria.entity.Order.OrderStatus.valueOf(status.toUpperCase());
            orderService.updateOrderStatus(orderNumber, newStatus);
            System.out.println("Order status updated successfully");
            return ResponseEntity.ok().body("Order status updated successfully");
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid status: " + status);
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid status: " + status);
        } catch (Exception e) {
            System.err.println("Error updating order status: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error updating order status: " + e.getMessage());
        }
    }
    
    private Long resolveUserId(UserDetails userDetails) {
        if (userDetails == null) {
            return null;
        }
        return userRepository.findByUsername(userDetails.getUsername())
                .map(User::getId)
                .orElse(null);
    }
}
