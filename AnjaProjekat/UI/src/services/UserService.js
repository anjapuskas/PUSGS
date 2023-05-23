import axiosInstance from './AxiosService';

export const Login = async (request) => {
    try {
        const url = `${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}`
        const response = await axiosInstance.post(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/users/login`, request);
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};

export const Home = async () => {
    console.log("Pozzz");
    try {
        const url = `${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}`
    
        const response = await axiosInstance.get(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/users/home`);
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};