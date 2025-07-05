// import logo from './logo.png';
import './App.css';
import { authentication } from './Logical/Authentication';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          This app was made to help persons and the medical assistance to cure them.
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
