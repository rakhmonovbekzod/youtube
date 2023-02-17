

create database youtube;

-- create the videos table
CREATE TABLE videos (
  video_id BIGSERIAL NOT NULL PRIMARY KEY,
  video_title VARCHAR(150) NOT NULL,
  video_description VARCHAR(500) NOT NULL,
  video_url VARCHAR(100) NOT NULL,
  video_thumbnail_url VARCHAR(100) NOT NULL
);

-- insert some sample data

INSERT INTO videos (video_title, video_description, video_url, video_thumbnail_url)
VALUES ('Funny Cat Videos', 'A collection of hilarious cat videos', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg'),
       ('Epic Fails Compilation', 'The best fails of all time', 'https://www.youtube.com/watch?v=3x4srv4oYY4', 'https://i.ytimg.com/vi/3x4srv4oYY4/hqdefault.jpg'),
       ('Cooking with Chef John', 'Learn how to cook delicious meals', 'https://www.youtube.com/watch?v=ddNcz_XCnMA', 'https://i.ytimg.com/vi/ddNcz_XCnMA/hqdefault.jpg');

