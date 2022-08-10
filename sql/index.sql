-- RUN FIRST --

DROP DATABASE IF EXISTS ARADICT;
CREATE DATABASE ARADICT ENCODING 'utf-8';
\c aradict;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SET TIMEZONE = "EET";


DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS WORDS;
DROP TABLE IF EXISTS SOUNDS;

CREATE TYPE  mood AS ENUM ('admin', 'sound-contributer', 'sound-reviewer');

-- ALTER TABLE users ADD _role  mood;

-- Ceate Tables

CREATE TABLE USERS (
        user_id uuid DEFAULT uuid_generate_v4(),
        username VARCHAR(50) UNIQUE NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        middle_name VARCHAR(50) NOT NULL,
        join_data TIMESTAMP DEFAULT NOW(),
        _role  mood NOT NULL,
        PRIMARY KEY(user_id));

CREATE TABLE WORDS
        (word_id uuid DEFAULT uuid_generate_v4(),
                              contributer_id uuid,
                              ar TEXT NOT NULL,
                                      en TEXT NOT NULL,
                                              CONSTRAINT fk_user
         FOREIGN KEY(contributer_id) REFERENCES USERS(user_id) ON DELETE NO ACTION,
                                                                            PRIMARY KEY(word_id));


CREATE TABLE SOUNDS
        (sound_id uuid DEFAULT uuid_generate_v4(),
        contributer_id uuid NOT NULL,
        word_id uuid NOT NULL,
        approved bool DEFAULT false,
        enc TEXT NOT NULL,
        mimetype TEXT NOT NULL,
        file_name TEXT NOT NULL,
        size TEXT NOT NULL,
        CONSTRAINT fk_user
         FOREIGN KEY(contributer_id) REFERENCES USERS(user_id) ON DELETE NO ACTION,
        CONSTRAINT fk_word
         FOREIGN KEY(word_id) REFERENCES WORDS(word_id) ON DELETE CASCADE,
                                                                  PRIMARY KEY(sound_id));



-- EXAMPLE

INSERT INTO USERS (first_name, middle_name, username)
VALUES ('Ahmad',
        'Adel',
        'ahamad') RETURNING user_id;

-- DELETE
-- FROM USERS
-- WHERE user_id = 'c72c1eca-fc79-4b54-9c2a-055b04669d68';

INSERT INTO WORDS (contributer_id, ar, en)
VALUES ('1598b0d1-d3f9-44ff-9c33-fefa74a36f07',
        'سشي',
        'I') RETURNING * ;



INSERT INTO WORDS (contributer_id, ar, en)
VALUES ('9f6053ea-598e-4686-aaed-be4dab194bba',
        'هو',
        '÷') RETURNING * ;

