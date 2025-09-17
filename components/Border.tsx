import React from "react";

const Border = ({ text }: { text: string }) => {
  return (
    <div className="relative my-4 flex items-center w-full max-w-2xl mx-auto">
      <div className="flex-grow border-t-2 border-gray-200 dark:border-gray-700 rounded"></div>
      <span className="mx-4 px-4 py-1 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300 tracking-wider font-semibold text-lg rounded shadow-sm">
        {text}
      </span>
      <div className="flex-grow border-t-2 border-gray-200 dark:border-gray-700 rounded"></div>
    </div>
  );
};

export default Border;
