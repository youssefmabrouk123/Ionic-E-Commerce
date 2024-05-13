package com.twd.SpringSecurityJWT.service;

import com.twd.SpringSecurityJWT.entity.Category;
import com.twd.SpringSecurityJWT.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepo categoryRepository;


    public Category addCategory(Category category) {
        // You can add additional logic/validation here before saving the category
        return categoryRepository.save(category);
    }
}
