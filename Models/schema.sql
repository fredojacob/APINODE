DROP DATABASE if exists movies;

CREATE DATABASE if not exists movies;

use movies;

CREATE TABLE  IF NOT EXISTS MOVIE(

        movie_id varchar(9) primary key,
        title varchar(100),
        release_year varchar(4),
        rating DECIMAL(2,1),
        images varchar(255)
);