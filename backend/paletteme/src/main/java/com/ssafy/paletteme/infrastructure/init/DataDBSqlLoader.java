package com.ssafy.paletteme.infrastructure.init;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
public class DataDBSqlLoader implements ApplicationRunner {
    @Qualifier("dataDataSource")
    private final DataSource dataDataSource;
    @Value("${spring.jpa.hibernate.ddl-auto}")
    private final String ddlAuto;

    DataDBSqlLoader(@Qualifier("dataDataSource") DataSource dataSource,
                    @Value("${spring.jpa.hibernate.ddl-auto}") String ddlAuto) {
        this.dataDataSource = dataSource;
        this.ddlAuto = ddlAuto;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // ddl-auto가 create일 때만 실행
        if (!"create".equalsIgnoreCase(ddlAuto)) {
            return;
        }

        Resource resource = new ClassPathResource("data-dataDB.sql");
        try (Connection conn = dataDataSource.getConnection()) {
            ScriptUtils.executeSqlScript(conn, resource);
        }

    }
}
