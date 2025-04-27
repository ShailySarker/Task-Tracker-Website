import { BrowserRouter } from "react-router";
import Routers from "./routes/Router";
import { AuthProvider } from "./contextAPI/AuthContext";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routers />
        <ToastContainer position="top-center" />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
