# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Dockerwith docker compose [Get Docker](https://docs.docker.com/get-started/get-docker/)

## Downloading

```
git clone {repository URL}
```

## Running on container with dev mode

```
npm run docker:dev
```

## Running on container with production mode

```
npm run docker:prod
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Using the API Endpoints (No Auth Required)

After starting the application, you can interact with the API using tools like curl, Postman, or any HTTP client. Below are some example requests. The base URL is `http://localhost:4000`.

> For full API documentation and request/response schemas, visit [http://localhost:4000/doc/](http://localhost:4000/doc/) in your browser.

### Users

- Get all users:

```bash
curl http://localhost:4000/users
```

- Get user by ID:

```bash
curl http://localhost:4000/users/<userId>
```

- Create user:

```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"login": "TestUser", "password": "secretPassword"}'
```

- Update user password:

```bash
curl -X PUT http://localhost:4000/users/<userId> \
  -H "Content-Type: application/json" \
  -d '{"oldPassword": "secretPassword", "newPassword": "newSecret"}'
```

- Delete user:

```bash
curl -X DELETE http://localhost:4000/users/<userId>
```

### Tracks

- Get all tracks:

```bash
curl http://localhost:4000/tracks
```

- Get track by ID:

```bash
curl http://localhost:4000/tracks/<trackId>
```

- Create track:

```bash
curl -X POST http://localhost:4000/tracks \
  -H "Content-Type: application/json" \
  -d '{"name": "Song Name", "duration": 200}'
```

- Update track:

```bash
curl -X PUT http://localhost:4000/tracks/<trackId> \
  -H "Content-Type: application/json" \
  -d '{"name": "New Name", "duration": 210}'
```

- Delete track:

```bash
curl -X DELETE http://localhost:4000/tracks/<trackId>
```

### Albums

- Get all albums:

```bash
curl http://localhost:4000/albums
```

- Get album by ID:

```bash
curl http://localhost:4000/albums/<albumId>
```

- Create album:

```bash
curl -X POST http://localhost:4000/albums \
  -H "Content-Type: application/json" \
  -d '{"name": "Album Name", "year": 2024}'
```

- Update album:

```bash
curl -X PUT http://localhost:4000/albums/<albumId> \
  -H "Content-Type: application/json" \
  -d '{"name": "New Album Name", "year": 2025}'
```

- Delete album:

```bash
curl -X DELETE http://localhost:4000/albums/<albumId>
```

### Artists

- Get all artists:

```bash
curl http://localhost:4000/artists
```

- Get artist by ID:

```bash
curl http://localhost:4000/artists/<artistId>
```

- Create artist:

```bash
curl -X POST http://localhost:4000/artists \
  -H "Content-Type: application/json" \
  -d '{"name": "Artist Name", "grammy": false}'
```

- Update artist:

```bash
curl -X PUT http://localhost:4000/artists/<artistId> \
  -H "Content-Type: application/json" \
  -d '{"name": "New Artist Name", "grammy": true}'
```

- Delete artist:

```bash
curl -X DELETE http://localhost:4000/artists/<artistId>
```

### Favorites

- Get all favorites:

```bash
curl http://localhost:4000/favs
```

- Add track/album/artist to favorites:

```bash
curl -X POST http://localhost:4000/favs/track/<trackId>
curl -X POST http://localhost:4000/favs/album/<albumId>
curl -X POST http://localhost:4000/favs/artist/<artistId>
```

- Remove track/album/artist from favorites:

```bash
curl -X DELETE http://localhost:4000/favs/track/<trackId>
curl -X DELETE http://localhost:4000/favs/album/<albumId>
curl -X DELETE http://localhost:4000/favs/artist/<artistId>
```
