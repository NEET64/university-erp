import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md px-8 py-12 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl text-center text-gray-800 font-bold mb-4">
          404 - Not Found
        </h1>
        <p className="text-gray-600 text-center mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          to={"/student"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Go back
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
