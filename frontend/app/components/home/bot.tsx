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
import ReactTooltip from 'react-tooltip';

function Bot() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');
  const [hoveredMessage, setHoveredMessage] = useState('');

  //! Retrieve user data from database
  useEffect(() => {
    axios
      .get('http://localhost:8080/user')
      .then((res) => {
        const userData = res.data.user[0];
        setName(userData.name);
        setAge(userData.age);
        setGender(userData.gender);
        setInterests(userData.interests);
        const personalizedMessage = getPersonalizedMessage(userData);
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
      const response = await fetch('http://localhost:8080/chat', {
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

  // Function to generate personalized bot messages
  const getPersonalizedMessage = (userData) => {
    let personalizedMessage = 'Hola';

    if (userData.name) {
      personalizedMessage += `, ${userData.name}!`;
    }

    if (userData.interests) {
      personalizedMessage += `. ¿De qué quieres hablar, ${userData.interests}?`;
    }

    return personalizedMessage;
  };

  // const [hoveredMessage, setHoveredMessage] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  const handleMouseOver = (event, message) => {
    axios
      .post('http://localhost:8080/translate', {
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

  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== '') {
      setSelectedWord(selection.toString());
    } else {
      setSelectedWord(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelect);
    return () => {
      document.removeEventListener('mouseup', handleTextSelect);
    };
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
          {selectedWord && (
            <div style={{ marginTop: '8px' }}>
              Selected Word: <strong>{selectedWord}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Bot;
