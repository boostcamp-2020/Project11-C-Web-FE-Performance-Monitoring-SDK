import axios from 'axios';
import * as pocket from './pocket';

interface LogData {
  name: string;
  message: string;
  stack: string;
  errArea: {};
  tags: {};
  date: number;
}

interface ResType {
  config: {};
  data: {
    comments: string[];
    createdAt: string;
    description: string;
    errorEvents: {}[];
    groupHash: string;
    title: string;
    updatedAt: string;
    __v: number;
    _id: string;
  };
  headers: {};
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

const sendLog = async (data: LogData) => {
  try {
    const endpoint = pocket.initOptions.dsn;
    const response: ResType = await axios.post(endpoint, data);
    const errorId: string = response.data._id;
    return errorId;
  } catch (error) {
    // 생각
    return false;
  }
};

export { sendLog };
