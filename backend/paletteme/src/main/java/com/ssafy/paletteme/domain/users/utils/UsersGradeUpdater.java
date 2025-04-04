package com.ssafy.paletteme.domain.users.utils;

import com.ssafy.paletteme.common.redis.RedisService;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksError;
import com.ssafy.paletteme.domain.artworks.exception.ArtworksException;
import com.ssafy.paletteme.domain.users.dto.UserStats;
import com.ssafy.paletteme.domain.users.entity.Users;
import com.ssafy.paletteme.domain.users.entity.UsersGrade;
import com.ssafy.paletteme.domain.users.exception.UserError;
import com.ssafy.paletteme.domain.users.exception.UserException;
import com.ssafy.paletteme.domain.users.repository.UsersGradeRepository;
import com.ssafy.paletteme.domain.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class UsersGradeUpdater {

    private final UsersGradeRepository usersGradeRepository;
    private final UsersRepository usersRepository;
    private final RedisService redisService;

    @Transactional
    public void updateUserGradeIfNeeded(UserStats userStats) {
        Users user = usersRepository.findById((long)userStats.getUserId())
                .orElseThrow(() -> new UserException(UserError.USER_NOT_FOUND));

        String calculatedGrade = UserStats.calculateGrade(
                userStats.getReviewCount(),
                userStats.getLikeCount(),
                userStats.getAttendance()
        );

        if (!userStats.getGrade().equals(calculatedGrade)) {
            userStats.updateGrade(calculatedGrade);

            UsersGrade usersGrade = usersGradeRepository.findByGrade(calculatedGrade)
                    .orElseThrow(() -> new ArtworksException(ArtworksError.USER_GRADE_NOT_FOUND));

            user.updateGrade(usersGrade);
            usersRepository.save(user);
        }
    }
}