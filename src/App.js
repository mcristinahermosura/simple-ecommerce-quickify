import AppNavBar from "./components/AppNavBar.js";
import "./Pages/Layout.css";
import { BrowserRouter } from "react-router-dom";
import Routers from "./router/router.js";

function App() {
  return (
    <BrowserRouter>
      <AppNavBar />
      <Routers />
    </BrowserRouter>
  );
}

export default App;
