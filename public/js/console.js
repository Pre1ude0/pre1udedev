let currentPath = '~';
let currentCommand = '';
let keyBlacklist = ['Control', 'Shift', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
const fileStructure = []
fetch('/extras/fileStructure.json')
    .then(response => response.json())
    .then(data => {

    fileStructure.push(data);
});

const consoleWindow = document.querySelector('.console');
const consoleBody = consoleWindow.querySelector('.window-body');

function createInputLine() {
    let inputLine = document.createElement('div');
    inputLine.classList.add('input-line');

    let pathDisplay = document.createElement('div');
    pathDisplay.classList.add('path-display');
    pathDisplay.innerHTML = `[guest@Pre1.dev ${currentPath}]$ `;

    let inputElement = document.createElement('div');
    inputElement.classList.add('command-input');

    inputLine.appendChild(pathDisplay);
    inputLine.appendChild(inputElement);

    return inputLine;
}

function commandRequest(command, outputElement) {
    let splitCommand = command.split(' ');
    for (let i = 0; i < splitCommand.length; i++) {
        splitCommand[i] = splitCommand[i].trim();
        if (splitCommand[i] === '') {
            splitCommand.splice(i, 1);
            i--;
        }
    }
    outputElement.innerHTML += `<br>${splitCommand.join(' ')} ← commands still in dev :3`;
}

function initializeConsole() {

    let inputLine = createInputLine()

    let outputElement = document.createElement('div');
    outputElement.classList.add('command-output');

    consoleBody.appendChild(inputLine);
    consoleBody.appendChild(outputElement);

    addEventListener('keydown', (e) => {
        if (consoleWindow.classList.contains('active') && !keyBlacklist.includes(e.key)) {
            if (e.key === 'Enter') {
                const command = inputLine.querySelector('.command-input').innerHTML;
                inputLine.innerHTML = '';
                inputLine.remove();
                outputElement.innerHTML += `[root@localhost ${currentPath}]$ ${command}`;
                outputElement.scrollTop = outputElement.scrollHeight;

                commandRequest(command, outputElement);

                currentCommand = '';
                inputLine = createInputLine();
                consoleBody.appendChild(inputLine);
            } else {
                if (e.key === 'Backspace') {
                    currentCommand = currentCommand.slice(0, -1);
                } else {
                    currentCommand += e.key;
                }
                inputLine.querySelector('.command-input').innerHTML = currentCommand;
            }
        }
    });
}

window.initializeConsole = initializeConsole;