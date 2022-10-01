const circles = document.querySelectorAll('.circle');

function makeRandColor() {
    const r = 16 * Math.floor(Math.random() * 16);
    const g = 16 * Math.floor(Math.random() * 16);
    const b = 16 * Math.floor(Math.random() * 16);
    return `rgb(${r}, ${g}, ${b})`;
}

for (let circle of circles) {
    circle.style.background = makeRandColor();
}

chatWins = document.querySelectorAll('.window');
const rightItem = document.querySelector('.rightItem');
const leftItem = document.querySelector('.leftItem');
let numRight = rightItem.querySelectorAll('.window').length;
let leftExist = true;
for (let chatWin of chatWins) {
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('material-symbols-outlined',
        'closeBtn');
    closeBtn.innerText = 'cancel';
    chatWin.append(closeBtn);
    closeBtn.addEventListener('click', function (e) {
        if (chatWin.classList.contains('leftItem')) {
            leftItem.classList.toggle('hide');
            rightItem.classList.toggle('noLeft');
            leftExist = !leftExist;
        }
        else {
            chatWin.remove();
            numRight--;
            if (numRight === 0) {
                rightItem.classList.toggle('hide');
            }
        }
        reLayout();
    })
    if (chatWin.classList.contains('myself')) {
        closeBtn.classList.add('hide');
    }
}

const btnRights = document.querySelectorAll('.btnRight');

for (let btnRight of btnRights) {
    btnRight.addEventListener('click', function () {
        const exchangeItem = this.parentElement.parentElement;
        const leftItem = document.querySelector('.leftItem');
        // console.log(exchangeItem);
        // exchange this item and the left item
        if (!leftExist) {   // 無左邊
            leftItem.classList.toggle('hide');
            leftExist = !leftExist;
            document.getElementById('leftName').innerText = exchangeItem.querySelector('.name').innerText;
            leftItem.querySelector('.circle').style.background = exchangeItem.querySelector('.circle').style.background;
            rightItem.classList.toggle('noLeft');
            exchangeItem.remove();
            numRight--;
            if (numRight === 0) rightItem.classList.toggle('hide');
        }
        else {  // 有左邊
            // leftHead, leftName, background-color of #zero
            const leftName = document.getElementById('leftName').innerText;
            const leftBack = leftItem.querySelector('.circle').style.background;
            document.getElementById('leftName').innerText = exchangeItem.querySelector('.name').innerText;
            leftItem.querySelector('.circle').style.background = exchangeItem.querySelector('.circle').style.background;
            exchangeItem.querySelector('.name').innerText = leftName;
            exchangeItem.querySelector('.circle').style.background = leftBack;
        }
        if (leftItem.classList.contains('myself') || exchangeItem.classList.contains('myself')) {
            leftItem.classList.toggle('myself');
            exchangeItem.classList.toggle('myself');
            leftItem.querySelector('.closeBtn').classList.toggle('hide');
            exchangeItem.querySelector('.closeBtn').classList.toggle('hide');
        }
        reLayout();
    })
}


const btnLeft = document.querySelector('.btnLeft');
const rightHTML = rightItem.querySelector('.window').innerHTML;

btnLeft.addEventListener('click', function () {
    // create element to right and toggle left
    const newRightWin = document.createElement('div');
    newRightWin.classList.add('window');
    newRightWin.innerHTML = rightHTML;
    newRightWin.querySelector('.name').innerText = document.getElementById('leftName').innerText;
    newRightWin.querySelector('.circle').style.background = leftItem.querySelector('.circle').style.background;
    newRightWin.querySelector('.closeBtn').addEventListener('click', function (e) {
        if (newRightWin.classList.contains('leftItem')) {
            leftItem.classList.toggle('hide');
            rightItem.classList.toggle('noLeft');
            leftExist = !leftExist;
        }
        else {
            newRightWin.remove();
            numRight--;
            if (numRight === 0) {
                rightItem.classList.toggle('hide');
            }
        }
        reLayout();
    })
    if (leftItem.classList.contains('myself')) {
        leftItem.classList.toggle('myself');
        newRightWin.classList.toggle('myself');
        leftItem.querySelector('.closeBtn').classList.toggle('hide');
        newRightWin.querySelector('.closeBtn').classList.toggle('hide');
    }
    const btnRight = newRightWin.querySelector('.btnRight');
    btnRight.addEventListener('click', function () {
        const exchangeItem = this.parentElement.parentElement;
        // console.log(exchangeItem);
        // exchange this item and the left item
        if (!leftExist) {   // 無左邊
            leftItem.classList.toggle('hide');
            leftExist = !leftExist;
            document.getElementById('leftName').innerText = exchangeItem.querySelector('.name').innerText;
            leftItem.querySelector('.circle').style.background = exchangeItem.querySelector('.circle').style.background;
            rightItem.classList.toggle('noLeft');
            exchangeItem.remove();
            numRight--;
            if (numRight === 0) rightItem.classList.toggle('hide');
        }
        else {  // 有左邊
            // leftHead, leftName, background-color of #zero
            const leftName = document.getElementById('leftName').innerText;
            const leftBack = leftItem.querySelector('.circle').style.background;
            document.getElementById('leftName').innerText = exchangeItem.querySelector('.name').innerText;
            leftItem.querySelector('.circle').style.background = exchangeItem.querySelector('.circle').style.background;
            exchangeItem.querySelector('.name').innerText = leftName;
            exchangeItem.querySelector('.circle').style.background = leftBack;
        }
        if (leftItem.classList.contains('myself') || exchangeItem.classList.contains('myself')) {
            leftItem.classList.toggle('myself');
            exchangeItem.classList.toggle('myself');
            leftItem.querySelector('.closeBtn').classList.toggle('hide');
            exchangeItem.querySelector('.closeBtn').classList.toggle('hide');
        }
        reLayout();
    })
    rightItem.append(newRightWin);
    leftItem.classList.toggle('hide');
    rightItem.classList.toggle('noLeft');
    rightItem.classList.remove('hide');
    numRight++;
    if (numRight === 1) {
        newRightWin.classList.add('right-1');
        newRightWin.classList.remove('right-2');
        newRightWin.classList.remove('right-8');
    }
    if (numRight === 2) {
        newRightWin.classList.remove('right-1');
        newRightWin.classList.add('right-2');
        newRightWin.classList.remove('right-8');
    }
    else if (numRight >= 3 && numRight <= 8) {
        newRightWin.classList.remove('right-1');
        newRightWin.classList.remove('right-2');
        newRightWin.classList.remove('right-8');
    }
    else if (numRight >= 8) {
        newRightWin.classList.remove('right-1');
        newRightWin.classList.remove('right-2');
        newRightWin.classList.add('right-8');
    }

    leftExist = !leftExist;
    reLayout();
})

function reLayout() {   // 透過 toggle class re-layout right or full
    if (leftExist) {
        const windows = rightItem.querySelectorAll('.window');
        for (let window of windows) {
            window.classList.remove('left-2');
            window.classList.remove('left-3');
            window.classList.remove('left-5');
            window.classList.remove('left-7');
            window.classList.remove('left-10');
        }
        if (numRight === 2) {
            for (let window of windows) {
                window.classList.add('right-2');
                window.classList.remove('right-8');
            }
        }
        else if (numRight >= 3 && numRight <= 8) {
            // console.log(windows);
            for (let window of windows) {
                window.classList.remove('right-2');
                window.classList.remove('right-8');
            }
        }
        else if (numRight >= 8) {
            // console.log(windows);
            for (let window of windows) {
                window.classList.remove('right-2');
                window.classList.add('right-8');
            }
        }
    }
    else {
        const windows = rightItem.querySelectorAll('.window');
        for (let window of windows) {
            window.classList.remove('right-2');
            window.classList.remove('right-8');
        }
        if (numRight === 1) {
            for (let window of windows) {
                window.classList.add('left-1');
                window.classList.remove('left-2');
                window.classList.remove('left-3');
                window.classList.remove('left-5');
                window.classList.remove('left-7');
                window.classList.remove('left-10');
            }
        }
        else if (numRight === 2) {
            for (let window of windows) {
                window.classList.remove('left-1');
                window.classList.add('left-2');
                window.classList.remove('left-3');
                window.classList.remove('left-5');
                window.classList.remove('left-7');
                window.classList.remove('left-10');
            }
        }
        else if (numRight >= 3 && numRight <= 4) {
            // console.log(windows);
            for (let window of windows) {
                window.classList.remove('left-1');
                window.classList.remove('left-2');
                window.classList.add('left-3');
                window.classList.remove('left-5');
                window.classList.remove('left-7');
                window.classList.remove('left-10');
            }
        }
        else if (numRight >= 5 && numRight <= 6) {
            // console.log(windows);
            for (let window of windows) {
                window.classList.remove('left-1');
                window.classList.remove('left-2');
                window.classList.remove('left-3');
                window.classList.add('left-5');
                window.classList.remove('left-7');
                window.classList.remove('left-10');
            }
        }
        else if (numRight >= 7 && numRight <= 9) {
            // console.log(windows);
            for (let window of windows) {
                window.classList.remove('left-1');
                window.classList.remove('left-2');
                window.classList.remove('left-3');
                window.classList.remove('left-5');
                window.classList.add('left-7');
                window.classList.remove('left-10');
            }
        }
        else if (numRight >= 10) {
            // console.log(windows);
            for (let window of windows) {
                window.classList.remove('left-1');
                window.classList.remove('left-2');
                window.classList.remove('left-3');
                window.classList.remove('left-5');
                window.classList.remove('left-7');
                window.classList.add('left-10');
            }
        }
    }
}

reLayout();


setInterval(() => {
    let currentTime = new Date();
    let str = '上午';
    if (parseInt(currentTime.getHours()) >= 18) {
        str = '晚上';
    } else if (parseInt(currentTime.getHours()) >= 12) {
        str = '下午';
    }
    document.getElementById('time').innerText =
        `${str}${parseInt(currentTime.getHours())}點${parseInt(currentTime.getMinutes())}分`;
}, 30000);

let currentTime = new Date();
let str = '上午';
if (parseInt(currentTime.getHours()) >= 18) {
    str = '晚上';
} else if (parseInt(currentTime.getHours()) >= 12) {
    str = '下午';
}
document.getElementById('time').innerText =
    `${str}${parseInt(currentTime.getHours())}點${parseInt(currentTime.getMinutes())}分`;


// add plus button
const plusBtn = document.createElement('button');
plusBtn.classList.add('material-symbols-outlined', 'plusBtn', 'button');
plusBtn.innerText = 'person_add';
document.querySelector('.middle').append(plusBtn);
// document.body.append(plusBtn);
plusBtn.addEventListener('click', () => {
    let name = prompt("Enter new person's name:");
    console.log(name);

    const newRightWin = document.createElement('div');
    newRightWin.classList.add('window');
    newRightWin.innerHTML = rightHTML;
    newRightWin.querySelector('.name').innerText = name;
    newRightWin.querySelector('.circle').style.background = makeRandColor();
    newRightWin.querySelector('.closeBtn').addEventListener('click', function (e) {
        if (newRightWin.classList.contains('leftItem')) {
            leftItem.classList.toggle('hide');
            rightItem.classList.toggle('noLeft');
            leftExist = !leftExist;
        }
        else {
            newRightWin.remove();
            numRight--;
            if (numRight === 0) {
                rightItem.classList.toggle('hide');
            }
        }
        reLayout();
    })
    const btnRight = newRightWin.querySelector('.btnRight');
    btnRight.addEventListener('click', function () {
        const exchangeItem = this.parentElement.parentElement;
        // console.log(exchangeItem);
        // exchange this item and the left item
        if (!leftExist) {   // 無左邊
            leftItem.classList.toggle('hide');
            leftExist = !leftExist;
            document.getElementById('leftName').innerText = exchangeItem.querySelector('.name').innerText;
            leftItem.querySelector('.circle').style.background = exchangeItem.querySelector('.circle').style.background;
            rightItem.classList.toggle('noLeft');
            exchangeItem.remove();
            numRight--;
            if (numRight === 0) rightItem.classList.toggle('hide');
        }
        else {  // 有左邊
            // leftHead, leftName, background-color of #zero
            const leftName = document.getElementById('leftName').innerText;
            const leftBack = leftItem.querySelector('.circle').style.background;
            document.getElementById('leftName').innerText = exchangeItem.querySelector('.name').innerText;
            leftItem.querySelector('.circle').style.background = exchangeItem.querySelector('.circle').style.background;
            exchangeItem.querySelector('.name').innerText = leftName;
            exchangeItem.querySelector('.circle').style.background = leftBack;
        }
        if (leftItem.classList.contains('myself') || exchangeItem.classList.contains('myself')) {
            leftItem.classList.toggle('myself');
            exchangeItem.classList.toggle('myself');
            leftItem.querySelector('.closeBtn').classList.toggle('hide');
            exchangeItem.querySelector('.closeBtn').classList.toggle('hide');
        }
        reLayout();
    })
    rightItem.append(newRightWin);
    rightItem.classList.remove('hide');
    numRight++;
    if (numRight === 1) {
        newRightWin.classList.add('right-1');
        newRightWin.classList.remove('right-2');
        newRightWin.classList.remove('right-8');
    }
    if (numRight === 2) {
        newRightWin.classList.remove('right-1');
        newRightWin.classList.add('right-2');
        newRightWin.classList.remove('right-8');
    }
    else if (numRight >= 3 && numRight <= 8) {
        newRightWin.classList.remove('right-1');
        newRightWin.classList.remove('right-2');
        newRightWin.classList.remove('right-8');
    }
    else if (numRight >= 8) {
        newRightWin.classList.remove('right-1');
        newRightWin.classList.remove('right-2');
        newRightWin.classList.add('right-8');
    }
    reLayout();
})