package com.ssafy.paletteme.domain.users.repository;

import com.ssafy.paletteme.domain.users.entity.UsersFavoriteColor;
import com.ssafy.paletteme.domain.users.entity.id.UsersFavoriteColorId;
import org.springframework.data.jpa.repository.JpaRepository;

// 두번째 제네릭 자리에 복합키일 경우 @IdClass를 넣어주기!
public interface UsersFavoriteColorRepository extends JpaRepository<UsersFavoriteColor, UsersFavoriteColorId> {

}
