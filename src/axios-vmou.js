import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://localhost:5000/api'
    //baseURL : 'https://my-burger-8a498.firebaseio.com'
});

export default instance;