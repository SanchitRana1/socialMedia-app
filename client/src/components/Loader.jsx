import { spiral } from "ldrs";

spiral.register();

// Default values shown
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center my-4 w-full">
      <l-spiral size="100" speed="0.9" color="black"/>
    </div>
  );
};

export default Loader;
