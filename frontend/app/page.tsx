import { Bot, Brain, Learning, Personal } from './utils/icons';
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <div>
      <div className="h-80 w-screen bg-primary-blue flex">
        <div className="w-1/2 flex justify-center items-center font-medium text-4xl text-primary-white p-10">
          Your Personal Langauage Learning ChatBot!
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
    </div>
  );
}
