import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Home from "./home/Home";
import FoodUpload from "./foodupload";
import AdminDashboard from "./admin/AdminDashboard";
import AddRestaurant from "./admin/AddRestaurant";

function App() {
  const [page, setPage] = useState("login");

  const onLoginSuccess = () => {
    setPage("home");
  };

  const onLoginSuccessadmin = () => {
    setPage("adminDashboard");
  };

  return (
    <>
      {page === "login" && (
        <Login
          onSwitch={() => setPage("register")}
          onLoginSuccess={onLoginSuccess}
          onLoginSuccessadmin={onLoginSuccessadmin}
        />
      )}

      {page === "register" && (
        <Register onSwitch={() => setPage("login")} />
      )}

      {page === "home" && <Home />}

      {page === "adminDashboard" && (
        <AdminDashboard setPage={setPage} />
      )}

      {page === "addRestaurant" && <AddRestaurant />}

      {page === "foodupload" && <FoodUpload />}
    </>
  );
}

export default App;
