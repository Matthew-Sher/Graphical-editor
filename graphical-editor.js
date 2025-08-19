let colorPicker = document.getElementById('color-picker');

for (let btn of colorPicker.getElementsByTagName('button')) {
    btn.style.setProperty('background-color', btn.dataset.color);
};

let color = '#000000'
colorPicker.addEventListener('click', function (event) {
    let target = event.target;
    let btn = target.closest('button.color');
    if (btn) {
        event.currentTarget.querySelector('button.selected').classList.remove('selected');
        btn.classList.add('selected');
        color = btn.dataset.color;
    };
});

let shape = 'line';
let shapePicker = document.getElementById('tool-piсker');
shapePicker.addEventListener('click', function (event) {
    let target = event.target;
    let btn = target.closest('button.shape');
    if (btn) {
        event.currentTarget.querySelector('button.selected').classList.remove('selected');
        btn.classList.add('selected');
        shape = btn.dataset.shape;
    };
});

let canvas = document.getElementById('canvas');
let startCoord = {};

canvas.addEventListener('mousedown', function (event) {
    startCoord.x = event.pageX;
    startCoord.y = event.pageY;
});

let currentShape;
canvas.addEventListener('mousemove', function (event) {
    if (event.buttons == 0) {
        return;
    } else {
        let endCoord = {
            x: event.pageX,
            y: event.pageY,
        };
        let equal = false;
        if (event.shiftKey) {
            equal = true;
        };
        if (currentShape !== null && currentShape !== undefined) {
            canvas.removeChild(currentShape);
        };

        currentShape = drawShape(shape, startCoord, endCoord, equal);
    };
})

canvas.addEventListener('mouseup', function (event) {
    let endCoord = {
        x: event.pageX,
        y: event.pageY,
    };

    let equal = false;
    if (event.shiftKey) {
        equal = true;
    };

    drawShape(shape, startCoord, endCoord, equal);
});

let drawShape = function (shape, startCoord, endCoord, equal) {
    if (shape == 'line') {
        return drawLine(startCoord, endCoord);
    } else if (shape == 'circle') {
        return drawCircle(startCoord, endCoord);
    } else if (shape == 'rectangle') {
        return drawRectangle(startCoord, endCoord, equal);
    } else {
        console.log('Error')
        return undefined;
    };
};

let drawLine = function (startCoords, endCoords) {
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', startCoords.x);
    line.setAttribute('y1', startCoords.y);
    line.setAttribute('x2', endCoords.x);
    line.setAttribute('y2', endCoords.y);
    line.setAttribute('stroke', color);
    canvas.appendChild(line);
    return line;
};

let calcRadius = function (startCoords, endCoords) {
    let a = Math.abs(startCoords.x - endCoords.x);
    let b = Math.abs(startCoords.y - endCoords.y);
    let r = Math.sqrt(a ** 2 + b ** 2);
    return r;
};

let drawCircle = function (startCoords, endCoords) {
    let Circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    Circle.setAttribute('cx', startCoords.x);
    Circle.setAttribute('cy', startCoords.y);
    Circle.setAttribute('r', calcRadius(startCoords, endCoords));
    Circle.setAttribute('stroke', color);
    Circle.setAttribute('fill', 'none');
    canvas.appendChild(Circle);
    return Circle;
};

let drawRectangle = function (startCoords, endCoords, equal) {
    let Rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    if (equal) {
        Rectangle.setAttribute('y', Math.min(startCoords.y, endCoords.y));
        if (startCoords.x > endCoords.x) {
            Rectangle.setAttribute('x', startCoords.x - Math.abs(endCoords.y - startCoords.y));
        } else {
            Rectangle.setAttribute('x', startCoords.x);
        };
        Rectangle.setAttribute('width', Math.abs(endCoords.y - startCoords.y));
        Rectangle.setAttribute('height', Math.abs(endCoords.y - startCoord.y));
    } else {
        Rectangle.setAttribute('x', Math.min(startCoords.x, endCoords.x));
        Rectangle.setAttribute('y', Math.min(startCoords.y, endCoords.y));
        Rectangle.setAttribute('width', Math.abs(endCoords.x - startCoords.x));
        Rectangle.setAttribute('height', Math.abs(endCoords.y - startCoord.y));
    };
    Rectangle.setAttribute('stroke', color);
    Rectangle.setAttribute('fill', 'none');
    canvas.appendChild(Rectangle);
    return Rectangle;
};
