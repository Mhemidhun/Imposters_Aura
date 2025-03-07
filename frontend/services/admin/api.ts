
// * admin api
import axios from "axios"



// * Error Handler

export const handleAxiosError = (error: any) => {
    console.log(error)
    console.error('API Error:', error);
    if ((error?.response?.status==403 || error?.response?.status==401 || error.data?.isBlock) && error?.response?.data?.middleware) {
            window.location.replace('/admin/login')
            const errorMessage = error?.response?.data?.message || error?.response?.data?.message || "Unexpected error occurred.";
            return new Error(errorMessage);
        }

    const errorMessage = error?.response?.data?.errorMessage || error?.response?.data?.message || "Unexpected error occurred.";
    console.log(errorMessage)

    return new Error(errorMessage);
};

export const axiosInstance = axios.create({
    baseURL : `http:localhost:4000/api/admin-service`,
    headers : {
        "Content-Type" : "application/json"
    },
    withCredentials : true,
})

export const loginAPI = async (data:{email:string,password:string})=>{
    try {
        const response = await axiosInstance.post('/admin/login',data)
        return response
    } catch (error:unknown) {
        console.log(error)   
    }
}