package com.ssafy.paletteme.infrastructure.batch.wrapped.scheduler;

import com.ssafy.paletteme.domain.wrapped.repository.WrappedRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;

@Component
public class OneTimeScheduler {
//    private final TaskScheduler taskScheduler;
//    private final JobLauncher jobLauncher;
//    private final Job wrappedStatsJob;
//    private final WrappedRepository wrappedRepository;
//
//    private static final Logger logger = LoggerFactory.getLogger(OneTimeScheduler.class);
//    public OneTimeScheduler(TaskScheduler taskScheduler,
//                            JobLauncher jobLauncher,
//                            @Qualifier("wrappedStatsJob") Job wrappedStatsJob,
//                            WrappedRepository wrappedRepository) {
//        this.taskScheduler = taskScheduler;
//        this.jobLauncher = jobLauncher;
//        this.wrappedStatsJob = wrappedStatsJob;
//        this.wrappedRepository = wrappedRepository;
//    }
//
//    @EventListener(ApplicationReadyEvent.class)
//    public void scheduleOneTimeTask() {
//        taskScheduler.schedule(this::runTaskOnce,
//                new Date(System.currentTimeMillis() + 60 * 1000)); // 1분 후
//    }
//
//    private void runTaskOnce() {
//        wrappedRepository.deleteAllInBatch();
//
//        LocalDate today = LocalDate.now();
//        LocalDateTime startDate = today.withDayOfMonth(1).atStartOfDay(); // 이번달 1일 00:00
//        LocalDateTime endDate = today.with(TemporalAdjusters.lastDayOfMonth()).atTime(LocalTime.MAX); // 이번달 마지막날 23:59:59.999999999
//
//        JobParameters params = new JobParametersBuilder()
//                .addString("startDate", startDate.toString())
//                .addString("endDate", endDate.toString())
//                .addLong("runId", System.currentTimeMillis()) // 중복 방지
//                .toJobParameters();
//
//        try {
//            logger.info("wrappedStats 스케줄러 실행(원타임)");
//            jobLauncher.run(wrappedStatsJob, params);
//
//        } catch (Exception e) {
//            logger.error("wrappedStats 스케줄러 실행 중 오류 발생", e);
//        }
//    }
}
