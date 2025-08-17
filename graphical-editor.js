let colorPicker = document.getElementById('color-picker');

for (let btn of colorPicker.getElementsByTagName('button')) {
    btn.style.setProperty('background-color', btn.dataset.color);
};

let canvas = document.getElementById('canvas');
let startCoord = {};

canvas.addEventListener('mousedown', function (event) {
    startCoord.x = event.pageX;
    startCoord.y = event.pageY;
    console.log(event);
});

let currentShape;
canvas.addEventListener('mousemove', function (event) {
    let endCoord = {
        x: event.pageX,
        y: event.pageY,
    };

    if (event.button == 0 && event.buttons == 1) {
        if (currentShape !== null && currentShape !== undefined) {
            canvas.removeChild(currentShape);
        }

        currentShape = drawLine(startCoord, endCoord);
    };
})

canvas.addEventListener('mouseup', function (event) {
    let endCoord = {
        x: event.pageX,
        y: event.pageY,
    };
    drawLine(startCoord, endCoord);
});

let drawLine = function (startCoords, endCoords) {
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startCoords.x);
    line.setAttribute('y1', startCoords.y);
    line.setAttribute('x2', endCoords.x);
    line.setAttribute('y2', endCoords.y);
    line.setAttribute('stroke', '#000000')
    canvas.appendChild(line);
    return line;
};
