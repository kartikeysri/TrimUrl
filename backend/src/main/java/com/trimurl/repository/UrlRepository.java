package com.trimurl.repository;

import com.trimurl.entity.Url;
import com.trimurl.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {
    Optional<Url> findByShortCode(String shortCode);
    Page<Url> findByUserOrderByCreatedAtDesc(User user, Pageable pageable);
    List<Url> findByUserOrderByClicksDesc(User user);
    boolean existsByShortCode(String shortCode);
}
