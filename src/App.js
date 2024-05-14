import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Memory from './pages/Memory';
import MediaList from './pages/MediaList';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Memory />} />
            <Route path="medias" element={<MediaList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
