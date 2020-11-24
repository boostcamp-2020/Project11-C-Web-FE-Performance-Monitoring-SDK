import axios from 'axios';

const endpoint = 'http://localhost:3000/log';
const sendLog = async (data: { content: string; date: Date; env: {} }) => {
  try {
    const response = await axios.post(endpoint, data);

    return true;
  } catch (error) {
    return false;
  }
};

export default sendLog;
