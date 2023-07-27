import axios from 'axios';

const getProfileApi = async (email) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const body = {}

    const response = await axios.post(`http://localhost:8000/post/profile/${email}/`, body, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
        return response.data;
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default getProfileApi;
