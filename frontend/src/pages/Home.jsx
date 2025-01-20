import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null); // State to store user details

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          throw new Error('No token found');
        }
        console.log(token)
        const { data } = await axios.get('https://mern-numetry-app.onrender.com/api/user/profile', {
          headers: { token },
        });

        setUser(data.profileData); // Set user details
        console.log(user)
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to ensure this runs only once

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
        <p className="text-white text-lg">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome, {user.name}!
        </h1>
        <p className="text-gray-600">{user.email}</p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Home;
