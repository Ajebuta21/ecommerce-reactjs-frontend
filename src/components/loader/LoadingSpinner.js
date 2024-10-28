import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full flex justify-center py-1">
      <div className="w-6 h-6 border-2 border-b-secondary  rounded-full animate-spin transition-all ease-in-out"></div>
    </div>
  );
};

export default LoadingSpinner;
