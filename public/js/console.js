function initializeConsole() {
    const console = document.querySelector('.console');

    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text');
    console.appendChild(inputElement);

    const outputElement = document.createElement('div');
    outputElement.classList.add('output');
    console.appendChild(outputElement);

    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = inputElement.value;
            inputElement.value = '';
            outputElement.innerHTML += `${command}<br>`;
            outputElement.scrollTop = outputElement.scrollHeight;

            if (command === 'clear') {
                outputElement.innerHTML = '';
            } else if (command === 'neofetch') {
                fetch('../elems/neofetch.html').then(response => response.text()).then(data => {
                    outputElement.innerHTML += data;
                });
            } else {
                outputElement.innerHTML += 'Command not found<br>';
            }
        }
    });
}

window.onload = () => initializeConsole();

function inputCommand(command) {

}