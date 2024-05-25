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
            const { aiMessage, dogImages, latestResponse } = await getMotivated(prompt);

            console.log('AI Message:', aiMessage);
            console.log('Dog Images:', dogImages);

            // Update the response element with the latest response
            responseElement.textContent = `Latest Response: ${latestResponse.content}`;

            // Create a container for the AI message and dog images
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('message');

            // Add AI message to the message container
            const aiMessageElement = document.createElement('div');
            aiMessageElement.textContent = `Motivator: ${aiMessage}`;
            messageContainer.appendChild(aiMessageElement);

            // Display dog images only if AI message contains the word "dog"
            if (aiMessage.toLowerCase().includes('dog') && dogImages.length > 0) {
                console.log('Dog images are being displayed.');

                // Add a fun message when dog images are displayed
                const funMessageElement = document.createElement('div');
                funMessageElement.textContent = "Here's a happy dog that likes to see you motivated!";
                messageContainer.appendChild(funMessageElement);

                dogImages.forEach(imageUrl => {
                    // Create an image element for each dog image
                    const imageElement = document.createElement('img');
                    imageElement.src = imageUrl;
                    imageElement.style.maxWidth = '200px';
                    imageElement.style.maxHeight = '200px';

                    // Append the image element to the message container
                    messageContainer.appendChild(imageElement);
                });
            }

            // Append the message container to the chat history
            chatHistoryElement.appendChild(messageContainer);
            chatHistory.scrollToBottom();
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
