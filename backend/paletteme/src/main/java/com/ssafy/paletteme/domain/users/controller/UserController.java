package com.ssafy.paletteme.domain.users.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.common.security.annotation.UserId;
import com.ssafy.paletteme.domain.users.dto.*;
import com.ssafy.paletteme.domain.users.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@Tag(name = "Users", description = "회원 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Operation(summary = "회원가입", description = "폼데이터 형식으로 회원 정보를 전송, User의 개인 정보를 담은 데이터와 이미지를 담은 데이터를 분리해서 보내줘야합니다.(스웨거 테스트 불가)")
    @PostMapping(value = "/sign-up", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Void> signUp(@RequestPart("data") UserSignupRequest request, @RequestPart(value = "file", required = false)  MultipartFile file) throws IOException {
        userService.signUp(request, file);
        return ApiResponse.success();

    }

    @Operation(summary = "아이디 중복 확인", description = "사용자가 입력한 아이디가 이미 존재하는지 확인.")
    @PostMapping("check-id")
    public ApiResponse<Void> checkId(@RequestBody CheckIdRequest request){
        userService.checkId(request);
        return ApiResponse.success();
    }



    @Operation(summary = "휴대폰 인증번호 전송", description = "입력한 휴대폰 번호로 인증번호(SMS)를 전송.")
    @PostMapping("/phone/send")
    public ApiResponse<Void> sendPhone( @Parameter(description = "인증번호를 받을 사용자의 휴대폰 번호", required = true)
                                        @RequestBody PhoneNumberRequest request) {
        userService.sendPhone(request.getPhoneNumber());
        return ApiResponse.success();
    }

    @Operation(summary = "휴대폰 인증번호 검증", description = "사용자가 입력한 인증번호가 저장된 값과 일치하는지 검증.")
    @PostMapping("/phone/verify")
    public ApiResponse<Void> verifyPhone(@RequestBody VerificationRequest request) {
        userService.verifyPhone(request);
        return ApiResponse.success();

    }


    @Operation(summary = "토큰 유효성 확인", description = "Access Token이 유효한지 확인하는 테스트용 API.")
    @GetMapping(value = "/token-test")
    public ApiResponse<Integer> tokenTest(@Parameter(hidden = true) @UserId int userId){
        return ApiResponse.success(userId);
    }

    @Operation(summary = "닉네임 중복 확인", description = "사용자가 입력한 닉네임이 이미 존재하는지 확인.")
    @PostMapping("/check-nickname")
    public ApiResponse<Void> checkNickname(@RequestBody CheckNicknameRequest request) {
        userService.checkNickname(request);
        return ApiResponse.success();
    }

    @Operation(summary = "유저 추천 작품 조회", description = "현재 유저에게 추천된 작품 리스트를 반환합니다.")
    @GetMapping("/recommend-artworks")
    public ApiResponse<List<ArtworkRecommendationResponse>> getRecommendedArtworks() {
        List<ArtworkRecommendationResponse> response = userService.getRecommendedArtworks();
        return ApiResponse.success(response);
    }

    @Operation(summary = "로그아웃", description = "현재 사용자관련 데이터를 레디스에서 지웁니다.")
    @PostMapping("/logout")
    public ApiResponse<Void> logout(@Parameter(hidden = true) @UserId int userId) {
        userService.logout(userId);
        return ApiResponse.success();
    }

    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴는 소프트 딜리트로 진행")
    @PostMapping("/inactive")
    public ApiResponse<Void> deactivateUser(@Parameter(hidden = true) @UserId int userId) {
        userService.deactivateUser(userId);
        return ApiResponse.success();
    }

    @Operation(summary = "비밀번호 확인", description = "회원 탈퇴 전 비밀번호를 확인합니다.")
    @PostMapping("/verify-password")
    public ApiResponse<PasswordVerifyResponse> verifyPassword(
            @Parameter(hidden = true) @UserId int userId,
            @RequestBody PasswordVerifyRequest request
    ) {
        PasswordVerifyResponse response = userService.verifyPassword(userId, request);
        return ApiResponse.success(response);
    }

    @Operation(summary = "프로필 정보 조회", description = "감상평 수, 좋아요 수, 출석일 수를 조회합니다.")
    @GetMapping("/profile")
    public ApiResponse<UserProfileResponse> getUserProfile(
            @Parameter(hidden = true) @UserId int userId
    ) {
        UserProfileResponse response = userService.getUserProfile(userId);
        return ApiResponse.success(response);
    }

    @Operation(summary = "비밀번호 변경", description = "새 비밀번호로 변경합니다.")
    @PostMapping("/update-password")
    public ApiResponse<Void> updatePassword(
            @Parameter(hidden = true) @UserId int userId,
            @RequestBody PasswordUpdateRequest request
    ) {
        userService.updatePassword(userId, request);
        return ApiResponse.success();
    }

    @Operation(summary = "회원 정보 수정", description = "닉네임과 프로필 이미지를 수정합니다.")
    @PostMapping(value = "/update-info", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Void> updateUserInfo(
            @Parameter(hidden = true) @UserId int userId,
            @RequestPart("data")  UpdateUserInfoRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file
    ){
        userService.updateUserInfo(userId, request, file);
        return ApiResponse.success();
    }

    @Operation(
            summary = "회원가입 사전 인증",
            description = "무분별한 회원가입을 방지하기 위해 다음으로 버튼 클릭 시, 한번 호출해주세요."
    )
    @PostMapping("/signup/precheck")
    public ApiResponse<Void> preCheck(@RequestBody PreCheckRequest request){
        userService.preCheck(request);
        return ApiResponse.success();
    }

}
