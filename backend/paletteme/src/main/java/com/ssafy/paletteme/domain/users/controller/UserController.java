package com.ssafy.paletteme.domain.users.controller;

import com.ssafy.paletteme.domain.users.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

//    @PostMapping(value="/sign-up")
//   public ResponseEntity<Void> signUp() {
////        System.out.println("UserController.signUp");
//////        @RequestPart("file") MultipartFile file
//////     ,@RequestPart("data")UserSignupRequest request
////        System.out.println(request.toString());
//////        System.out.println(file.toString());
//        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
//    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }
}
