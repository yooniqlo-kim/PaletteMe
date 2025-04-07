package com.ssafy.paletteme.domain.users.repository;

import com.ssafy.paletteme.domain.users.entity.UsersGrade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersGradeRepository extends JpaRepository<UsersGrade, Integer> {
    Optional<UsersGrade> findByGrade(String grade);
}
