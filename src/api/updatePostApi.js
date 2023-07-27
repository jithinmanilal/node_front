import axios from 'axios';

const updatePostApi = async (postId, content, postImage, fetchData) => {
  try {
    const accessToken = localStorage.getItem('access_token');

    const formData = new FormData();
    if (content) formData.append('content', content);
    if (postImage) formData.append('post_img', postImage);

    const response = await axios.post(`http://localhost:8000/post/update-post/${postId}/`, formData, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      console.log('Post updated successfully');
      if (fetchData) {
        fetchData(); 
      }
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default updatePostApi;
