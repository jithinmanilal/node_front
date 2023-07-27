import React, { useState } from "react";
import { toast } from 'react-toastify';
import updatePostApi from "../api/updatePostApi";

const UpdateProfileModal = ({ isVisible, onClose }) => {
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  if (!isVisible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await updatePostApi( content, postImage);
        onClose();
        toast.success('Post Updated successfully!', {
          position: "top-center",
        });
      } catch (error) {
        toast.error('Failure, Post not Updated!', {
          position: "top-center",
        });
    }
  };

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-50 z-10 backdrop:blur-md flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          onClick={onClose}
          className="text--white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-[#4b2848] p-2 karla rounded">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                for="formFileSm"
                className="mb-2 inline-block text-grey-700 text-lg dark:text-neutral-200"
              >
                Update Profile
              </label>
              <div className="pt-2 text-white flex items-start">
                <label for="formFileSm" className="ms-4 cursor-pointer">
                  <span className="material-symbols-outlined">Select profile image to upload.</span>
                  <input
                    class="hidden"
                    id="formFileSm"
                    onChange={(e) => setPostImage(e.target.files[0])}
                    type="file"
                  />
                </label>
              </div>
            </div>
            <div className="relative p-2 mb-3" data-te-input-wrapper-init>
              <textarea
                className="peer block min-h-[auto] w-full rounded border bg-transparent te px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                id="exampleFormControlTextarea1"
                rows="3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ borderBlockColor: "white" }}
                placeholder="Write Description"
              ></textarea>
              <label
                for="exampleFormControlTextarea1"
                className="pointer-events-none nunito text-sm absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
                Description
              </label>
            </div>
            <button
              type="submit"
              className="inline-block rounded-full bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white border"
            >
              <span class="material-symbols-outlined">
                upload
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
