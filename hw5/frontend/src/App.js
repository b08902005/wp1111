import './App.css';
import React from 'react';
import { useState } from 'react';
import { guess, startGame, restart } from './axios';

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')

  const handleStart = async () => {
    setHasWon(false);
    setStatus('');
    // ask backend to generate new number by axios
    const response = await startGame();
    setHasStarted(true);
    setNumber('');
  }

  const handleRestart = async () => {
    setHasWon(false);
    setStatus('');
    const response = await restart();
    setHasStarted(true);
    setNumber('');
  }

  const handleGuess = async () => {
    await guess(number)
      .then((response) => {
        if (response === 'Equal') setHasWon(true);
        else {
          setStatus(response);
        }
      })
      .catch(() => {
        setStatus(`Error: "${number}" is not a valid number (1 - 100)`);
        console.log(`Error: "${number}" is not a valid number (1 - 100)`)
      })

  }

  const startMenu = (
    <div>
      <button onClick={handleStart} > start game </button>
    </div>
  )

  const changeNumber = (e) => {
    setNumber(e.target.value);
  }

  const gameMode = (
    <>
      <p>Guess a number between 1 to 100</p>
      <input onChange={changeNumber}></input>
      <button onClick={handleGuess} disabled={!number}>guess!</button>
      <p>{status}</p>
    </>
  )

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={handleRestart}>restart</button>
    </>
  )

  const game = (
    <div>
      {hasWon ? winningMode : gameMode}
    </div>
  )

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
