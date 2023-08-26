import React, { useState } from "react";
import { AuthForm } from "../components/login";

import "../index.css";
import Header from "../components/header";

export const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const checklogin = async () => {
    try {
      const response = await fetch("/user/checklogin", )
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  return (
    <div className="homepage bg-slate-800">
      <Header />
      <AuthForm />
    </div>
  );
};
