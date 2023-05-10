import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import Layout from './home/Layout';
import Header from './home/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Header />} />
          {/* <Route path='/forum' element={} />
          <Route path='/topic/:id' element={} />
          <Route path='/thread/:id' element={} />
          <Route path='/post/:id' element={} />
          <Route path='/breed' element={<Breed />} />
          <Route path='/sign' element={<RegLog />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
