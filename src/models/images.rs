use schema::images;

#[derive(Queryable, Insertable, Deserialize, Serialize, Clone)]
pub struct Image {
    pub id: i32,
    pub title: String,
    pub img_url: String,
    pub author: String,
    pub lat: i32,
    pub lng: i32,
    pub comments: String,
    pub likes: i64
}

#[derive(Insertable, Deserialize, Clone)]
#[table_name="images"]
pub struct NewImage {
    pub title: String,
    pub img_url: String,
    pub author: String,
    pub lat: i32,
    pub lng: i32,
    pub comments: String,
    pub likes: i64
}
