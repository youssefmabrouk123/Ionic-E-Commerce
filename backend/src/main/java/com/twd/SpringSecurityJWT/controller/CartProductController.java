//package com.twd.SpringSecurityJWT.controller;
//
//import com.twd.SpringSecurityJWT.dto.ReqRes;
//import com.twd.SpringSecurityJWT.entity.CartProduct;
//import com.twd.SpringSecurityJWT.entity.OurUsers;
//import com.twd.SpringSecurityJWT.entity.Product;
//import com.twd.SpringSecurityJWT.repository.CartProductRepo;
//import com.twd.SpringSecurityJWT.repository.ProductRepo;
//import com.twd.SpringSecurityJWT.service.CartProductService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@RestController
//@RequestMapping("/users/commandcart")
//public class CartProductController {
//
//    @Autowired
//    private CartProductService cartProductService;
//
//    private ReqRes reqRes ;
//
//    @Autowired
//    private CartProductRepo cartProductRepository;
//
//    @Autowired
//    private ProductRepo productRepo;
//
//
////    @PostMapping("/add")
////    public ResponseEntity<String> addProductsToCart(@RequestBody ReqRes cartRequest, @AuthenticationPrincipal OurUsers user) {
////        try {
////            List<Product> products = productRepo.findAllById(cartRequest.getProductIds());
////            cartProductService.addProductsToCart(products, user);
////            return ResponseEntity.ok("Products added to cart successfully");
////        } catch (Exception e) {
////            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding products to cart");
////        }
////    }
//
//    @PostMapping("/add")
//    public ResponseEntity<ReqRes> addCartProduct(@RequestBody ReqRes request) {
//        ReqRes response = cartProductService.addCartProduct(request);
//        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatusCode()));
//    }
//}
