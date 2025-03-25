package com.ssafy.paletteme.infrastructure.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {
    @Value("${cloud.aws.s3.credentials.access-key}")
    private String s3AccessKey;

    @Value("${cloud.aws.s3.credentials.secret-key}")
    private String s3SecretKey;

    @Value("${cloud.aws.s3.region}")
    private String s3Region;

    @Bean
    public AmazonS3Client amazonS3Client(){
        // accessKey, secretKey는 IAM 사용자가 AWS 리소스에 접근하기 위해 발급받은 자격증명.
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(s3AccessKey, s3SecretKey);

        return (AmazonS3Client) AmazonS3ClientBuilder
                .standard()
                .withRegion(s3Region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
