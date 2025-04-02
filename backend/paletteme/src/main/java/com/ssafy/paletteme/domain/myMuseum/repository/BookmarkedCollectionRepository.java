package com.ssafy.paletteme.domain.myMuseum.repository;

import com.ssafy.paletteme.domain.artworks.entity.UsersArtworksBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkedCollectionRepository extends JpaRepository<UsersArtworksBookmark, String>, BookmarkedCollectionRepositoryCustom {
}
