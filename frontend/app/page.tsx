'use client';
import { useState } from 'react';
import { Button } from './components/shared';
import { Bot, Brain, Learning, Personal } from './utils/icons';
import Modal from 'react-lean-modal';
import { Form } from './components/landing';

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="h-80 w-screen bg-primary-blue flex">
        <div className="w-1/2 p-10">
          <span className="flex py-10 justify-center items-center font-medium text-4xl text-primary-white">
            Your Personal Language Learning ChatBot!
          </span>
          <Button handleClick={handleModal} type="secondary">
            <span>Get Started</span>
          </Button>
        </div>

        <figure className="w-1/2 flex justify-center items-center text-primary-white text-9xl">
          <Bot />
        </figure>
      </div>
      <div className="py-10">
        <h1 className="font-medium text-4xl flex justify-center pb-5">
          Top Features
        </h1>
        <div className="flex justify-evenly">
          <div>
            <figure className="text-7xl text-primary-blue flex justify-center py-5">
              <Learning />
            </figure>
            <h1 className="font-normal text-2xl">Conversational Learning</h1>
          </div>
          <div>
            <figure className="text-7xl text-primary-blue flex justify-center py-5">
              <Brain />
            </figure>
            <h1 className="font-normal text-2xl">Muscle Memory</h1>
          </div>
          <div>
            <figure className="text-7xl text-primary-blue flex justify-center py-5">
              <Personal />
            </figure>
            <h1 className="font-normal text-2xl">Personalized Learning</h1>
          </div>
        </div>
      </div>
      <Modal
        enterAnimation="fade"
        exitAnimation="fade"
        timeout={250}
        isOpen={showModal}
        onClose={() => setShowModal(false)}>
        <Form />
      </Modal>
    </div>
  );
}
