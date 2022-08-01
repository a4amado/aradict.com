
-- RUN FIRST --
CREATE EXTENTSION IF NOT EXISTS "uuid-ossp";
SET TIMEZONE = "EET";

DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS WORDS;
DROP TABLE IF EXISTS SOUNDS;

CREATE TABLE USERS (
    user_id uuid DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50) NOT NULL,
    join_data TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY(user_id)
);

CREATE TABLE SOUNDS (
    sound_id uuid DEFAULT uuid_generate_v4(),
    contributer_id  uuid NOT NULL,
    word_id uuid NOT NULL,
    approved bool DEFAULT false,

    audio TEXT NOT NULL,
    
    CONSTRAINT fk_user
        FOREIGN KEY(contributer_id)
            REFERENCES USERS(user_id)
            ON DELETE NO ACTION,
    CONSTRAINT fk_word
        FOREIGN KEY(word_id)
            REFERENCES WORDS(word_id)
            ON DELETE CASCADE,
    
    PRIMARY KEY(sound_id)
);


CREATE TABLE WORDS (
    word_id uuid DEFAULT uuid_generate_v4(),
    contributer_id uuid,
    ar TEXT NOT NULL,
    en TEXT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(contributer_id)
            REFERENCES USERS(user_id)
            ON DELETE NO ACTION,
    PRIMARY KEY(word_id)
);

-- -- EXAMPLE
INSERT INTO USERS
    (first_name, middle_name)
VALUES 
    ('Ahmad','Adel')
RETURNING *;

DELETE 
FROM USERS
WHERE user_id = 'c72c1eca-fc79-4b54-9c2a-055b04669d68';

INSERT INTO WORDS
    (contributer_id)
VALUES
    ('c72c1eca-fc79-4b54-9c2a-055b04669d68');
