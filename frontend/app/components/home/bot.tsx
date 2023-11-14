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
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');

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
      const response = await fetch('http://localhost:8080/chat', {
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
          message: data.response,
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
        direction: 'incoming',
        sender: 'Bot',
        isTranslated: true,
      };

      setMessages((prevMessages) => [...prevMessages, translatedMessage]);
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

    // if (userData.age) {
    //   personalizedMessage += `. I see you're ${userData.age} years old`;
    // }

    // if (userData.gender) {
    //   personalizedMessage += ` and identify as ${userData.gender}`;
    // }

    if (userData.interests) {
      personalizedMessage += `. ¿De qué quieres hablar, ${userData.interests}?`;
    }

    // personalizedMessage += '! How can I help you today?';

    return personalizedMessage;
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
                <Message key={i} model={message}>
                  <button
                    className="bg-black p-10"
                    onClick={() => translateMessage(message.message)}>
                    Translate to English
                  </button>
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
