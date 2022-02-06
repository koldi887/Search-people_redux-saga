import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {initializedSuccess, initialSelector} from "./redux/slices/appSlice";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import {Blog} from "./pages/Blog";
import {NotFound} from "./pages/NotFound";

function App() {
  const {initialized} = useAppSelector(initialSelector)

  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <Routes>
          <Route path={'/blog'} element={<Blog/>} />
          <Route path={'*'} element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
