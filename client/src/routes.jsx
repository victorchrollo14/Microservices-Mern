import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Product } from "./pages/product";
import { Cart } from "./pages/cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
  )
);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
