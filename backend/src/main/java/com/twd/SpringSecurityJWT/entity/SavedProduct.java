package com.twd.SpringSecurityJWT.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "saved_product")
public class SavedProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime creationDate;

    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private OurUsers user;

    //@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonBackReference
    private Product product;

}
