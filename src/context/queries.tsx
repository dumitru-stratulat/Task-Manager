import axios from 'axios';
import { axiosConfig } from '../utils/axiosConfig'

export const getUserInfo = async () => {
    try {

        const response = await axios.get(`http://46.101.172.171:8008/users/by_token/`,
            await axiosConfig
        );

        console.log(response.data)
        return response.data;
    } catch (err) {
        console.log('Error', err);
    }
}