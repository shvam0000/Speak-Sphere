'use client';
import { useState } from 'react';
import { Button } from './components/shared';
import { Brain, Learning, Personal, DownArrow } from './utils/icons';
import Modal from 'react-lean-modal';
import { Form } from './components/landing';
import Image from 'next/image';
import GetStarted from '@/app/utils/images/get-started.png';
import Chatbot from '@/app/utils/images/chatbot.png';
import Translate from '@/app/utils/images/translate.png';

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <div className="h-80 w-screen bg-primary-blue flex">
        <div className="w-1/2 p-10">
          <span className="flex py-10 pl-24 justify-center items-center font-medium text-4xl text-primary-white">
            Your Personal Spanish Learning ChatBot!
          </span>
          <span className="pl-24">
            <Button handleClick={handleModal} type="secondary">
              <span>Get Started</span>
            </Button>
          </span>
        </div>

        <figure className="flex justify-center items-center text-primary-pink text-9xl">
          <div>
            <iframe
              src="https://giphy.com/embed/S97VgVcYw0upbqmX8H"
              width="200%"
              height="200%"
              frameBorder="0"
              className="giphy-embed"
              allowFullScreen></iframe>
          </div>
        </figure>
      </div>
      <div className="py-10">
        <h1 className="font-semibold text-4xl flex justify-center pb-5">
          Top Features
        </h1>
        <div className="flex justify-evenly">
          <div>
            <figure className="text-7xl text-primary-pink flex justify-center py-5">
              <Learning />
            </figure>
            <h1 className="font-normal text-2xl">Conversational Learning</h1>
          </div>
          <div>
            <figure className="text-7xl text-primary-pink flex justify-center py-5">
              <Brain />
            </figure>
            <h1 className="font-normal text-2xl">Muscle Memory</h1>
          </div>
          <div>
            <figure className="text-7xl text-primary-pink flex justify-center py-5">
              <Personal />
            </figure>
            <h1 className="font-normal text-2xl">Personalized Learning</h1>
          </div>
        </div>
      </div>
      <div className="py-5">
        <h1 className="font-semibold text-4xl flex justify-center">
          How it Works?
        </h1>

        <div className="flex justify-center items-center py-4">
          <div className="w-1/2 flex justify-center items-center text-lg font-medium ">
            Simply Enter your name to get started!
          </div>
          <figure className="shadow-lg mx-10">
            <Image src={GetStarted} height={900} width={900} alt="Name Input" />
          </figure>
        </div>

        <figure className="flex justify-center items-center text-5xl text-primary-pink py-5">
          <DownArrow />
        </figure>
        <div className="flex justify-center items-center py-4">
          <figure>
            <Image src={Chatbot} height={900} width={900} alt="Chatbot" />
          </figure>
          <div className="w-1/2 flex justify-center items-center text-lg font-medium text-center px-10">
            Start talking to the bot and it will respond to you in the spanish
            trying to teach you more about it.
          </div>
        </div>
        <figure className="flex justify-center items-center text-5xl text-primary-pink py-5">
          <DownArrow />
        </figure>
        <div className="flex justify-center items-center py-4">
          <div className="w-1/2 flex justify-center items-center text-lg font-medium text-center px-10">
            Not sure what the reply means? Just hover over the message and see
            the english translation
          </div>
          <figure className="shadow-lg mx-10">
            <Image src={Translate} height={900} width={900} alt="Translate" />
          </figure>
        </div>
        <div className="flex justify-center py-5 pt-10">
          <Button handleClick={handleModal} type="primary">
            <span>Get Started</span>
          </Button>
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
