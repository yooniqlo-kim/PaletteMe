package com.ssafy.paletteme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableJpaAuditing
public class PalettemeApplication {

	public static void main(String[] args) {
		SpringApplication.run(PalettemeApplication.class, args);
	}

}
