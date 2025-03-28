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
             1, 'url', 'lhj', '$2a$10$chU3titRWipnywR/T1qbouY7l8NRhWYLRo3prVu7TKBnYOfejeQcm', '홍길동', '1990-01-01',
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

INSERT INTO artists (artist_id, kor_artist, en_artist) VALUES
(1, '레오나르도 다 빈치', 'Leonardo da Vinci'),
(2, '미켈란젤로', 'Michelangelo'),
(3, '카라바조', 'Caravaggio'),
(4, '클로드 모네', 'Claude Monet'),
(5, '파블로 피카소', 'Pablo Picasso'),
(6, '빈센트 반 고흐', 'Vincent van Gogh'),
(7, '앤디 워홀', 'Andy Warhol'),
(8, '요셉 보이스', 'Joseph Beuys');

INSERT INTO artworks (
    artwork_id, museum_id, era_id, artist_id,
    en_title, kor_title, image_url, description, country_origin,
    created_year, materials, color
) VALUES
-- 르네상스
('MonaLisa_Leonardo', 1, 1, 1, 'Mona Lisa', '모나리자', NULL, 'Portrait of Lisa Gherardini', 'Italy', 1503, 'Oil on wood', 'Brown'),
('TheLastSupper_Leonardo', 2, 1, 1, 'The Last Supper', '최후의 만찬', NULL, 'Depicts Jesus and disciples', 'Italy', 1498, 'Tempera on gesso', 'Warm'),
('David_Michelangelo', 3, 1, 2, 'David', '다비드', NULL, 'Sculpture of biblical hero David', 'Italy', 1504, 'Marble', 'White'),

-- 바로크
('Judith_Caravaggio', 1, 2, 3, 'Judith Beheading Holofernes', '홀로페르네스의 목을 베는 유디트', NULL, 'Dramatic biblical scene', 'Italy', 1599, 'Oil on canvas', 'Dark'),
('TheCalling_Caravaggio', 2, 2, 3, 'The Calling of Saint Matthew', '성 마태오의 소명', NULL, 'Conversion moment', 'Italy', 1600, 'Oil on canvas', 'Contrast'),

-- 모더니즘
('ImpressionSunrise_Monet', 1, 3, 4, 'Impression, Sunrise', '인상, 해돋이', NULL, 'Impressionism movement starter', 'France', 1872, 'Oil on canvas', 'Blue'),
('WaterLilies_Monet', 3, 3, 4, 'Water Lilies', '수련', NULL, 'Series of pond paintings', 'France', 1906, 'Oil on canvas', 'Green'),
('Guernica_Picasso', 2, 3, 5, 'Guernica', '게르니카', NULL, 'Anti-war painting', 'Spain', 1937, 'Oil on canvas', 'BlackWhite'),

-- 현대 미술
('StarryNight_VanGogh', 3, 4, 6, 'Starry Night', '별이 빛나는 밤에', NULL, 'Expression of night sky', 'Netherlands', 1889, 'Oil on canvas', 'Blue'),
('CampbellSoup_Warhol', 1, 4, 7, 'Campbell\'s Soup Cans', '캠벨 수프 캔', NULL, 'Pop art icon', 'USA', 1962, 'Synthetic polymer paint', 'Red'),
('Marilyn_Warhol', 2, 4, 7, 'Marilyn Diptych', '마릴린 디피틱', NULL, 'Tribute to Marilyn Monroe', 'USA', 1962, 'Silkscreen', 'Pink'),
('HowToExplain_Beuys', 1, 4, 8, 'How to Explain Pictures to a Dead Hare', '죽은 토끼에게 그림을 설명하는 방법', NULL, 'Performance art', 'Germany', 1965, 'Mixed media', 'Gray');

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
