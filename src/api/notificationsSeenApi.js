import axios from 'axios';

const notificationsSeenApi = async (notificationId) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    let body = {}

    const response = await axios.post(`http://localhost:8000/post/notifications-seen/${notificationId}/`, body, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
        return response.data
    } else {
      return response.error
    }
  } catch (error) {
    return error
  }
};

export default notificationsSeenApi;
