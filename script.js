let size = 6;
let holdClick = 0;
mode = 0;

let cellWidth = 100/size 

body = document.querySelector('body')
grid = document.querySelector('.grid')

body.addEventListener('mousedown', e => {
    holdClick = 1;
})
body.addEventListener('mouseup', e => {
    holdClick = 0;
})

function changeColor(i, cellSelect) {
    if (mode === 0) {
        console.log(`cell ${i}`);
        console.log(cellSelect);
        cellSelect.style.backgroundColor = 'black';
    }
    else if (mode === 1) {
        console.log(`cell ${i}`);
        console.log(cellSelect);
        cellSelect.style.backgroundColor = rainbowColor();
    } 
    else if (mode === 2) {
        cellSelect.style.backgroundColor = darkerColor(i);
    } 
}

function clearCells() {
    for (let i = 0; i < size * size; i++) {
        cell = document.getElementById(`cell_${i}`);
        cell.style.backgroundColor = 'white';
    }
}

function rainbowColor() {
    let redValue = Math.floor(Math.random()* 255);
    let greenValue = Math.floor(Math.random() * 255);
    let blueValue = Math.floor(Math.random() * 255);
    return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

function darkerColor(cell) {
    cell = document.getElementById(`cell_${cell}`);
    let currentColor = getComputedStyle(cell).backgroundColor;
    let colorArray = currentColor.match(/\d+/g);
    if (currentColor === 'rgba(0, 0, 0, 0)') {
        cell.style.backgroundColor = `rgba(255, 255, 255, 0)`;
        return;
    }
    let newRed = colorArray[0] - 25;
    let newGreen = colorArray[1] - 25;
    let newBlue = colorArray[2] - 25;
    cell.style.backgroundColor = `rgb(${newRed}, ${newGreen},${newBlue})`;

}

function makeCell(i) {
    const cell = document.createElement('cell');
    cell.setAttribute('class', 'cell');
    cell.setAttribute('id', `cell_${i}`);
    cell.style.width = `${cellWidth}%`;
    cell.style.height = `${cellWidth}%`;
    cell.addEventListener('mousedown', (e) => { // 1st click
        // console.log(`click on test cell ${i}`);
            // cell.style.backgroundColor = 'black';
            // console.log(cell)
        changeColor(i, cell);
    })
    cell.addEventListener('mouseenter', e => { //hover while clicked
        if (holdClick) {
            changeColor(i, cell)
        }
    })
    grid.appendChild(cell);
};

function makeGrid() {
    for (let i = 0; i < size * size; i++) {
        makeCell(i)
    }
};
makeGrid();

let cellNumberInput = document.getElementById('cellNumber')
// console.log(cellNumberInput)
cellNumberInput.value = 6
// console.log(cellNumberInput.value)
// console.log(cellNumberInput)

cellNumberInput.addEventListener('onchange', e => {
    console.log(cellNumberInput)
    console.log(size);
})

function resize(i) { // needs to clear cells
    // 
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild)
    }
    console.log(size)
    size = i;
    cellWidth = 100/size;
    console.log(size);
    makeGrid();
}

let blackAndWhite = document.querySelector('.button2')
blackAndWhite.addEventListener('click', e => {
    mode = 0;
});

let rainbow = document.querySelector('.button3')
rainbow.addEventListener('click', e => {
    mode = 1;
});

let darker = document.querySelector('.button4')
darker.addEventListener('click', e => {
    mode = 2;
});

let clear = document.querySelector('.button5')
clear.addEventListener('click', e => {
    clearCells();
});

