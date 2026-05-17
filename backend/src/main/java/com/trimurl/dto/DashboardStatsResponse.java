package com.trimurl.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsResponse {
    private Long totalUrls;
    private Long totalClicks;
    private Long maxClicks;
    private Double averageClicks;
}
