package com.ssafy.paletteme.domain.artworks.repository;

import com.ssafy.paletteme.domain.artworks.entity.DailyArt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DailyArtRepository extends JpaRepository<DailyArt, Long> {
    Optional<DailyArt> findByDate(LocalDate date);
}
