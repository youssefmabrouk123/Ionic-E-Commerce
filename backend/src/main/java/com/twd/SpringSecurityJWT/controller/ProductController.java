package com.twd.SpringSecurityJWT.controller;

import com.twd.SpringSecurityJWT.dto.ProductRes;
import com.twd.SpringSecurityJWT.dto.ReqRes;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.entity.Product;
import com.twd.SpringSecurityJWT.repository.OurUserRepo;
import com.twd.SpringSecurityJWT.repository.ProductRepo;
import com.twd.SpringSecurityJWT.service.ProductService;
import com.twd.SpringSecurityJWT.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/users/products")
public class ProductController {

    @Autowired
    private ProductRepo productRepository;

    @Autowired
    private OurUserRepo ourUserRepo;

    @Autowired
    private final ProductService productService;
    private ReqRes reqRes ;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }


    @PostMapping("/add")
    public Product addProduct(@RequestBody ReqRes productRequest, @AuthenticationPrincipal OurUsers user) {
        Product product = new Product();
        product.setNameProduct(productRequest.getNameProduct());
        product.setDescriptionProduct(productRequest.getDescriptionProduct());
        product.setPrice(productRequest.getPrice());
        product.setStockProduct(productRequest.getStockProduct());
        return productService.addProduct(product, productRequest.getCategoryId(), user);
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable Long productId, @AuthenticationPrincipal OurUsers user) {
        return productService.getProductById(productId);
    }
//    @GetMapping("/products")
//    public List<Product> getProductsByCategoryName(@RequestParam String categoryName) {
//        return productRepository.findByCategoryName(categoryName);
//    }

    @DeleteMapping("/{productId}")
    public String deleteProductById(@PathVariable Long productId, @AuthenticationPrincipal OurUsers user) {
        productService.deleteProductById(productId);
        return ("product deleted");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            // Retrieve all products from the database
            List<Product> products = productRepository.findAll();
            // Return the products as a response
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            // If any exception occurs, return 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/seller")
    public ResponseEntity<?> getUserProducts(@AuthenticationPrincipal OurUsers user) {
        try {
            // Return the products associated with the user
            List<Product> products = productRepository.findByUser(user);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            // If any exception occurs, return 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user products");
        }
    }


    @GetMapping("/get/")
    public List<ProductRes> getProductsByCategoryName(@RequestParam String categoryName) {
        List<Product> products = productRepository.findByCategoryName(categoryName);
        return products.stream()
                .map(this::convertToProductRes)
                .collect(Collectors.toList());
    }

    private ProductRes convertToProductRes(Product product) {
        ProductRes productRes = new ProductRes();
        productRes.setName(product.getNameProduct());
        productRes.setPrice(product.getPrice()); // Set price
        productRes.setImage(product.getImage()); // Set image
        productRes.setName_link(product.getName_link()); // Set name_link if needed
        // Set other fields as needed
        return productRes;
    }
}
