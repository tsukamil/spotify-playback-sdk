import React from "react";
import "./Player.css";

const Player = props => {

  const progressBarStyles = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  };

  async function pausePlayer() {
    console.log(props.token);
      await fetch('https://api.spotify.com/v1/me/player/pause', { 
        method: 'PUT', 
        headers: { 
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + props.token
        }, 
      }); 
  }

  async function playPlayer() {
    await fetch('https://api.spotify.com/v1/me/player/play', { 
      method: 'PUT', 
      headers: { 
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + props.token
      }, 
    }); 
  }

  return (
    <div className="App">
      <div className="main-wrapper">
        <div className={`now-playing__img ${props.is_playing ? 'is-playing' : ''}`}>
          <img src={props.item.album.images[0].url} alt={props.item.name} />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.item.name}</div>
          <div className="now-playing__artist">
            {props.item.artists[0].name}
          </div>
          <div className="now-playing__status">
            {props.is_playing ? "Playing" : "Paused"}
          </div>
          <div className="progress">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
          <div className="buttons">
            {props.is_playing ? (
              <div onClick={pausePlayer} className="btn btn--pause">Pause</div>
            ) : (
              <div onClick={playPlayer} className="btn btn--play">Play</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
