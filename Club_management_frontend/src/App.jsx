import React from 'react'
import AppRouter from './routes/AppRouter'
import { User } from 'lucide-react'
import { UserDataProvider } from './context/UserDataContext'
import { ToastContainer, Bounce } from 'react-toastify'

function App() {

  return (
    <>
      <UserDataProvider>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
      </UserDataProvider>
    </>
  )
}

export default App
