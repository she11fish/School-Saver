import Home from "./pages/Home"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bookmarks from "./pages/Bookmarks";
import Notes from "./pages/Notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/bookmarks" element={<Bookmarks />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
