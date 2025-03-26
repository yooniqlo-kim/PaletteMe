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