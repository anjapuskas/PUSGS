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
    try {
        const url = `${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}`
    
        const response = await axiosInstance.get(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/users/home`);
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};

export const Register = async (request) => {
    try {
        const url = `${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}`
    
        const response = await axiosInstance.post(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/users/register`, request);
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};

export const Profile = async (request) => {
    try {
        const url = `${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}`
    
        const response = await axiosInstance.put(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/users/profile`, 
        request,
        {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};

export const ProfileImage = async (id) => {
    try {
        const url = `${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}`
    
        const response = await axiosInstance.get(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/users/profile/image/${id}`, 
        {
            responseType: "blob"
        }
        );
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};