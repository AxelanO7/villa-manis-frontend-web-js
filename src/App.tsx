import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main_page";
import LoginPage from "./pages/login_page";
import UserPage from "./pages/user_page";
import AccountPage from "./pages/account_page";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="main-page" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
