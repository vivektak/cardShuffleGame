import Axios from 'axios';

const http = {
    get: async function (url) {
        return await Axios.get('http://localhost:3000/api/' + url)
    }
}

export default http;