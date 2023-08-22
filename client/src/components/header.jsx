import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for routing

function Header() {
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Ecommerce
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/product" className="text-white hover:underline">
                Product
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-white hover:underline">
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
