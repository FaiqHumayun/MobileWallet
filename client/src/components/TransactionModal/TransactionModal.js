import { useState } from 'react'

export default function TransactionModal(props) {
  const [receiverEmail, setReceiverEmail] = useState(props.email)
  const [receiverContact, setReceiverContact] = useState(props.contact)
  const [amount, setAmount] = useState(0)
  const [purpose, setPurpose] = useState('')

  const handleSave = () => {
    props.onSave({ email: receiverEmail, contact: receiverContact, amount: amount, purpose: purpose });
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-80'>
        <h2 className='text-xl font-bold mb-4'>Transfer</h2>
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-2 p-2'
          placeholder='Receiver Email'
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
        />
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-2 p-2'
          placeholder='Receiver Contact'
          value={receiverContact}
          onChange={(e) => setReceiverContact(e.target.value)}
        />
        <input
          type='number'
          className='block w-full border-gray-300 rounded-md mb-4 p-2'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type='text'
          className='block w-full border-gray-300 rounded-md mb-4 p-2'
          placeholder='Purpose of transfer'
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
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
