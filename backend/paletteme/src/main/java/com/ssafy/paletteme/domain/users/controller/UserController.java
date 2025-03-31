package com.ssafy.paletteme.domain.users.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.common.security.annotation.UserId;
import com.ssafy.paletteme.domain.users.dto.PhoneNumberRequest;
import com.ssafy.paletteme.domain.users.dto.UserSignupRequest;
import com.ssafy.paletteme.domain.users.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


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

    @Operation(summary = "토큰 유효성 확인", description = "Access Token이 유효한지 확인하는 테스트용 API입니다.")
    @GetMapping(value = "/token-test")
    public ApiResponse<Integer> tokenTest(@Parameter(hidden = true) @UserId int userId){
        return ApiResponse.success(userId);
    }

    @Operation(summary = "휴대폰 인증번호 전송", description = "입력한 휴대폰 번호로 인증번호(SMS)를 전송합니다.")
    @PostMapping("/phone/send")
    public ApiResponse<Void> sendPhone( @Parameter(description = "인증번호를 받을 사용자의 휴대폰 번호", required = true)
                                        @RequestBody PhoneNumberRequest request) {
        userService.sendPhone(request.getPhoneNumber());
        return ApiResponse.success();
    }
}
