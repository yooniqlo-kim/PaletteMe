package com.ssafy.paletteme.domain.users.service;

import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeRepository;
import com.ssafy.paletteme.domain.reviews.repository.ReviewsRepository;
import com.ssafy.paletteme.domain.users.dto.UserStats;
import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.exception.UserError;
import com.ssafy.paletteme.domain.users.exception.UserException;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserStatsService {
    private final UsersRepository usersRepository;
    private final ReviewsRepository reviewsRepository;
    private final UsersArtworksLikeRepository usersArtworksLikeRepository;

    public UserStats generateStatsForUser(int userId) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new UserException(UserError.USER_NOT_FOUND));

        int attendance = user.getAttendance();
        int reviewCount = reviewsRepository.countByUser(user);
        int likeCount = usersArtworksLikeRepository.countByUser(user);

        String grade = user.getGrade().getGrade();

        return UserStats.of(userId, reviewCount, likeCount, attendance, grade);
    }
}
