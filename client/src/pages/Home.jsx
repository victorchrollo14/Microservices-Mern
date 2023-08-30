import React, { useEffect, useState } from "react";
import { AuthForm } from "../components/login";

import "../index.css";
import Header from "../components/header";
import { Navigate } from "react-router";

export const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const token = localStorage.getItem("Token");
  const user = JSON.parse(localStorage.getItem("User"));

  const checklogin = async () => {
    if (token) {
      try {
        const response = await fetch(`http://localhost:80/user/checkLogin`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    }
  };

  const logout = () => {
    try {
      localStorage.clear();
      alert("successfully logged out");
      setLoggedIn(false);
    } catch (err) {
      console.log(err);
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
            <h1 className="text-green-400 text-3xl">Hello {user.fullName}</h1>
            <h2 className="text-white text-lg m-2">
              Your email : {user.email}
            </h2>
            <button className="button" onClick={logout}>
              logout
            </button>
          </section>
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
};
