import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import AddChange from './pages/AddChange';
import View from './pages/View';
import About from './pages/About';
import TabsNavigator from './components/TabsNavigator';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <TabsNavigator/>
        <ToastContainer position='top-center'/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddChange />}/>
          <Route path="/update/:id" element={<AddChange />}/>
          <Route path="/view/:id" element={<View />}/>
          <Route path="/about" element={<About />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
