# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Elasticsearch Mappings
Check the README_ES_MAPPINGS.md file for instructions.


# Frontend Developer Setup

1. Install and setup Node.
```sh
nvm install && nvm use
npm install
```
2. Get a copy of the `.env` file from Marc or another dev.

3. Setup the backend via docker.
```sh
docker-compose up -d
```

4. Get the latest copy of the database from Marc called `small_data`. Store in the root of the project.

5. Setup your database. You'll likely get a error concerning duplicate entries. Dont worry.
```sh
npm run db:refresh
docker exec -i myg_mysql mysql -uroot -proot mygame < small_data
```

6. Run the frontend.
```sh
npm run watch-server
npm run watch2
npm run watch
```

7. Via the local url, login using dev method using the credentials.
```
username: myG@myG.gg
password: mygame
```
