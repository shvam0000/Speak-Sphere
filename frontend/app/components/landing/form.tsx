'use client';
import React, { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';
import Heading from './heading';

const Form = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');

  const router = useRouter();

  //@ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object to store the form data
    const formData = {
      name,
      interests,
    };

    axios('http://52.91.53.9:8080/user', {
      method: 'POST',
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));

    // Save the form data in session storage
    // sessionStorage.setItem('formData', JSON.stringify(formData));
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
