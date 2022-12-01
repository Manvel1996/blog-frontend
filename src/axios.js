import axios from "axios";


const instance = axios.create({
    baseURL: 'https://blog-backend-production-37d2.up.railway.app'
})

instance.interceptors.request.use((config)=>{
    config.headers.Authorization = localStorage.getItem("token")
    return config;
})


export default instance