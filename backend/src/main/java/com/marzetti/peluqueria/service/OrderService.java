package com.marzetti.peluqueria.service;

import com.marzetti.peluqueria.dto.CreateOrderRequest;
import com.marzetti.peluqueria.dto.OrderDTO;
import com.marzetti.peluqueria.dto.OrderItemDTO;
import com.marzetti.peluqueria.entity.CartItem;
import com.marzetti.peluqueria.entity.Order;
import com.marzetti.peluqueria.entity.OrderItem;
import com.marzetti.peluqueria.repository.CartItemRepository;
import com.marzetti.peluqueria.repository.OrderRepository;
import com.marzetti.peluqueria.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    
    @Transactional
    public OrderDTO createOrder(String sessionId, Long userId, CreateOrderRequest request) {
        List<CartItem> cartItems;
        if (userId != null) {
            cartItems = cartItemRepository.findByUserId(userId);
            if (cartItems.isEmpty()) {
                cartItems = cartItemRepository.findBySessionId(sessionId);
            }
        } else {
            cartItems = cartItemRepository.findBySessionId(sessionId);
        }
        
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }
        
        // Validate stock for all items
        for (CartItem item : cartItems) {
            if (item.getProduct().getStock() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + item.getProduct().getName());
            }
        }
        
        // Create order
        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setStatus(Order.OrderStatus.PENDING);
        
        // Create order items and calculate total
        double total = 0.0;
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProductId(cartItem.getProduct().getId());
            orderItem.setProductName(cartItem.getProduct().getName());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSubtotal(cartItem.getProduct().getPrice() * cartItem.getQuantity());
            
            order.getItems().add(orderItem);
            total += orderItem.getSubtotal();
            
            // NOTE: Stock will be reduced only when payment is confirmed
            // See updateOrderStatus() method
        }
        
        order.setTotalAmount(total);
        
        // Save order
        Order savedOrder = orderRepository.save(order);
        
        // Clear cart
        if (userId != null) {
            cartItemRepository.deleteByUserId(userId);
        } else {
            cartItemRepository.deleteBySessionId(sessionId);
        }
        
        return convertToDTO(savedOrder);
    }
    
    public OrderDTO getOrderByNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found with number: " + orderNumber));
        return convertToDTO(order);
    }
    
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::convertToDTO)
                .sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt()))
                .collect(Collectors.toList());
    }
    
    @Transactional
    public void updateOrderStatus(String orderNumber, Order.OrderStatus newStatus) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found with number: " + orderNumber));
        
        Order.OrderStatus oldStatus = order.getStatus();
        order.setStatus(newStatus);
        
        // If payment is confirmed (PAID), reduce stock
        if (newStatus == Order.OrderStatus.PAID && oldStatus != Order.OrderStatus.PAID) {
            for (OrderItem item : order.getItems()) {
                var product = productRepository.findById(item.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));
                
                if (product.getStock() < item.getQuantity()) {
                    throw new RuntimeException("Insufficient stock for product: " + product.getName());
                }
                
                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product);
            }
        }
        
        // If payment is cancelled/rejected, restore stock if it was previously paid
        if ((newStatus == Order.OrderStatus.CANCELLED || newStatus == Order.OrderStatus.REJECTED) 
            && oldStatus == Order.OrderStatus.PAID) {
            for (OrderItem item : order.getItems()) {
                var product = productRepository.findById(item.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));
                
                product.setStock(product.getStock() + item.getQuantity());
                productRepository.save(product);
            }
        }
        
        orderRepository.save(order);
    }
    
    private String generateOrderNumber() {
        return "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private OrderDTO convertToDTO(Order order) {
        List<OrderItemDTO> items = order.getItems().stream()
                .map(this::convertItemToDTO)
                .collect(Collectors.toList());
        
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setOrderNumber(order.getOrderNumber());
        dto.setCustomerName(order.getCustomerName());
        dto.setCustomerEmail(order.getCustomerEmail());
        dto.setCustomerPhone(order.getCustomerPhone());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setItems(items);
        dto.setCreatedAt(order.getCreatedAt());
        return dto;
    }
    
    private OrderItemDTO convertItemToDTO(OrderItem item) {
        return new OrderItemDTO(
                item.getId(),
                item.getProductId(),
                item.getProductName(),
                item.getPrice(),
                item.getQuantity(),
                item.getSubtotal()
        );
    }
}
