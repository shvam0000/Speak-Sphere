import { ChatBot } from './components/home';

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, sit.
      </div>
      <div className="w-1/2">
        <ChatBot />
      </div>
    </div>
  );
}
