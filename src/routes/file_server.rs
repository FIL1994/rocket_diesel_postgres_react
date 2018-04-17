use std::path::{Path, PathBuf};

use rocket::response::NamedFile;

#[get("/", rank = 2)]
pub fn home() -> Option<NamedFile> {
    NamedFile::open(Path::new("static/build/index.html")).ok()
}

#[get("/<file..>", rank = 2)]
pub fn files(file: PathBuf) -> Option<NamedFile> {
    let mut path = Path::new("static/build/").join(file);

    if !path.is_file() {
        path = path.join(PathBuf::from("/index.html"))
    } else {
        println!("is a file");
    }

    println!("{:?}", path);

    NamedFile::open(path).ok()
}
