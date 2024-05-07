import './App.css';
import Certificate from './components/Certificate';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Generate" element={<Certificate/>}/>
    </Routes>
  );
}

export default App;
