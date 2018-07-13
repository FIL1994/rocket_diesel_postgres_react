# rocket_diesel_postgres_react
> Rocket, Diesel, Postgres and React


## Setup

* create .env file
```
DATABASE_URL=postgres://username:password@localhost/your-db
```

* build react app
```
  cd static
  npm i
  yarn run build
```

* Setup db & run migrations
```
  diesel setup
```

* build and run project
```
  cargo build
  ./target/debug/rocket_diesel_postgres_react
```

## Rust Versions

```
  rustup toolchain install nightly-2018-06-24
  rustup toolchain list
  rustup default nightly-2018-06-24
```

[Tutorial](https://tureus.github.io/rust/2015/11/16/rustup-tutorial-downgrading.html)
