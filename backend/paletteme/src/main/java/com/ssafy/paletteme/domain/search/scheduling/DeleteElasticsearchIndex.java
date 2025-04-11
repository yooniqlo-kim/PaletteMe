package com.ssafy.paletteme.domain.search.scheduling;

import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;

@Component
public class DeleteElasticsearchIndex {

    //@Scheduled(cron = "0 0 0 * * ?") // 매일 0시 0분 0초
    //@Scheduled(cron = "0 * * * * ?") // 매 1분마다
    public void clearElasticsearchIndex() throws IOException {
        WebClient client = WebClient.create("http://localhost:9200");

        // 인덱스 존재 여부 확인
        boolean indexExists = Boolean.TRUE.equals(
                client.get()
                        .uri("/artworks_index")
                        .header("Accept", "application/json")
                        .retrieve()
                        .onStatus(status -> status.is4xxClientError(), response -> Mono.just(new RuntimeException("Index not found")))
                        .bodyToMono(String.class)
                        .map(body -> true) // 응답이 왔으면 존재하는 것
                        .onErrorReturn(false)
                        .block()
        );

        if (indexExists) {
            // 문서만 삭제하고 매핑과 설정은 그대로 유지하여 가볍고 빠르게 동작함
            // 색인 구조 변경이 없으므로 효율적임
            client.post()
                    .uri("/artworks_index/_delete_by_query")
                    .header("Content-Type", "application/json")
                    .bodyValue("{\"query\":{\"match_all\":{}}}")
                    .retrieve()
                    .toBodilessEntity()
                    .block();

            //인덱스 삭제 (기존 문서 + 매핑 + 설정 모두 삭제)
//            client.delete()
//                    .uri("/artworks_index")
//                    .retrieve()
//                    .toBodilessEntity()
//                    .block();

            System.out.println("artworks_index 삭제 완료");
        } else {
            System.out.println("artworks_index가 존재하지 않아 삭제 생략");
        }

        // Logstash 실행 (외부 프로세스로)
        ProcessBuilder builder = new ProcessBuilder(
                "docker", "compose", "-f", "docker-compose.yaml", "up", "-d", "logstash"
        );

        // 에러 출력도 포함해서 실행 로그 보기
        builder.redirectErrorStream(true);

        Process process = builder.start();

        // 출력 로그 보기 (선택사항)
        try (var reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("[Logstash] " + line);
            }
        }
    }
}
