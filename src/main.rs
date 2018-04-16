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
mod file_server;

use self::routes::*;
use dotenv::dotenv;
use std::env;

use rocket::http::Method;
use rocket_cors::{AllowedOrigins, AllowedHeaders};

fn main() {
    dotenv().ok();
    
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let (allowed_origins, _failed_origins) = AllowedOrigins::some(&["http://192.168.0.42:3000"]);

    let options = rocket_cors::Cors {
        allowed_origins: allowed_origins,
        allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&["Authorization", "Accept"]),
        allow_credentials: true,
        ..Default::default()
    };

    rocket::ignite()
        .manage(pool::init(&database_url))
        .mount("/api", routes![get_posts, get_post, create_post, delete_post, update_post, get_all_posts])
        .mount("/", routes![self::file_server::files, self::file_server::home])
        .attach(options)
        .launch();
}
