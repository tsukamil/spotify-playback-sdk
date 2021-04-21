# React Spotify Player

I made some improvments to the original but what is the most important, I added Web Playback SDK support. Since then you are able to play music directly from your web browser and you dont have to play music by your own in Spotify app.

You can read in depth blog post that accompanies this code originally, here: [https://medium.com/@joekarlsson/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6](https://medium.com/@joekarlsson/how-to-build-a-spotify-player-with-react-in-15-minutes-7e01991bc4b6)

## Quickstart

### 1. Register an application with Spotify

Go to the [Dashboard](https://developer.spotify.com/dashboard) page at the Spotify Developer website, and click on ‘My New App.” Be sure to write down the Client ID from your application.

### 2. Clone example repository

```sh
git clone https://github.com/tsukamil/spotify-playback-sdk.git
cd react-spotify-player
```

### 3. Update React Spotify Player Config

Change `src/congig_example.js` to `src/config.js` and paste your Spotify Clioent ID from step 1 in the `clientId` feild.

### 4. Install dependencies & run locally

```sh
npm install
npm start # open http://localhost:3000 in your browser
```

### Follow original creator Joe Karlsson on Social

- Twitter - [@JoeKarlsson1](https://twitter.com/JoeKarlsson1)
- GitHub - [@JoeKarlsson](https://github.com/joekarlsson/)
- LinkedIn - [/in/joekarlsson](https://www.linkedin.com/in/joekarlsson/)
- Website - [joekarlsson.com](https://www.joekarlsson.com/)
