import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import Layout from './home/Layout.js';
import Header from './home/header/Header.js';
import Topiclist from './forum/topic/Topiclist.js';
import Threadlist from './forum/thread/Threadlist.js';
import Postlist from './forum/post/Postlist.js';
import RegLog from './account/RegLog.js';
import Profile from './account/Profile.js';
import {AuthProvider} from './utils/UserContext.js';
import Breed from './breed/Breed.js';

function App({id}) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Header />} />
            <Route path='/forum' element={<Topiclist />} />
            <Route path='/topic/:id' element={<Threadlist topicTitle={id} />} />
            <Route path='/thread/:id' element={<Postlist threadTitle={id} />} />
            {/* <Route path='/post/:id' element={} /> */}
            <Route path='/breed' element={<Breed />} />
            <Route path='/sign' element={<RegLog />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
