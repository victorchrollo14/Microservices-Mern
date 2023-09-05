import React from "react";
import { Link } from "react-router-dom";

const CartCard = ({ item }) => {
  const { productId, title, subtitle, price, images } = item;
  return (
    <li className="w-auto max-w-64 mb-5 h-fit" key={productId}>
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
        </figcaption>
      </figure>
    </li>
  );
};

export { CartCard };
