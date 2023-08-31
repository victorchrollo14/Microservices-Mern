import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ item }) => {
  const { _id, title, subtitle, price, images } = item;

  return (
    <li className="w-auto max-w-64 mb-5 h-fit" key={_id}>
      <figure>
        <Link to={"/"} className="rounded-xl image-wrapper">
          <img
            src={images[1]}
            alt=""
            srcSet=""
            className="normal-image rounded-xl"
          />
          {/* <img src={images[1]} alt="" className="hover-image" /> */}
        </Link>
        <figcaption className="flex flex-row gap-1 justify-between items-center">
          <div className="text-content flex flex-col gap-1">
            {" "}
            <span className="font-Poppins text-sm leading-none font-medium mt-2 sm:text-base sm:font-semibold ">
              {title}
            </span>
            <span className="font-Volkhov text-xs text-[#3D4F63] sm:text-sm">
              {subtitle}
            </span>
            <span className="font-Volkhov text-xs text-[#3D4F63] sm:text-sm">
              ${price}
            </span>
          </div>
          <div className="add-to-cart bg-black text-white hover:border py-3 px-4 rounded-lg cursor-pointer hover:text-black hover:bg-white">
            CART +
          </div>
        </figcaption>
      </figure>
    </li>
  );
};
