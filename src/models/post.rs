use schema::posts;

#[derive(Queryable, Insertable, Deserialize, Serialize, Clone)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub body: String,
    pub published: bool,
    pub user_id: i32,
}

#[derive(Insertable, Deserialize, Clone)]
#[table_name="posts"]
pub struct NewPost {
    pub title: String,
    pub body: String,
}
