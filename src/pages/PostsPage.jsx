import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import postapi from '../api/postapi';
import likePostApi from '../api/likePostApi';
import deletePostApi from '../api/deletePostApi';
import followUserApi from '../api/followUserApi';
import reportPostApi from '../api/reportPostApi';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PostsLayout from '../components/PostsLayout';
import PostsModal from '../components/PostsModal';
import Comments from '../components/Comments';
import CommentsModal from '../components/CommentsModal';


const Dropdown = ({ post, handleDeletePost, handleUpdatePost, handleReportPost }) => {
  const { user } = useSelector(state => state.user);
  const [showMenu, setShowMenu] = useState(false);
  
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const menuOptions = post.author.email === user.email ? [{ label: 'Delete' }, { label: 'Update' }] : [{ label: 'Report' }];

  return (
    <div className="relative raleway text-sm font-bold inline-block">
      <button
        type="button"
        className="inline-block mr-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#4b2848]]"
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={handleMenuClick}
      >
        <span className="material-symbols-outlined">more_vert</span>
      </button>
      {showMenu && (
        <div className="absolute right-0 top-0 mt-10 mr-2 bg-white text-[#4b2848] rounded-md shadow-lg">
          {menuOptions.map((menuItem) => (
            <div
              key={menuItem.label}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (menuItem.label === 'Delete') {
                  handleDeletePost(post.id);
                  handleMenuClick();
                } else if (menuItem.label === 'Update') {
                  handleUpdatePost(post.id);
                  handleMenuClick();
                } else if (menuItem.label === 'Report') {
                  handleReportPost(post.id);
                  handleMenuClick();
                }
              }}
            >
              {menuItem.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PostsPage = () => {
  const { loading, user } = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await postapi();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (user) {
      fetchData();
    } 
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent h-8 w-8 align-[0.125em] text-danger" role="status">
          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0" style={{ clip: 'rect(0,0,0,0)' }}>Loading...</span>
        </div>
      </div>
    );
  }

  
  const handleDeletePost = async (postId) => {
    try {
      await deletePostApi(postId, fetchData);
      toast.success('Post Deleted successfully!', {
        position: "top-center",
      });
    } catch (error) {
      toast.error('Failure, Post not Deleted!', {
        position: "top-center",
      });
    }
  };
  
  const handleUpdatePost = (postId) => {
    setShowModal(true);
    setPostId(postId); 
  };

  const handleReportPost = async (postId) => {
    try {
      await reportPostApi(postId, fetchData);
      toast.success('Post Reported successfully!', {
        position: "top-center",
      });
    } catch (err) {
      toast.error('Failure, Post not Reported!', {
        position: "top-center",
      });
    }
  };
  
  const closeModal = () => {
    setShowModal(false);
    setPostId(null);
  };

  const handleClickComments = (postId, comments) => {
    setComments(comments);
    setPostId(postId);
    setShowCommentsModal(true);
  }

  const closeCommentsModal = () => {
    setShowCommentsModal(false);
    setPostId(null);
  };

  const handleToggleLikePost = async (postId) => {
    try {
      await likePostApi(postId, fetchData);
      toast.success('Post Like toggled successfully!', {
        position: "top-center",
      });
    } catch (error) {
      toast.error('Failure, Post not Liked!', {
        position: "top-center",
      });
    }
  };

  const handleToggleFollow = async (userId) => {
    try {
      await followUserApi(userId, fetchData);
      toast.success('User follow toggled successfully!', {
        position: "top-center",
      });
    } catch (error) {
      toast.error('Failure, User not Followed!', {
        position: "top-center",
      });
    }
  };

  const fetchData = async () => {
    try {
      setPosts([]);
      const data = await postapi();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const profileView = (email) => {
    navigate(`/profile/${email}`);
  }

  return (
    <PostsLayout title="NextNode | Home" content="Home page">
      <PostsModal isVisible={showModal} onClose={closeModal} postId={postId} />
      <div className="mt-28 rajdhani">
        {posts ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="block rounded-lg w-11/12 lg:w-5/6 min-w-min mx-auto mt-2 mb-2 p-2 text-[#4b2848] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-[#f8eeeb]"
            >
              <div
                className="relative overflow-hidden bg-cover bg-no-repeat"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <h5 onClick={() => profileView(post.author.email)} className="mb-2 ms-2 mt-2 text-xl font-bold cursor-pointer leading-tight text-[#4b2848]">
                      {post.author.first_name} {post.author.last_name}
                    </h5>
                    {post.author.email !== user.email &&
                      (post.followers &&
                      post.followers.some(
                        (follower) => follower.follower === user.email
                      ) ? (
                        <>
                          {/* <button
                          type="button"
                          className="inline-block ml-2 rounded-full bg-transparent justify-start px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title='Unfollow'
                          onClick={() => handleToggleFollow(post.author.id)}
                        >
                          <span class="material-symbols-outlined">person_remove</span>
                        </button> */}
                          <p title='Following' className='text-xs border-2 rounded-md m-2 p-1'> Following</p>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="inline-block ml-2 rounded-full bg-transparent justify-start px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          title="Follow"
                          onClick={() => handleToggleFollow(post.author.id)}
                        >
                          <span class="material-symbols-outlined">
                            person_add
                          </span>
                        </button>
                      ))}
                  </div>

                  <div className="text-[#4b2848]">
                    <Dropdown
                      post={post}
                      handleDeletePost={handleDeletePost}
                      handleUpdatePost={handleUpdatePost}
                      handleReportPost={handleReportPost}
                    />
                  </div>
                </div>
                <img
                  className="rounded-lg mx-auto"
                  src={post.post_img}
                  alt=""
                />
              </div>
              <div className="p-6">
                <p className="mb-4 text-lg raleway text-left font-semibold tooltip text-[#4b2848] ">{post.content}</p>
                <div className="flex items-center mb-4">
                  <p className="mr-2 raleway text-base">
                    Likes: &nbsp; <span className='tektur'>{post.likes_count ?? 0}</span> &nbsp;
                  </p>

                  {post.likes.includes(user.id) ? (
                    <button
                      type="button"
                      className="inline-block mr-2 rounded-full bg-[#4b2848] text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => handleToggleLikePost(post.id, true)}
                    >
                      <span className="material-symbols-outlined">
                        thumb_up
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-block mr-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      onClick={() => handleToggleLikePost(post.id, true)}
                    >
                      <span className="material-symbols-outlined">
                        thumb_up
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <div className="text-lg flex ms-6">
                  <strong
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClickComments(post.id, post.comments)}
                  >
                    Comments:
                  </strong>
                </div>
                <Comments comments={post.comments} />
              </div>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
      <CommentsModal
        key={postId}
        postId={postId}
        isVisible={showCommentsModal}
        onClose={closeCommentsModal}
        comments={comments}
      />
      <ToastContainer />
    </PostsLayout>
  );
};

export default PostsPage;
