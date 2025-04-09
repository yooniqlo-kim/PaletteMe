package com.ssafy.paletteme.domain.reviews.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor(staticName = "of")
public class ReviewListResponse {
    private List<ReviewSummaryResponse> reviews;
}
