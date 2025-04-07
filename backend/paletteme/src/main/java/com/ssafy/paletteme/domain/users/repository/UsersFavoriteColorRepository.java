package com.ssafy.paletteme.domain.users.repository;

import com.ssafy.paletteme.domain.users.entity.UsersFavoriteColor;
import com.ssafy.paletteme.domain.users.entity.id.UsersFavoriteColorId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

// 두번째 제네릭 자리에 복합키일 경우 @IdClass를 넣어주기!
@Repository
public interface UsersFavoriteColorRepository extends JpaRepository<UsersFavoriteColor, UsersFavoriteColorId> {

    @Query("""
    SELECT ufc.color.color
    FROM UsersFavoriteColor ufc
    WHERE ufc.users.userId = :userId
""")
    List<String> findColorNamesByUserId(@Param("userId") int userId);

}
