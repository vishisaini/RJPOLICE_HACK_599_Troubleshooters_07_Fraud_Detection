import "./caseModal.css";
import { useState } from "react";

import { IoCloseOutline } from "react-icons/io5";

const CaseModal = ({
  closeCallback,
  receiverAccountDetails,
  senderAccountDetails,
}) => {
  const [isReceiverDetails, setReceiverDetails] = useState(false);
  const [isSenderDetails, setSenderDetails] = useState(false);

  const handleReceiverDetailsClick = () => {
    setReceiverDetails(!isReceiverDetails);
  };

  const handleSenderDetailsClick = () => {
    setSenderDetails(!isSenderDetails);
  };
  console.log("Receiver Details:", receiverAccountDetails);
  console.log("Sender Details:", senderAccountDetails);

  return (
    <div className="main-container">
      <div className="card ">
        <div className="flex justify-between h-14">
        <div className="flex gap-10 p-3 border rounded-lg h-14">
          <h2 className="font-bold text-xl mb-2 "> 3594HD3294JDJ243</h2>
          <p className="text-white text-center text-sm font-semibold bg-red-600 rounded-full">
            Open
          </p>
        </div>

        <div className="flex items-center justify-center pb-28 ">
          <div onClick={closeCallback}>
            <IoCloseOutline className="text-indigo-600 text-2xl mr-3" />
          </div>
        </div>
        </div>
        {/* <div className="w-full flex items-center border-solid border rounded-lg px-5 py-2 my-3 h-fit ">
          <div className="ml-2 w-full">
            <div className="flex mt-2 items-center">
              <h2 className="font-bold text-xl mb-2 "> 3594HD3294JDJ243</h2>
              <p className="ml-3 mb-1 text-white px-6 text-center text-sm pb-1 font-semibold bg-red-600 rounded-full">
                Open
              </p>
            </div> 
  </div>*/}

        {/* { <div className="flex items-center justify-center pb-28 ">
            <div onClick={closeCallback}>
              <IoCloseOutline className="text-indigo-600 text-2xl mr-3" />
            </div> */}

        {/* </div> */}

        <div className="flex justify-between items-center px-10">
          <button
            onClick={handleReceiverDetailsClick}
            className="px-5 py-2 m-2 bg-indigo-600 rounded-lg text-white text-md"
          >
            View Receiver Details
          </button>
          <button
            onClick={handleSenderDetailsClick}
            className="px-5 py-2 m-2 bg-indigo-600 rounded-lg text-white text-md"
          >
            View Sender Details
          </button>
        </div>

        <div className="flex justify-between gap-10">
          {isReceiverDetails && receiverAccountDetails ? (
            <div className="mt-3 border border-indigo-600 rounded-md p-3 flex-column justify-between">
              <h2 className="ml-3 text-indigo-600 font-semibold text-lg">
                Receiver Details
              </h2>
              <hr />
              <div className="ml-8 mt-5 mb-3">
                <img
                  className="profile-img"
                  src={receiverAccountDetails.reciverphoto}
                  alt="Receiver"
                />
              </div>
              <h1>
                <strong>Sender Name : </strong>
                {receiverAccountDetails.first_name}{" "}
                {receiverAccountDetails.last_name}
              </h1>
              <h1>
                <strong>Account Number : </strong>
                {receiverAccountDetails.account_number}
              </h1>
              <h1>
                <strong>IFSC Number : </strong>
                {receiverAccountDetails.branchid}
              </h1>
              <h1>
                <strong>Date of Birth : </strong>
                {receiverAccountDetails.dob}
              </h1>
              <h1>
                <strong>Address: </strong>
                {receiverAccountDetails.address}
              </h1>
              <h1>
                <strong>Mobile Number: </strong>
                {receiverAccountDetails.mobileno}
              </h1>
              <h1>
                <strong>Aadhar Card number: </strong>
                {receiverAccountDetails.addharno}
              </h1>
              <h1>
                <strong>Pancard Number : </strong>
                {receiverAccountDetails.pancard_number}
              </h1>
            </div>
          ) : null}

          {isSenderDetails && senderAccountDetails ? (
            <div className="mt-3 border border-indigo-600 rounded-md p-3 flex-column justify-between">
              <h2 className="ml-3 text-indigo-600 font-semibold text-lg">
                Sender Details
              </h2>
              <hr />
              <div className="ml-8 mt-5 mb-3">
                <img
                  className="profile-img"
                  src={senderAccountDetails.senderphoto}
                  alt="Sender"
                />
              </div>
              <h1>
                <strong>Sender Name : </strong>
                {senderAccountDetails.first_name}{" "}
                {senderAccountDetails.last_name}
              </h1>
              <h1>
                <strong>Account Number : </strong>
                {senderAccountDetails.account_number}
              </h1>
              <h1>
                <strong>IFSC Number : </strong>
                {senderAccountDetails.branchid}
              </h1>
              <h1>
                <strong>Date of Birth : </strong>
                {senderAccountDetails.dob}
              </h1>
              <h1>
                <strong>Address: </strong>
                {senderAccountDetails.address}
              </h1>
              <h1>
                <strong>Mobile Number: </strong>
                {senderAccountDetails.mobileno}
              </h1>
              <h1>
                <strong>Aadhar Card number: </strong>
                {senderAccountDetails.addharno}
              </h1>
              <h1>
                <strong>Pancard Number : </strong>
                {senderAccountDetails.pancard_number}
              </h1>
            </div>
          ) : null}
        </div>
        <div>
          <button className="px-5 py-2 m-2 bg-indigo-400 rounded-lg text-white text-md">
            Close Case
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseModal;

// const CaseModal = ({ closeCallback,  receiverAccountDetails, senderAccountDetails  }) => {
//   const [isReceiverDetails, setReceiverDetails] = useState(false);
//   const [isSenderDetails, setSenderDetails] = useState(false);

//   const handleReceiverDetailsClick = () => {
//     setReceiverDetails(!isReceiverDetails);
//   };
//   const handleSenderDetailsClick = () => {
//     setSenderDetails(!isSenderDetails);
//   };
//   return (
//     <div className="main-container">
//       <div className="card ">
//         <div className="w-full flex items-center border-solid border rounded-lg px-5 py-2 my-3 ">
//           <div className="ml-2 w-full">
//             <div className="flex mt-2 items-center">
//               <h2 className="font-bold text-xl mb-2 "> 3594HD3294JDJ243</h2>
//               <p className="ml-3 mb-1 text-white px-6 text-center text-sm pb-1 font-semibold bg-red-600 rounded-full">
//                 Open
//               </p>
//             </div>
//             <p>
//               <strong>Victim Name : </strong>Vikas Kumar
//             </p>
//             <p>
//               <strong>Customer ID : </strong>DH76HNDH349239
//             </p>
//             <p>
//               <strong>Transaction ID : </strong>DH76HNDH349239
//             </p>
//             <p>
//               <strong>Customer ID : </strong>DH76HNDH349239
//             </p>
//             <h2 className="mt-2 text-sm font-semibold text-gray-600">
//               12 March 2023
//             </h2>
//           </div>
//           <div className="flex items-center justify-center pb-28 ">
//             <div onClick={closeCallback}>
//               <IoCloseOutline className="text-indigo-600 text-2xl mr-3" />
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-between items-center px-10">
//           <button
//             onClick={handleReceiverDetailsClick}
//             className="px-5 py-2 m-2 bg-indigo-600 rounded-lg text-white text-md"
//           >
//             View Receiver Details
//           </button>
//           <button
//             onClick={handleSenderDetailsClick}
//             className="px-5 py-2 m-2  bg-indigo-600 rounded-lg text-white text-md"
//           >
//             View Sender Details
//           </button>
//         </div>
//         {/* receiver details div */}
//         <div className="flex justify-between gap-10">
//           {isReceiverDetails ? (
//             <div className="mt-3 border border-indigo-600 rounded-md p-3 flex-column justify-between">
//               <div>
//                 <h2 className="ml-3 text-indigo-600 font-semibold text-lg">
//                   Receiver Details
//                 </h2>
//                 <hr />
//               </div>
//               <div className="ml-8 mt-5 mb-3">
//                 <img
//                   className="profile-img"
//                   src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   alt="Your Company"
//                 />
//               </div>
//               <div>
//                 <h1 className="">
//                   <strong>Account Number : </strong>12458693254
//                 </h1>
//                 <h1 className="">
//                   <strong>IFSC Number : </strong>JIDH0000002
//                 </h1>
//                 <h1 className="">
//                   <strong>Branch Name : </strong>Nashik Road
//                 </h1>
//                 <h1 className="">
//                   <strong>Date of Birth : </strong>04/12/2002
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Gender : </strong>Male
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Mobile Number : </strong>9526598741
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Email : </strong>abcz@kdf.com
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Aadhaar Number : </strong>45874563281564
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Pancard : </strong>FSGJ44474JD
//                 </h1>
//               </div>
//             </div>
//           ) : null}
//           {isSenderDetails ? (
//             <div className="mt-3 border border-indigo-600 rounded-md p-3 flex-column justify-between">
//               <div>
//                 <h2 className="ml-3 text-indigo-600 font-semibold text-lg">
//                   Sender Details
//                 </h2>
//                 <hr />
//               </div>
//               <div className="ml-8 mt-5 mb-3">
//                 <img
//                   className="profile-img"
//                   src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                   alt="Your Company"
//                 />
//               </div>
//               <div>
//                 <h1 className="">
//                   <strong>Account Number : </strong>12458693254
//                 </h1>
//                 <h1 className="">
//                   <strong>IFSC Number : </strong>JIDH0000002
//                 </h1>
//                 <h1 className="">
//                   <strong>Branch Name : </strong>Nashik Road
//                 </h1>
//                 <h1 className="">
//                   <strong>Date of Birth : </strong>04/12/2002
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Gender : </strong>Male
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Mobile Number : </strong>9526598741
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Email : </strong>abcz@kdf.com
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Aadhaar Number : </strong>45874563281564
//                 </h1>
//                 <h1 className="">
//                   {" "}
//                   <strong>Pancard : </strong>FSGJ44474JD
//                 </h1>
//               </div>
//             </div>
//           ) : null}
//         </div>
//         <div>
//           <button className="px-5 py-2 m-2 bg-indigo-400 rounded-lg text-white text-md">Close Case</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaseModal;
