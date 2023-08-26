import React, { useEffect, useState } from 'react';
import PostsLayout from '../components/PostsLayout';
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import myNetworkApi from '../api/myNetworkApi';
import followUserApi from '../api/followUserApi';
import followingApi from '../api/followingApi';
import { Link, useNavigate } from 'react-router-dom';

const MyNetworksPage = () => {
  const { user, isAuthenticated } = useSelector(state => state.user);
  const [follows, setFollows] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const itemsPerPage = 4;
  const [currentPageProfiles, setCurrentPageProfiles] = useState(1);
  const [currentPageFollows, setCurrentPageFollows] = useState(1);

  const profilesStartIndex = (currentPageProfiles - 1) * itemsPerPage;
  const profilesEndIndex = currentPageProfiles * itemsPerPage;

  const followsStartIndex = (currentPageFollows - 1) * itemsPerPage;
  const followsEndIndex = currentPageFollows * itemsPerPage;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await myNetworkApi();
        setFollows(data);
        const result = await followingApi();
        setProfiles(result); 
      } catch (error) {
        console.error(error);
      }
    };
  
    if (user) {
      fetchData();
    } 
  }, [user]);

  const fetchData = async () => {
    try {
      const data = await myNetworkApi();
      setFollows(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFollow = async (userId) => {
    try {
      await followUserApi(userId, fetchData);
      toast.success('User Follow toggled successfully!', {
        position: "top-center",
      });
    } catch (error) {
      toast.error('Failure, User Follow not toggled!', {
        position: "top-center",
      });
    }
  };

  const handleConfirm = (userId, person) => {
    const userConfirmed = window.confirm(`Are you sure you want to unfollow ${person}?`);
    if (userConfirmed) {
      handleToggleFollow(userId);
    }
  };

  if (!isAuthenticated) {
    navigate('/');
};

  return (
    <PostsLayout title='NextNode | NetworkPage' content='Network page'>
      <h2 className="mt-28 text-[#4b2848]">People you may know:</h2>
      <div className="mt-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {follows ? (
          follows.slice(followsStartIndex, followsEndIndex).map((follow) => (
            <div key={follow.id} class="block rounded-lg w-60 m-2 p-2 mx-auto md:mx-2 bg-[#f8eeeb] text-[#4b2848] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              <Link to={ `/profile/${follow.email}` }>
                <img class="rounded-full w-1/2 mx-auto" src={follow.profile_image} alt="Profile" />
              </Link>
              <div class="p-2">
                <h5 class="mb-1 text-xl font-medium leading-tight">
                  {follow.first_name}
                </h5>
                <h5 class="mb-1 text-xl font-medium leading-tight">
                  {follow.last_name}
                </h5>
                <button
                    type="button"
                    className="inline-block ml-2 rounded-full bg-[#4b2848] text-white justify-start px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    title="Follow"
                    onClick={() => handleToggleFollow(follow.id)}
                  >
                    <span class="material-symbols-outlined">person_add</span>
                </button>
              </div>
            </div>
          ))
        ) : null}
        {follows.length === 0 ? <h4 className='text-center raleway'> No Profiles to Follow</h4> : null}
      </div>
      <div className="pagination text-[#4b2848]">
        <button
          onClick={() => setCurrentPageFollows(currentPageFollows - 1)}
          disabled={currentPageFollows === 1}
        >
          Previous&nbsp;
        </button>
        <button
          onClick={() => setCurrentPageFollows(currentPageFollows + 1)}
          disabled={followsEndIndex >= follows.length}
        >
          Next
        </button>
      </div>
      
      <h2 className="mt-8 text-[#4b2848]">Following:</h2>
      <div className="mt-2" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {profiles ? (
          profiles.slice(profilesStartIndex, profilesEndIndex).map((follow) => (
            <div class="block rounded-lg w-60 m-2 p-2 mx-auto md:mx-2 bg-[#f8eeeb] text-[#4b2848] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
              <Link to={ `/profile/${follow.email}` }> 
                <img class="rounded-full w-1/2 mx-auto" src={follow.profile_image} alt="Profile" />
              </Link>
              <div class="p-2">
                <h5 class="mb-1 text-xl font-medium leading-tight">
                  {follow.first_name}
                </h5>
                <h5 class="mb-1 text-xl font-medium leading-tight">
                  {follow.last_name}
                </h5>
                <button
                    type="button"
                    className="inline-block ml-2 rounded-full bg-[#4b2848] text-white justify-start px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    title="Unfollow"
                    onClick={() => handleConfirm(follow.id, follow.first_name)}
                  >
                    <span class="material-symbols-outlined">person_remove</span>
                </button>
              </div>
            </div>
          ))
        ) : null}
        {profiles.length === 0 ? <h4 className='text-center raleway'> Not Following anyone yet</h4> : null}
      </div>
      <div className="pagination text-[#4b2848]">
        <button
          onClick={() => setCurrentPageProfiles(currentPageProfiles - 1)}
          disabled={currentPageProfiles === 1}
        >
          Previous&nbsp;
        </button>
        <button
          onClick={() => setCurrentPageProfiles(currentPageProfiles + 1)}
          disabled={profilesEndIndex >= profiles.length}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </PostsLayout>
  )
}

export default MyNetworksPage;