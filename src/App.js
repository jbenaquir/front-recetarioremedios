//to implement languaje in component copy this and replace text with langReference(GetLanguaje()).variable should added
import {
  langReference, GetLanguaje
} from "./langs/languajes.js";

// import logo from './logo.png';
import './App.css';
import { authentication } from './Logical/Authentication';
import { useState } from "react";
import Login from "./Login";

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
          <Login />
        }
        {
          authentication.authenticated()
          &&
          <p>
            {langReference(GetLanguaje()).enterChatId}:
            <div class="input-group mb-3">
              <input
                class="form-control"
                value={channelId}
                name="channelId"
                placeholder={`${langReference(GetLanguaje()).example}: 123`}
                onChange={e => setChannelId(e.target.value)}
                maxLength={30}
              ></input>
              <button
                onClick={searchChannel}
                class="btn btn-primary"
              >
                <i class="bi-chat"></i>
                <div>
                  {langReference(GetLanguaje()).go}
                </div>
              </button>
            </div>
          </p>
        }
      </header>
    </div>
  );
}

export default App;
