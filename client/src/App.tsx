import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookmarks from "./pages/Bookmarks";
import Notes from "./pages/Notes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/notes" element={<Notes />} />
        <Route path="/bookmarks" element={<Bookmarks />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
