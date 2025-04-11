package com.ssafy.paletteme.infrastructure.db;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;

// Spring Batch 메타데이터 전용이기 때문에, repository에 접근할 필요가 없기 때문에 EntityManager 선언 x
@Configuration
public class MetaDataSourceConfig {

    // 2개 이상의 DataSource를 만들 때 충돌을 방지하기 위해 우선순위 정해줌, Primary에 meta테이블 생성 됨.
    @Primary
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource-meta")
    public DataSource metaDBDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Primary
    @Bean
    public PlatformTransactionManager metaTransactionManager() {
        return new DataSourceTransactionManager(metaDBDataSource());
    }
}
