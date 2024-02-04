import "./home.css";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import securityPic from "./images/security-pic.jpg";
import { FaLinkedin } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="flex-column">
        <div className="nav flex justify-between items-center px-10 py-6">
          <div className="flex items-center gap-3">
            <img className="w-12" src={logo} alt="logo" />
            <h2 className="text text-3xl font-bold flex gap-2">
              <p className="text-indigo-700 text-3xl font-bold">Rajasthan </p>
              Police Hackathon
            </h2>
          </div>
          <div className="text-white bg-indigo-600 px-10 py-2 text-lg font-semibold rounded-lg hover:bg-indigo-500">
            <Link to={"/adminlogin"} className="">
              Admin Login
            </Link>
          </div>
        </div>
        <div className="flex mx-auto gap-16 mt-24 p-10 h-fit">
          <div className="my-auto pl-20 ml-10 flex-col justify-between gap-10 w-50% pb-10 mb-10">
            <h1 className="font-bold text-5xl p-2 pb-5">Securing your</h1>
            <h1 className="font-bold text-5xl pl-2 ">transactions is always</h1>
            <h1 className="font-bold text-5xl p-2 pr-0 pt-5">a click away!</h1>
            <p className="pl-2 text-gray-500 text-lg mt-3 mb-5">
              Empower your financial peace of mind with our cutting-edge fraud
              prevention. Click to safeguard your transactions effortlessly and
              embrace worry-free financial transactions
            </p>
            <Link
              to={"/frauddetection"}
              className="text-white bg-indigo-600 px-10 py-2 text-lg font-semibold rounded-lg hover:bg-indigo-500 "
            >
              User Check
            </Link>
          </div>
          <div className="my-auto w-50% pt-5">
            <img className="w-fit" src={securityPic} alt="logo" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10 mx-24 my-12 border border-indigo-600 rounded-lg p-20 px-24">
        <div className="min-w-fit mr-20">
          <div>
            <h1 className="text-4xl text-indigo-600 font-semibold mb-2">
              Team
            </h1>
            <h2 className="text-3xl  font-semibold">TroubleShooters</h2>
          </div>
          <div>
            <div className="flex items-center gap-3 bg-indigo-300 font-semibold text-start py-2 px-5 pl-3 text-lg rounded-lg my-5 mt-8">
              <FaLinkedin />

              <Link to="https://www.linkedin.com/in/sharyu-marwadi/">
                Sharyu Rajesh Marwadi
              </Link>
            </div>
            <div className="flex items-center gap-3 bg-indigo-300 font-semibold text-start py-2 px-5 pl-3 text-lg rounded-lg my-5 mt-8">
              <FaLinkedin />

              <Link to="https://www.linkedin.com/in/sakshi-pawar-8a382b1ba/">
                Sakshi Suresh Pawar
              </Link>
            </div>
            <div className="flex items-center gap-3 bg-indigo-300 font-semibold text-start py-2 px-5 pl-3 text-lg rounded-lg my-5 mt-8">
              <FaLinkedin />

              <Link to="https://www.linkedin.com/in/rutuja-hujare-913635204/">
                Rutuja Hujare
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-4xl font-bold mb-5">What we're doing?</h1>
            <p className="text-justify text-gray-500 text-lg">
              Welcome to Trouble Shooters, where we bridge the gap between swift
              case registration and the initiation of investigations. Our
              authority login prioritizes MDC (Monitoring, Detection, and
              Collection), ensuring seamless collaboration between banks and
              police. On the user login side, we believe in the mantra that
              'prevention is better than cure,' focusing on proactive measures
              to safeguard your financial transactions. Join us in
              revolutionizing the pipeline between financial institutions and
              law enforcement, as we strive to create a secure and efficient
              environment in the fight against financial fraud.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
