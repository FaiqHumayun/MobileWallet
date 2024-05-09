import { useState } from 'react'

export default function FriendsModal(props) {
  const [friends, setFriends] = useState(props.friends)
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')

  const handleSave = () => {
    props.onSave({ nickname: nickname, email: email, contact: contact })
  }

  const startTransactionForThatFriend = (friend) => {
    props.onFriendClick({
      email: friend.friend_email,
      contact: friend.friend_contact,
    })
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-80'>
        <h2 className='text-xl font-bold mb-4'>Friends</h2>
        <ul>
          {friends.map((friend) => (
            <li
              key={friend.id}
              onClick={() => startTransactionForThatFriend(friend)}
            >
              {friend?.nickname} - {friend?.friend_email} -
              {friend?.friend_contact}
            </li>
          ))}
        </ul>
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-2 p-2'
          placeholder='Nick Name'
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-2 p-2'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-2 p-2'
          placeholder='Contact'
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <div className='flex justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className='bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded'
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
