import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Oauth } from "../components/Oauth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const SignUp = () => {
  const [showPassword, SetShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredentials.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formData.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  };
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
            alt="key-img"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Full name"
              id="name"
              className="w-full px-4 mb-6 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              value={name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email address"
              id="email"
              className="w-full px-4 mb-6 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              value={email}
              onChange={handleChange}
            />
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                value={password}
                onChange={handleChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => {
                    SetShowPassword((prevState) => !prevState);
                  }}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => {
                    SetShowPassword((prevState) => !prevState);
                  }}
                />
              )}
            </div>
            <div className="flex justify-between items-center mb-6 whitespace-nowrap text-sm sm:text-lg">
              <p>
                Have a account?{" "}
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                >
                  Sign in
                </Link>
              </p>
              <Link
                to="/forgot-password"
                className="text-blue-600  hover:text-red-800 transition duration-200 ease-in-out "
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-7 text-sm uppercase font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              Sign up
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
