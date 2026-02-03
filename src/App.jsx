import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import FoodUpload from "./foodupload.jsx";

function App() {
  const [page, setPage] = useState("login");
  const onLoginSuccess = () => {
    setPage("home");
  };

  const onLoginSuccessadmin = () => {
    setPage("foodupload");
  };
  return (
    <>
      {page === "login" && (
        <Login onSwitch={() => setPage("register")}  onLoginSuccessadmin={onLoginSuccessadmin}
        onLoginSuccess={onLoginSuccess}  />
      )}

      {page === "register" && (
        <Register onSwitch={() => setPage("login")} />
      )}

      {page === "home" && <Home />}

      {page === "foodupload" && <FoodUpload />}
    </>
  );
}

export default App;
