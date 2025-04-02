package com.ssafy.paletteme.domain.users.dto;

import com.ssafy.paletteme.domain.users.entity.UsersImg;
import lombok.Getter;

@Getter
public class S3UploadResponse {
    private final String s3Url;
    private final String s3Key;

    private S3UploadResponse(String s3Url, String s3Key){
        this.s3Url = s3Url;
        this.s3Key = s3Key;
    }

    public static S3UploadResponse of(String s3Url, String s3Key){
        return new S3UploadResponse(s3Url, s3Key);
    }

}
