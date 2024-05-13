package com.twd.SpringSecurityJWT.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId ;
    private String name;
    private String email;
    private String address;
    private Long number;
    private LocalDateTime date;


    @ElementCollection
    private List<String> products;

    // Constructors, getters, and setters
    public Commande() {
    }

    // Constructor with parameters
    public Commande(String name, String email, String address, Long number, LocalDateTime date, List<String> products) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.number = number;
        this.date = date;
        this.products = products;
    }

}
