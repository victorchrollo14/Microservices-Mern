import React, { useEffect } from "react";
import Header from "../components/header";
import { CartCard } from "../components/cartCard";

const token = localStorage.getItem("Token");
const user = JSON.parse(localStorage.getItem("User"));
const cart = JSON.parse(localStorage.getItem("Cart"));
console.log(cart);

const getCart = async () => {
  try {
    if (!cart) {
      const response = await fetch(`http://localhost:80/cart/${user._id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      }
      localStorage.setItem("Cart", JSON.stringify(data));
    }
  } catch (err) {
    throw err;
  }
};

export const Cart = () => {
  if (cart) {
    for (const prod of cart) {
      console.log(prod.images);
      const image1 = prod.images[0];
      const image2 = prod.images[1];
      prod.images[0] = `http://localhost:80/product/${image1}`;
      prod.images[1] = `http://localhost:80/product/${image2}`;
    }
  }

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
        <ul className="products-list md:pl-5 ml-0 grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3 lg:grid-cols-4 pt-2 p-10 justify-center">
          {cart ? (
            cart.map((product) => (
              <CartCard key={product.productId} item={product} />
            ))
          ) : (
            <p> loading data</p>
          )}
        </ul>
      </div>
    </div>
  );
};
