import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { IoCloseOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { GoLaw } from "react-icons/go";
import CaseModal from "../../components/caseModal/caseModal";
import { CiSearch } from "react-icons/ci";
import "./openCases.css";
const OpenCases = () => {
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [casesData, setCasesData] = useState([]);
  const [receiverAccountDetails, setReceiverAccountDetails] = useState(null);
  const [senderAccountDetails, setSenderAccountDetails] = useState(null);
  const [isReceiverDetails, setReceiverDetails] = useState(false);
  const [isSenderDetails, setSenderDetails] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleToggleCaseModal = (caseDetails) => {
    setIsCaseModalOpen(!isCaseModalOpen);
    setReceiverDetails(false);
    setSenderDetails(false);
    setReceiverAccountDetails(caseDetails.receiver_account);
    setSenderAccountDetails(caseDetails.sender_account);
    //   console.log("Receiver Account Details:", caseDetails.receiver_account);
    // console.log("Sender Account Details:", caseDetails.sender_account);
  };

  
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/cases/all");
        const data = await response.json();
        setCasesData(data.cases);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const filteredCases = casesData.filter((caseItem) => {
    if (selectedFilter === "all") {
      return true;
    } else {
      return caseItem.status === selectedFilter;
    }
  });
  return (
    <>
      <div className="flex item-centre">
        <div className="min-w-48">
          <Sidebar />
        </div>
        <div className="open-cases m-6 mb-8 py-8 pb-5 px-10">
          <div>
            <h1 className="text-4xl font-bold mb-5 text-indigo-600">Cases</h1>
          </div>
          <div className="flex items-center mb-10">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search "
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
                onChange={handleFilterChange}
              >
                <option value="all">All Cases</option>
                <option value="open">Open Cases</option>
                <option value="close">Close Cases</option>
              </select>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-5 lists ">
          {filteredCases.map((caseItem) => (
              <div
                key={caseItem.case_id}
                onClick={() =>
                  handleToggleCaseModal(caseItem.transaction_details)
                }
                className="h-48 w-full flex items-center border-solid border rounded-lg px-5 py-2 my-3 "
              >
                <div className="pb-28 mr-3 p-1">
                  <GoLaw className="text-4xl bg-indigo-600 text-white border rounded-full p-2 mr-2" />
                </div>
                <div className="ml-2 w-full">
                  <div className="flex mt-2 items-center">
                    <h2 className="font-bold text-xl mb-2 ">
                      <strong>Case ID : </strong>
                      {caseItem.case_id}
                    </h2>
                    <p className="ml-3 mb-1 text-white px-6 text-center text-sm pb-1 font-semibold bg-red-600 rounded-full">
                      {caseItem.status}
                    </p>
                  </div>
                  <p>
                    <strong>Victim Name : </strong>
                    {
                      caseItem.transaction_details.sender_account.first_name
                    }{" "}
                    {caseItem.transaction_details.sender_account.last_name}
                  </p>
                  <p>
                    <strong>Customer ID : </strong>
                    {caseItem.transaction_details.sender_account.customer_id}
                  </p>
                  <p>
                    <strong>Transaction ID : </strong>
                    {caseItem.transaction_details.transaction_id}
                  </p>

                  <h2 className="mt-2 text-sm font-semibold text-gray-600">
                    {new Date(
                      caseItem.transaction_details.transaction_date
                    ).toLocaleDateString()}
                  </h2>
                </div>
                <div className="flex items-center justify-center pb-28 ">
                  <div className="p-5">
                    <BsPencilSquare className="bg-indigo-600 text-2xl rounded text-white p-1" />
                  </div>
                  <div>
                    <IoCloseOutline className="text-indigo-600 text-2xl mr-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isCaseModalOpen ? (
            <CaseModal
              closeCallback={handleToggleCaseModal}
              receiverAccountDetails={receiverAccountDetails}
              senderAccountDetails={senderAccountDetails}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};
export default OpenCases;
