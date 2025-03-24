package com.ssafy.paletteme.domain.users.utils;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.paletteme.infrastructure.config.S3Config;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@RequiredArgsConstructor
@Component
public class S3Util {
    @Value("${default-profile-image-url}")
    private String defaultProfileImageUrl;

    @Value("${cloud.aws.s3.mypage-bucket}")
    private String bucket;

    private final S3Config s3Config;

    public String getDefaultProfileImageUrl() {
        return defaultProfileImageUrl;
    }

    // S3 이미지 업로드
    public void imageUpload(MultipartFile file, String folderName) throws IOException {
        // 파일 이름에서 확장자 추출하여 새로운 파일명 짓기.
        String fileName = file.getOriginalFilename();
        String ext = fileName.substring(fileName.lastIndexOf("."));
        String uuidFileName = UUID.randomUUID() + ext;

        // InputStream으로 파일 내용 읽기
        InputStream inputStream = file.getInputStream();

        // 파일 메타데이터 설정
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize()); // 파일 크기
        metadata.setContentType(file.getContentType()); // 파일 타입


        String s3FilePathName = uuidFileName;

        // S3에 파일 업로드
        s3Config.amazonS3Client().putObject(
                new PutObjectRequest(bucket, s3FilePathName, inputStream, metadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );

        // S3에 저장된 이미지의 Url 주소 가져오기, getUrl("버킷명", "서버에 저장한 경로 포함한 파일명")
        String s3Url = s3Config.amazonS3Client().getUrl(bucket, s3FilePathName).toString();
        //return S3UploadResponse.of(s3Url, s3FilePathName);

        return;
    }

    // S3 이미지 삭제
    public void deleteImage(String s3Key) {
        try{
            s3Config.amazonS3Client().deleteObject(bucket, s3Key);
        }catch (Exception e){
            e.getMessage();

        }
    }
}


//TODO: 이미지 생성시 반환 타입과 이미지 삭제 시 던질 예외 커스텀 하기