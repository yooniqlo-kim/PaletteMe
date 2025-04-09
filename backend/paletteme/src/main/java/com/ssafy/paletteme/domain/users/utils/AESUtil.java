package com.ssafy.paletteme.domain.users.utils;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.util.Base64;

@Component
public class AESUtil {
    @Value("${aes.secret-key}")
   private String secretKey;

   @Value("${aes.init-vector}")
    private String initVector;

    private SecretKeySpec secretKeySpec;
    private IvParameterSpec ivSpec;

    @PostConstruct
    private void init() throws UnsupportedEncodingException {
        secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "AES");
        ivSpec = new IvParameterSpec(initVector.getBytes());
    }

    public String encrypt(String plainText) {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivSpec);
            byte[] encrypted = cipher.doFinal(plainText.getBytes());
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception ex) {
            throw new RuntimeException("Encryption error", ex);
        }
    }

    public String decrypt(String encryptedText) {
        try {
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivSpec);
            byte[] original = cipher.doFinal(Base64.getDecoder().decode(encryptedText));
            return new String(original);
        } catch (Exception ex) {
            throw new RuntimeException("Decryption error", ex);
        }
    }
}