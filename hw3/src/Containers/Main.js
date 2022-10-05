import '../styles.css'
import React from 'react'
import { Component } from 'react';
import Item from '../Components/Item'
import { useState } from 'react';

const Main = ({ listItems, setTodos, id, setId, setNum, setComNum, showState, setShowState }) => {
    const [task, setTask] = useState('')

    function taskChange(e) {
        setTask(e.target.value);
    }

    function taskSubmit(e){
        e.preventDefault();
        setTodos([...listItems, {content:task, isCompleted:false, taskId:id}]);
        setTask('');
        setId(function (prev) {
            return prev+1;
        })
        setNum(function (prev) {
            return prev+1;
        })
        setShowState((prev) => ((prev + 3) % 6));
    }

    return (
        // <h2>hello, world</h2>
        <section className='todo-app__main'>
            <form onSubmit={taskSubmit}>
                <input value={task} type='text' onChange={taskChange}
                className='todo-app__input' placeholder='What needs to be done?' />
            </form>

            <ul className='todo-app__list' id='todo-list'>
                {listItems.map((item) => <Item listItems={listItems} setTodos={setTodos} 
                content={item.content} id={item.taskId} setNum={setNum} completed={item.isCompleted}
                 setComNum={setComNum} setShowState={setShowState} />)}
            </ul>
        </section>
    )
}

export default Main;
{/* <footer className='todo-app__header'>{props.text}</footer> */ }