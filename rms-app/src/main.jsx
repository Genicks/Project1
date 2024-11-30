import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthUser/AuthPage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/AuthUser/Login.jsx";
import Register from "./pages/AuthUser/Register.jsx";
import Home from "./pages/Home.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
