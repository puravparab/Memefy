<p align="center">
</p>

<p align="center">
	<h1 align="center">
		Memefy
	</h1>
	<p align="center">
	    Find out your top songs and most listened to artists from spotify. Share them with your friends.
	</p
</p>

# Requirements

API: 
- python 3.9
- Docker
- Dependencies: api/pipfile.lock or api/Pipfile

Client:
- npm 8.19.2
- node 18.12.0
- Dependencies: client/package.json

---

# Installation

Clone the repository
```
git clone https://github.com/puravparab/Memefy.git
cd Memefy
```

## API:
Create docker image
```
docker compose up --build
```
Create environment variables
```
cd api
echo "SECRET_KEY=
DEBUG=True
DJANGO_SETTINGS_MODULE=server.settings.base
ALLOWED_HOSTS=0.0.0.0 localhost 127.0.0.1
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REDIRECT_URI=<Client Domain>/api/callback"
> .env
```
Run a docker container
```
cd ..
docker compose up
```
## Client
Install dependencies from package-lock.json
```
cd client
npm ci
```
Create environment variables
```
echo "CLIENT_ID=<Spotify>
CLIENT_SECRET=<Spotify>
REDIRECT_URI=<Client Domain>/api/callback
SERVER_URL=<Server Domain>/
```
Run client
```
npm run dev
```

Original Creator - [Purav Parab](https://github.com/puravparab)