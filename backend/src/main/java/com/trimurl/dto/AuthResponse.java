package com.trimurl.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private Long id;
    private String email;
    private String token;
    private LocalDateTime createdAt;
}
