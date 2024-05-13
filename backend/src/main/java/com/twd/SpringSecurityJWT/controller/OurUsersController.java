package com.twd.SpringSecurityJWT.controller;

import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.service.CommandService;
import com.twd.SpringSecurityJWT.service.OurUsersService;
import jakarta.annotation.Resource;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/user")
public class OurUsersController {
    @Autowired
    private OurUsersService ourUsersService;

    @GetMapping("/info")
    public OurUsers getUserInfo(@AuthenticationPrincipal OurUsers user) {
        return user;
    }


    @PutMapping("/up/{id}")
    public String updateUser(


            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        OurUsers user = ourUsersService.getUserById(id);

        if (user == null) {
            return " error: user didn't exist";
        } else {
            try {
                if (file != null && !file.isEmpty()) {

                    String filename = ourUsersService.saveImage(file);
                    user.setImage(filename);

                }

                ourUsersService.userUpdate(user);

                return "User Updated successfully";
            } catch (IOException e) {
                return "Error updating user: " + e.getMessage();
            }
        }

    }








    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getPostImage(@PathVariable Long id) {
        OurUsers user = ourUsersService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        String imagePath = user.getImage();
        try {
            Path file = Paths.get(imagePath);
            byte[] imageData = Files.readAllBytes(file);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            headers.setContentDispositionFormData("attachment", file.getFileName().toString());

            return new ResponseEntity<>(imageData, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
//
//
//@PutMapping("/up/{id}")
//public String updateUser(
//        @PathVariable Long id,
//        @RequestParam(value = "file", required = false) MultipartFile file) {
//    OurUsers user = ourUsersService.getUserById(id);
//
//    if (user == null) {
//        return "Error: User does not exist";
//    } else {
//        try {
//            if (file != null && !file.isEmpty()) {
//                String filename = ourUsersService.saveImage(file);
//                user.setImage(filename);
//            }
//
//            ourUsersService.userUpdate(user);
//
//            return "User updated successfully";
//        } catch (IOException e) {
//            return "Error updating user: " + e.getMessage();
//        }
//    }
//}

}

