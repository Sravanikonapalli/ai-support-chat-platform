import React, { useState ,useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import chatStore from '../stores/chatStore';
import MessageBubble from './MessageBubble';
import '../styles.css'
import { Link } from 'react-router-dom';
const ChatWindow = observer(() => {
  const [input, setInput] = useState('');
  const userId = '123'; 

  useEffect(() => {
    chatStore.fetchMessages(userId);
  }, []);
  
  const handleSend = async () => {
    if (input.trim()) {
      await chatStore.sendMessage(input, userId);
      setInput('');
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {chatStore.messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={chatStore.loading}
        />
        <button onClick={handleSend} disabled={chatStore.loading}>
          {chatStore.loading ? 'Sending...' : 'Send'}
        </button>
      </div>
      <Link to="/login">
      <button>Login Here</button>
      </Link>
    </div>
  );
});

export default ChatWindow;
