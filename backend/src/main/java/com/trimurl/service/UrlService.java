package com.trimurl.service;

import com.trimurl.dto.DashboardStatsResponse;
import com.trimurl.dto.ShortenUrlRequest;
import com.trimurl.dto.UrlResponse;
import com.trimurl.entity.Url;
import com.trimurl.entity.User;
import com.trimurl.repository.UrlRepository;
import com.trimurl.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    @Autowired
    private UserRepository userRepository;

    public UrlResponse shortenUrl(ShortenUrlRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String shortCode = request.getCustomCode() != null && !request.getCustomCode().isEmpty()
                ? request.getCustomCode()
                : generateShortCode();

        // Check if short code already exists
        if (urlRepository.existsByShortCode(shortCode)) {
            throw new RuntimeException("Short code already in use");
        }

        Url url = Url.builder()
                .originalUrl(request.getOriginalUrl())
                .shortCode(shortCode)
                .user(user)
                .build();

        url = urlRepository.save(url);

        return mapToResponse(url);
    }

    public Page<UrlResponse> getUserUrls(String email, int page, int size) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Pageable pageable = PageRequest.of(page, size);
        Page<Url> urls = urlRepository.findByUserOrderByCreatedAtDesc(user, pageable);

        return urls.map(this::mapToResponse);
    }

    public void deleteUrl(Long urlId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Url url = urlRepository.findById(urlId)
                .orElseThrow(() -> new RuntimeException("URL not found"));

        if (!url.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        urlRepository.delete(url);
    }

    public Url getUrlByShortCode(String shortCode) {
        return urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("Short URL not found"));
    }

    public void incrementClicks(String shortCode) {
        Url url = getUrlByShortCode(shortCode);
        url.setClicks(url.getClicks() + 1);
        urlRepository.save(url);
    }

    public DashboardStatsResponse getDashboardStats(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Url> userUrls = urlRepository.findByUserOrderByClicksDesc(user);

        long totalUrls = userUrls.size();
        long totalClicks = userUrls.stream().mapToLong(Url::getClicks).sum();
        long maxClicks = userUrls.stream().mapToLong(Url::getClicks).max().orElse(0);
        double averageClicks = totalUrls > 0 ? (double) totalClicks / totalUrls : 0;

        return DashboardStatsResponse.builder()
                .totalUrls(totalUrls)
                .totalClicks(totalClicks)
                .maxClicks(maxClicks)
                .averageClicks(averageClicks)
                .build();
    }

    private String generateShortCode() {
        String shortCode;
        do {
            shortCode = UUID.randomUUID().toString().substring(0, 6);
        } while (urlRepository.existsByShortCode(shortCode));
        return shortCode;
    }

    private UrlResponse mapToResponse(Url url) {
        return UrlResponse.builder()
                .id(url.getId())
                .originalUrl(url.getOriginalUrl())
                .shortCode(url.getShortCode())
                .clicks(url.getClicks())
                .createdAt(url.getCreatedAt())
                .build();
    }
}
