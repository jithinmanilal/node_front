import axios from 'axios';

const reportPostApi = async (postId, fetchData) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    let body = {}
    const response = await axios.post(`http://localhost:8000/post/report/${postId}/`,body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    if (response.status === 200) {
      console.log('Post reported successfully');
      if (fetchData) {
          fetchData(); 
        }
        return response.data
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default reportPostApi;
