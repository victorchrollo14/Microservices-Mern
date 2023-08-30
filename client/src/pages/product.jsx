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
      <h1 className="font-mono ml-5 my-5 text-xl font-bold">Products</h1>
      <section className="products-section flex justify-center">
        {allProducts ? (
          <ul className="products-list md:pl-5 ml-0 grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3 lg:grid-cols-4 pt-2 p-10 justify-center">
            {allProducts.map((item) => (
              <ProductCard item={item} key={item._id} />
            ))}
          </ul>
        ) : (
          <div>loading</div>
        )}
      </section>
    </div>
  );
};
