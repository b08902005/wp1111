import logo from './logo.svg';
// import './App.css';
import { useState } from 'react'
import './styles.css'
import Header from './Components/Header'
import Main from './Containers/Main'
import Footer from './Containers/Footer'
import React from 'react';
import { Component } from 'react';


const App = () => {

  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(0);
  const [numIncompleted, setNum] = useState(todos.length);
  const [numCompleted, setComNum] = useState(todos.length - numIncompleted);
  const [showState, setShowState] = useState(0);

  return (
    <div id='root' className='todo-app__root' >
      {/* <h1>hello, world</h1> */}
      <Header />
      <Main listItems={todos} setTodos={setTodos} id={id} setId={setId} 
      setNum={setNum} setComNum={setComNum} showState={showState} setShowState={setShowState} />
      <Footer listItems={todos} num={numIncompleted} comNum={numCompleted} 
      setTodos={setTodos} setComNum={setComNum} showState={showState} setShowState={setShowState} />
    </div>
  )
}

export default App;
