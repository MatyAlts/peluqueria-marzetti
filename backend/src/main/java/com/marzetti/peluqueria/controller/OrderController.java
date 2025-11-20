package com.marzetti.peluqueria.controller;

import com.marzetti.peluqueria.dto.CreateOrderRequest;
import com.marzetti.peluqueria.dto.OrderDTO;
import com.marzetti.peluqueria.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    
    private final OrderService orderService;
    
    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(
            @RequestHeader("X-Session-Id") String sessionId,
            @Valid @RequestBody CreateOrderRequest request
    ) {
        OrderDTO order = orderService.createOrder(sessionId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
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
}
