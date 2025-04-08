package com.ssafy.paletteme.infrastructure.batch.wrapped.scheduler;

import com.ssafy.paletteme.domain.wrapped.repository.WrappedRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;

@Component
public class WrappedStatsScheduler {
    private final JobLauncher jobLauncher;
    private final Job wrappedStatsJob;
    private final WrappedRepository wrappedRepository;

    private static final Logger logger = LoggerFactory.getLogger(WrappedStatsScheduler.class);

    // 추후에 Job을 여러 개 만들 수도 있으니, 주입 받을 빈 직접 명시하기
    public WrappedStatsScheduler(JobLauncher jobLauncher,
                                 @Qualifier("wrappedStatsJob") Job wrappedStatsJob,
                                 WrappedRepository wrappedRepository) {
        this.jobLauncher = jobLauncher;
        this.wrappedStatsJob = wrappedStatsJob;
        this.wrappedRepository = wrappedRepository;
    }

    // @Scheduled(cron = "*/10 * * * * *") // 15초마다 실행
    @Scheduled(cron = "0 0 0 1 * *") // 매달 1일 정각에 실행
    public void runWrappedStatsJob() {
        wrappedRepository.deleteAllInBatch();

        LocalDate today = LocalDate.now();
        LocalDateTime startDate = today.withDayOfMonth(1).atStartOfDay(); // 이번달 1일 00:00
        LocalDateTime endDate = today.with(TemporalAdjusters.lastDayOfMonth()).atTime(LocalTime.MAX); // 이번달 마지막날 23:59:59.999999999

        JobParameters params = new JobParametersBuilder()
                .addString("startDate", startDate.toString())
                .addString("endDate", endDate.toString())
                .addLong("runId", System.currentTimeMillis()) // 중복 방지
                .toJobParameters();

        try {
            logger.info("wrappedStats 스케줄러 실행");
            jobLauncher.run(wrappedStatsJob, params);

        } catch (Exception e) {
            logger.error("wrappedStats 스케줄러 실행 중 오류 발생", e);
        }
    }
}
