package com.ssafy.paletteme.domain.users.service;

import com.ssafy.paletteme.domain.users.dto.S3UploadResponse;
import com.ssafy.paletteme.domain.users.dto.UserSignupRequest;
import com.ssafy.paletteme.domain.users.entity.*;
import com.ssafy.paletteme.domain.users.exception.UserError;
import com.ssafy.paletteme.domain.users.exception.UserException;
import com.ssafy.paletteme.domain.users.repository.*;
import com.ssafy.paletteme.domain.users.utils.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UsersRepository usersRepository;
    private final UsersImgRepository usersImgRepository;
    private final UsersGradeRepository  usersGradeRepository;
    private final ColorRepository colorRepository;

    private final PasswordEncoder passwordEncoder;
    private final S3Util s3Util;
    private final UsersFavoriteColorRepository usersFavoriteColorRepository;

    // 최대 허용 크기(이미지 저장) (예: 10MB)
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    @Transactional
    public void signUp(UserSignupRequest userSignupRequest, MultipartFile file) {
        // 이미지 저장하기
        String s3Url = handleProfileImageUpload(file);

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(userSignupRequest.getPassword());

        // UsersGrade에서 회원 가입 시 사용할 디폴트 값 가져오기
        UsersGrade initialGrade = usersGradeRepository.findById(1)
                .orElseThrow(() -> new UserException(UserError.SIGNUP_USERS_GRADE));

        // User 저장하기
        Users users = usersRepository.save(userSignupRequest.toEntity(s3Url, encodedPassword, initialGrade));

        // 색상 정보 users_favorite_color에 저장하기
        List<UsersFavoriteColor> favoriteColorList = userSignupRequest.getColor().stream()
                .map(color ->{
                    Color colorEntity = colorRepository.findByColor(color)
                            .orElseThrow(() -> new UserException(UserError.SIGNUP_USERS_COLOR));
                    return UsersFavoriteColor.of(users, colorEntity);
                })
                .toList();
        usersFavoriteColorRepository.saveAll(favoriteColorList);

        // 작품 좋아요 추가하기

    }

    private String handleProfileImageUpload(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return s3Util.getDefaultProfileImageUrl();
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new UserException(UserError.SIGNUP_USERS_IMAGE_UPLOAD_SIZE);
        }

        try {
            S3UploadResponse response = s3Util.imageUpload(file, "mypage");
            usersImgRepository.save(UsersImg.builder()
                    .url(response.getS3Url())
                    .fileKey(response.getS3Key())
                    .build());
            return response.getS3Url();
        } catch (Exception e) {
            throw new UserException(UserError.SIGNUP_USERS_IMAGE_UPLOAD);
        }
    }


}
// TODO: 휴대폰 번호 암호화 및 복호화 알고리즘 만들기.
// TODO: 작품 좋아요 추가하기
