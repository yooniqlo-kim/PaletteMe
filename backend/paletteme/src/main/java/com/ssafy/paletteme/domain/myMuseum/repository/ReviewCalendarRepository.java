package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.reviews.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewCalendarRepository extends JpaRepository<Reviews, Integer>, ReviewCalendarRepositoryCustom{

}
