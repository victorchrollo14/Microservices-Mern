import React, { useEffect, useState } from "react";
import { AuthForm } from "../components/login";

import "../index.css";
import Header from "../components/header";

export const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const checklogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/checkLogin", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.error) alert(data.error);

      if (data.login) {
        setLoggedIn(true);
        return;
      }
      return false;
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    checklogin();
  }, []);

  return (
    <div className="homepage bg-slate-800">
      <Header />

      {loggedIn ? (
        <>
          <section
            className="profile"
            style={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <h1 style={{ color: "white" }}>hey user</h1>
            <button className="button">logout</button>
          </section>
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};
