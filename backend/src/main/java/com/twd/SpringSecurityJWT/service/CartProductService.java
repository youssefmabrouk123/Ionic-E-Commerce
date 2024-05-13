//package com.twd.SpringSecurityJWT.service;
//
//import com.twd.SpringSecurityJWT.dto.ReqRes;
//import com.twd.SpringSecurityJWT.entity.CartProduct;
//import com.twd.SpringSecurityJWT.entity.OurUsers;
//import com.twd.SpringSecurityJWT.entity.Product;
//import com.twd.SpringSecurityJWT.repository.CartProductRepo;
//import com.twd.SpringSecurityJWT.repository.OurUserRepo;
//import com.twd.SpringSecurityJWT.repository.ProductRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.Collections;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@Service
//public class CartProductService {
//
//    @Autowired
//    private CartProductRepo cartProductRepository;
//
//    @Autowired
//    private ProductRepo productRepository;
//
//    @Autowired
//    private OurUserRepo userRepository;
//
//    public ReqRes addCartProduct(ReqRes request) {
//        OurUsers user = userRepository.findByEmail(request.getEmail());
//        if (user == null) {
//            return new ReqRes(404, "User not found", null);
//        }
//
//        CartProduct cartProduct = new CartProduct();
//        cartProduct.setCreationDate(LocalDateTime.now());
//        cartProduct.setName(request.getName());
//        cartProduct.setEmail(request.getEmail());
//        cartProduct.setAddress(request.getAddress());
//        cartProduct.setNumero(request.getNumber());
//        cartProduct.setUser(user);
//
//        List<Product> products = request.getProducts().stream()
//                .map(productDTO -> {
//                    Product product = new Product();
//                    product.setNameProduct(productDTO.getNameProduct());
//                    product.setDescriptionProduct(productDTO.getDescriptionProduct());
//                    product.setPrice(productDTO.getPrice());
//                    // Set other product properties accordingly
//                    return product;
//                })
//                .collect(Collectors.toList());
//
//        cartProduct.setProducts(products);
//
//        // Save cartProduct to database
//        cartProductRepository.save(cartProduct);
//
//        return new ReqRes(200, "CartProduct added successfully", null);
//    }
//
//
//
//}
