package com.twd.SpringSecurityJWT.service;
import com.twd.SpringSecurityJWT.dto.ReqRes;
import com.twd.SpringSecurityJWT.entity.Commande;
import com.twd.SpringSecurityJWT.entity.OurUsers;
import com.twd.SpringSecurityJWT.entity.Product;
import com.twd.SpringSecurityJWT.repository.CommandRepository;
import com.twd.SpringSecurityJWT.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommandService {

    @Autowired
    private CommandRepository commandRepository;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private OurUsersService userService;

    public Commande addCommande(Commande commande) {
        return commandRepository.save(commande);
    }

    public String deleteCommande(Long id) {
        commandRepository.deleteById(id);
        return "Commande with ID " + id + " deleted successfully";
    }


}
