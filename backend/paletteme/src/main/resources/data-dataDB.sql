INSERT INTO `users_grade` (`grade_id`, `grade`) VALUES
(1, '빨'),
(2, '주'),
(3, '노'),
(4, '초'),
(5, '파'),
(6, '남'),
(7, '보'),
(8, '무지개');

INSERT INTO color (color_id, color) VALUES
(1, 'Red'),
(2, 'Blue'),
(3, 'Green'),
(4, 'Yellow'),
(5, 'Purple'),
(6, 'Orange'),
(7, 'Pink'),
(8, 'Black'),
(9, 'White'),
(10, 'Gray');

INSERT INTO users (
    grade_id, s3_url, id, password, name, birthday,
    phone_number, nickname, active
) VALUES (
             1, 'url', 'lhj', '$2a$10$chU3titRWipnywR/T1qbouY7l8NRhWYLRo3prVu7TKBnYOfejeQcm', '홍길동', 1996,
             '010-1234-5678', '길동이', '1'
         );


INSERT INTO eras (era_id, era, era_cnt) VALUES
(1, 'Renaissance', 0),
(2, 'Baroque', 0),
(3, 'Modernism', 0),
(4, 'Contemporary', 0);

INSERT INTO museums (museum_id, museum_name, artwork_cnt) VALUES
(1, 'Harvard Art Museums', 0),
(2, 'The Louvre', 0),
(3, 'The Metropolitan Museum of Art', 0);

INSERT INTO artists (artist_id, original_artist, kor_artist, en_artist) VALUES
(1, 'Leonardo da Vinci', '레오나르도 다 빈치', 'Leonardo da Vinci'),
(2, 'Michelangelo', '미켈란젤로', 'Michelangelo'),
(3, 'Caravaggio', '카라바조', 'Caravaggio'),
(4, 'Claude Monet', '클로드 모네', 'Claude Monet'),
(5, 'Pablo Picasso', '파블로 피카소', 'Pablo Picasso'),
(6, 'Vincent van Gogh', '빈센트 반 고흐', 'Vincent van Gogh'),
(7, 'Andy Warhol', '앤디 워홀', 'Andy Warhol'),
(8, 'Joseph Beuys', '요셉 보이스', 'Joseph Beuys');

INSERT INTO artworks (
    artwork_id, museum_id, era_id, artist_id,
    original_title, en_title, kor_title, image_url, description, country_origin,
    created_year, materials, color
) VALUES
-- 르네상스
('MonaLisa_Leonardo', 1, 1, 1, 'Mona Lisa', 'Mona Lisa', '모나리자', 'image_url1', 'Portrait of Lisa Gherardini', 'Italy', 1503, 'Oil on wood', 'Brown'),
('TheLastSupper_Leonardo', 2, 1, 1, 'The Last Supper', 'The Last Supper', '최후의 만찬', NULL, 'Depicts Jesus and disciples', 'Italy', 1498, 'Tempera on gesso', 'Warm'),
('David_Michelangelo', 3, 1, 2, 'David', 'David', '다비드', NULL, 'Sculpture of biblical hero David', 'Italy', 1504, 'Marble', 'White'),

-- 바로크
('Judith_Caravaggio', 1, 2, 3, 'Judith Beheading Holofernes', 'Judith Beheading Holofernes', '홀로페르네스의 목을 베는 유디트', NULL, 'Dramatic biblical scene', 'Italy', 1599, 'Oil on canvas', 'Dark'),
('TheCalling_Caravaggio', 2, 2, 3, 'The Calling of Saint Matthew', 'The Calling of Saint Matthew','성 마태오의 소명', NULL, 'Conversion moment', 'Italy', 1600, 'Oil on canvas', 'Contrast'),

-- 모더니즘
('ImpressionSunrise_Monet', 1, 3, 4, 'Impression, Sunrise', 'Impression, Sunrise', '인상, 해돋이', NULL, 'Impressionism movement starter', 'France', 1872, 'Oil on canvas', 'Blue'),
('WaterLilies_Monet', 3, 3, 4, 'Water Lilies', 'Water Lilies', '', NULL, 'Series of pond paintings', 'France', 1906, 'Oil on canvas', 'Green'),
('Guernica_Picasso', 2, 3, 5, 'Guernica', 'Guernica', '게르니카', NULL, 'Anti-war painting', 'Spain', 1937, 'Oil on canvas', 'BlackWhite'),

-- 현대 미술
('StarryNight_VanGogh', 3, 4, 6, 'Starry Night', 'Starry Night', '별이 빛나는 밤에', NULL, 'Expression of night sky', 'Netherlands', 1889, 'Oil on canvas', 'Blue'),
('CampbellSoup_Warhol', 1, 4, 7, 'Campbell\'s Soup Cans',  'Campbell\'s Soup Cans', '캠벨 수프 캔', NULL, 'Pop art icon', 'USA', 1962, 'Synthetic polymer paint', 'Red'),
('Marilyn_Warhol', 2, 4, 7, 'Marilyn Diptych', 'Marilyn Diptych', '마릴린 디피틱', NULL, 'Tribute to Marilyn Monroe', 'USA', 1962, 'Silkscreen', 'Pink'),
('HowToExplain_Beuys', 1, 4, 8, 'How to Explain Pictures to a Dead Hare', 'How to Explain Pictures to a Dead Hare', '죽은 토끼에게 그림을 설명하는 방법', NULL, 'Performance art', 'Germany', 1965, 'Mixed media', 'Gray');

INSERT INTO users_artworks_like_cnt (artwork_id, like_cnt) VALUES
('MonaLisa_Leonardo', 5),
('TheLastSupper_Leonardo', 3),
('David_Michelangelo', 2),
('Judith_Caravaggio', 4),
('TheCalling_Caravaggio', 1),
('ImpressionSunrise_Monet', 6),
('WaterLilies_Monet', 3),
('Guernica_Picasso', 7),
('StarryNight_VanGogh', 10),
('CampbellSoup_Warhol', 4),
('Marilyn_Warhol', 2),
('HowToExplain_Beuys', 1);

INSERT INTO reviews (user_id, artwork_id, content, is_public, created_at, like_cnt, content_length) VALUES
                                                                                                        (1, 'MonaLisa_Leonardo', '모나리자의 미소는 정말 신비로워.', true, '2025-03-01', 5, 19),
                                                                                                        (1, 'TheLastSupper_Leonardo', '구도의 완벽함에 감탄했다.', false, '2025-03-02', 2, 15),
                                                                                                        (1, 'David_Michelangelo', '대리석으로 이렇게 섬세하다니.', true, '2025-03-03', 4, 16),
                                                                                                        (1, 'Judith_Caravaggio', '빛과 어둠의 대비가 인상적이다.', true, '2025-03-04', 3, 17),
                                                                                                        (1, 'TheCalling_Caravaggio', '극적인 장면 연출이 탁월해.', false, '2025-03-05', 1, 14),
                                                                                                        (1, 'ImpressionSunrise_Monet', '붓 터치가 부드럽고 따뜻해.', true, '2025-03-06', 6, 14),
                                                                                                        (1, 'WaterLilies_Monet', '자연의 평온함이 느껴졌다.', false, '2025-03-07', 2, 14),
                                                                                                        (1, 'Guernica_Picasso', '전쟁의 참혹함이 와닿았다.', true, '2025-03-08', 7, 15),
                                                                                                        (1, 'StarryNight_VanGogh', '밤하늘의 소용돌이가 강렬해.', true, '2025-03-09', 10, 15),
                                                                                                        (1, 'CampbellSoup_Warhol', '재미있는 상업미술의 시도.', false, '2025-03-10', 1, 15),
                                                                                                        (1, 'Marilyn_Warhol', '반복된 마릴린 얼굴이 강렬했다.', true, '2025-03-11', 2, 17),
                                                                                                        (1, 'HowToExplain_Beuys', '다소 난해했지만 흥미로웠다.', false, '2025-03-12', 0, 15),
                                                                                                        (1, 'MonaLisa_Leonardo', '실제로 보면 작다고 들었다.', true, '2025-03-13', 4, 15),
                                                                                                        (1, 'TheLastSupper_Leonardo', '인물 간의 감정선이 살아있다.', true, '2025-03-14', 3, 16),
                                                                                                        (1, 'David_Michelangelo', '근육 표현이 너무 정교해.', false, '2025-03-15', 5, 14),
                                                                                                        (1, 'Judith_Caravaggio', '잔혹하지만 아름답다.', true, '2025-03-16', 2, 11),
                                                                                                        (1, 'ImpressionSunrise_Monet', '햇살이 비치는 느낌이 좋다.', false, '2025-03-17', 3, 15),
                                                                                                        (1, 'WaterLilies_Monet', '연못의 고요함이 좋았다.', true, '2025-03-18', 6, 13),
                                                                                                        (1, 'Guernica_Picasso', '흑백이 더 충격적이었다.', true, '2025-03-19', 8, 13),
                                                                                                        (1, 'StarryNight_VanGogh', '내가 가장 좋아하는 작품!', false, '2025-03-20', 10, 15),
                                                                                                        (1, 'CampbellSoup_Warhol', '팝아트의 시작이라는데 놀랍다.', true, '2025-03-21', 1, 17),
                                                                                                        (1, 'Marilyn_Warhol', '반복 속 의미가 뭘까 고민됐다.', false, '2025-03-22', 0, 16),
                                                                                                        (1, 'HowToExplain_Beuys', '예술이란 무엇일까 생각하게 함.', true, '2025-03-23', 2, 17),
                                                                                                        (1, 'MonaLisa_Leonardo', '모나리자의 눈빛이 잊혀지지 않는다.', false, '2025-03-24', 4, 20),
                                                                                                        (1, 'TheCalling_Caravaggio', '빛 표현이 마치 스포트라이트 같았다.', true, '2025-03-25', 3, 22),
                                                                                                        (1, 'ImpressionSunrise_Monet', '색감이 정말 부드럽다.', true, '2025-03-26', 5, 13),
                                                                                                        (1, 'Guernica_Picasso', '보는 내내 불편하고 힘들었다.', false, '2025-03-27', 9, 16),
                                                                                                        (1, 'WaterLilies_Monet', '연꽃과 물의 조화가 아름답다.', true, '2025-03-28', 2, 46),
                                                                                                        (1, 'StarryNight_VanGogh', '밤하늘이 이렇게 감정적일 수 있다니.', true, '2025-03-28', 10, 22),
                                                                                                        (1, 'HowToExplain_Beuys', '예술 퍼포먼스의 충격적 사례.', false, '2025-03-28', 1, 15);

INSERT INTO users_artworks_like (user_id, artwork_id) VALUES
(1, 'MonaLisa_Leonardo'),
(1, 'ImpressionSunrise_Monet'),
(1, 'StarryNight_VanGogh');


INSERT INTO users_artworks_bookmark (user_id, artwork_id) VALUES
(1, 'CampbellSoup_Warhol'),
(1, 'David_Michelangelo'),
(1, 'Guernica_Picasso'),
(1, 'HowToExplain_Beuys');

INSERT INTO users_review_like (review_id, user_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1);

INSERT INTO wrapped (
    user_id,
    artist_name,
    review_rank,
    review_percentage,
    review_cnt,
    favorite_name,
    favorite_artist,
    favorite_img,
    recommended_artwork,
    recommended_artist,
    recommended_img
) VALUES (
             1,
             '학준',
             5,
             13,
             12,
             '별이 빛나는 밤에',
             '빈센트 반 고흐',
             'https://example.com/starry-night.jpg',
             '붉은 수련',
             '클로드 모네',
             'https://example.com/water-lilies.jpg'
         );
