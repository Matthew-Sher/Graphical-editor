let colorPicker = document.getElementById('color-picker');

for (let btn of colorPicker.getElementsByTagName('button')) {
    btn.style.setProperty('background-color', btn.dataset.color);
};


