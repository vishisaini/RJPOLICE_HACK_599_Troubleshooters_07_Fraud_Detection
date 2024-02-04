import React, { useState, useEffect } from "react";

import "./dashboard.css";
import { CiSearch } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import Notification from "../../components/notifications/notification";
import { IoDownloadOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import Sidebar from "../../components/sidebar/sidebar";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function toCamelCase(str) {
  return str
    .replace(/\s(.)/g, function (match) {
      return match.toUpperCase();
    })
    .replace(/\s/g, "")
    .replace(/^(.)/, function (match) {
      return match.toLowerCase();
    });
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/users");
        const data = await response.json();
        // const filteredAccounts = data.filter((account) => {
        //   if (selectedFilter === "ALL") {
        //     return true; // Show all accounts
        //   } else if (selectedFilter === "Fraud") {
        //     return account.fraud_account;
        //   } else if (selectedFilter === "NotFraud") {
        //     return !account.fraud_account;
        //   }
        //   return false;
        // });

        const filteredAccounts = data.filter((account) => {
          const searchPattern = new RegExp(search, "i"); // Case-insensitive search

          return (
            (selectedFilter === "ALL" ||
              (selectedFilter === "Fraud" && account.fraud_account) ||
              (selectedFilter === "NotFraud" && !account.fraud_account)) &&
            (searchPattern.test(account.first_name) ||
              searchPattern.test(account.last_name))
          );
        });

        setAccounts(filteredAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
    
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/notifications/all"
        );
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchAccounts();
    fetchNotifications();
  }, [selectedFilter, search]);

  const handleAccountClick = (accountId) => {
    navigate(`/dashboard/account/${accountId}`);
  };

  const handleNotificationClick = () => {
    navigate("/dashboard/notifications");
  };

  return (
    <>
      <div className="main-div flex justify-between gap-1">
        <div className="w-96">
          <Sidebar />
        </div>
        <div className="middle-div">
          <div className=" px-3 py-5 pl-5">
            <div className="flex justify-between mb-5">
              <div className="stats border rounded-lg border-indigo-600 py-8 px-14 ">
                <h1 className="text-4xl font-bold text-indigo-600">900+</h1>
                <p className="text-lg">Solved Cases</p>
              </div>
              <div className="stats border rounded-lg border-indigo-600 py-8 px-16 mx-2">
                <h1 className="text-4xl font-bold text-indigo-600">600+</h1>
                <p className="text-lg">Open Cases</p>
              </div>
              <div className="stats border rounded-lg border-indigo-600 py-8 px-14">
                <h1 className="text-4xl font-bold text-indigo-600">300+</h1>
                <p className="text-lg">Fraud Accounts</p>
              </div>
            </div>
            <div className="accounts px-8 py-8">
              <div>
                <h1 className="text-3xl font-bold mb-5 text-indigo-600">
                  Accounts
                </h1>
              </div>
              <div className="flex items-center">
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="py-1 px-5 border-solid border-y border-l rounded-l-md w-full"
                />
                <div className=" px-2 py-2 border-solid border-y border-r rounded-r-md">
                  <CiSearch className="" />
                </div>
                <div className="ml-4 border py-1 px-5 pr-8 rounded-md bg-indigo-600">
                  <select
                    name="filter"
                    id="filter"
                    className="bg-indigo-600 text-white"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    <option value="ALL">ALL</option>
                    <option value="Fraud">Fraud Account</option>
                    <option value="NotFraud">Non Fraud </option>
                  </select>
                </div>
              </div>
              <div className="accounts-listed mt-8">
                {accounts.map((account) => (
                  <div
                    key={account.customer_id}
                    onClick={() => handleAccountClick(account.customer_id)}
                    className="flex items-center border-solid border rounded px-5 py-3 my-2"
                  >
                    <div className="text-3xl bg-indigo-600 text-white rounded-full p-1">
                      <CiBank />
                    </div>
                    <div className="ml-5">
                      <h2 className="font-bold text-lg">{`${account.first_name} ${account.last_name}`}</h2>
                      <h2 className="text-gray-500">
                        Account Number: {account.account_number}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="right-div p-5 pl-3">
          <div className="noti p-5">
            <h1 className="text-3xl font-bold mb-5 text-indigo-600">
              Notifications
            </h1>
            <div>
              <div className="noti-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.notification_id}
                    onClick={handleNotificationClick}
                    className="flex gap-3 items-center border-solid border rounded my-2"
                  >
                    <div className=" flex border border-indigo-600 items-centre py-1 px-2 text-2xl rounded-full ml-2">
                      <IoIosNotificationsOutline />
                    </div>
                    <div className="">
                      <h2 className="text-gray-600 font-bold py-1">
                        {notification.message}
                      </h2>

                      {/* <p className="text-gray-400">{new Date(notification.created_at).toLocaleString()}</p> */}
                      <p className="text-gray-400">
                        {new Date(notification.created_at).toLocaleString(
                          "en-US",
                          {
                            dateStyle: "short",
                            timeStyle: "short",
                            hour12: true,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lower mt-6  flex items-center justify-between gap-5">
            <div className="report p-8">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                <h1>Download Reports</h1>
              </div>
              <div className="flex items-center">
                <div className="">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker", "DatePicker", "DatePicker"]}
                    >
                      <DatePicker
                        label={'"month" and "year"'}
                        views={["month", "year"]}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className=" ml-2 rounded bg-indigo-600 text-white px-3 py-4 mt-2">
                  <IoDownloadOutline className="text-2xl" />
                </div>
              </div>
            </div>
            <div className="flex-column items-center justify-center bg-indigo-600 pl-8 py-10 rounded-lg text-white">
              <div>
                <MdOutlineSecurity className="text-3xl" />
              </div>
              <div>
                {" "}
                <h1 className="text-lg">Report Fraud</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
