import { FcGoogle } from "react-icons/fc";
export const Oauth = () => {
  return (
    <button className="w-full flex items-center justify-center bg-red-600 text-white py-3 px-7 text-sm uppercase font-medium rounded shadow-md hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-800">
      <FcGoogle className="mr-2 text-2xl bg-white rounded-full" />
      Continue with google
    </button>
  );
};
