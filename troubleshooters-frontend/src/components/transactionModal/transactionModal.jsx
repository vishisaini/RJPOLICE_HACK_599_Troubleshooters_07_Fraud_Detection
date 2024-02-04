


import { useState, useEffect } from "react";
import "./transactionModal.css";
import { IoCloseOutline } from "react-icons/io5";
import { BsUpload } from "react-icons/bs";


const TransactionModal = ({ closeCallback, receiverAccount }) => {
  const [receiverAccountDetails, setReceiverAccountDetails] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  useEffect(() => {
    const fetchReceiverAccountDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/users/all/${receiverAccount}`
        );
        const data = await response.json();
        setReceiverAccountDetails(data);
      } catch (error) {
        console.error("Error fetching receiver account details:", error);
      }
    };

    if (receiverAccount) {
      fetchReceiverAccountDetails();
    }
  }, [receiverAccount]);

  const handleReceiverDetailsClick = () => {
    setIsDetailsVisible(true);
  };

  return (
    <div className="main-container">
      <div className="card flex-column items-start">
    
          
  
            <div onClick={closeCallback}>
              <IoCloseOutline className="text-indigo-600 text-2xl mr-3" />
            </div>
    

        {/* Display receiver details */}
        <div className="flex justify-between mt-5">
          <button
            onClick={handleReceiverDetailsClick}
            className="px-5 py-2 bg-indigo-600 rounded-lg text-white text-md"
          >
            View Receiver Details
          </button>
        </div>

        {receiverAccountDetails ? (
          <div>
            <div className="mt-3 border border-indigo-600 rounded-md p-3 flex">
              <div>
                <h1 className="">
                  <strong>Account Number : </strong>{receiverAccountDetails.account_number}
                </h1>
                <h1 className="">
                  <strong>IFSC Number : </strong>{receiverAccountDetails.ifsc_code}
                </h1>
                <h1 className="">
                  <strong>Branch Name : </strong>{receiverAccountDetails.branch_name}
                </h1>
                <h1 className="">
                  <strong>Date of Birth : </strong>{receiverAccountDetails.dob}
                </h1>
                <h1 className="">
                  {" "}
                  <strong>Gender : </strong>{receiverAccountDetails.gender}
                </h1>
                <h1 className="">
                  {" "}
                  <strong>Mobile Number : </strong>{receiverAccountDetails.mobileno}
                </h1>
                <h1 className="">
                  {" "}
                  <strong>Email : </strong>{receiverAccountDetails.emailid}
                </h1>
                <h1 className="">
                  {" "}
                  <strong>Aadhaar Number : </strong>{receiverAccountDetails.addharno}
                </h1>
                <h1 className="">
                  {" "}
                  <strong>Pancard : </strong>{receiverAccountDetails.pancard_number}
                </h1>
                <h1 className="">
                  {" "}
                  <strong>IP Address : 10.254.0.201 </strong>
                </h1>
              </div>
              <div className='ml-8 flex mt-3'>
                <img
                  className="profile"
                  src={receiverAccountDetails.customer_photo || "url_to_default_image"}
                  alt={receiverAccountDetails?.name || "Receiver User"}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};


export default TransactionModal;
