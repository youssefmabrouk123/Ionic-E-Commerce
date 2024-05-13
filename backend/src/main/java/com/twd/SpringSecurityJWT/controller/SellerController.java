package com.twd.SpringSecurityJWT.controller;


import com.twd.SpringSecurityJWT.dto.ReqRes;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.service.OurUsersService;
import com.twd.SpringSecurityJWT.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class SellerController {

    @Autowired
    private SellerService sellerService;
    @Autowired
    private OurUsersService ourUsersService;

    @PostMapping("/admin/addSeller")
    @Secured("ADMIN")
    public ResponseEntity<ReqRes> addSeller(@RequestBody ReqRes addSellerRequest){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        OurUsers user = SellerService.getUserByMail(username).orElse(null);

        if (user == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else if (!Objects.equals(user.getRole(), "ADMIN")) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok(sellerService.createSeller(addSellerRequest));
    }

    @GetMapping("/admin/sellersactive")
//  @Secured("ADMIN")
    public ResponseEntity<List<OurUsers>> getSellersActive() {
        List<OurUsers> sellers = sellerService.getAllSellersActive();
        return ResponseEntity.ok(sellers);
    }

    @GetMapping("/admin/sellerspending")
//  @Secured("ADMIN")
    public ResponseEntity<List<OurUsers>> getSellersPending() {
        List<OurUsers> sellers = sellerService.getAllSellersPending();
        return ResponseEntity.ok(sellers);
    }


    @GetMapping("/admin/seller/{id}")
    @Secured("ADMIN")
    public ResponseEntity<OurUsers> getSellerById(@PathVariable Long id) {
        Optional<OurUsers> sellerOptional = sellerService.getSellerById(id);
        return sellerOptional
                .map(seller -> ResponseEntity.ok(seller))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/seller/{id}")
    @Secured("ADMIN")
    public ResponseEntity<Void> deleteSellerById(@PathVariable Long id) {
        boolean deleted = sellerService.deleteSellerById(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/admin/seller/{id}")
    public ResponseEntity<ReqRes> updateSeller(@PathVariable Long id, @RequestBody ReqRes updateRequest) {
        ReqRes response = sellerService.updateSeller(id, updateRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/seller/{id}")
    public ResponseEntity<OurUsers> getSeller(@PathVariable Long id) {
        Optional<OurUsers> sellerOptional = sellerService.getSellerById(id);
        return sellerOptional
                .map(seller -> ResponseEntity.ok(seller))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/seller/info")
    public ResponseEntity<ReqRes> getSellerProfile(@AuthenticationPrincipal UserDetails userDetails) {
        ReqRes response = ourUsersService.getSellerProfile(userDetails);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @PutMapping("/admin/seller/{sellerId}/activate")
    public ResponseEntity<String> activateSellerAccount(@PathVariable Long sellerId) {
        try {
            // Activate the seller's account using the service method
            sellerService.activateSellerAccount(sellerId);
            return ResponseEntity.ok("Seller account activated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error activating seller account");
        }
    }

    @PutMapping("/admin/seller/{sellerId}/reject")
    public ResponseEntity<String> rejectSellerAccount(@PathVariable Long sellerId) {
        try {
            // Reject the seller's account using the service method
            sellerService.rejectSellerAccount(sellerId);
            return ResponseEntity.ok("Seller account rejected successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error rejecting seller account");
        }
    }


}
