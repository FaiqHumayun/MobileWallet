import React from 'react';
import AllRoutes from './routes/PrivateRoutes';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
    <>
      <AllRoutes />
      <ToastContainer />
    </>
  )
}

export default App;
