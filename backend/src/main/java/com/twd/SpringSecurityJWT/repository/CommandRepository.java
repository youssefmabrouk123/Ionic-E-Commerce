package com.twd.SpringSecurityJWT.repository;
import com.twd.SpringSecurityJWT.entity.Commande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandRepository extends JpaRepository<Commande, Long> {
    // Additional custom query methods can be added here if needed
}
