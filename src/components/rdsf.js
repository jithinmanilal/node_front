<div
  id="wrapper"
  className="fixed inset-0 bg-black bg-opacity-50 z-10 p-2 backdrop:blur-md flex justify-center items-center"
  onClick={handleClose}
>
  <div className="flex flex-col md:flex-row">
    <button onClick={onClose} className="text--white text-xl place-self-end">
      X
    </button>
    <div className="w-full md:w-2/4">
      <div
        className="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h5
              onClick={() => profileView(post?.author.email)}
              className="mb-2 ms-2 mt-2 text-xl font-bold cursor-pointer leading-tight text-[#4b2848]"
            >
              {post?.author.first_name} {post?.author.last_name}
            </h5>
            {post?.author.email !== user.email &&
              (post?.followers &&
              post?.followers.some(
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
                  <p
                    title="Following"
                    className="text-xs border-2 rounded-md m-2 p-1"
                  >
                    {" "}
                    Following
                  </p>
                </>
              ) : (
                <button
                  type="button"
                  className="inline-block ml-2 rounded-full bg-transparent justify-start px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  title="Follow"
                  onClick={() => handleToggleFollow(post?.author.id)}
                >
                  <span class="material-symbols-outlined">person_add</span>
                </button>
              ))}
          </div>
        </div>
        <img className="rounded-lg mx-auto" src={post?.post_img} alt="" />
      </div>
      <div className="p-6">
        <p className="mb-4 text-lg raleway text-left font-semibold tooltip text-[#4b2848] ">
          {post?.content}
        </p>
        <div className="flex items-center mb-4">
          <p className="mr-2 raleway text-base">
            Likes: &nbsp;{" "}
            <span className="tektur">{post?.likes_count ?? 0}</span> &nbsp;
          </p>

          {post?.likes.includes(user.id) ? (
            <button
              type="button"
              className="inline-block mr-2 rounded-full bg-[#4b2848] text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal]"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={() => handleToggleLikePost(post.id, true)}
            >
              <span className="material-symbols-outlined">thumb_up</span>
            </button>
          ) : (
            <button
              type="button"
              className="inline-block mr-2 rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={() => handleToggleLikePost(post.id, true)}
            >
              <span className="material-symbols-outlined">thumb_up</span>
            </button>
          )}
        </div>
      </div>
    </div>
    <div className="bg-gray-100 p-6 w-full md:w-1/4 ml-0 md:ml-4 mt-4 md:mt-0">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      <div className="flex flex-col space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold">John Doe</h3>
          <p className="text-gray-700 text-sm mb-2">Posted on April 17, 2023</p>
          <p className="text-gray-700">
            This is a sample comment. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </div>
        <form className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Add a comment</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="comment">
              Comment
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              rows="3"
              placeholder="Enter your comment"
            ></textarea>
          </div>
          <button
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</div>;
