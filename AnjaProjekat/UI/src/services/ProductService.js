import axiosInstance from './AxiosService';

export const AddProduct = async (request) => {
    try {
        const url = `${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}`
    
        const response = await axiosInstance.post(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/products/add`, request);
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};
