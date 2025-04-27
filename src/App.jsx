import { BrowserRouter } from "react-router";
import Routers from "./routes/Router";
import { AuthProvider } from "./contextAPI/AuthContext";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
