'use client';
import React from 'react';

const ChatBot = () => {
  return (
    <div className="w-full m-10 p-10">
      {/* Chatbot div */}
      <div className="bg-white shadow-lg rounded-lg max-w-md">
        {/* Chatbot Header Div */}
        <div className="border-b-2 px-2 py-4">
          <div className="flex justify-center items-center ">
            {/* Logo comes here */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/2040/2040946.png"
              alt="logo"
              className="w-8"
            />
            <span className="ml-4">Speak Sphere</span>
          </div>
        </div>
        {/* Chatbot Body Div */}
        <div className="h-80 flex flex-col space-y-4 max-w-md px-2 mb-2 mt-2">
          {/* Chatbot text */}
          <div className="flex flex-col items-start">
            <span className="bg-blue-500 px-4 py-2 text-white  rounded-b-xl rounded-tl-xl mb-2 mt-2">
              How I can Help?
            </span>
          </div>
          {/* Chatbot User Text */}
          <div className="flex flex-col items-end">
            <span className="bg-gray-500 px-4 py-2 text-white mt-2 mb-2 rounded-b-xl rounded-tr-xl">
              Good Place for Coffee{' '}
            </span>
          </div>
        </div>
        {/* Chatbot footer Div */}
        <div className="border-t-2 flex items-center py-4 px-2">
          <input
            type="text"
            placeholder="type here..."
            className="flex-1 rounded-lg px-4 py-2 border-2 mr-2"
          />
          <button type="submit" className="relative right-10">
            <span className="text-primary-orange text-2xl">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
