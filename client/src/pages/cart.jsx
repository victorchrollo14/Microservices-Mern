import React, { useEffect } from "react";
import Header from "../components/header";

const token = localStorage.getItem("Token");
const user = JSON.parse(localStorage.getItem("User"));

const getCart = async () => {
  try {
    const response = await fetch(`http://localhost:80/cart/${user._id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

export const Cart = () => {
  useEffect(() => {
    if (token) {
      getCart();
    }
  });

  return (
    <div>
      <Header />
      <div className="w-screen">
        <h1 className="font-mono text-2xl text-center font-semibold my-3">
          Your Cart
        </h1>
      </div>
    </div>
  );
};
