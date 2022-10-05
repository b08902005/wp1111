import React from "react";

const Item = ({ listItems, setTodos, content, id, setNum, completed, setComNum, setShowState }) => {
    // console.log(curItem);

    function onClick(e) {
        let toggle_Id = parseInt(e.target.id);
        setTodos(function (prev) {
            for (let item of prev) {
                if (item.taskId === toggle_Id) {
                    item.isCompleted = !item.isCompleted;
                }
            }
            setNum(prev.filter((item) => item.isCompleted === false).length);
            setComNum(prev.filter((item) => item.isCompleted === true).length)
            return prev;
        })
    }

    async function clickImg(e) {
        let removeId = parseInt(e.target.parentElement.querySelector('input').id);
        await setTodos(function (prev) {
            prev = prev.filter((item) => item.taskId !== removeId);
            setNum(prev.filter((item) => item.isCompleted === false).length);
            setComNum(prev.filter((item) => item.isCompleted === true).length);
            return prev;
        })
        setShowState((prev) => ((prev + 3) % 6));
    }

    return <li className='todo-app__item'>
        <div className='todo-app__checkbox'>
            <input type={"checkbox"} id={id} onClick={onClick} 
            checked={completed} />
            <label for={id} />
        </div>
        <h1 className='todo-app__item-detail'>{content}</h1>
        <img src='./img/x.png' className='todo-app__item-x' onClick={clickImg}></img>
    </li>
}

export default Item;