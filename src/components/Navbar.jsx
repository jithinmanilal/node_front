import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../features/user";
import NotificationDropdown from "./NotificationDropdown";
import getNotificationsApi from "../api/getNotificationsApi";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [notification, setNotification] = useState([]);
  const email = isAuthenticated ? user?.email : "";

  const onClick = () => {
    dispatch(logout());
    navigate("/");
  };

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const toggleNotification = () => {
    setNotificationVisible(!isNotificationVisible);
  };

  const Menu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const removeNotification = (notificationIdToRemove) => {
    setNotification((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationIdToRemove
      )
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotificationsApi();
        setNotification(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const accessToken = localStorage.getItem("access_token");
      const websocketProtocol =
        window.location.protocol === "https:" ? "wss://" : "ws://";
      const socket = new WebSocket(`${websocketProtocol}18.212.154.34/ws/notification/?token=${accessToken}`);

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        console.log(newNotification);
        if (newNotification.type === 'notification') {
          setNotification((prevNotifications) => [...prevNotifications, newNotification.payload]);
        }
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed", event);
      };
      return () => {
        socket.close();
      };
    }
  }, [user]);

  const authLinks = (
    <ul
      className={`md:flex md:items-center z-[-1] md:z-auto right-0 md:justify-end md:static absolute w-full text-[#4d2c4d] bg-white ${
        isMenuVisible ? "block" : "hidden"
      }`}
    >
      <li className="mx-4 my-6 md:my-0 lg:pr-2">
        <Link to="/home" className="text-sm font-semibold leading-6">
          Home
        </Link>
      </li>
      <li className="mx-4 my-6 md:my-0 lg:pr-2">
        <Link to="/network" className="text-sm font-semibold leading-6">
          My Network
        </Link>
      </li>
      <li className="mx-4 my-6 md:my-0 lg:pr-2">
        <Link to="/messages" className="text-sm font-semibold leading-6">
          Messages
        </Link>
      </li>
      <li className="mx-4 my-6 md:my-0 lg:pr-2">
        <Link
          to={`/profile/${email}`}
          className="text-sm font-semibold leading-6"
        >
          Profile
        </Link>
      </li>
      <li className="mx-4 my-6 md:my-0 flex items-center relative lg:pr-2">
        <span
          onClick={toggleNotification}
          className="text-sm font-semibold leading-6 cursor-pointer"
        >
          <span class="material-symbols-outlined">notifications</span>
          <span
            className={`text-xs text-blue-700 align-top${
              notification.length === 0
                ? ""
                : "border border-black align-top rounded-full"
            }`}
          >
            {" "}
            {notification.length === 0 ? "" : notification.length}{" "}
          </span>
        </span>
        {isNotificationVisible && (
          <NotificationDropdown
            toggleNotification={toggleNotification}
            notes={notification}
            removeNotification={removeNotification}
          />
        )}
      </li>
      <li className="mx-4 my-6 md:my-0 flex items-center lg:pr-2">
        <p
          href="#"
          onClick={onClick}
          style={{ cursor: "pointer" }}
          className="text-sm font-semibold leading-6"
        >
          <span class="material-symbols-outlined">logout</span>
        </p>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul
      className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 text-[#4d2c4d] bg-white ${
        isMenuVisible ? "block" : "hidden"
      }`}
    >
      <li className="mx-4 my-6 md:my-0 lg:pr-2">
        <Link to="/about" className="text-sm font-semibold leading-6">
          About
        </Link>
      </li>
      <li className="mx-4 my-6 md:my-0 lg:pr-2">
        <Link to="#" className="text-sm font-semibold leading-6">
          Contact Us
        </Link>
      </li>
      {/* <li className="mx-4 my-6 md:my-0 lg:pr-2">
        <Link to="/" className="text-sm font-semibold leading-6">
          Login
        </Link>
      </li> */}
    </ul>
  );

  return (
    <nav
      className="fixed top-0 w-full bg-white z-50 max-w-full md:h-20 md:flex md:items-center md:justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex justify-between items-center">
        <Link to="/" className="-m-1.5 p-1.5">
          <span className="sr-only">NextNode</span>
          <img
            className="h-9 w-auto rounded-full"
            src="/NextNode.png"
            alt="NextNode"
          />
        </Link>
        <span
          onClick={Menu}
          className="material-symbols-outlined text-2xl cursor-pointer md:hidden block"
        >
          menu
        </span>
      </div>

      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;
