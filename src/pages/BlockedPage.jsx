import React, { useEffect, useState } from 'react';
import AdminSideBar from '../components/AdminSideBar';

import blockedPostsApi from '../api/blockedPostsApi';
import PostPageModal from '../components/PostPageModal';


const BlockedPage = () => {
  const [posts, setPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await blockedPostsApi();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); 

  const handlePostClick = (postId) => {
    setPostId(postId);
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
    setPostId(null);
  };

  return (
    <AdminSideBar>
      <PostPageModal isVisible={showPostModal} onClose={closePostModal} postId={postId}/>
      <div className="mx-auto">
        <h1 className='text-center text-xl public font-bold'>Blocked Posts</h1>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Post image</th>
              <th className="px-4 py-2">Post Description</th>
              <th className="px-4 py-2">Post User</th>
              <th className="px-4 py-2">Report</th>
              <th className="px-4 py-2">User Email</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-2">
                  <img className="rounded-full cursor-pointer w-12" src={post.post_img} onClick={()=>handlePostClick(post.id)} alt="Post" />
                </td>
                <td className="px-4 py-2 max-w-[200px] truncate">
                  {post.content}
                </td>
                <td className="px-4 py-2">
                  {post.author.first_name} {post.author.last_name}
                </td>
                <td className="px-4 py-2">{ post.reports_count === 0 ? '-': `Reported by ${post.reports_count} users` }</td>
                <td className="px-4 py-2">{post.author.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminSideBar>
  );
};

export default BlockedPage;
