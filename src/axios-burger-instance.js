import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-6ebce.firebaseio.com/'
});

export default instance;