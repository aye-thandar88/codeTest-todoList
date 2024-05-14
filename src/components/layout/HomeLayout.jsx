import React from "react";

const HomeLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex-col px-80 max-lg:px-24 py-10 max-sm:px-10 justify-center items-center">
      <h1 className="text-center text-4xl max-sm:text-2xl font-bold tracking-[8px]">TODO</h1>
      <div className="flex-col mt-8">{children}</div>
    </div>
  );
};

export default HomeLayout;
