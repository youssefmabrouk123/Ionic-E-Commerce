package com.twd.SpringSecurityJWT.repository;

import com.twd.SpringSecurityJWT.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OurUserRepo extends JpaRepository<OurUsers, Integer> {
    Optional<OurUsers> findByEmail(String email);

    Optional<OurUsers> findById(Long id) ;
    List<OurUsers> findByRole(String role);
    Optional<OurUsers> findByIdAndRole(Long id, String role);
    boolean existsByEmail(String email);
    List<OurUsers> findByRoleAndAccountState(String role, String accountState);

}
