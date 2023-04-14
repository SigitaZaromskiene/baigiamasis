import "./App.css";
import Routes from "./components/Routes";
import { GlobalProvider } from "./components/Global";

function App() {
  return (
    <GlobalProvider>
      <Routes></Routes>
    </GlobalProvider>
  );
}

export default App;
