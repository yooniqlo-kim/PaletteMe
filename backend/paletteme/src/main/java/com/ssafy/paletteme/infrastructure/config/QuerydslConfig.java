package com.ssafy.paletteme.infrastructure.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



@Configuration
public class QuerydslConfig {
    @Bean
    public JPAQueryFactory jpaQueryFactory(@Qualifier("dataEntityManager") EntityManagerFactory emf) {
        return new JPAQueryFactory(emf.createEntityManager());
    }

}
