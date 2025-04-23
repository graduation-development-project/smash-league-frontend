import axios from "axios";

export const getBankListAPI = async () => {
    try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/banks`
        );
    
        return response;
      } catch (error: any) {
        console.error(
          'Error remove registration :',
          error.response?.data || error.message,
        );
        return error.response?.data;
      }
}

export const addBankAccountAPI = async (data: any, accessToken: string) => {
    try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/add-bank-account`,
    
         data,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
    
        return response;
      } catch (error: any) {
        console.error(
          'Error add bank account :',
          error.response?.data || error.message,
        );
        return error.response?.data;
      }
}