import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {Link, Routes} from 'react-router-dom';
import { Route } from 'react-router';
import {Blog} from "./pages/Blog";
import {NotFound} from "./pages/NotFound";

function App() {

  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <Routes>
          <Route path={'/blog'} element={<Blog/>} />
          <Route path={'*'} element={<NotFound/>} />
      </Routes>
        <Link to={'/blog'}>
            blog
        </Link>
    </div>
  );
}

export default App;
