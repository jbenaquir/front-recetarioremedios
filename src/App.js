//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
  langReference, GetLanguaje
} from "./langs/languajes.js";

// import logo from './logo.png';
import './App.css';
import { authentication } from './Logical/Authentication';
import { useState } from "react";

function App() {
  const [channelId, setChannelId] = useState('');

  function searchChannel() {
    if (channelId === "")
      return;

    window.location.href = "/chat/" + channelId;
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>

          {langReference(GetLanguaje()).slogan}
        </p>
        <p>
          <a
            className="App-link"
            href="/Donativos.jpg"
            rel="noopener noreferrer"
          >
            {langReference(GetLanguaje()).donatives}
          </a>
        </p>
        {
          !authentication.authenticated()
          &&
          <a
            className="App-link"
            href="/login"
            rel="noopener noreferrer"
          >
            {langReference(GetLanguaje()).login}
          </a>
        }
        {
          authentication.authenticated()
          &&
          <p>
            {langReference(GetLanguaje()).channel} {langReference(GetLanguaje()).session}ID:
            <input
              class="form-control"
              value={channelId}
              name="channelId"
              placeholder={langReference(GetLanguaje()).channel}
              onChange={e => setChannelId(e.target.value)}
              maxLength={30}
            ></input>
            <button
              onClick={searchChannel}
            >
              {langReference(GetLanguaje()).go}
            </button>
          </p>
        }
      </header>
    </div>
  );
}

export default App;
