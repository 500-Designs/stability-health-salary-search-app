import logo from './logo.svg';
import './App.css';

const wpUrl = process.env.NODE_ENV === 'local' ?
  process.env.LOCAL_WP_URL :
  process.env.NODE_ENV === 'development' ?
    process.env.DEV_WP_URL :
    process.env.PROD_WP_URL;
    
function App() {

  console.log("Init env: ", process.env);
  console.log("Init APP: ", wpUrl);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
