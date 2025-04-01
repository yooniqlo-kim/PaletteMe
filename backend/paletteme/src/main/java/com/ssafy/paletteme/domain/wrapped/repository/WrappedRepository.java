package com.ssafy.paletteme.domain.wrapped.repository;

import com.ssafy.paletteme.domain.wrapped.entity.Wrapped;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WrappedRepository extends JpaRepository<Wrapped, Integer>, WraapedRepositoyCustom {
    // findById(Users users)처럼도 쓸 수 있고, users.getUserId()가 내부적으로 PK니까 문제 없이 작동.
}
