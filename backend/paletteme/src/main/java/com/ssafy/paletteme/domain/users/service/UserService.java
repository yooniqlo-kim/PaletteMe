package com.ssafy.paletteme.domain.users.service;

import co.elastic.clients.elasticsearch.security.User;
import com.ssafy.paletteme.common.redis.RedisService;
import com.ssafy.paletteme.domain.artworks.repository.UsersArtworksLikeRepository;
import com.ssafy.paletteme.domain.artworks.service.command.ArtworkLikeCommandService;
import com.ssafy.paletteme.domain.reviews.repository.ReviewsRepository;
import com.ssafy.paletteme.domain.users.dto.*;
import com.ssafy.paletteme.domain.users.entity.*;
import com.ssafy.paletteme.domain.users.exception.UserError;
import com.ssafy.paletteme.domain.users.exception.UserException;
import com.ssafy.paletteme.domain.users.repository.*;
import com.ssafy.paletteme.domain.users.utils.S3Util;
import com.ssafy.paletteme.domain.users.utils.SmsCertificationUtil;
import lombok.RequiredArgsConstructor;
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
    private final UsersArtworksLikeRepository usersArtworksLikeRepository;

    private final PasswordEncoder passwordEncoder;
    private final S3Util s3Util;
    private final SmsCertificationUtil smsCertificationUtil;
    private final RedisService redisService;

    private final UsersFavoriteColorRepository usersFavoriteColorRepository;

    private final ArtworkLikeCommandService artworkLikeCommandService;


    // 최대 허용 크기(이미지 저장) (예: 10MB)
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;

    // 휴대폰 인증 시간
    private static final String PHONE_VERIFICATION_PREFIX = "auth:phone:";
    private final Duration REDIS_EXPIRATION = Duration.ofMinutes(5);
    private final ReviewsRepository reviewsRepository;

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
        List<String> artworkIdList = userSignupRequest.getArtworkId();
        for(String artworkId : artworkIdList) {
            artworkLikeCommandService.likeArtwork(users, artworkId);
        }


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

        String key = PHONE_VERIFICATION_PREFIX + phoneNumber;
        String value = verificationCode;
        redisService.set(key, value, REDIS_EXPIRATION);
    }


    public void verifyPhone(VerificationRequest verificationRequest){
        String key = PHONE_VERIFICATION_PREFIX + verificationRequest.getPhoneNumber();
        String value = verificationRequest.getVerificationCode();

        String savedCode = redisService.get(key);

        if( savedCode == null || !value.equals(savedCode)) {
            throw new UserException(UserError.AUTH_PHONE_CERTIFICATION_CODE_MISMATCH);
        }

        redisService.delete(key);
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

    @Transactional(readOnly = true)
    public void checkNickname(CheckNicknameRequest checkNicknameRequest) {
        String nickname = checkNicknameRequest.getNickname();
        if(usersRepository.existsByNickname(nickname)){
            throw new UserException(UserError.SIGNUP_USERS_DUPLICATE_NICKNAME);
        }
    }

    public void logout(int userId) {
        String key = "user:stats:" + userId;
        redisService.delete(key);
    }

    // 회원 탈퇴
    @Transactional
    public void deactivateUser(int userId) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new UserException(UserError.USER_NOT_FOUND));
        user.inactivate();
        usersRepository.flush(); // 변경 강제 반영
    }

    @Transactional
    public PasswordVerifyResponse verifyPassword(int userId, PasswordVerifyRequest request) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new UserException(UserError.USER_NOT_FOUND));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UserException(UserError.SECURITY_USERS_PASSWORD_NOT_MATCH);
        }

        return PasswordVerifyResponse.builder()
                .name(user.getName())
                .loginId(user.getLoginId())
                .birthday(user.getBirthday())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getUserProfile(int userId) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new UserException(UserError.USER_NOT_FOUND));

        String grade = user.getGrade().getGrade();
        int attendance = user.getAttendance();
        int reviewCount = reviewsRepository.countByUser(user);
        int artworkLikeCount = usersArtworksLikeRepository.countByUser(user);

        return UserProfileResponse.of(reviewCount, artworkLikeCount, attendance, grade);
    }

    @Transactional
    public void updatePassword(int userId, PasswordUpdateRequest request) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new UserException(UserError.USER_NOT_FOUND));

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(request.getNewPassword());

        user.updatePassword(encodedPassword);
        usersRepository.save(user);
    }

    // TODO: 기존에 사용하던 이미지는 S3에서 지워주기.
    @Transactional
    public void updateUserInfo(int userId, UpdateUserInfoRequest request, MultipartFile file) {
        Users user = usersRepository.findById((long) userId)
                .orElseThrow(() -> new UserException(UserError.USER_NOT_FOUND));
        user.updateNickname(request.getNickname());

        // 이미지 저장하기
        String s3Url = handleProfileImageUpload(file);
        user.updateS3Url(s3Url);

        // UserRepository 이슈로 더티 체킹이 안될 수 도 있음.
        usersRepository.save(user);
    }


    private String generate6DigitCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // 100000 ~ 999999
        return String.valueOf(code);
    }


    public List<ArtworkRecommendationResponse> getRecommendedArtworks() {
        List<ArtworkRecommendationResponse> list= redisService.getAllArtworkRecommendations();
        return list;
    }
}
// TODO: 휴대폰 번호 암호화 및 복호화 알고리즘 만들기
