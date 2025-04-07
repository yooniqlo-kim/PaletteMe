package com.ssafy.paletteme.infrastructure.batch.wrapped;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.time.LocalDateTime;

//  @Bean 메서드 간의 의존성/싱글톤 보장을 위해서는 @Configuration이 더 안전.
@Configuration
@EnableBatchProcessing
@RequiredArgsConstructor
public class WrappedStatsJobConfig {
    // Job의 메타 데이터를 DB에 저장하고, 관리.
    private final JobRepository jobRepository;
    // config.MetaDBConfig에서 @Primary로 지정한 TransactionManager가 주입됨.
    private final PlatformTransactionManager platformTransactionManager;

    private final WrappedStatsProcessor processor;
    private final WrappedStatsWriter writer;
    private final WrappedStatsJobListener listener;
    private final UserIdReader userIdReader;

    @Bean
    public Job wrappedStatsJob() {
        // 생성되는 객체들 확인하기 위해 수동 방식 사용
        return new JobBuilder("firstJob", jobRepository)
                .start(wrappedStatsStep(null, null))
                .listener(listener)
                .build();
    }

    @Bean
    @JobScope
    public Step wrappedStatsStep(
            @Value("#{jobParameters['startDate']}") String startDateStr,
            @Value("#{jobParameters['endDate']}") String endDateStr
    ) {
        LocalDateTime start = LocalDateTime.parse(startDateStr);
        LocalDateTime end = LocalDateTime.parse(endDateStr);

        return new StepBuilder("wrappedStatsStep", jobRepository)
                .<Integer, WrappedStatsDto>chunk(100, platformTransactionManager)
                .reader(userIdReader)
                .processor(processor)
                .writer(writer)
                .build();
    }

}
