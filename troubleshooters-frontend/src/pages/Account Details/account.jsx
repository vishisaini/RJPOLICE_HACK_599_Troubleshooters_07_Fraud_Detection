import { MdAccountBalanceWallet } from "react-icons/md";
import "./account.css";
import Sidebar from "../../components/sidebar/sidebar";
import Chart from "../../components/chart/chart";
import { BsUpload } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TransactionModal from "../../components/transactionModal/transactionModal";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

const Account = () => {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedReceiverAccount, setSelectedReceiverAccount] = useState(null);

  const { id } = useParams();

//  console.log(id);
  useEffect(() => {
    const fetchUserData = async (id) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/users/${id}`);
        const data = await response.json();
        setUserData(data);
        console.log(data);
        const transactionResponse = await fetch(
          `http://127.0.0.1:5000/api/transactions/${data.account_number}`
        );
        const transactionData = await transactionResponse.json();
        console.log(transactionData);
        setTransactions(transactionData);
     //  console.log(transactionData.receiver_account)
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData(id); // Pass the userId obtained from useParams
  }, [id]); // Include userId in the dependency array to react to changes

  const handleToggleTransactionModal = (receiver_account) => {
    setIsTransactionModalOpen(!isTransactionModalOpen);
    setSelectedReceiverAccount(receiver_account);
  };
  

  return (
    <>
      <div className="main-div">
        <div className="w-1/6">
          <Sidebar className="" />
        </div>
        <div className="profile-main px-6 py-2 my-4 mx-5 mb-14 ml-8">
          <div>
            <h1 className="text-xl font-semibold mx-6 mt-3 mb-5 bg-indigo-600 text-white px-3 py-1 rounded-lg text-center">
              Account Details
            </h1>
          </div>
          <div className="profile-div mx-5 my-3 px-3 py-2">
            <div className="profile-img-acc rounded-lg p-2">
              {" "}
              {userData && (
                <img
                  className="profile"
                  src={userData.customer_photo || "url_to_default_image"}
                  alt={userData?.name || "Default User"}
                />
              )}
            </div>
            <div className="ml-8">
              {userData && (
                <>
                  <h1 className="text-2xl font-semibold text-indigo-600 mb-3">
                    {userData.first_name} {userData.last_name}
                  </h1>
                  {userData.fraud_account ? (
                    <p className="bg-red-500 text-white px-8 py-1 rounded-full text-center">
                      Fraudulent
                    </p>
                  ) : (
                    <p className="bg-green-500 text-white px-8 py-1 rounded-full text-center">
                      Not Fraud
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="mx-6 my-0 overflow-y-scroll h-96 pt-5">
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              <strong>Account Number:</strong> {userData?.account_number}
            </h1>
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              <strong>IFSC Number:</strong> {userData?.ifsc_code}
            </h1>
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              <strong>Branch Name : </strong>Nashik Road
            </h1>
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              <strong>Date of Birth:</strong> {userData?.dob}
            </h1>
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              {" "}
              <strong>Gender:</strong> {userData?.gender}
            </h1>
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              {" "}
              <strong>Mobile Number:</strong> {userData?.mobileno}
            </h1>
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              {" "}
              <strong>Email:</strong> {userData?.emailid}
            </h1>
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              {" "}
              <strong>Aadhaar Number:</strong> {userData?.addharno}
            </h1>
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              {" "}
              <strong>Pancard:</strong> {userData?.pancard_number}
            </h1>
            <h1 className="border border-indigo-600 rounded-md py-2 px-3 mb-1">
              <strong>Account Creation Date:</strong>{" "}
              {formatDate(userData?.account_creation_date)}
            </h1>
          </div>
        </div>
        <div>
          <div className=" chart px-10 py-1  m-5 mt-4 mb-3">
            {/* <Chart senderAccount={userData?.account_number} /> */}
            <Chart/>
          </div>
          {/* <div className="px-10 py-1  m-5 mt-4 mb-3">
            <button className="px-4 py-0.5 text-white rounded-lg bg-indigo-600 text-sm w-32 text-center mx-1">
              Check Model
            </button>
            <button className="px-4 py-0.5 text-white rounded-lg bg-indigo-600 text-sm w-32 text-center mx-1">
              Check Model
            </button>
            <button className="px-4 py-0.5 text-white rounded-lg bg-indigo-600 text-sm w-32 text-center mx-1">
              Check Model
            </button>
          </div> */}

          <div className="transactions-div px-10 py-5 m-5 mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-1 text-indigo-600">
                Transaction History
              </h1>
            </div>
            <div className="transactions">
              {transactions.map((transaction) => (
                <div
                  key={transaction.transactionid}
                  onClick={() =>
                    handleToggleTransactionModal(transaction.receiver_account)
                  }
                  className="flex items-center border-solid border rounded px-5 py-2 my-2 justify-between"
                >
                  <div className="text-lg font-bold bg-indigo-600 text-white rounded-full p-3">
                    <BsUpload />
                  </div>
                  <div className="ml-5">
                    <h2 className="font-bold text-md">
                      {formatDate(transaction.transaction_date)}
                    </h2>
                    <h2 className="text-gray-500">
                      Amount Credited: {transaction.newbalanceorig}
                    </h2>
                  </div>
                  <div className="ml-24 w-24 ">
                    <p
                      className={`px-3 py-1 rounded-lg text-md text-center ${
                        transaction.fraud_transaction
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {transaction.fraud_transaction ? "Fraud" : "Not Fraud"}
                    </p>
                  </div>
                </div>
              ))}

            

              {isTransactionModalOpen ? (
                <TransactionModal
                  closeCallback={handleToggleTransactionModal}
                  receiverAccount={selectedReceiverAccount}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Account;
