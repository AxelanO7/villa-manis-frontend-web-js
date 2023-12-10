import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main_page";
import OwnerPage from "./pages/owner_page";
import LoginPage from "./pages/login_page";
import UserPage from "./pages/user_page";
import AccountPage from "./pages/account_page";
import CategoryPage from "./pages/category_page";

import IncomePage from "./pages/income/income_page";
import CreateIncomePage from "./pages/income/create_income";

import ExpenditurePage from "./pages/expenditure/expenditure_page";
import CreateExpenditurePage from "./pages/expenditure/create_expenditure";

import JournalPage from "./pages/journal/journal_page";
import CreateJournalPage from "./pages/journal/create_journal_page";
import DetailJournalPage from "./pages/journal/detail_journal_page";
import PostLedgerPage from "./pages/journal/post_ledger_page";

import GeneralJournalPage from "./pages/report/general_journal_page";
import TrialBalancePage from "./pages/report/trial balance_page";
import IncomeStatementPage from "./pages/report/income_statement";
import StatementOfOwnerEquityPage from "./pages/report/statement_of_owner_equity";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/" element={<LoginPage />} /> */}
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
        <Route path="add-journal" element={<CreateJournalPage />} />
        <Route path="detail-journal" element={<DetailJournalPage />} />
        <Route path="post-ledger" element={<PostLedgerPage />} />

        <Route path="report-journal" element={<GeneralJournalPage />} />
        <Route path="balance-sheet" element={<TrialBalancePage />} />
        <Route path="profit-loss" element={<IncomeStatementPage />} />
        <Route path="capital-change" element={<StatementOfOwnerEquityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
