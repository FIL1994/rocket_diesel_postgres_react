table! {
    images (id) {
        id -> Int4,
        title -> Varchar,
        img_url -> Text,
        author -> Text,
        lat -> Int4,
        lng -> Int4,
        comments -> Text,
        likes -> Int8,
    }
}

table! {
    posts (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        published -> Bool,
        user_id -> Int4,
    }
}

table! {
    users (id) {
        id -> Int4,
        name -> Text,
    }
}

joinable!(posts -> users (user_id));

allow_tables_to_appear_in_same_query!(
    images,
    posts,
    users,
);
