import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import './notification-page.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationSearch, setNotificationSearch] = useState('');
  const [notificationFilter, setNotificationFilter] = useState('ALL');
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };



  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/notifications/all');
        const data = await response.json();

        const filteredNotifications = data.filter((notification) => {
          const searchPattern = new RegExp(notificationSearch, 'i');

          return (
            (notificationFilter === 'ALL' ||
              (notificationFilter === 'Transaction' && notification.type.includes('Fraud Transaction Detected!')) ||
              (notificationFilter === 'Account' && !notification.type.includes('Fraud Account Detected!'))) &&
            searchPattern.test(notification.message)
          );
        });

        setNotifications(filteredNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [notificationFilter, notificationSearch]);

  return (
    <>
      <div className="flex items-center">
        <div className="">
          <Sidebar className="w-96" />
        </div>
        <div className="notifications m-6 mb-8 py-8 pb-5 px-10">
          <div>
            <h1 className="text-3xl font-bold mb-5 text-indigo-600">Notifications</h1>
          </div>
          <div className="flex items-center mb-10">
            <input
              id="notificationSearch"
              name="notificationSearch"
              type="text"
              placeholder="Search "
              value={notificationSearch}
              onChange={(e) => setNotificationSearch(e.target.value)}
              className="py-1 px-5 border-solid border-y border-l rounded-l-md w-full"
            />
            <div className="px-2 py-2 border-solid border-y border-r rounded-r-md">
              <CiSearch className="" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="filter" className="mr-2">
              Filter by Type:
            </label>
            <select
              name="notificationFilter"
              id="notificationFilter"
              className="bg-indigo-600 text-white"
              value={notificationFilter}
              onChange={(e) => setNotificationFilter(e.target.value)}
            >
              <option value="ALL">ALL</option>
              <option value="Account">Transaction</option>
              <option value="Transaction">Account</option>
            </select>
          </div>
          <div className="w-full lists">
            {notifications.map((notification) => (
              <div key={notification.notification_id} className="w-full flex items-center border-solid border rounded-lg px-5 py-2 my-3">
                <div className="pb-10 mr-3 p-2">
                  <IoIosNotificationsOutline className="text-4xl text-indigo-600 border-indigo-600 border rounded-full" />
                </div>
                <div className="ml-2 w-full">
                  <h2 className="font-bold text-xl mb-3">{notification.message}</h2>
                  <div className="flex justify-between">
                    <h2 className="px-4 py-0.5 text-white rounded-lg bg-indigo-600 text-sm w-32 text-center">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </h2>
                    <button
                      className="px-4 py-0.5 text-white rounded-lg bg-indigo-600 text-sm w-32 text-center"
                      onClick={openModal} // Open the modal when the button is clicked
                    >
                      Check Model
                    </button>
                    {isModalOpen && (
                      <div className="modal">
                        {/* Add your modal content, you can style it accordingly */}
                        <div className="modal-content">
                          <img src="./images/image.png" alt="Model Check" />
                          <button onClick={closeModal}>Close</button>
                        </div>
                      </div>
                    )}
                  </div>
                  </div>
                  <p>
                    {notification.type.includes('Fraud_Transaction')
                      ? `Transaction ID: ${notification.transaction_id}`
                      : `Account ID: ${notification.customer_id}`}
                  </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;

