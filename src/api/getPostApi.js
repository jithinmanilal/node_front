import axios from 'axios';
import { BASE_URL } from '../config';

const getPostApi = async (postId) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(`${BASE_URL}/post/view/${postId}/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if  (response.status === 200) {
        return response.data;
    } else {
        console.log(response.error)
    }
  } catch (error) {
    console.error(error);
  }
};

export default getPostApi;