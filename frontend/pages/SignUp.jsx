import React, { useState }from "react";
import Logo from "../src/assets/images.png";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../src/api"; // adjust the path as necessary


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, password);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };
  return (
    <>
      <div className="flex flex-col mt-16 justify-center h-full p-8 bg-white">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-12">
            <a href="javascript:void(0)">
              <img src={Logo} alt="logo" className="w-20 inline-block" />
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="name-container flex flex-col space-y-2">
                <div className="flex space-x-4">
                  <div className="split-left">
                    <label className="text-slate-900 text-sm font-medium mb-2 block">
                      Enter First Name
                    </label>
                    <input
                      name="fname"
                      type="text"
                      className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Sanket"
                    />
                  </div>
                  <div className="split-right">
                    <label className="text-slate-900 text-sm font-medium mb-2 block">
                      Enter Last Name
                    </label>
                    <input
                      name="lname"
                      type="text"
                      className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                      placeholder="Subedi"
                    />
                  </div>
                </div>
                <div className="warning text-red-500 text-sm font-semibold">
                  <span>
                    * Include Your Middle Name (if any) in Last Name.{" "}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Enter Your Contact Number
                </label>
                <input
                  name="email"
                  type="text"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Enter Your Email
                </label>
                <input
                  name="email"
                  type="text"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Confirm Password
                </label>
                <input
                  name="cpassword"
                  type="password"
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter confirm password"
                />
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none cursor-pointer"
              >
                Create an account
              </button>
            </div>
            <p className="text-slate-600 text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link to="/signin">
                <a
                  href="javascript:void(0);"
                  className="text-indigo-600 font-medium hover:underline ml-1"
                >
                  Login here
                </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
