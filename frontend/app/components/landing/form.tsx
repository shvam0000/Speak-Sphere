'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');

  const router = useRouter();

  //@ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      interests,
    };

    axios(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: 'POST',
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    router.replace('/chatbot');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="font-medium text-2xl flex justify-center items-center">
          Lets Get Started
        </h1>
        <div className="w-full md:w-1/2 px-3 md:mb-0">
          <label
            className="block tracking-wide text-gray-700 text-medium font-bold mb-2"
            htmlFor="name">
            Your Name
          </label>
          <input
            className="appearance-none block w-full bg-secondary-blue text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="name"
            type="text"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button
          className="ml-2 bg-primary-blue rounded-full px-4 py-2 my-3 text-primary-white"
          type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
