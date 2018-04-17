use diesel;
use rocket_contrib::Json;
use diesel::prelude::*;

use pool::DbConn;
use schema::posts::{self, dsl::*};
use post::*;

#[get("/")]
pub fn get_posts(conn: DbConn) -> QueryResult<Json<Vec<Post>>> {
    posts.filter(published.eq(true))
        .order(id.desc())
        .limit(5)
        .load::<Post>(&*conn)
        .map(|xs| Json(xs))
}

#[get("/all")]
pub fn get_all_posts(conn: DbConn) -> QueryResult<Json<Vec<Post>>> {
    posts.order(id.desc())
        .load::<Post>(&*conn)
        .map(|xs| Json(xs))
}

#[get("/<postid>")]
pub fn get_post(postid: i32, conn: DbConn) -> QueryResult<Json<Post>> {
    posts.find(postid)
        .get_result::<Post>(&*conn)
        .map(|x| Json(x))
}

#[put("/publish/<postid>")]
pub fn publish_post(postid: i32, conn: DbConn) -> QueryResult<Json<Post>> {
    diesel::update(posts.find(postid))
        .set(published.eq(true))
        .get_result::<Post>(&*conn)
        .map(|x| Json(x))
}

#[put("/<postid>", data="<newpost>")]
pub fn update_post(postid: i32, newpost: Json<Post>, conn: DbConn) -> QueryResult<Json<Post>> {
    diesel::update(posts.find(postid))
        .set((
            title.eq(&newpost.title),
            body.eq(&newpost.body),
            published.eq(&newpost.published)
        ))
        .get_result::<Post>(&*conn)
        .map(|x| Json(x))
}

#[post("/", data="<newpost>")]
pub fn create_post(newpost: Json<NewPost>, conn: DbConn) -> QueryResult<Json<Post>> {
    diesel::insert_into(posts::table)
        .values(&newpost.into_inner())
        .get_result(&*conn)
        .map(|x| Json(x))
}

#[delete("/<postid>")]
pub fn delete_post(postid: i32, conn: DbConn) -> QueryResult<Json<usize>> {
    diesel::delete(posts.filter(id.eq(postid)))
        .execute(&*conn)
        .map(|x| Json(x))
}
