import { useState } from "react";

import { Link } from "react-router-dom";
import { Oauth } from "../components/Oauth";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
            alt="key-img"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              type="email"
              placeholder="Email Address"
              id="email"
              className="w-full px-4 mb-6 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              value={email}
              onChange={handleChange}
            />

            <div className="flex justify-between items-center mb-6 whitespace-nowrap text-sm sm:text-lg">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <Link
                to="/sign-in"
                className="text-blue-600 hover:text-red-800 transition duration-200 ease-in-out "
              >
                Sign in instead
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-7 text-sm uppercase font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              Send reset password
            </button>
            <div className="my-4 items-center flex  before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <Oauth />
          </form>
        </div>
      </div>
    </section>
  );
};
