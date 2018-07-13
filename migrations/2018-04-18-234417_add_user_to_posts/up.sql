-- may need to drop all data from posts
ALTER TABLE posts
    ADD COLUMN user_id SERIAL REFERENCES users (id)
