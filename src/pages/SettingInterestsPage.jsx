import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import getTagsApi from "../api/getTagsApi";
import updateInterestsApi from "../api/updateInterestsApi";

import Layout from "../components/Layout";

const SettingInterestsPage = () => {
  const { user } = useSelector((state) => state.user);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const data = await getTagsApi();
        setTags(data.tags);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleTagChange = (tag) => {
    const isSelected = selectedTags.includes(tag);

    if (isSelected) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const sendSelectedTags = async () => {
    try {
      await updateInterestsApi(selectedTags);
      setSelectedTags([]);
      toast.success("Interests updated successfully!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error sending selected tags:", error);
    }
  };

  return (
    <Layout>
      <main className="flex-1">
        <div className="relative mx-auto px-8 mt-16">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-[#4b2848]">
                Settings
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                <div className="lg:hidden">
                  <label for="selected-tab" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                  >
                    <option >Manage Posts</option>

                    <option selected>Profile</option>
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      <Link to={'/settings'} className="border-transparent cursor-pointer text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" >
                        {" "}
                        Manage Posts{" "}
                      </Link>

                      <p className="border-purple-500 cursor-pointer text-purple-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                        {" "}
                        Profile{" "}
                      </p>
                    </nav>
                  </div>
                </div>

                <div className="mt-10 divide-y divide-gray-200">
                  <div className="space-y-1">
                    <h3 className="text-lg leading-6 font-medium text-[#4b2848]">
                      Posts
                    </h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      Manage your posts.
                    </p>
                  </div>
                  <div className="mt-6">
                    <form onSubmit={sendSelectedTags}>
                      <h2 className="text-[#4b2848] text-lg">
                        Select Your Interests
                      </h2>
                      <div className="flex flex-wrap text-gray-500">
                        {tags && tags.length > 0 ? (
                          tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="flex items-center mr-4 mb-2"
                            >
                              <input
                                type="checkbox"
                                id={tag.id}
                                value={tag.name}
                                checked={selectedTags.includes(tag.name)}
                                onChange={() => handleTagChange(tag.name)}
                                className="mr-1"
                              />
                              <label
                                htmlFor={tag.id}
                                className="text-gray-500 ml-1"
                              >
                                {tag.name}
                              </label>
                            </span>
                          ))
                        ) : (
                          <p>No tags available.</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="mt-4 bg-[#4b2848] text-white px-4 py-2 border-white border rounded hover:bg-blue-700"
                      >
                        Save Interests
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </Layout>
  );
};

export default SettingInterestsPage;
