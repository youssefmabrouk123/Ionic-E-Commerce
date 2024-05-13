        package com.twd.SpringSecurityJWT.entity;


        import com.fasterxml.jackson.annotation.JsonBackReference;
        import jakarta.persistence.*;
        import lombok.Data;

        import java.util.ArrayList;
        import java.util.List;

        @Data
        @Entity
        @Table(name = "category")
        public class Category {

            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            private Long id;

            private String name;
            private String descriptionCategory;


            @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
            @JsonBackReference
            private List<Product> products = new ArrayList<>();
        }
