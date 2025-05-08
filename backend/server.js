const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const axios = require('axios');

// MongoDB Connection
mongoose.connect('mongodb+srv://konapallisravani:OijNgqTGczM3axYI@cluster44.cpreaub.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Message schema
const messageSchema = new mongoose.Schema({
  userId: String,
  sender: String, // 'user' or 'ai'
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// Document schema
const documentSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  uploadedAt: { type: Date, default: Date.now },
});

const Document = mongoose.model('Document', documentSchema);

// File upload config using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });


// Get messages for a user
app.get('/messages/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.params.userId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Fetch messages error:', err);
    res.status(500).json({ message: 'Server error fetching messages' });
  }
});
app.post('/chat', async (req, res) => {
  const { userQuery, userId } = req.body;
  try {
    const userMsg = new Message({ userId, sender: 'user', text: userQuery });
    await userMsg.save();

    const aiResponse = await axios.post(
      'https://api-inference.huggingface.co/models/gpt2',
      { inputs: userQuery },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}` // Store your API key in .env
        }
      }
    );

    console.log('AI response:', aiResponse.data);

    const aiText = aiResponse.data[0]?.generated_text || 'Sorry, I could not generate a response.';

    const aiMsg = new Message({ userId, sender: 'ai', text: aiText });
    await aiMsg.save();

    res.json({ aiResponse: aiText });
  } catch (err) {
    console.error('Chat error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Server error during chat' });
  }
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const newDoc = new Document({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
    });
    await newDoc.save();

    res.json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

// Temporary route to clear all messages (USE WITH CAUTION!)
app.delete('/clear-messages', async (req, res) => {
  try {
    await Message.deleteMany({});
    res.json({ message: 'All messages deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting messages' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
