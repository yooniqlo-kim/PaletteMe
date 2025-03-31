package com.ssafy.paletteme.domain.users.service;

import com.ssafy.paletteme.domain.users.dto.CheckIdRequest;
import com.ssafy.paletteme.domain.users.dto.S3UploadResponse;
import com.ssafy.paletteme.domain.users.dto.UserSignupRequest;
import com.ssafy.paletteme.domain.users.dto.VerificationRequest;
import com.ssafy.paletteme.domain.users.entity.*;
import com.ssafy.paletteme.domain.users.exception.UserError;
import com.ssafy.paletteme.domain.users.exception.UserException;
import com.ssafy.paletteme.domain.users.repository.*;
import com.ssafy.paletteme.domain.users.utils.S3Util;
import com.ssafy.paletteme.domain.users.utils.SmsCertificationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UsersRepository usersRepository;
    private final UsersImgRepository usersImgRepository;
    private final UsersGradeRepository  usersGradeRepository;
    private final ColorRepository colorRepository;

    private final PasswordEncoder passwordEncoder;
    private final S3Util s3Util;
    private final SmsCertificationUtil smsCertificationUtil;
    private final StringRedisTemplate stringRedisTemplate;

    private final UsersFavoriteColorRepository usersFavoriteColorRepository;

    // 최대 허용 크기(이미지 저장) (예: 10MB)
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    // 휴대폰 인증 시간
    private final Duration REDIS_EXPIRATION = Duration.ofMinutes(5);

    @Transactional
    public void signUp(UserSignupRequest userSignupRequest, MultipartFile file) {
        // 아이디 UNIQUE 확인

        if (usersRepository.existsByLoginId(userSignupRequest.getId())) {
            throw new UserException(UserError.SIGNUP_USERS_DUPLICATE_ID);
        }

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

    @Transactional(readOnly = true)
    public void checkId(CheckIdRequest checkIdRequest){
         if(usersRepository.existsByLoginId(checkIdRequest.getId())){
             throw new UserException(UserError.SIGNUP_USERS_DUPLICATE_ID);
         }
    }


    public void sendPhone(String phoneNumber){
        String verificationCode = generate6DigitCode();
        smsCertificationUtil.sendSMS(phoneNumber, verificationCode);

        String key = phoneNumber;
        String value = verificationCode;
        ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
        stringValueOperations.set(key, value, REDIS_EXPIRATION);
    }


    public void verifyPhone(VerificationRequest verificationRequest){
        String key = verificationRequest.getPhoneNumber();
        String value = verificationRequest.getVerificationCode();

        ValueOperations<String, String> stringValueOperations = stringRedisTemplate.opsForValue();
        String savedCode = stringValueOperations.get(key);

        if( savedCode == null || !value.equals(savedCode)) {
            throw new UserException(UserError.AUTH_PHONE_CERTIFICATION_CODE_MISMATCH);
        }

        stringRedisTemplate.delete(key);
    }

    @Transactional
    public String handleProfileImageUpload(MultipartFile file) {
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


    private String generate6DigitCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // 100000 ~ 999999
        return String.valueOf(code);
    }
}
// TODO: 휴대폰 번호 암호화 및 복호화 알고리즘 만들기
// TODO: 작품 좋아요 추가하기
