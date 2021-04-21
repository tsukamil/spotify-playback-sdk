import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
      playlists: [],
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }

  // USE EFFECT I REFACTOR

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }

  async getCurrentlyPlaying(token) {
    const response = await fetch(`https://api.spotify.com/v1/me/player`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if(response.status !== 200) {
      this.setState({
        no_data: true,
      });
      return;
    } else {
      const data = await response.json();    
      this.setState({
        item: data.item,
        is_playing: data.is_playing,
        progress_ms: data.progress_ms,
        no_data: false /* We need to "reset" the boolean, in case the
                          user does not give F5 and has opened his Spotify. */
      });
    }
  }

  checkForPlayer() {
    const { token } = this.state;
  
    if (window.Spotify !== null) {
      this.player = new window.Spotify.Player({
        name: "React Spotify Player",
        getOAuthToken: cb => { cb(token); },
      });
      clearInterval(this.playerCheckInterval);

      this.player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        document.body.setAttribute('deviceid', device_id);
      });
  
      this.player.connect();
    }
  }

  getPlaylists() {
    if(this.state.token) {
      fetch(`https://api.spotify.com/v1/me/playlists`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.token}`
        },
      }).then(response => response.json())
      .then(data => {
        this.setState({ playlists: data, });
        this.playRandom();
    });
    }
  }

  playRandom() {
    const id = document.body.getAttribute("deviceid");
    const random = Math.floor(Math.random() * this.state.playlists.items.length);
    const uri = this.state.playlists.items[random].uri;
    if(this.state.token) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          "context_uri": uri,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.token}`
        },
      });
    }
  }

  playDiscover() {
    const id = document.body.getAttribute("deviceid");
    if(this.state.token) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          "context_uri": "spotify:playlist:37i9dQZF1DX4pq3ejIlJu2",
          "offset": {
            "position": 5
          },
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.state.token}`
        },
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && !this.state.no_data && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
              token={this.state.token}
            />
          )}
          {this.state.no_data && (
            <div>
              <p>
                You need to be playing a song on Spotify, for something to appear here.
              </p>
              <button className="btn btn--start" onClick={() => this.playDiscover()}>DISCOVER</button>
              <button className="btn btn--playlists" onClick={() => this.getPlaylists()}>PLAY RANDOM</button>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
