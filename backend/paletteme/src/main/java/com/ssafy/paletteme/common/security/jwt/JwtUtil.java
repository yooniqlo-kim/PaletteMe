package com.ssafy.paletteme.common.security.jwt;

import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {
    private String secret = "mySuperSecureJwtSecretKey1234567890!";;
    private SecretKey secretKey;

    private final long TOKEN_EXPIRATION_MS = 864000000L; // 10일

    // secret에 값이 들어간 이후 초기화
    @PostConstruct
    public void init() {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    //jwt 생성
    public String createJwt(String category, int userId, String id, String role) {
        return Jwts.builder()
                .claim("category",category) // access or refresh
                .claim("userId",userId)
                .claim("id", id)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis())) // 발급 시간
                .expiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_MS)) //토큰 만료시간 설정
                .signWith(secretKey)
                .compact(); // JWT를 문자열 형태로 직렬화
    }

    public String getCategory(String token){
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    public int getUserId(String token){
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("userId", Integer.class);
    }

    public String getId(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("id", String.class);
    }

    public String getRole(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }
}
