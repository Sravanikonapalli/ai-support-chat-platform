import '../styles.css'

const MessageBubble = ({ sender, text }) => {
  return (
    <div className={`message-bubble ${sender}`}>
      <p>{text}</p>
    </div>
  );
};

export default MessageBubble;
