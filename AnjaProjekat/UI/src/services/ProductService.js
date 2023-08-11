import axiosInstance from './AxiosService';

export const AddProduct = async (request) => {
    try {  
        const response = await axiosInstance.post(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/products/add`, request,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};

export const GetAllProducts = async () => {
    try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_BACKEND_APPLICATION_ENDPOINT}/products`);
        return response.data;
    } catch (error) {
     throw new Error(error.response.data.error);
    }
};