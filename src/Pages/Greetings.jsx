import React from "react";

export const Greetings = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-500">Thank You!</h1>
        <p className="text-lg text-gray-700">Your survey has been submitted successfully.</p>
        <div className="mt-6 animate-bounce">
          <svg
            className="w-10 h-10 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};


