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
  const [hoveredMessage, setHoveredMessage] = useState('');
  const [name, setName] = useState('');

  //! Retrieve user data from database
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user`)
      .then((res) => {
        const userData = res.data.user[0];
        setName(userData.name);
        const personalizedMessage = getPersonalizedMessage(userData.name);
        setMessages([
          {
            message: personalizedMessage,
            sentTime: 'just now',
            sender: 'Bot',
          },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  const [messages, setMessages] = useState([
    {
      message: '¡Hola! Bienvenido a SpeakSphere, ¿de qué quieres hablar hoy?',
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      const botMessage = {
        message: data.response,
        sender: 'Bot',
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      setIsTyping(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getPersonalizedMessage = (name) => {
    let personalizedMessage = 'Hola';

    if (name) {
      personalizedMessage += `, ${name}!`;
    }

    personalizedMessage += ' ¿Cuales son tus intereses?';

    return personalizedMessage;
  };

  const handleMouseOver = (event, message) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/translate`, {
        text: message.message,
      })
      .then((res) => {
        const translatedMessage = res.data.message;
        setHoveredMessage(translatedMessage);
      })
      .catch((err) => console.log(err));
  };

  const handleMouseOut = () => {
    setHoveredMessage(null);
  };

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
                <div
                  key={i}
                  onMouseOver={(event) => handleMouseOver(event, message)}
                  onMouseOut={handleMouseOut}
                  style={{ position: 'relative' }}>
                  <Message model={message}>
                    <button className="bg-black p-10">
                      Translate to English
                    </button>
                  </Message>
                </div>
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type a message here"
              onSend={handleSend}
            />
          </ChatContainer>
        </MainContainer>
      </div>

      {hoveredMessage && (
        <div
          style={{
            position: 'absolute',
            top: 100, // Adjust as needed
            left: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            margin: '20px',
            padding: '10px',
            borderRadius: '4px',
            zIndex: 1000,
            width: '300px',
          }}>
          {hoveredMessage}
        </div>
      )}
    </div>
  );
}

export default Bot;
