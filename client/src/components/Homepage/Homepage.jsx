import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../walletstore/userSlice'
import { setWallet } from '../../walletstore/walletSlice'
import { setFriends } from '../../walletstore/friendsSlice'
import ProfileModal from '../ProfileModal/ProfileModal'
import TransactionModal from '../TransactionModal/TransactionModal'
import FriendsModal from '../FriendsModal/FriendsModal'
import HistoryModal from '../HistoryModal/HistoryModal'
import UserHistoryModal from '../HistoryModal/UserHistoryModal'
import WalletModal from '../WalletModal/WalletModal'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Homepage() {
  const [showBalance, setShowBalance] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [showFriendsModal, setShowfriendsModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [showUserHistoryModal, setShowUserHistoryModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [emailForTransaction, setEmailForTransaction] = useState('')
  const [contactForTransaction, setContactForTransaction] = useState('')
  const user = useSelector((state) => state.user.user)
  const wallet = useSelector((state) => state.wallet.wallet)
  const friends = useSelector((state) => state.friends.friends)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function toggleBalance() {
    setShowBalance(!showBalance)
  }

  function showProfile() {
    setShowProfileModal(!showProfileModal)
  }

  function showFriends() {
    setShowfriendsModal(!showFriendsModal)
  }

  function showHistory() {
    setShowHistoryModal(!showHistoryModal)
  }

  function showUserHistory() {
    setShowUserHistoryModal(!showUserHistoryModal)
  }

  function makeATransaction() {
    setShowTransactionModal(!showTransactionModal)
  }

  const showToastMessage = (message) => {
    toast.success(message)
  }

  function ShowWallet() {
    setShowWalletModal(!showWalletModal)
  }

  const saveProfileChanges = (newProfileData) => {
    try {
      axios
        .patch(`http://localhost:5000/editprofile/${user._id}`, {
          name: newProfileData.name,
          address: newProfileData.address,
          cnic: newProfileData.cnic,
          contact: newProfileData.contact,
        })
        .then((res) => {
          dispatch(setUser(res.data.user))
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
    setShowProfileModal(false)
  }

  const processTransaction = async (transactionData) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/transactions`,
        {
          receiver_email: transactionData.email,
          receiver_contact: transactionData.contact,
          amount: parseInt(transactionData.amount),
          purpose: transactionData.purpose,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res) {
        if (res.data.wallet) {
          dispatch(setWallet(res.data.wallet))
        }
        showToastMessage(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
    setShowTransactionModal(false)
  }

  const addFriend = async (friendData) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/add_friend`,
        {
          email: friendData.email,
          contact: friendData.contact,
          nickname: friendData.nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (res) {
        if (res.data.friends) {
          dispatch(setFriends(res.data.friends))
        }
        showToastMessage(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
    setShowfriendsModal(false)
  }

  const applyForTransaction = async (friendData) => {
    setEmailForTransaction(friendData.email)
    setContactForTransaction(friendData.contact)
    showFriends(!showFriendsModal)
    setShowTransactionModal(!showTransactionModal)
  }

  function logout() {
    localStorage.removeItem('token')
    dispatch(setUser({}))
    dispatch(setWallet({}))
    dispatch(setFriends([]))
    navigate('/')
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold mb-4'>Home</h1>
        <p className='text-lg'>Welcome, {user?.name}!</p>
        <div className='mt-4'>
          <button
            onClick={toggleBalance}
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
          >
            {showBalance ? 'Hide Balance' : 'Show Balance'}
          </button>
          {showBalance && (
            <p className='mt-2'>
              Your current wallet balance is: {wallet?.balance}
            </p>
          )}
        </div>
        <div className='mt-8'>
          <button
            className='bg-gray-800 text-white font-bold py-2 px-4 rounded'
            onClick={showProfile}
          >
            Profile
          </button>
        </div>
        <div className='mt-8'>
          <button
            className='bg-gray-800 text-white font-bold py-2 px-4 rounded'
            onClick={makeATransaction}
          >
            Transfer
          </button>
        </div>
        <div className='mt-8'>
          <button
            className='bg-gray-800 text-white font-bold py-2 px-4 rounded'
            onClick={showFriends}
          >
            Friends
          </button>
        </div>
        <div className='mt-8'>
          <button
            className='bg-gray-800 text-white font-bold py-2 px-4 rounded'
            onClick={showHistory}
          >
            History
          </button>
        </div>
        <div className='mt-8'>
          <button
            className='bg-gray-800 text-white font-bold py-2 px-4 rounded'
            onClick={showUserHistory}
          >
            See users transaction history
          </button>
        </div>
        <div className='mt-8'>
          <button
            className='bg-gray-800 text-white font-bold py-2 px-4 rounded'
            onClick={ShowWallet}
          >
            Add balance
          </button>
        </div>
        <div className='mt-8'>
          <button
            className='bg-gray-800 text-white font-bold py-2 px-4 rounded'
            onClick={logout}
          >
            Logout
          </button>
        </div>
        {showProfileModal && (
          <ProfileModal
            user={user}
            onClose={showProfile}
            onSave={saveProfileChanges}
          />
        )}
        {showTransactionModal && (
          <TransactionModal
            email={emailForTransaction}
            contact={contactForTransaction}
            onClose={makeATransaction}
            onSave={processTransaction}
          />
        )}
        {showFriendsModal && (
          <FriendsModal
            friends={friends}
            onFriendClick={applyForTransaction}
            onClose={showFriends}
            onSave={addFriend}
          />
        )}
        {showHistoryModal && (
          <HistoryModal
            onClose={showHistory}
          />
        )}
        {showUserHistoryModal && (
          <UserHistoryModal
            onClose={showUserHistory}
          />
        )}
        {showWalletModal && (
          <WalletModal
            onClose={ShowWallet}
          />
        )}
        <ToastContainer containerId='toastContainer' />
      </div>
    </div>
  )
}
