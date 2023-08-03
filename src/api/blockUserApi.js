import axios from 'axios';

const blockUserApi = async (postId) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    let body = {}
    const response = await axios.post(`http://localhost:8000/api/users/block/${postId}/`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
        return response.data
    }
  } catch (error) {
    return error
  }
};

export default blockUserApi;
