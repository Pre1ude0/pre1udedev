let currentPath = '~';
let relativePath = '~';
let currentDirectory = [];
let currentCommand = '';
let keyBlacklist = ['Control', 'Shift', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
let fileStructure = {home: {filename: 'home', filepath: '~', children: {}}};

fetch('/extras/fileStructure.json')
    .then(response => response.text())
    .then(data => {
        fileStructure = JSON.parse(data);
        setFilePaths(fileStructure.home);
}).then(() => { changeDirectory('~') });

const consoleWindow = document.querySelector('.console');
const consoleBody = consoleWindow.querySelector('.window-body');

function setFilePaths(node, path = null) {
    node.filepath = path ? `${path}/${node.filename}` : '~';
    if (node.type === 'directory') {
        for (let child in node.children) {
            setFilePaths(node.children[child], node.filepath);
        }
    }
}

function getParent(path) {
    let splitPath = path.split('/');
    splitPath.pop();
    let currentNode = fileStructure.home;
    for (let i = 1; i < splitPath.length; i++) {
        if (!currentNode.children || !currentNode.children[splitPath[i]]) {
            return null;
        }
        currentNode = currentNode.children[splitPath[i]];
    }

    return currentNode;
}

function changeDirectory(newPath) {
    if (newPath === '~') {
        currentPath = '~';
        relativePath = '~';
        currentDirectory = fileStructure.home;
    }

    let splitPath = newPath.split('/');
    let current = currentDirectory;

    if (newPath[0] === '/' || newPath[0] === '~') {
        current = fileStructure.home;
        splitPath = splitPath.slice(1);
        console.log(current);
    }
    for (let i = 0; i < splitPath.length; i++) {
        if (!(splitPath[i] === '' || splitPath[i] === '.')) {
            if (splitPath[i] === '..') {
                let fileParent = getParent(current['filepath']);
                if (fileParent !== null) {
                    current = fileParent;
                }
            } else {
                if (!current.children || !current.children[splitPath[i]]) {
                    return `cd: ${newPath}: No such file or directory`; // Invalid path
                } else {
                    current = current.children[splitPath[i]];
                }
            }
        }
    }

    currentPath = current.filepath;
    relativePath = currentPath.split('/').slice(-1)[0];
    currentDirectory = current;
}


function createInputLine() {
    let inputLine = document.createElement('div');
    inputLine.classList.add('input-line');

    let pathDisplay = document.createElement('div');
    pathDisplay.classList.add('path-display');
    pathDisplay.innerHTML = `[guest@Pre1.dev ${relativePath}]$ `;

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
    if (splitCommand[0] === 'clear') {
        outputElement.innerHTML = '';
    } else if (splitCommand[0] === 'cd') {
        if (splitCommand.length === 1) {
            outputElement.innerHTML += changeDirectory('~') + '<br>';
        } else if (splitCommand.length === 2) {
            let dif = changeDirectory(splitCommand[1]);
            if (dif !== undefined) {
                outputElement.innerHTML += changeDirectory(splitCommand[1]) + '<br>';
            }
        } else {
            outputElement.innerHTML += `cd: too many arguments<br>`;
        }
    } else if (splitCommand[0] === 'ls') {
        console.log(currentDirectory, currentDirectory.children);
        for (let child in currentDirectory.children) {
            outputElement.innerHTML += `${currentDirectory.children[child].filename} `;
        }
        outputElement.innerHTML += '<br>';
    } else if (splitCommand[0] === 'pwd') {
        outputElement.innerHTML += `${currentPath}<br>`;
    } else {
        outputElement.innerHTML += `${command}: command not found<br>`;
    }
}

function initializeConsole() {

    let inputLine = createInputLine()

    let outputElement = document.createElement('div');
    outputElement.classList.add('command-output');

    let extraSpace = document.createElement('div');
    extraSpace.classList.add('extra-space');

    consoleBody.appendChild(inputLine);
    consoleBody.appendChild(outputElement);
    consoleBody.appendChild(extraSpace);

    addEventListener('keydown', (e) => {
        if (consoleWindow.classList.contains('active') && !keyBlacklist.includes(e.key)) {
            if (e.key === 'Enter') {
                if (currentCommand === '') {
                    inputLine.querySelector('.command-input').innerHTML = '';
                    return;
                }
                const command = inputLine.querySelector('.command-input').innerHTML;
                inputLine.innerHTML = '';
                inputLine.remove();
                extraSpace.remove();
                outputElement.innerHTML += `[guest@Pre1.dev ${relativePath}]$ ${command}<br>`;

                commandRequest(command, outputElement);

                currentCommand = '';
                inputLine = createInputLine();
                consoleBody.appendChild(inputLine);

                extraSpace = document.createElement('div');
                extraSpace.classList.add('extra-space');
                consoleBody.appendChild(extraSpace);

                consoleBody.scrollTo(0, consoleBody.scrollHeight);

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