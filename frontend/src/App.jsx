import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin } from "./page/Admin";
import { Faculty } from "./page/Faculty";
import { Student } from "./page/Student";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/faculty" element={<Faculty />}></Route>
        <Route path="/student" element={<Student />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
