package com.trimurl.controller;

import com.trimurl.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/r")
@CrossOrigin(origins = "*")
public class RedirectController {

    @Autowired
    private UrlService urlService;

    @GetMapping("/{shortCode}")
    public ResponseEntity<?> redirectToUrl(@PathVariable String shortCode) {
        try {
            var url = urlService.getUrlByShortCode(shortCode);
            urlService.incrementClicks(shortCode);
            
            return ResponseEntity
                    .status(HttpStatus.MOVED_PERMANENTLY)
                    .header("Location", url.getOriginalUrl())
                    .build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Short URL not found"));
        }
    }

    private static class ErrorResponse {
        public String message;
        ErrorResponse(String message) {
            this.message = message;
        }
    }
}
