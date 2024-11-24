import axios from 'axios'

const Api = axios.create({
    baseURL:'https://blog.molla.cfd',
    headers:{
        "Content-Type": 'application/json',
  
   },
   withCredentials: true
})
export default Api;