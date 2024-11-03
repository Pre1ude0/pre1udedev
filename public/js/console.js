let currentPath = '~';
let relativePath = '~';
let currentDirectory = [];
let currentCommand = '';
let keyBlacklist = ['Control', 'Shift', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
let fileStructure = [];

fetch('/extras/fileStructure.json')
    .then(response => response.text())
    .then(data => {
        fileStructure = JSON.parse(data);
}).then(() => { changeDirectory('~') });

const consoleWindow = document.querySelector('.console');
const consoleBody = consoleWindow.querySelector('.window-body');

function setParentReferences(node, parent = null) {
    node.parent = parent;
    node.filepath = parent ? `${parent.filepath}/${node.filename}` : '~';

    if (node.type === 'directory' && node.children) {
        for (let childName in node.children) {
            if (node.children.hasOwnProperty(childName)) {
                setParentReferences(node.children[childName], node);
            }
        }
    }
}


// Fetch and initialize the file structure
fetch('/extras/fileStructure.json')
    .then(response => response.text())
    .then(data => {
        fileStructure = JSON.parse(data);
        setParentReferences(fileStructure.home); // Initialize parent references
        console.log(fileStructure);
    }).then(() => {
        changeDirectory('~');
    });

function changeDirectory(newPath="~") {
    if (newPath === '~') {
        currentPath = '~';
        relativePath = '~';
        currentDirectory = fileStructure.home;
        console.log(currentDirectory);
    }

    let splitPath = newPath.split('/');
    let current = currentDirectory;
    console.log(current);

    // Check if the path starts from root (~)

    if (newPath[0] === '/' || newPath[0] === '~') {
        current = fileStructure.home;
        console.log(current);
    }
    for (let i = 0; i < splitPath.length; i++) {
        if (!(splitPath[i] === '' || splitPath[i] === '.')) {
            if (splitPath[i] === '..') {
                if (current.parent) {
                    current = current.parent;
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

    console.log(current);
    currentPath = current['filepath'];
    console.log(currentPath);
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