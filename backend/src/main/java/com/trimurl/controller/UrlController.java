package com.trimurl.controller;

import com.trimurl.dto.DashboardStatsResponse;
import com.trimurl.dto.ShortenUrlRequest;
import com.trimurl.dto.UrlResponse;
import com.trimurl.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/urls")
@CrossOrigin(origins = "*")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @PostMapping("/shorten")
    public ResponseEntity<?> shortenUrl(@RequestBody ShortenUrlRequest request, Authentication authentication) {
        try {
            String email = (String) authentication.getPrincipal();
            UrlResponse response = urlService.shortenUrl(request, email);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<Page<UrlResponse>> getUserUrls(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        Page<UrlResponse> urls = urlService.getUserUrls(email, page, size);
        return ResponseEntity.ok(urls);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUrl(@PathVariable Long id, Authentication authentication) {
        try {
            String email = (String) authentication.getPrincipal();
            urlService.deleteUrl(id, email);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/stats/dashboard")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        DashboardStatsResponse stats = urlService.getDashboardStats(email);
        return ResponseEntity.ok(stats);
    }

    private static class ErrorResponse {
        public String message;
        ErrorResponse(String message) {
            this.message = message;
        }
    }
}
