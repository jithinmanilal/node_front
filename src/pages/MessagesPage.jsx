import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PostsLayout from "../components/PostsLayout";
import contactListApi from "../api/contactListApi";
import createChatRoomApi from "../api/createChatRoomApi";
import getChatMessages from "../api/getChatMessages";

const MessagesPage = () => {
  const { user } = useSelector((state) => state.user);
  const [profiles, setProfiles] = useState([]);
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await contactListApi();
        setProfiles(result);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]); // Add new message to messages state
      };
    }
  }, [ws]);

  const handleSendMessage = () => {
    if (ws && inputMessage.trim() !== "") {
      ws.send(JSON.stringify({ message: inputMessage })); // Send message to WebSocket server
      setInputMessage(""); // Clear input
    }
  };

  const joinChatroom = async (userId) => {
    try {
      const data = await createChatRoomApi(userId);
      const accessToken = localStorage.getItem("access_token");
      const websocketProtocol =
        window.location.protocol === "https:" ? "wss://" : "ws://";
      const wsUrl = `${websocketProtocol}localhost:8000/ws/chat/${data.id}/?token=${accessToken}`;
      const newChatWs = new WebSocket(wsUrl);

      newChatWs.onopen = async () => {
        console.log("Chatroom WebSocket connection opened.");
        // Fetch previous messages when the WebSocket connection is opened
        const previousMessages = await getChatMessages(data.id);
        setMessages(previousMessages);
      };
      newChatWs.onclose = () => {
        console.log("Chatroom WebSocket connection closed.");
        // You can perform any necessary cleanup here when the WebSocket connection is closed.
      };
      newChatWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        // Handle incoming messages from the chatroom WebSocket
      };

      setWs(newChatWs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostsLayout>
      <div className="flex h-screen bg-[#4b2848] p-2">
        {/* <div class="w-3/5 p-4 mt-20 m-2 overflow-y-auto bg-[#f8eeeb]">
          {messages.map((message, index) => (
            <div key={index} class="mb-2">
              {message.message}
            </div>
          ))}

          <div class="flex mt-4">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              class="w-full p-2 bg-gray-100 rounded-lg focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              class="bg-blue-500 px-4 py-2 ml-2 rounded-lg text-white"
            >
              Send
            </button>
          </div>
        </div> */}
        <div class="flex flex-col flex-grow w-3/5 mt-20 p-1 m-2 bg-white shadow-xl rounded-lg overflow-hidden">
          <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map((message, index) =>
              message.sender_email === user.email ? (
                <div key={index} class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                  <div>
                    <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p class="text-sm">{ message.message ? message.message : message.content }</p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                    { message.created } ago
                    </span>
                  </div>
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                </div>
              ) : (
                <div key={index} class="flex w-full mt-2 space-x-3 max-w-xs">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                  <div>
                    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <p class="text-sm">{ message.message ? message.message : message.content }</p>
                    </div>
                    <span class="text-xs text-gray-500 leading-none">
                      { message.created } ago
                    </span>
                  </div>
                </div>
              )
            )}
            <div class="flex-grow"></div> 
            <div class="bg-[#f2dfcf] p-4 rounded-xl">
              <div class="relative flex w-full flex-wrap items-stretch">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-[#4b2848] bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  aria-describedby="button-addon1"
                />
                <button
                  class="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-[#4b2848] shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                  type="button"
                  onClick={handleSendMessage}
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <span class="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 mt-20 p-1 m-2 overflow-y-auto bg-white rounded-lg">
          {profiles
            ? profiles.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => joinChatroom(profile.id)}
                  class="flex items-center rounded-lg m-1 cursor-pointer bg-[#f2dfcf] p-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)"
                >
                  <img
                    class="w-14 rounded-full mr-2"
                    src={profile.profile_image}
                    alt="profile"
                  />
                  <div>
                    <h5 class="mb-1 text-sm font-medium leading-tight text-neutral-800">
                      {profile.first_name} {profile.last_name}
                    </h5>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </PostsLayout>
  );
};

export default MessagesPage;
