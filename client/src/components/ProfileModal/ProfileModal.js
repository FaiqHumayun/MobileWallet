import { useState } from 'react'

export default function ProfileModal(props) {
  const [editedName, setEditedName] = useState(props.user.name)
  const [editedAddress, setEditedAddress] = useState(props.user.address)
  const [editedContact, setEditedContact] = useState(props.user.contact)
  const [editedCnic, setEditedCnic] = useState(props.user.cnic)

  const handleSave = () => {
    props.onSave({ name: editedName, address: editedAddress, contact: editedContact, cnic: editedCnic });
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-80'>
        <h2 className='text-xl font-bold mb-4'>Edit Profile</h2>
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-2 p-2'
          placeholder='Name'
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-2 p-2'
          placeholder='Contact'
          value={editedContact}
          onChange={(e) => setEditedContact(e.target.value)}
        />
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-4 p-2'
          placeholder='Address'
          value={editedAddress}
          onChange={(e) => setEditedAddress(e.target.value)}
        />
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-4 p-2'
          placeholder='CNIC'
          value={editedCnic}
          onChange={(e) => setEditedCnic(e.target.value)}
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
