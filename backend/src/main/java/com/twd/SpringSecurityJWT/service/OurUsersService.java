package com.twd.SpringSecurityJWT.service;


import com.twd.SpringSecurityJWT.dto.ReqRes;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.repository.OurUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
    public class OurUsersService {

    @Autowired
    private OurUserRepo ourUserRepo ;

    private static final String UPLOAD_DIR = "C:\\Users\\arway\\Desktop\\EcommerceMobile\\backend\\profileimage";


    public ReqRes getAdminProfile(UserDetails userDetails) {
        ReqRes response = new ReqRes();
        try {
            // Get user email from UserDetails
            String userEmail = userDetails.getUsername();

            // Retrieve user details by email
            OurUsers user = ourUserRepo.findByEmail(userEmail).orElse(null);

            // Check if user exists and has role ADMIN
//            if (user != null && user.getRole().equals("ADMIN")) {
                response.setStatusCode(200);
                response.setOurUsers(user);
                response.setMessage("User profile retrieved successfully");
//            } else {
//                response.setStatusCode(403); // Forbidden
//                response.setMessage("You are not authorized to access this resource");
//            }
        } catch (Exception e) {
            response.setStatusCode(500); // Internal Server Error
            response.setError(e.getMessage());
        }
        return response;
    }
    public OurUsers getUserById(Long id) {
        Optional<OurUsers> userOptional = ourUserRepo.findById(id);
        return userOptional.orElse(null); // Or handle the case where user is not found
    }
    public void userUpdate(OurUsers user) {
        // Save the user to the database using repository methods
        ourUserRepo.save(user);
    }

    public String saveImage(MultipartFile file) throws IOException {
        // Ensure the upload directory exists
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save the file to the upload directory
        String filename = file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR, filename);
        Files.write(filePath, file.getBytes());

        return UPLOAD_DIR+"/"+filename;
    }

    public ReqRes getSellerProfile(UserDetails userDetails) {
        ReqRes response = new ReqRes();
        try {
            // Get user email from UserDetails
            String userEmail = userDetails.getUsername();

            // Retrieve user details by email
            OurUsers user = ourUserRepo.findByEmail(userEmail).orElse(null);

            // Check if user exists and has role ADMIN
//            if (user != null && user.getRole().equals("ADMIN")) {
            response.setStatusCode(200);
            response.setOurUsers(user);
            response.setMessage("Seller profile retrieved successfully");
//            } else {
//                response.setStatusCode(403); // Forbidden
//                response.setMessage("You are not authorized to access this resource");
//            }
        } catch (Exception e) {
            response.setStatusCode(500); // Internal Server Error
            response.setError(e.getMessage());
        }
        return response;
    }
}
