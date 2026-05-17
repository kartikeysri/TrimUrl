package com.trimurl.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UrlResponse {
    private Long id;
    private String originalUrl;
    private String shortCode;
    private Long clicks;
    private LocalDateTime createdAt;
}
