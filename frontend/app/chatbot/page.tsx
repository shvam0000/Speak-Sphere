'use client';
import React, { useEffect, useState } from 'react';
import { Bot } from '../components/home';
import axios from 'axios';

const Chatbot = () => {
  const [name, setName] = useState<any>('');
  const [age, setAge] = useState<any>('');
  const [gender, setGender] = useState<any>('');
  const [interests, setInterests] = useState<any>('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/user')
      .then((res) => {
        setName(res.data.user[0].name);
        setAge(res.data.user[0].age);
        setGender(res.data.user[0].age);
        setInterests(res.data.user[0].interests);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex justify-center items-center p-10">
      <div className="w-1/2 p-10">
        <p className="text-center text-2xl font-bold text-gray-800">{name}</p>
        <p className="text-center text-lg text-gray-600">
          Gen AI app which lets the user converse with an AI chatbot in order to
          practicing while learning a new language
        </p>
      </div>
      <div>
        <Bot />
      </div>
    </div>
  );
};

export default Chatbot;
