package com.twd.SpringSecurityJWT.controller;

import com.twd.SpringSecurityJWT.entity.Category;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.repository.CategoryRepo;
import com.twd.SpringSecurityJWT.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users/category")

public class CategoryController {
    @Autowired
    private CategoryRepo categoryRepository;


    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/add")
    public Category addCategory(@RequestBody Category category, @AuthenticationPrincipal OurUsers user) {
        return categoryService.addCategory(category);
    }
    @GetMapping("/names")
    public List<String> getCategoryNames() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(Category::getName)
                .collect(Collectors.toList());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        try {
            // Retrieve all categories from the database
            List<Category> categories = categoryRepository.findAll();
            // Return the categories as a response
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            // If any exception occurs, return 500 Internal Server Error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}