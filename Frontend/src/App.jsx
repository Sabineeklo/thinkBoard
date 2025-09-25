import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import NoteDetailPage from './pages/NoteDetailPage';
import CreatePage from './pages/CreatePage';

function App() {
  return (
    <div data-theme= "night">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
        <Route path='/create' element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
