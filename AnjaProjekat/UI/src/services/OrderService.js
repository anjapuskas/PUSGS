import axiosInstance from './AxiosService';

export const AddOrder = async (request) => {
    try {  
        const response = await axiosInstance.post(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/orders/add`, request);
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};

export const GetAllOrders = async (id) => {
    try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/orders/${id}`);
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};

export const CancelOrder = async (id) => {
    try {
        const response = await axiosInstance.post(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/orders/cancel/${id}`);
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};