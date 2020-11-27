import axios from 'axios';

const endpoint = 'http://localhost:3000/log';
const sendLog = async (data: { content: string; errArea: {}; date: Date }) => {
  try {
    const response: any = await axios.post(endpoint, data);
    const errorId: string = response.data._id;
    return errorId;
  } catch (error) {
    return false;
  }
};

export { sendLog };
