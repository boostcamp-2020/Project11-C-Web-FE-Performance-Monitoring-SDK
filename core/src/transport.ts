import axios from 'axios';
import * as pocket from './pocket';

const sendLog = async (data: { content: string; errArea: {}; date: Date }) => {
  try {
    const endpoint = pocket.initOptions.dsn;
    const response: any = await axios.post(endpoint, data);
    const errorId: string = response.data._id;
    return errorId;
  } catch (error) {
    return false;
  }
};

export { sendLog };
