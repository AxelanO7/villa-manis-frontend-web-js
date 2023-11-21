import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main_page";
import LoginPage from "./pages/login_page";
import UserPage from "./pages/user_page";
import AccountPage from "./pages/account_page";
import CategoryPage from "./pages/category_page";

import IncomePage from "./pages/income/income_page";
import CreateIncomePage from "./pages/income/create_income";

import ExpenditurePage from "./pages/expenditure/expenditure_page";
import CreateExpenditurePage from "./pages/expenditure/create_expenditure";

import OwnerPage from "./pages/owner_page";
import JournalPage from "./pages/journal_page";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateExpenditurePage />} />
        <Route path="main-page" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="category" element={<CategoryPage />} />
        <Route path="owner" element={<OwnerPage />} />

        <Route path="income" element={<IncomePage />} />
        <Route path="add-income" element={<CreateIncomePage />} />

        <Route path="expenditure" element={<ExpenditurePage />} />
        <Route path="add-expenditure" element={<CreateExpenditurePage />} />

        <Route path="journal" element={<JournalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
