import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ChatProvider from './contex/ChatProvider';

function App() {

  return (
    <div className='App'>

      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path='/' element={<HomePage />} exact ></Route>
            <Route path='/chats' element={<ChatPage />} ></Route>
          </Routes>
        </ChatProvider>
      </BrowserRouter>

    </div>
  );
}

export default App; 
