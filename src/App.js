import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import Home from "./components/home";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import ImageUploader from "./components/ImageUploader/ImageUploader";
import { checkJWT } from "./constants";
import GroupDetail from "./components/GroupDetail";
import OCR from "./features/OCR/OCR";

function App() {
  if (localStorage.getItem("show") !== "false") {
    localStorage.setItem("show", true);
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        {/* <Route
          path='/'
          element={checkJWT() ? <Navigate to='/login' replace /> : <Navigate to='/home' replace />}
        /> */}
        <Route path='/login' element={checkJWT() ? <Login /> : <Navigate to='/home' replace />} />
        <Route
          path='/register'
          element={checkJWT() ? <Register /> : <Navigate to='/home' replace />}
        />
        <Route path='/home/*' element={<Home />} />
        <Route path='/upload' element={<ImageUploader />} />
        <Route path='/group/:idGroup/*' element={<GroupDetail />} />
        <Route path='/ocr' element={<OCR />} />
      </Routes>
    </div>
  );
}

export default App;
