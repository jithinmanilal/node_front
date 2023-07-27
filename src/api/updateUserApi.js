import axios from 'axios';

const updateUserApi = async (content, postImage) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    if (content) formData.append('content', content);
    if (postImage) formData.append('post_img', postImage);

    const response = await axios.post(`http://localhost:8000/api/users/update/`, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      console.log('Post updated successfully');
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default updateUserApi;
