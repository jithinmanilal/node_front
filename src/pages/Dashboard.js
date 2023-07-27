import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostsLayout from '../components/PostsLayout';
import getProfileApi from '../api/getProfileApi';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const { user } = useSelector(state => state.user);
  const param = useParams();
  const email = param.email

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfileApi(email);
        setProfile(data.profile_user)
        setPosts(data.profile_posts);
      } catch (error) {
        console.error(error);
      }
    };  
    fetchData();
  }, [email]);

  return (
    <PostsLayout title='NextNode | Profile' content='Profile page'>
      <section className="pt-16 bg-blueGray-50">
          <div className="w-full lg:w-5/6 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      {profile && profile.profile_image && (
                        <img
                          src={`http://localhost:8000${profile.profile_image}`}
                          alt="Profile"
                          className="mt-4 h-auto rounded-full align-middle"
                          style={{ maxWidth: "200px" }}
                        />
                      )}
                    </div>
                    { profile?.email === user?.email ? (
                      <div className='mt-2 right-7 '>
                      <span class="material-symbols-outlined cursor-pointer">
                        tune
                      </span>
                    </div>
                    ) : "" }
                  </div>
                  <div className="w-full px-4 text-center mt-5">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          { profile?.follower_count ?? "" }
                        </span>
                        <span className="text-sm text-blueGray-400">Followers</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          { profile?.following_count ?? "" }
                        </span>
                        <span className="text-sm text-blueGray-400">Following</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          { profile?.total_posts ?? "" }
                        </span>
                        <span className="text-sm text-blueGray-400">Photos</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-5">
                  <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                  { profile?.first_name ?? "" } { profile?.last_name ?? "" }
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <span class="material-symbols-outlined">
                      location_on
                    </span>&nbsp;
                    { profile?.country ?? "India" }
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <span class="material-symbols-outlined">
                      work
                    </span>&nbsp;
                    Solution Manager
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <span class="material-symbols-outlined">
                      school
                    </span>&nbsp;
                    University of Computer Science
                  </div>
                </div>
                {/*<div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken
                        by Melbourne-raised, Brooklyn-based Nick Murphy
                        writes, performs and records all of his own music,
                        giving it a warm, intimate feel with a solid groove
                        structure. An artist of considerable range.
                      </p>
                    </div>
                  </div>
                </div>*/}
                <div className="flex justify-center flex-wrap">
                  {posts ? (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        className="p-2 border-t border-blueGray-200 text-center m-2"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      >
                        <div
                          style={{
                            width: '100%', height: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center',
                          }}
                        >
                          <img
                            src={`http://localhost:8000${post.post_img}`}
                            alt="post"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No posts available.</p>
                  )}
                </div>

              </div>
            </div>
          </div>
      </section>
    </PostsLayout>
  )
}

export default Dashboard