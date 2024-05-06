import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../walletstore/userSlice';

export default function Homepage() {
  const [showBalance, setShowBalance] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function toggleBalance() {
    setShowBalance(!showBalance);
  };

  function showProfile() {
    //profile module goes here
  }

  function logout() {
    localStorage.removeItem('token')
    dispatch(setUser({}))
    navigate('/')
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Home</h1>
        <p className="text-lg">Welcome, {user?.name}!</p>
        <div className="mt-4">
          <button
            onClick={toggleBalance}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {showBalance ? 'Hide Balance' : 'Show Balance'}
          </button>
          {showBalance && (
            <p className="mt-2">
              Your current wallet balance is: Rs.100
            </p>
          )}
        </div>
        <div className="mt-8">
          <button
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded"
            onClick={showProfile}
          >
            Profile
          </button>
        </div>
        <div className="mt-8">
          <button
            className="bg-gray-800 text-white font-bold py-2 px-4 rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
