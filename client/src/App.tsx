import Home from "./pages/Home"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bookmarks from "./pages/Bookmarks";
import Notes from "./pages/Notes";
import { auth } from "./firebase-config";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/notes" element={ auth.currentUser ? <Notes /> : <Navigate to="/" replace />} />
        <Route path="/bookmarks" element={ auth.currentUser ? <Bookmarks /> : <Navigate to="/" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
