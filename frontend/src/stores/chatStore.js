import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class ChatStore {
  messages = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchMessages(userId) {
    try {
      const res = await axios.get(`http://localhost:5000/messages/${userId}`);
      runInAction(() => {
        this.messages = res.data;
      });
    } catch (err) {
      console.error("Fetch Messages Error:", err);
    }
  }

  async sendMessage(userQuery, userId) {
    this.loading = true;
    try {
      // Immediately add the user message
      runInAction(() => {
        this.messages.push({ sender: 'user', text: userQuery });
      });

      const res = await axios.post('http://localhost:5000/chat', {
        userQuery,
        userId,
      });

      console.log("AI Response in frontend:", res.data.aiResponse);

      runInAction(() => {
        this.messages.push({ sender: 'ai', text: res.data.aiResponse });
      });
    } catch (err) {
      console.error("Send Message Error:", err);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

const chatStore = new ChatStore();
export default chatStore;
