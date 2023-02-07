import { Routes, Route } from "react-router-dom"
import DetailUser from "./page/DetailUser";
import Home from "./page/Home";
import UpdateUser from "./page/UpdateUser";
import 'react-toastify/dist/ReactToastify.css';
import UploadFile from "./page/UploadFile";
import Login from "./page/Login";
import NotFound from "./page/NotFound";
import Register from "./page/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/detail/user/:idUser" element={<DetailUser />}></Route>
      <Route path="/detail/user-update/:idUser" element={<UpdateUser />}></Route>
      <Route path="/upload" element={<UploadFile />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>

  );
}

export default App;
