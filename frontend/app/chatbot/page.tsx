'use client';
import React, { useEffect, useState } from 'react';
import { Bot } from '../components/home';
import axios from 'axios';

const Chatbot = () => {
  const [name, setName] = useState<any>('');

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      .then((res) => {
        setName(res.data.user[0].name);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-center items-center p-10">
      <div>
        <Bot />
      </div>
    </div>
  );
};

export default Chatbot;
