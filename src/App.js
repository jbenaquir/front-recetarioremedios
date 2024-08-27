import logo from './logo.svg';
import './App.css';
import { authentication } from './Logical/Authentication';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {
          !authentication.authenticated()
          &&
          <a
            className="App-link"
            href="/login"
            rel="noopener noreferrer"
          >
            Login
          </a>
        }
      </header>
    </div>
  );
}

export default App;
