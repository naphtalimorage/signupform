import React from "react";
import "./index.css";
import SignUpForm from "./components/SignUp";
import LoginForm from "./components/Login";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
