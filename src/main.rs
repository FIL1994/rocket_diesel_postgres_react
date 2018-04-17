//  https://github.com/clux/webapp-rs

#![feature(plugin)]
#![plugin(rocket_codegen)]
extern crate rocket;
extern crate rocket_contrib;
extern crate rocket_cors;

#[macro_use]
extern crate diesel;

extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;

extern crate r2d2_diesel;
extern crate r2d2;
extern crate dotenv;

mod schema;
mod models;
mod pool;
mod routes;

use self::routes::{file_server, routes_posts::*, routes_images::*};
use self::models::*;
use dotenv::dotenv;
use std::env;

use rocket::http::Method;
use rocket_cors::{AllowedOrigins, AllowedHeaders};

fn main() {
    dotenv().ok();
    
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let options = rocket_cors::Cors {
        allowed_origins: AllowedOrigins::all(),
        allowed_methods: vec![Method::Get, Method::Put, Method::Post].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::all(),
        allow_credentials: true,
        ..Default::default()
    };

    rocket::ignite()
        .manage(pool::init(&database_url))
        .mount("/api/posts", routes![get_posts, get_post, create_post, delete_post, update_post, get_all_posts, publish_post])
        .mount("/api/images", routes![get_images, create_image])
        .mount("/", routes![file_server::files, file_server::home])
        .attach(options)
        .launch();
}
