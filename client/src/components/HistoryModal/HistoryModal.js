import axios from 'axios'
import { useState, useEffect } from 'react'

export default function HistoryModal(props) {
  const [outgoingHistory, setOutgoingHistory] = useState([])
  const [incomingHistory, setIncomingHistory] = useState([])
  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/transactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if (res) {
        console.log(res.data)
        setIncomingHistory(res.data.incomingTransfers)
        setOutgoingHistory(res.data.outgoingTransfers)
      }
    } catch (error) {}
  }

  const closeModal = () => {
    props.onClose()
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Transaction History</h3>
                <div className="mt-2">
                  <div className="max-h-60 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                      {outgoingHistory.map((history) => (
                        <li key={history.id} className="py-2">
                          <span className="text-red-500">Rs. {history?.amount}</span> transferred at {history?.createdAt}
                        </li>
                      ))}
                      {incomingHistory.map((history) => (
                        <li key={history.id} className="py-2">
                          <span className="text-green-500">Rs. {history?.amount}</span> credited at {history?.createdAt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
