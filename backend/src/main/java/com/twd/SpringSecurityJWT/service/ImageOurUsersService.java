//package com.twd.SpringSecurityJWT.service;
//
//import com.twd.SpringSecurityJWT.dto.ReqRes;
//import com.twd.SpringSecurityJWT.entity.ImageOurUsers;
//import com.twd.SpringSecurityJWT.entity.OurUsers;
//import com.twd.SpringSecurityJWT.repository.ImageOurUsersRepo;
//import com.twd.SpringSecurityJWT.repository.OurUserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.time.LocalDateTime;
//import java.util.Base64;
//
//@Service
//public class ImageOurUsersService {
//
//    private final ImageOurUsersRepo imageRepo;
//    private final OurUserRepo ourUserRepo;
//
//    @Autowired
//    public ImageOurUsersService(ImageOurUsersRepo imageRepo, OurUserRepo ourUserRepo) {
//        this.imageRepo = imageRepo;
//        this.ourUserRepo = ourUserRepo;
//    }
//
//    public ReqRes addImageToUser(Long userId, MultipartFile file) {
//        ReqRes response = new ReqRes();
//        try {
//            // Retrieve user by ID
//            OurUsers user = ourUserRepo.findById(userId).orElse(null);
//            if (user == null) {
//                response.setStatusCode(404);
//                response.setMessage("User not found");
//                return response;
//            }
//
//            // Process and save image
//            ImageOurUsers image = new ImageOurUsers();
//            image.setCreationDate(LocalDateTime.now());
//
//            // Encode the image data to Base64
//            byte[] imageDataBytes = file.getBytes();
//            String base64ImageData = Base64.getEncoder().encodeToString(imageDataBytes);
//            image.setImageData(base64ImageData);
//
//            // Save the image entity
//            imageRepo.save(image);
//
//            // Associate image with user
//            user.setImage(image);
//            ourUserRepo.save(user);
//
//            // Set success response
//            response.setStatusCode(200);
//            response.setMessage("Image added to user successfully");
//        } catch (IOException e) {
//            // Handle file IO exception
//            response.setStatusCode(500);
//            response.setError("Error processing image: " + e.getMessage());
//        } catch (Exception e) {
//            // Handle other exceptions
//            response.setStatusCode(500);
//            response.setError("Error adding image to user: " + e.getMessage());
//        }
//        return response;
//    }
//
//    @Transactional(readOnly = true)
//    public String getUserImageBase64(Long userId) {
//        OurUsers user = ourUserRepo.findById(userId).orElse(null);
//        if (user != null && user.getImage() != null) {
//            String base64ImageData = user.getImage().getImageData();
//            return base64ImageData;
//        } else {
//            return null;
//        }
//    }
//}
//
