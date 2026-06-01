import React, { useEffect, useState } from "react";
import "./ProductCard.css";

const ProductsCard = ({ item }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(
        () => setCurrentImage((prev) => (prev + 1) % item.images.length),
        1000,
      );
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isHovered, item.images.length]);

  return (
    <div className="group px-4 relative ">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-[250px] sm:w-full h-[350px] overflow-hidden  "
      >
        {item.images.map((image: string, index: number) => {
          return (
            <img
              src={image}
              alt=""
              className="card-media object-top"
              key={index}
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          );
        })}
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name space-y-3">
          <h1 className="font-semibold text-lg">
            {item.seller.bussinessDetails?.bussinessName}
          </h1>
          <p className="">Sampoo</p>
        </div>
        <div className="price flex items-center gap-3 ">
          <span className="font-semibold text-purple-800">₹999</span>
          <span className="font-thin line-through text-gray-400">₹699</span>
          <span className="font-semibold text-purple-600">30% off</span>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
