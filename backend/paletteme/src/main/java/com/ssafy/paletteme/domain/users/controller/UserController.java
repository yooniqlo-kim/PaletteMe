package com.ssafy.paletteme.domain.users.controller;

import com.ssafy.paletteme.common.response.ApiResponse;
import com.ssafy.paletteme.domain.users.dto.UserSignupRequest;
import com.ssafy.paletteme.domain.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @PostMapping(value = "/sign-up", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Void> signUp(@RequestPart("data") UserSignupRequest request, @RequestPart(value = "file", required = false)  MultipartFile file) throws IOException {
        userService.signUp(request, file);
        return ApiResponse.success();
    }
}
