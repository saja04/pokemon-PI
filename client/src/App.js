
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Landing from './react-modules/Landing';
import Home from './react-modules/Home'
import Create from './react-modules/Create';
import About from './react-modules/About';
import Detail from './react-modules/Detail';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
