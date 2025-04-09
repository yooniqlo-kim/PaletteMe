-- 1. 2025년 3월 한 달 동안 유저별로 가장 많이 리뷰를 남긴 작가(artist_id)를 구하는 쿼리, v1
SELECT
    r.user_id,
    a.artist_id,
    COUNT(*) AS review_count
FROM
    reviews r
        JOIN
    artworks a ON r.artwork_id = a.artwork_id
WHERE
    r.created_at BETWEEN '2025-03-01' AND '2025-03-31'
GROUP BY
    r.user_id, a.artist_id
HAVING
    review_count = (
        SELECT
            MAX(sub.review_count)
        FROM (
                 SELECT
                     COUNT(*) AS review_count
                 FROM
                     reviews r2
                         JOIN
                     artworks a2 ON r2.artwork_id = a2.artwork_id
                 WHERE
                     r2.created_at BETWEEN '2025-03-01' AND '2025-03-31'
                   AND r2.user_id = r.user_id
                 GROUP BY
                     a2.artist_id
             ) sub
    );


-- 1. 2025년 3월 한 달 동안 유저별로 가장 많이 리뷰를 남긴 작가(artist_id)를 구하는 쿼리(ROW_NUMBER() 사용) v2
SELECT user_id, artist_id, review_count
FROM (
         SELECT
             r.user_id,
             a.artist_id,
             COUNT(*) AS review_count,
             ROW_NUMBER() OVER (PARTITION BY r.user_id ORDER BY COUNT(*) DESC) AS rn
         FROM reviews r
                  JOIN artworks a ON r.artwork_id = a.artwork_id
         WHERE r.created_at BETWEEN '2025-03-01' AND '2025-03-31'
         GROUP BY r.user_id, a.artist_id
     ) ranked
WHERE rn = 1;


--  2. 3월 한 달 동안 작성된 리뷰 수를 기준으로 유저들을 정렬해서 순위(RANK)를 매기는 쿼리
SELECT
    u.user_id,
    u.nickname,
    COUNT(r.review_id) AS review_count,
    RANK() OVER (ORDER BY COUNT(r.review_id) DESC) AS ranking
FROM
    users u
        JOIN
    reviews r ON u.user_id = r.user_id
WHERE
    r.created_at BETWEEN '2025-03-01' AND '2025-03-31'
GROUP BY
    u.user_id, u.nickname;

-- 3. 유저마다 3월에 쓴 리뷰 중 가장 긴 리뷰의 작품 ID와 길이를 보여줌
SELECT
    r.user_id,
    r.artwork_id,
    r.content_length
FROM reviews r
         JOIN (
    SELECT user_id, MAX(content_length) AS max_length
    FROM reviews
    WHERE created_at BETWEEN '2025-03-01' AND '2025-03-31'
    GROUP BY user_id
) max_table
              ON r.user_id = max_table.user_id
                  AND r.content_length = max_table.max_length
WHERE r.created_at BETWEEN '2025-03-01' AND '2025-03-31';
