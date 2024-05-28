CREATE TABLE users (
    id        VARCHAR PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname  VARCHAR NOT NULL,
    username  VARCHAR UNIQUE NOT NULL,
    email     VARCHAR UNIQUE NOT NULL,
    password  VARCHAR NOT NULL
);

CREATE TABLE posts (
    id        VARCHAR PRIMARY KEY,
    title     VARCHAR NOT NULL,
    url       VARCHAR UNIQUE NOT NULL,
    userId    VARCHAR NOT NULL,
    postedAt  INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
);