'use client';
import { SendButton } from '@/app/utils/icons';
import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [chatbotMessage, setChatbotMessage] = useState<any>([]);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      setMessageHistory([
        ...messageHistory,
        { text: inputMessage, isUser: true },
      ]);
      axios('https://52.91.53.9:8080/converse', {
        method: 'POST',
        data: { input: inputMessage },
      })
        .then((response) => {
          console.log(response.data.res.choices[0].text);
          setChatbotMessage(response.data.res.choices[0].text);
        })
        .catch((err) => {
          console.log(err);
        });
      setInputMessage('');
    }
  };

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
        <div className="h-80 flex flex-col space-y-4 max-w-md px-2 mb-2 mt-2 overflow-y-scroll">
          {/* Chatbot User Text */}
          <div className="flex flex-col items-end">
            {/* @ts-ignore */}
            {messageHistory.map((message: any, index: string) => (
              <div
                key={index}
                className={`message ${
                  message.isUser ? 'user' : 'chatbot'
                } bg-gray-500 px-4 py-2 text-white mt-2 mb-2 rounded-b-xl rounded-tr-xl`}>
                {message.text}
              </div>
            ))}
          </div>
          {/* Chatbot text */}
          <div className="flex flex-col items-start">
            {chatbotMessage && (
              <span className="bg-blue-500 px-4 py-2 text-white  rounded-b-xl rounded-tl-xl mb-2 mt-2">
                {chatbotMessage}
              </span>
            )}
          </div>
        </div>
        {/* Chatbot footer Div */}
        <form onSubmit={handleSendMessage}>
          <div className="border-t-2 flex items-center py-4 px-2">
            <input
              type="text"
              placeholder="type here..."
              value={inputMessage}
              onChange={handleInputChange}
              className="flex-1 rounded-lg px-4 py-2 border-2 mr-2 pr-10"
              required
            />
            <button type="submit" className="relative right-10">
              <span className="text-primary-orange text-2xl mx-2">
                <SendButton />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
