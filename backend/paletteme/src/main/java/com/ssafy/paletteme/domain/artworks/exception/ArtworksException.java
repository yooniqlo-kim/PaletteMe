package com.ssafy.paletteme.domain.artworks.exception;

public class ArtworksException extends RuntimeException{
    private final ArtworksError error;

    public ArtworksException(ArtworksError error){
        super(error.getErrorMsg());
        this.error = error;
    }

    public ArtworksError getError(){return this.error;}
}
