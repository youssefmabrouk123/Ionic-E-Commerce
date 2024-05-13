package com.twd.SpringSecurityJWT.controller;
import com.twd.SpringSecurityJWT.dto.ReqRes;
import com.twd.SpringSecurityJWT.entity.Commande;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.entity.Product;
import com.twd.SpringSecurityJWT.service.CommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users/commands")
public class CommandController {

    @Autowired
    private CommandService commandService;

    @PostMapping("/add")
    public Commande addCommande(@RequestBody Commande commande) {
        return commandService.addCommande(commande);
    }
    

    @DeleteMapping("/delete/{id}")
    public String deleteCommande(@PathVariable Long id) {
        return commandService.deleteCommande(id);
}

//    @PostMapping("/addorder")
//    public ResponseEntity<String> addCommand(@AuthenticationPrincipal OurUsers user, @RequestBody ReqRes commandRequest) {
//        commandService.addCommand(user, commandRequest);
//        return ResponseEntity.status(HttpStatus.CREATED).body("Command added successfully");
//    }


}
