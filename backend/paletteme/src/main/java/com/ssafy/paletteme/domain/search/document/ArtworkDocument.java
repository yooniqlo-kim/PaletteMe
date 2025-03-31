package com.ssafy.paletteme.domain.search.document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Document(indexName = "artworks_index")
public class ArtworkDocument {

    @Id
    private String artwork_id;

    @Field(type = FieldType.Keyword)
    private String image_url;

    @Field(type = FieldType.Text)
    private String en_title;

    @Field(type = FieldType.Text, analyzer = "korean")
    private String kor_title;

    @Field(type = FieldType.Text)
    private String en_artist;

    @Field(type = FieldType.Text, analyzer = "korean")
    private String kor_artist;

    @Field(type = FieldType.Text, analyzer = "korean")
    private String era;

    @MultiField(
            mainField = @Field(type = FieldType.Text),
            otherFields = {
                    @InnerField(suffix = "ko", type = FieldType.Text, analyzer = "korean"),
                    @InnerField(suffix = "en", type = FieldType.Text)
            }
    )
    private String description;

    @MultiField(
            mainField = @Field(type = FieldType.Text),
            otherFields = {
                    @InnerField(suffix = "ko", type = FieldType.Text, analyzer = "korean"),
                    @InnerField(suffix = "en", type = FieldType.Text)
            }
    )
    private String materials;

    @MultiField(
            mainField = @Field(type = FieldType.Text),
            otherFields = {
                    @InnerField(suffix = "ko", type = FieldType.Text, analyzer = "korean"),
                    @InnerField(suffix = "en", type = FieldType.Text)
            }
    )
    private String color;

    @MultiField(
            mainField = @Field(type = FieldType.Text),
            otherFields = {
                    @InnerField(suffix = "ko", type = FieldType.Text, analyzer = "korean"),
                    @InnerField(suffix = "en", type = FieldType.Text)
            }
    )
    private String country_origin;

    @MultiField(
            mainField = @Field(type = FieldType.Text),
            otherFields = {
                    @InnerField(suffix = "ko", type = FieldType.Text, analyzer = "korean"),
                    @InnerField(suffix = "en", type = FieldType.Text)
            }
    )
    private String museum_name;

    @Field(type = FieldType.Integer)
    private Integer created_year;

    @Field(type = FieldType.Keyword)
    private String museum_id;

    @Field(type = FieldType.Keyword)
    private String era_id;

    @Field(type = FieldType.Keyword)
    private String artist_id;
}
