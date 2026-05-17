package com.trimurl.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShortenUrlRequest {
    private String originalUrl;
    private String customCode;
}
