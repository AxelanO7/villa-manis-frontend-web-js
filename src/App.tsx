import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main_page";
import LoginPage from "./pages/login_page";
// import UserPage from "./pages/UserPage";
// import AccountPage from "./pages/AccountPage";
// import InputPage from "./pages/InputPage";
// import OutputPage from "./pages/OutputPage";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="user" element={<UserPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="input" element={<InputPage />} />
        <Route path="output" element={<OutputPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
