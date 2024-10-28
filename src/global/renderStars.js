import { FaRegStar, FaStar } from "react-icons/fa";

export const renderStars = (number) => {
  return Array.from({ length: 5 }, (_, index) => {
    return index < number ? (
      <FaStar key={index} className="text-yellow-500" />
    ) : (
      <FaRegStar key={index} className="text-gray-400" />
    );
  });
};
