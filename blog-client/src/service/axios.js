import axios from 'axios'
import  { getData } from '../hook/useGetUser';

const Api = axios.create({
    baseURL:'http://localhost:3000',
    headers:{
        "Content-Type": 'application/json',
  
   },
   withCredentials: true
})
Api.interceptors.request.use(
    (config) => {
        const user = getData()
        console.log(user)
        if(user){
            config.headers.Authorization = user
        }
        return config
    },(error)=>{
        return Promise.reject(error);
    })
    Api.interceptors.response.use(
        response => {
          
            return response;
        },
        (error) => {
            if (error.response) {
                const { data } = error.response;
                console.log(data.message);
            } else {
                console.log(error);
            }
            return Promise.reject(error);
        },
    );
export default Api;