import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage';
import { EditorPage } from './pages/EditorPage';
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/editor/:roomID' element={<EditorPage />} />
      </Routes>
      <Toaster
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter >
  );
}

export default App;
