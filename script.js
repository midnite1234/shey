let userBalance = localStorage.getItem('userBalance');
if (!userBalance) {
    userBalance = 0;
    localStorage.setItem('userBalance', userBalance);
} else {
    userBalance = parseInt(userBalance);
}

let energy = 100;

const watermelonImage = document.getElementById('watermelon');
const energySpan = document.getElementById('energy');
const boostCoinsSpan = document.getElementById('boost-coins');
const energyBar = document.getElementById('energy-bar');
const gameContainer = document.getElementById('game-container');
const shopContainer = document.getElementById('shop-container');
const prizes = document.getElementById('prizes');
const caseResult = document.getElementById('case-result');

setInterval(() => {
    if (energy < 100) {
        energy += 5;
        if (energy > 100) {
            energy = 100;
        }
        updateStats();
    }
}, 3000);

watermelonImage.onmousedown = (event) => {
    if (energy > 0) {
        userBalance += 1;
        energy -= 1;
        localStorage.setItem('userBalance', userBalance);
        updateStats();
        showFloatingNumber(event.clientX, event.clientY);
    } else {
        alert("У тебя закончилась энергия!");
    }
};

document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

document.addEventListener('dblclick', function(event) {
    event.preventDefault();
});

function updateStats() {
    energySpan.innerText = energy;
    boostCoinsSpan.innerText = userBalance;
    energyBar.style.width = `${energy}%`;
}

function showFloatingNumber(x, y) {
    const floatingNumber = document.createElement('div');
    floatingNumber.innerText = '+1';
    floatingNumber.className = 'floating-number';
    floatingNumber.style.left = `${x}px`;
    floatingNumber.style.top = `${y}px`;
    document.body.appendChild(floatingNumber);

    floatingNumber.addEventListener('animationend', () => {
        floatingNumber.remove();
    });
}

function openShop() {
    gameContainer.style.display = 'none';
    shopContainer.style.display = 'block';
}

function closeShop() {
    gameContainer.style.display = 'block';
    shopContainer.style.display = 'none';
    caseResult.innerText = '';
}

function openCase() {
    if (userBalance >= 50) {
        userBalance -= 50;
        updateStats();
        animateCaseOpening();
    } else {
        alert("Недостаточно boost коинов!");
    }
}

function animateCaseOpening() {
    caseResult.innerText = '';
    prizes.style.display = 'block';
    prizes.classList.add('spinning');
    setTimeout(() => {
        prizes.style.display = 'none';
        prizes.classList.remove('spinning');
        let randomPrizeIndex = Math.floor(Math.random() * prizes.children.length);
        let prize = prizes.children[randomPrizeIndex].innerText;
        caseResult.innerText = `Вы выиграли: ${prize}`;
        if (prize === '10000 boost коинов') {
            userBalance += 10000;
            localStorage.setItem('userBalance', userBalance);
            updateStats();
        }
    }, 3000); 
}

window.onload = () => {
    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, 100);
};