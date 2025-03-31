package com.ssafy.paletteme.domain.artworks.repository;

import com.ssafy.paletteme.domain.artworks.entity.Artworks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtworksRepository extends JpaRepository<Artworks, String>, ArtworksRepositoryCustom{
}
