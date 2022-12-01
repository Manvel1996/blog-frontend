import axios from "axios";


const instance = axios.create({
    baseURL: 'mongodb+srv://Manvel:secret123@cluster0.aqc7djd.mongodb.net/?retryWrites=true&w=majority'
})

instance.interceptors.request.use((config)=>{
    config.headers.Authorization = localStorage.getItem("token")
    return config;
})


export default instance