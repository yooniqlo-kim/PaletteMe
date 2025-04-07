package com.ssafy.paletteme.infrastructure.db;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@EnableJpaRepositories(
        // 단일 DataSource일 땐 Spring Boot가 자동으로 처리해주지만, 다중 DataSource일 땐 내가 직접 repository 경로를 명시
        // @EnableJpaRepositories를 통해 Repository들이 어떤 EntityManagerFactory와 TransactionManager를 쓸지 명시하기.
        basePackages = {
                "com.ssafy.paletteme.domain.artworks.repository",
                "com.ssafy.paletteme.domain.reviews.repository",
                "com.ssafy.paletteme.domain.users.repository",
                "com.ssafy.paletteme.domain.myMuseum.repository",
                "com.ssafy.paletteme.domain.wrapped.repository",
                "com.ssafy.paletteme.domain.ranking.repository"
,
        },
        entityManagerFactoryRef = "dataEntityManager",
        transactionManagerRef = "dataTransactionManager"
)
public class DataDataSourceConfig {
    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;


    // DataSource 설정
    @Bean(name = "dataDataSource")
    @ConfigurationProperties(prefix = "spring.datasource-data")
    public DataSource dataDBSource() {
        return DataSourceBuilder.create().build();
    }


    // JPA가 사용할 EntityManager 생성.
    @Bean(name = "dataEntityManager")
    public LocalContainerEntityManagerFactoryBean dataEntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();

        // 다중 DataSource 환경에서는 어떤 Entity가 어떤 DB랑 연결되어야 할지 명시해주기
        em.setDataSource(dataDBSource());                                         // 위에서 만든 DataSource 주입
        em.setPackagesToScan(new String[]{
                "com.ssafy.paletteme.domain.artworks.entity",
                "com.ssafy.paletteme.domain.reviews.entity",
                "com.ssafy.paletteme.domain.search.entity",
                "com.ssafy.paletteme.domain.users.entity",
                "com.ssafy.paletteme.domain.myMuseum.entity",
                "com.ssafy.paletteme.domain.wrapped.entity"
        });
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", ddlAuto);        // 테이블 자동 생성 or 갱신
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        properties.put("hibernate.show_sql", "false");              // 콘솔에 SQL 쿼리 출력
        properties.put("hibernate.physical_naming_strategy", "org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy");
        em.setJpaPropertyMap(properties);

        return em;
    }

    // TransactionManager 설정
    @Bean(name = "dataTransactionManager")
    public PlatformTransactionManager dataTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(dataEntityManager().getObject());

        return transactionManager;
    }
}
