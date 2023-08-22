import React from "react";
import AuthForm from "../components/login";

import "../index.css";
import Header from "../components/header";

export const Home = () => {
  return (
    <div className="homepage bg-slate-800">
      <Header />
      <AuthForm />
    </div>
  );
};
