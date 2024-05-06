import React from 'react';
import AllRoutes from './components/routing/PrivateRoute/PrivateRoute';
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
