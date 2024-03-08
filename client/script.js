const promptInput = document.getElementById('prompt');
const submitButton = document.getElementById('submit');
const loadingIndicator = document.getElementById('loading-indicator');
const chatHistoryElement = document.getElementById('chat-history');
const responseElement = document.getElementById('response');

let canSubmit = true; // Flag to track if a question can be submitted

submitButton.addEventListener('click', async () => {
    if (!canSubmit) return; // Prevent submitting if the flag is false

    const prompt = promptInput.value.trim();

    if (prompt !== '') {
        // Hide the submit button and display the loading indicator
        submitButton.style.display = 'none';
        loadingIndicator.style.display = 'block';

        // Display user prompt in the chat history
        const userPrompt = document.createElement('div');
        userPrompt.classList.add('message', 'user-message');
        userPrompt.textContent = `You: ${prompt}`;
        chatHistoryElement.appendChild(userPrompt);

        // Clear the input field
        promptInput.value = '';

        // Send a request to the server to get the response
        const response = await fetch('/motivate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        // Parse the JSON response
        const data = await response.json();

        // Display AI response in the chat history
        const aiResponse = document.createElement('div');
        aiResponse.classList.add('message', 'ai-message');
        aiResponse.textContent = `AI: ${data.message}`;
        chatHistoryElement.appendChild(aiResponse);

        // Display AI response in the response box
        responseElement.textContent = data.message;

        // Scroll to the bottom of the chat history
        chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;

        // Enable the submit button and hide the loading indicator after a delay
        setTimeout(() => {
            submitButton.style.display = 'block';
            loadingIndicator.style.display = 'none';
            canSubmit = true; // Set the flag to true
        }, 5000); // 5-second cooldown period
    } else {
        // If the input is empty, show an error message or handle it accordingly
        alert('Please enter a question.');
    }
});
