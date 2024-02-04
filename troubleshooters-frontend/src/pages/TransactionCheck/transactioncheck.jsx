import { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
const TransactionCheckForm = () => {
  const [accNo, setAccNo] = useState('');

  const checkAcc = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/transaction/is_spam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactionid: accNo,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      document.getElementById("verifiedMsg").innerText = `This transaction is not fraud`;
    } else {
        if(json.error==="Fraud transaction"){
            document.getElementById("verifiedMsg").innerText = `This transaction is fraud`;
        }
        else{
            document.getElementById("verifiedMsg").innerText = `This transaction does not exist`;
        }
    }
  };

  const onChange = (e) => {
    setAccNo(e.target.value);
  };
    return (
      <>
       <div className="main-div flex justify-between gap-1">
        <div className="w-96">
          <Sidebar />
        </div>
      
        <div className="h-80 px-8 flex items-center justify-center w-96 mx-auto my-auto">
          <form>
            <div>
              <h1 className="text-2xl text-indigo-600 font-bold mb-8">
                Check Transaction ID
              </h1>
              {/* <hr className='w-32 h-1 rounded-lg bg-black'/> */}
            </div>
            <div className="flex-column">
              <h2 className="text-lg font-semibold mb-2">Transaction ID</h2>
              <input
                type="number"
                className="px-5 py-2 border rounded-lg border-indigo-600 w-72"
                placeholder="Enter Account Number"
                value={accNo}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <button className="mt-8 bg-indigo-600 px-5 w-72 text-white rounded-lg py-2"
              onClick={checkAcc}
              type="submit">
                Check
              </button>
            </div>
            <div>
              <p className=" text-center italic text-gray-500 mt-5" id="verifiedMsg">
                
              </p>
            </div>
          </form>
        </div>
          </div>
      </>
    );
  };
  export default TransactionCheckForm;