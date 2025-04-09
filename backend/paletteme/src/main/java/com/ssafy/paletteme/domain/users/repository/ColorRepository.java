package com.ssafy.paletteme.domain.users.repository;

import com.ssafy.paletteme.domain.users.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ColorRepository extends JpaRepository<Color, Integer> {
    Optional<Color> findByColor(String color);
}
