import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { ProductCard } from "../components/ProductCard";

export const Product = () => {
  const [allProducts, setAllProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch("http://localhost:4000/product/getData");
    const data = await response.json();

    for (const prod of data) {
      const image1 = prod.images[0];
      const image2 = prod.images[1];
      prod.images[0] = `http://localhost:4000/${image1}`;
      prod.images[1] = `http://localhost:4000/${image2}`;
    }

    setAllProducts(data);
    console.log(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <h1>Product page</h1>
      {allProducts ? (
        <ul className="products-list   md:pl-5 ml-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3 lg:grid-cols-3 pt-2 md:w-4/5 justify-end">
          {allProducts.map((item) => (
            <ProductCard item={item} key={item._id} />
          ))}
        </ul>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};
