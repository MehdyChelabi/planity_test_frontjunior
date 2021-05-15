import "./App.css";
import planity from "./planity.png";
import InputEmailSuggest from "./components/InputEmailSuggest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={planity} alt="logo" className="App-logo" />
      </header>
      <br />
      <div className="inputEmailComponent">
        <InputEmailSuggest />
      </div>
    </div>
  );
}

export default App;
