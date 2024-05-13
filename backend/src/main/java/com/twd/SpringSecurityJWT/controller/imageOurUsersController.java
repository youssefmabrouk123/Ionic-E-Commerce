//package com.twd.SpringSecurityJWT.controller;
//
//import com.twd.SpringSecurityJWT.dto.ReqRes;
////import com.twd.SpringSecurityJWT.service.ImageOurUsersService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//@RestController
//@RequestMapping("")
//public class imageOurUsersController {
//
//    @Autowired
//    private ImageOurUsersService imageService;
//
//    @PostMapping("/image/{userId}")
//    public ResponseEntity<ReqRes> addImageToUser(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
//        ReqRes response = imageService.addImageToUser(userId, file);
//        return ResponseEntity.status(response.getStatusCode()).body(response);
//    }
//
//    @GetMapping("/image/{userId}")
//    public ResponseEntity<String> getUserImageBase64(@PathVariable Long userId) {
//        String base64ImageData = imageService.getUserImageBase64(userId);
//        if (base64ImageData != null) {
//            return ResponseEntity.ok().body(base64ImageData);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//}
//
