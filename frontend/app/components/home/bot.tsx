// splitting into FE and BE
//@ts-nocheck
'use client';
import React, { useState, useEffect } from 'react';
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

// const systemMessage = {
//   role: 'system',
//   content:
//     "Explain things like you're talking to a software professional with 2 years of experience.",
// };

function Bot() {
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

    // Send the message to the Node.js middleware for processing
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

  // useEffect(() => {
  //   // Initial system message
  //   sendMessageToMiddleware(systemMessage.content);
  // }, []);

  return (
    <div className="App">
      <div style={{ position: 'relative', height: '800px', width: '700px' }}>
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
                  {/* {message.sender == 'Bot' ? (
                    <button
                      className="bg-black p-10"
                      onClick={() => translateMessage(message.message)}>
                      Translate to English
                    </button>
                  ) : null} */}
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
