import React from 'react';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Successfully Logged In!
        </h1>
        <p className="text-gray-600">
          Welcome to the Home component. Enjoy exploring our platform!
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
