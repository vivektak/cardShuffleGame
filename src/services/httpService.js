/* eslint linebreak-style: ["error", "windows"] */
import Axios from 'axios';

const http = {
  get: (url) => Axios.get(`http://localhost:3000/api/${url}`),
};

export default http;
