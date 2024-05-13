    package com.twd.SpringSecurityJWT.entity;

    import com.fasterxml.jackson.annotation.JsonBackReference;
    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import lombok.Data;

    import java.time.LocalDateTime;
    import java.util.ArrayList;
    import java.util.List;
    import java.util.Objects;

    @Data
    @Entity
    @Table(name = "product")
    public class Product {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)

        private Long idProduct;

        private String nameProduct ;
        private String name_link ;
        private String image;
        private String descriptionProduct;
//        private String price ;

        private String price ;

        private Long stockProduct ;

        private LocalDateTime creationDate;

        //
        @ManyToOne
        @JsonBackReference
        @JoinColumn(name = "user_id",nullable = false)
        private OurUsers user;

        @OneToMany(mappedBy = "product")
        private List<SavedProduct> savedProducts = new ArrayList<>();

//        @JsonIgnore
//        @OneToMany(mappedBy = "product")
//        private List<CartProduct> cartProducts = new ArrayList<>();
        //////
        @ManyToOne
        @JoinColumn(name = "category_id")
        private Category category;
        /////////

        public void setCreationdate(LocalDateTime creationDate) {
            this.creationDate = creationDate;
        }




        public OurUsers getUser() {
            return user;
        }

        public void setUser(OurUsers user) {
            this.user = user;
        }

//        public List<CartProduct> getLikedByUsers() {
//            return cartProducts;
//        }

        //////////


        public Long getIdProduct() {
            return idProduct;
        }

        public void setIdProduct(Long idProduct) {
            this.idProduct = idProduct;
        }

        public String getNameProduct() {
            return nameProduct;
        }

        public void setNameProduct(String nameProduct) {
            this.nameProduct = nameProduct;
        }

        public String getDecriptionProduct() {
            return descriptionProduct;
        }

        public void setDecriptionProduct(String descriptionProduct) {
            this.descriptionProduct = descriptionProduct;
        }

        public String getPriceProduct() {
            return price;
        }

        public void setPriceProduct(String priceProduct) {
            this.price = priceProduct;
        }

        public Long getStockProduct() {
            return stockProduct;
        }

        public void setStockProduct(Long stockProduct) {
            this.stockProduct = stockProduct;
        }

        public LocalDateTime getCreationDate() {
            return creationDate;
        }

        public void setCreationDate(LocalDateTime creationDate) {
            this.creationDate = creationDate;
        }

        public List<SavedProduct> getSavedProducts() {
            return savedProducts;
        }

        public void setSavedProducts(List<SavedProduct> savedProducts) {
            this.savedProducts = savedProducts;
        }

//        public List<CartProduct> getCartProducts() {
//            return cartProducts;
//        }
//
//        public void setCartProducts(List<CartProduct> cartProducts) {
//            this.cartProducts = cartProducts;
//        }


        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Product product = (Product) o;
            return Objects.equals(idProduct, product.idProduct) && Objects.equals(nameProduct, product.nameProduct) && Objects.equals(descriptionProduct, product.descriptionProduct) && Objects.equals(price, product.price) && Objects.equals(user, product.user);
        }

        @Override
        public int hashCode() {
            return Objects.hash(idProduct, nameProduct, descriptionProduct, price, user);
        }
    }
