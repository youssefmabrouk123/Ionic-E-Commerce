package com.twd.SpringSecurityJWT.service;

import com.twd.SpringSecurityJWT.dto.ReqRes;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.repository.OurUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellerService {
    private static OurUserRepo ourUserRepo ;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SellerService(OurUserRepo ourUserRepo, PasswordEncoder passwordEncoder) {
        SellerService.ourUserRepo = ourUserRepo;
        this.passwordEncoder = passwordEncoder;
    }


    public ReqRes createSeller(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();
        try {
            // Check if email already exists
            if (ourUserRepo.existsByEmail(registrationRequest.getEmail())) {
                resp.setStatusCode(400); // Bad request
                resp.setMessage("Email already exists");
                return resp;
            }
            OurUsers ourUsers = new OurUsers();
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setRole("SELLER");
            ourUsers.setFirstname(registrationRequest.getFirstname());
            ourUsers.setLastname(registrationRequest.getLastname());
            ourUsers.setNumber(registrationRequest.getNumber());
            OurUsers ourUserResult = ourUserRepo.save(ourUsers);
            if (ourUserResult != null && ourUserResult.getId() > 0) {
                resp.setOurUsers(ourUserResult);
                resp.setMessage("Seller Saved Successfully");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public static Optional<OurUsers> getUserByMail(String username) {

        return ourUserRepo.findByEmail(username);
    }
    public List<OurUsers> getAllSellersActive() {
        return ourUserRepo.findByRoleAndAccountState("SELLER", "ACTIVE");
    }

    public List<OurUsers> getAllSellersPending() {
        return ourUserRepo.findByRoleAndAccountState("SELLER", "PENDING");
    }

    public Optional<OurUsers> getSellerById(Long id) {
        return ourUserRepo.findByIdAndRole(id, "SELLER");
    }

    public boolean deleteSellerById(Long id) {
        Optional<OurUsers> sellerOptional = ourUserRepo.findByIdAndRole(id, "SELLER");
        if (sellerOptional.isPresent()) {
            ourUserRepo.delete(sellerOptional.get());
            return true;
        }
        return false;
    }

    public ReqRes updateSeller(Long id, ReqRes updateRequest) {
        ReqRes resp = new ReqRes();
        try {
            Optional<OurUsers> sellerOptional = ourUserRepo.findById(id);
            if (sellerOptional.isPresent()) {
                OurUsers seller = sellerOptional.get();
                seller.setFirstname(updateRequest.getFirstname());
                seller.setLastname(updateRequest.getLastname());
                // Update other fields as needed
                OurUsers updatedSeller = ourUserRepo.save(seller);
                resp.setOurUsers(updatedSeller);
                resp.setMessage("Seller updated successfully");
                resp.setStatusCode(200);
            } else {
                resp.setStatusCode(404); // Not Found
                resp.setMessage("Seller not found");
            }
        } catch (Exception e) {
            resp.setStatusCode(500); // Internal Server Error
            resp.setError(e.getMessage());
        }
        return resp;
    }
    public void activateSellerAccount(Long sellerId) {
        try {
            // Retrieve the seller from the database
            OurUsers seller = ourUserRepo.findById(sellerId)
                    .orElseThrow(() -> new Exception("Seller not found with id: " + sellerId));

            // Update the account state to "ACTIVE"
            seller.setAccountState("ACTIVE");
            ourUserRepo.save(seller);
            System.out.println("Seller Activated !");
        } catch (Exception e) {
            throw new RuntimeException("Error activating seller account", e);
        }
    }

    public void rejectSellerAccount(Long sellerId) {
        try {
            // Retrieve the seller from the database
            OurUsers seller = ourUserRepo.findById(sellerId)
                    .orElseThrow(() -> new Exception("Seller not found with id: " + sellerId));

            // Update the account state to "REJECTED"
            seller.setAccountState("REJECTED");
            ourUserRepo.save(seller);
            System.out.println("Seller Rejected !");

        } catch (Exception e) {
            throw new RuntimeException("Error rejecting seller account", e);
        }
    }


}
