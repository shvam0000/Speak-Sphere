//@ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import './bot.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import axios from 'axios';

function Bot() {
  const [name, setName] = useState<any>('');
  const [age, setAge] = useState<any>('');
  const [gender, setGender] = useState<any>('');
  const [interests, setInterests] = useState<any>('');

  const [messages, setMessages] = useState([
    {
      message:
        "Hello, I'm Speak Sphere! How's your journey of learning Spanish going?!",
      sentTime: 'just now',
      sender: 'Bot',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);

    sendMessageToMiddleware(message);
  };

  const sendMessageToMiddleware = async (message) => {
    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      const newMessage = {
        message,
        direction: 'outgoing',
        sender: 'user',
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
        {
          message: data.message,
          sender: 'Bot',
        },
      ]);

      setIsTyping(false);
    } catch (error) {
      console.error(error);
    }
  };

  const translateMessage = async (message) => {
    try {
      // Use a translation API or service to translate the message to English
      const translation = await translateToEnglish(message);

      const translatedMessage = {
        message: translation,
        direction: 'incoming', // Incoming message from the bot
        sender: 'Bot',
        isTranslated: true, // Add a flag to indicate it's a translated message
      };

      setMessages((prevMessages) => [...prevMessages, translatedMessage]);
    } catch (error) {
      console.error(error);
    }
  };

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
    <div className="App h-20">
      <div style={{ position: 'relative', height: '600px', width: '700px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Speak Sphere is typing" />
                ) : null
              }>
              {messages.map((message, i) => (
                <Message key={i} model={message}>
                  {message.sender === 'user' ? (
                    <button
                      className="bg-black p-10"
                      onClick={() => translateMessage(message.message)}>
                      Translate to English
                    </button>
                  ) : null}
                </Message>
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type a message here"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default Bot;
