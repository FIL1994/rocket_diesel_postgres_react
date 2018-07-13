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
