import axios from 'axios';

const createPostApi = async (content, postImage) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    formData.append('content', content);
    formData.append('post_img', postImage);

    const response = await axios.post('http://localhost:8000/post/create-post/', formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default createPostApi;

