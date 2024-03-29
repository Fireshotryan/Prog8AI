import { getMotivated } from './api.js';
import ChatHistory from './chathistory.js';

const promptInput = document.getElementById('prompt');
const submitButton = document.getElementById('submit');
const loadingIndicator = document.getElementById('loading-indicator');
const chatHistoryElement = document.getElementById('chat-history');
const responseElement = document.getElementById('response');

const chatHistory = new ChatHistory(chatHistoryElement);

submitButton.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();

    if (prompt !== '') {
        submitButton.style.display = 'none';
        loadingIndicator.style.display = 'block';

        chatHistory.addMessage(`You: ${prompt}`, true);

        promptInput.value = '';

        try {
            const response = await getMotivated(prompt);
            chatHistory.addMessage(`Motivator: ${response}`);
            responseElement.textContent = response;
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to get motivation. Please try again later.');
        } finally {
            submitButton.style.display = 'block';
            loadingIndicator.style.display = 'none';
        }
    } else {
        alert('Please enter a question.');
    }
});
