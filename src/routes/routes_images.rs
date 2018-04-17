use diesel;
use rocket_contrib::Json;
use diesel::prelude::*;

use pool::DbConn;
use schema::images::{self, dsl::*};
use images::*;

#[get("/")]
pub fn get_images(conn: DbConn) -> QueryResult<Json<Vec<Image>>> {
    images.order(id.desc())
        .load::<Image>(&*conn)
        .map(|xs| Json(xs))
}

#[post("/", data="<newimage>")]
pub fn create_image(newimage: Json<NewImage>, conn: DbConn) -> QueryResult<Json<Image>> {
    diesel::insert_into(images::table)
        .values(&newimage.into_inner())
        .get_result(&*conn)
        .map(|x| Json(x))
}
