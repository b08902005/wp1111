import '../styles.css'
import React from 'react'
import { Component } from 'react';

const Footer = ({ listItems, num, comNum, setTodos, setComNum, showState, setShowState }) => {

    if (listItems.length === 0) {
        return;
    }

    if (showState === 0 || showState === 3) showAll();
    else if (showState === 1 || showState === 4) showActive();
    else if (showState === 2 || showState === 5) showComplete();
    else console.log('wrong showState:', showState);

    const cleanBtn = document.querySelector('.todo-app__clean');

    if (comNum === 0) {
        if (cleanBtn) cleanBtn.classList.add('hide');
    } else {
        if (cleanBtn) cleanBtn.classList.remove('hide');
    }

    function showAll() {
        let items = document.querySelectorAll('li');
        for (let item of items) {
            item.classList.remove('hide');
        }
        setShowState(0);
    }

    function showActive() {
        let items = document.querySelectorAll('li');
        for (let item of items) {
            let el = listItems.filter(
                (listItem) => parseInt(listItem.taskId) === parseInt(item.querySelector('input').id));
                if (el.length === 0)    return;
                if (!el[0].isCompleted) {
                item.classList.remove('hide');
            }
            else {
                item.classList.add('hide');
            }
        }
        setShowState(1);
    }

    function showComplete() {
        let items = document.querySelectorAll('li');
        for (let item of items) {
            let el = listItems.filter(
                (listItem) => parseInt(listItem.taskId) === parseInt(item.querySelector('input').id));
            if (el.length === 0)    return;
            if (el[0].isCompleted) {
                item.classList.remove('hide');
            }
            else {
                item.classList.add('hide');
            }
        }
        setShowState(2);
    }

    async function clearCompleted(e) {
        await setTodos(function (prev) {
            prev = prev.filter((item) => !item.isCompleted);
            setComNum(0);
            return prev;
        })
        if (showState === 0 || showState === 3) showAll();
        else if (showState === 1 || showState === 4) showActive();
        else if (showState === 2 || showState === 5) showComplete();
        else console.log('wrong showState:', showState);
    }

    return (
        <footer className='todo-app__footer'>
            <div className='todo-app__total'>
                <span>{num}
                </span> left</div>
            <ul className='todo-app__view-buttons'>
                {/* <button>All</button>
                <button>Active</button>
                <button>Complete</button> */}
                <button onClick={showAll}>All</button>
                <button onClick={showActive}>Active</button>
                <button onClick={showComplete}>Completed</button>
            </ul>
            <div className='todo-app__clean hide' onClick={clearCompleted} >
                Clear completed
            </div>
        </footer>
    )
}

export default Footer;