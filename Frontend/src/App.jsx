import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import NoteDetailPage from './pages/NoteDetailPage';
import CreatePage from './pages/CreatePage';

function App() {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 w-full h-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#0c97f45a_100%)]'/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
