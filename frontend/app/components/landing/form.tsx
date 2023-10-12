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
      age,
      gender,
      interests,
    };

    axios('http://localhost:8080/user', {
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
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <Heading />
        <div className="flex justify-center flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name">
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="age">
              Age
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="age"
              type="number"
              placeholder="21"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="gender">
              Gender
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="gender"
              type="text"
              placeholder="Male"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="interests">
              Interests
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="interests"
              type="text"
              placeholder="Travel, Food, Sports, etc."
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          className="uppercase tracking-wide text-gray-700 bg-gray-200 px-4 py-2 rounded-lg text-xs font-bold mb-2"
          type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
