import React from 'react';
import Header from './components/Header/header'
import Main from './pages/Main/main';
import NavigationBar from './modules/NavigationBar/NavigationBarComponent'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
