### API

### Database

```
mysql -u root -p  < src/models/create-user-db.sql 
```

### `npm start`

Runs the api in the development mode.\
Open [http://localhost:3333](http://localhost:3333) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Docker

```
chmod +x .docker/entrypoint.sh

docker-compose up -d 
```
## Add dependences on project run on container

```
docker-compose exec app bash
```