import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import getNotificationsApi from '../api/getNotificationsApi';
import notificationsSeenApi from '../api/notificationsSeenApi';
import { useNavigate } from 'react-router-dom';

const NotificationDropdown = ({ toggleNotification, updateCount }) => {
    const { user } = useSelector(state => state.user);
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNotificationsApi();
                setNotes(data);
            } catch (error) {
                console.error(error);
            }
        };
        if (user) {
            fetchData();
        }
        // const intervalId = setInterval(() => {
        //     if (user) {
        //         fetchData();
        //     }
        // }, 5 * 1000);
        // return () => clearInterval(intervalId);
    }, [user]);

    useEffect(() => {
        updateCount(notes.length);
      }, [notes, updateCount]);

    const getNotificationMessage = (notification) => {
        const { notification_type, post, comment } = notification;
      
        if (post) {
          if (notification_type === "like") {
            return "liked your post";
          } else if (notification_type === "comment") {
            return "commented on your post";
          } else if (notification_type === "post") {
            return "created a new post";
          }
        } else if (comment) {
          if (notification_type === "comment") {
            return "replied to your comment";
          }
        }
      
        return "has started following you";
    };

    const onClick = async (notificationId, email) => {
        try {
            await notificationsSeenApi(notificationId)
            toggleNotification();
            navigate(`/profile/${email}` );
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = (e) => {
        if (e.target.id === "wrapper") toggleNotification();
    };

    return (
        <div id="wrapper" onClick={handleClose}>
            <div>
                <ul
                    className="absolute left-auto right-48 z-[10] float-left m-0 mt-7 min-w-max list-none overflow-hidden rounded-lg border-none bg-white text-[#4d2c4d] bg-clip-padding text-left text-base shadow-lg [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenuButton1"
                    data-te-dropdown-menu-ref
                >
                    {notes && notes.length > 0 ? (
                        notes.map((note, index) => (
                            <li key={index}>
                                <p
                                    className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm public hover:bg-neutral-100 active:no-underline cursor-pointer"
                                    onClick={() => onClick(note.id, note.from_user.email)}
                                    data-te-dropdown-item-ref
                                >
                                    {note.from_user.first_name} {note.from_user.last_name} {" "} {getNotificationMessage(note)}
                                </p>
                            </li>
                        ))
                    ) : (
                            <li>
                                <p className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm public hover:bg-neutral-100 active:no-underline"
                                >No notifications</p>
                            </li>
                        )}
                </ul>

            </div>
        </div>
    )
}

export default NotificationDropdown;
