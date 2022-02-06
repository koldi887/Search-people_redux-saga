import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {initializedSuccess, initialSelector} from "./redux/slices/appSlice";

function App() {
  const {initialized,people} = useAppSelector(initialSelector)

  const dispatch = useAppDispatch()
console.log(people)
  return (
    <div className="App">
      <button onClick={() => dispatch(initializedSuccess())}>click</button>
    </div>
  );
}

export default App;
