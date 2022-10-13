/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/HomePage.css';
import React, { useEffect, useState } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */ }) => {
  const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
  const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

  useEffect(() => {
    const startButton = document.getElementById('startBtn');
    if (error) {
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  }, [error]);
  {/* Advanced TODO: Implementation of Difficult Adjustment
                     Some functions may be added here! */}
  const toggleController = () => setShowPanel(!showPanel);
  const changeMinesNum = () => {
    const input = document.getElementById('minesNum');
    mineNumOnChange(input.value);
    if (input.value >= boardSize * boardSize) {
      setError(true);
    } else setError(false);
  }
  const changeBoardSize = () => {
    const input = document.getElementById('boardSize');
    boardSizeOnChange(input.value);
    if (mineNum >= input.value * input.value) {
      setError(true);
    } else setError(false);
  }

  return (
    <div className='HomeWrapper'>
      <p className='title'>MineSweeper</p>
      {/* Basic TODO:  Implement start button */}
      <button id='startBtn' className='btn' onClick={startGameOnClick}>Start Game</button>
      <div className='controlContainer'>
        <button className='btn' onClick={toggleController}>Difficulty Adjustment</button>
        <div className='controlWrapper' style={showPanel ? { display: 'block' } : { display: 'none' }}>
          <div className='error' style={error ? { display: 'block' } : { display: 'none' }}>
            ERROR: Mines number and board size are invalid!
          </div>
          <div className='controlPanel'>
            <div className='controlCol'>
              <p className='controlTitle'>Mines Number</p>
              <input id='minesNum' onChange={changeMinesNum} type='range' step='1'
                min={1} max={20} defaultValue={mineNum} />
              <p className='controlNum' style={error?{color:'#880000'}:{color:'#0f0f4b'}}>{mineNum}</p>
            </div>
            <div className='controlCol'>
              <p className='controlTitle'>Board Size (n×n)</p>
              <input id='boardSize' onChange={changeBoardSize} type='range' step='1'
                min={3} max={20} defaultValue={boardSize} />
              <p className='controlNum' style={error?{color:'#880000'}:{color:'#0f0f4b'}}>{boardSize}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Advanced TODO: Implementation of Difficult Adjustment
                Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> 
                Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' 
                Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}

    </div>
  );

}
export default HomePage;   