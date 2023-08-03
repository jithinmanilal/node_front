import React, { useEffect, useState } from 'react';
import AdminSideBar from '../components/AdminSideBar';

import postapi from '../api/postapi';
import deletePostApi from '../api/deletePostApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostsManagement = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await postapi();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await deletePostApi(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success('Post Deleted successfully!', {
        position: "top-right",
        theme: "dark",
    });
    } catch (error) {
      toast.error('Failure, post not deleted!', {
        position: "top-right",
        theme: "dark",
      });
    }
  };
  

  return (
    <AdminSideBar>
      <div className="mx-auto">
        <h1 className='text-center text-xl public font-bold'>Posts Management</h1>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Post image</th>
              <th className="px-4 py-2">Post Description</th>
              <th className="px-4 py-2">Post User</th>
              <th className="px-4 py-2">Report</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-2">
                  <img className="rounded-full w-12" src={post.post_img} alt="Post" />
                </td>
                <td className="px-4 py-2 max-w-[200px] truncate">
                  {post.content}
                </td>
                <td className="px-4 py-2">
                  {post.author.first_name} {post.author.last_name}
                </td>
                <td className="px-4 py-2">{ post.reports_count === 0 ? '-': `Reported by ${post.reports_count} users` }</td>
                <td className="px-4 py-2">{post.author.email}</td>
                <td className="px-4 py-2">
                  <button
                    type="button"
                    className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64]"
                    style={{backgroundColor:'crimson'}}
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      < ToastContainer />
    </AdminSideBar>
  );
};

export default PostsManagement;
