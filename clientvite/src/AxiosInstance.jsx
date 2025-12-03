import axios from 'axios'


const baseURL =import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance = axios.create(
    {
        baseURL :baseURL,
        headers:{
            'Content-Type':'application/json'
        }

    }
)


//request interceptors
axiosInstance.interceptors.request.use(
    function(config){
        console.log('request without header=>>>',config)
        const accessToken = localStorage.getItem('accessToken')
        // console.log('accesstoken :', accessToken)
        if (accessToken){
            config.headers['Authorization']= `Bearer ${accessToken}` 
        }
        // console.log('request with header (axios instance)=>>>',config)

        return config
    },
    function(error){
        console.log('axios instance function error')
        return Promise.reject(error)
    }
)

// response interceptors
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    }, 
    //handle failed responses
    async function(error){
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest.retry  ){

            // This prevents infinite loops in case of persistent authentication issues.
            originalRequest.retry  = true    
            const refreshToken = localStorage.getItem('refreshToken')            
            try{
                const response = await axiosInstance.post('token/refresh/', {refresh: refreshToken}   )

                console.log('to replace response new :', response.data.access)
                
                localStorage.setItem('accessToken',response.data.access)
                originalRequest.headers['Authorization']= `Bearer ${response.data.accessToken}`
                return axiosInstance(originalRequest)

            }catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')                
                
            }
          }
        return Promise.reject(error  );
    }
)


export default axiosInstance