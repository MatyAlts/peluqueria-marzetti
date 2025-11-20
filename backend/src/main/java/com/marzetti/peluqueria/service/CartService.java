package com.marzetti.peluqueria.service;

import com.marzetti.peluqueria.dto.AddToCartRequest;
import com.marzetti.peluqueria.dto.CartDTO;
import com.marzetti.peluqueria.dto.CartItemDTO;
import com.marzetti.peluqueria.dto.ProductDTO;
import com.marzetti.peluqueria.entity.CartItem;
import com.marzetti.peluqueria.entity.Product;
import com.marzetti.peluqueria.repository.CartItemRepository;
import com.marzetti.peluqueria.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;
    
    public CartDTO getCart(String sessionId, Long userId) {
        if (userId != null) {
            mergeSessionCartIntoUser(sessionId, userId);
            List<CartItem> userItems = cartItemRepository.findByUserId(userId);
            return buildCartDTO(userItems);
        }
        
        List<CartItem> cartItems = cartItemRepository.findBySessionId(sessionId);
        return buildCartDTO(cartItems);
    }
    
    private CartDTO buildCartDTO(List<CartItem> cartItems) {
        List<CartItemDTO> itemDTOs = cartItems.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        
        double total = itemDTOs.stream()
                .mapToDouble(CartItemDTO::getSubtotal)
                .sum();
        
        int itemCount = itemDTOs.stream()
                .mapToInt(CartItemDTO::getQuantity)
                .sum();
        
        return new CartDTO(itemDTOs, total, itemCount);
    }
    
    @Transactional
    public CartItemDTO addToCart(String sessionId, Long userId, AddToCartRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        if (product.getStock() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }
        
        var existingItem = (userId != null)
                ? cartItemRepository.findByUserIdAndProductId(userId, request.getProductId())
                : cartItemRepository.findBySessionIdAndProductId(sessionId, request.getProductId());
        
        CartItem cartItem;
        if (existingItem.isPresent()) {
            cartItem = existingItem.get();
            int newQuantity = cartItem.getQuantity() + request.getQuantity();
            
            if (product.getStock() < newQuantity) {
                throw new RuntimeException("Insufficient stock");
            }
            
            cartItem.setQuantity(newQuantity);
        } else {
            cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(request.getQuantity());
            cartItem.setSessionId(sessionId);
            cartItem.setUserId(userId);
        }
        
        CartItem saved = cartItemRepository.save(cartItem);
        return convertToDTO(saved);
    }
    
    @Transactional
    public CartItemDTO updateCartItem(Long cartItemId, Integer quantity, Long userId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (userId != null && cartItem.getUserId() != null && !userId.equals(cartItem.getUserId())) {
            throw new RuntimeException("No autorizado para modificar este item");
        }
        
        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }
        
        if (cartItem.getProduct().getStock() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }
        
        cartItem.setQuantity(quantity);
        CartItem updated = cartItemRepository.save(cartItem);
        return convertToDTO(updated);
    }
    
    @Transactional
    public void removeCartItem(Long cartItemId, Long userId) {
        if (!cartItemRepository.existsById(cartItemId)) {
            throw new RuntimeException("Cart item not found");
        }
        if (userId != null) {
            CartItem cartItem = cartItemRepository.findById(cartItemId)
                    .orElseThrow(() -> new RuntimeException("Cart item not found"));
            if (cartItem.getUserId() != null && !userId.equals(cartItem.getUserId())) {
                throw new RuntimeException("No autorizado para eliminar este item");
            }
        }
        cartItemRepository.deleteById(cartItemId);
    }
    
    @Transactional
    public void clearCart(String sessionId, Long userId) {
        if (userId != null) {
            cartItemRepository.deleteByUserId(userId);
        } else {
            cartItemRepository.deleteBySessionId(sessionId);
        }
    }
    
    private CartItemDTO convertToDTO(CartItem cartItem) {
        ProductDTO productDTO = productService.getProductById(cartItem.getProduct().getId());
        double subtotal = cartItem.getProduct().getPrice() * cartItem.getQuantity();
        
        return new CartItemDTO(
                cartItem.getId(),
                productDTO,
                cartItem.getQuantity(),
                subtotal
        );
    }
    
    @Transactional
    protected void mergeSessionCartIntoUser(String sessionId, Long userId) {
        if (userId == null) {
            return;
        }
        List<CartItem> sessionItems = cartItemRepository.findBySessionId(sessionId);
        if (sessionItems.isEmpty()) {
            return;
        }
        List<CartItem> userItems = cartItemRepository.findByUserId(userId);
        
        for (CartItem sessionItem : sessionItems) {
            var existingUserItem = userItems.stream()
                    .filter(ui -> ui.getProduct().getId().equals(sessionItem.getProduct().getId()))
                    .findFirst();
            
            if (existingUserItem.isPresent()) {
                CartItem userItem = existingUserItem.get();
                int mergedQuantity = userItem.getQuantity() + sessionItem.getQuantity();
                userItem.setQuantity(Math.min(mergedQuantity, sessionItem.getProduct().getStock()));
                cartItemRepository.save(userItem);
            } else {
                sessionItem.setUserId(userId);
                sessionItem.setSessionId("user-" + userId);
                cartItemRepository.save(sessionItem);
            }
        }
        cartItemRepository.deleteBySessionId(sessionId);
    }
}
