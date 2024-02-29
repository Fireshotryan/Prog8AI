// script.js

import { getMotivated } from './api.js';

const promptInput = document.getElementById('prompt');
const responseDisplay = document.getElementById('response');

async function sendPrompt() {
    const prompt = promptInput.value;
    const response = await getMotivated(prompt);
    responseDisplay.textContent = response;
}

document.getElementById('submit').addEventListener('click', sendPrompt);