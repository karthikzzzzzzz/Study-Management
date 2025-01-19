import './App.css';
import Main from './components/main';
import View from './pages/view';
import Add from './pages/add';
import Update from './pages/update';
import {BrowserRouter,Route, Routes} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/view" element={<View/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
