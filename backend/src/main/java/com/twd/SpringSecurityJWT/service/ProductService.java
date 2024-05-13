package com.twd.SpringSecurityJWT.service;


import com.twd.SpringSecurityJWT.entity.Category;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.entity.Product;
import com.twd.SpringSecurityJWT.repository.CategoryRepo;
import com.twd.SpringSecurityJWT.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepository;
    @Autowired
    private CategoryRepo categoryRepository ;


    public Product addProduct(Product product, Long categoryId, OurUsers user) {
        // Check if the user's account state is "ACTIVE"
        if (!user.getAccountState().equals("ACTIVE")) {
            throw new IllegalStateException("Seller account is not active. Cannot add product.");
        }

        // Set the creation date of the product
        product.setCreationDate(LocalDateTime.now());

        // Fetch the category from the database
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isEmpty()) {
            // Handle category not found
            throw new IllegalArgumentException("Category not found with ID: " + categoryId);
        }

        // Associate the product with the fetched category
        product.setCategory(optionalCategory.get());

        // Associate the product with the user
        product.setUser(user);

        // You can add additional logic/validation here before saving the product

        return productRepository.save(product);
    }


    public Product getProductById(Long productId) {
        Optional<Product> productOptional = productRepository.findById(productId);
        return productOptional.orElse(null); // Return null if product is not found
    }

    public boolean deleteProductById(Long productId) {
        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
            return true; // Deletion successful
        }
        return false; // Product not found, deletion failed
    }

    @Transactional(readOnly = true)
    public List<Product> getUserProducts(Long userId) {
        return productRepository.findByUserId(userId);
    }

}
