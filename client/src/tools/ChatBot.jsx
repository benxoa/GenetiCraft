import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/Styles.css'

function Chatbot() {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendMessage = async () => {
  if (inputText.trim() === '') return;

  try {
    const response = await fetch('http://localhost:8080/api/textgenerator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputText }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();

    setChatHistory([
      ...chatHistory,
      { text: inputText, type: 'user' },
      { text: data, type: 'bot' }, 
    ]);
    setInputText('');
  } catch (error) {
    console.error('Error:', error);
  }
};
  return (
    <div className="chat-container">
      <div className="chat-box">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="input-field"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
