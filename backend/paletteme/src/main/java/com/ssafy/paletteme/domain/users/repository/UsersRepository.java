package com.ssafy.paletteme.domain.users.repository;

import com.ssafy.paletteme.domain.users.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
