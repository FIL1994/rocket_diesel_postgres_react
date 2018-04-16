table! {
    images (id) {
        id -> Int4,
        title -> Varchar,
        img_url -> Text,
        author -> Text,
        lat -> Int4,
        lng -> Int4,
        comments -> Text,
    }
}

table! {
    posts (id) {
        id -> Int4,
        title -> Varchar,
        body -> Text,
        published -> Bool,
    }
}

allow_tables_to_appear_in_same_query!(
    images,
    posts,
);
