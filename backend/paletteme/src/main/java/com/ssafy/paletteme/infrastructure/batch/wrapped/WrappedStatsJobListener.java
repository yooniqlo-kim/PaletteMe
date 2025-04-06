package com.ssafy.paletteme.infrastructure.batch.wrapped;

import com.querydsl.core.Tuple;
import com.ssafy.paletteme.domain.wrapped.repository.WrappedRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.ssafy.paletteme.domain.users.entity.QUsers.users;

@Component
@RequiredArgsConstructor
public class WrappedStatsJobListener  implements JobExecutionListener {
    private final WrappedRepository wrappedRepository;
    private static final Logger log = LoggerFactory.getLogger(WrappedStatsJobListener.class);

    @Override
    public void beforeJob(JobExecution jobExecution) {
        log.info("Wrapped Batch Listener");

        LocalDateTime start = LocalDateTime.parse(jobExecution.getJobParameters().getString("startDate"));
        LocalDateTime end = LocalDateTime.parse(jobExecution.getJobParameters().getString("endDate"));

        Map<Integer, Tuple> topArtistMap = wrappedRepository.findTopArtistByReviewCount(start, end).stream()
                .filter(t -> t.get(users.userId) != null) // 안전
                .collect(Collectors.toMap(
                        t -> t.get(users.userId),
                        Function.identity()
                ));

        Map<Integer, Tuple> rankMap = wrappedRepository.rankUsersByReviewCount(start, end).stream()
                .collect(Collectors.toMap(
                        t -> t.get(users.userId),
                        Function.identity()
                ));

        Map<Integer, Tuple> longestReviewMap = wrappedRepository.findLongestReviewPerUser(start, end).stream()
                .filter(t -> t.get(users.userId) != null)
                .collect(Collectors.toMap(
                        t -> t.get(users.userId),
                        Function.identity()
                ));

        // ExecutionContext를 통해 컴포넌트간 데이터 공유 가능
        jobExecution.getExecutionContext().put("topArtistMap", topArtistMap);
        jobExecution.getExecutionContext().put("rankMap", rankMap);
        jobExecution.getExecutionContext().put("longestReviewMap", longestReviewMap);
    }

    @Override
    public void afterJob(JobExecution jobExecution) {

    }
}
