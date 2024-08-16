async function processMorse() {
    const inputText = document.getElementById('inputText').value;
    const response = await fetch('/morse-process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText: inputText })
    });
    const result = await response.json();
    document.getElementById('outputText').innerText = result.outputText;
}

async function playMorseCode() {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText').value;

    const response = await fetch('/play-morse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inputText: inputText,
            outputText: outputText,
        }),
    });

    const result = await response.json();
    console.log('Playing Morse Code:', result.status);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('inputText').addEventListener('input', processMorse);
    document.getElementById('playMorseButton').addEventListener('click', playMorseCode);
});