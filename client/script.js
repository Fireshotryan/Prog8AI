const promptInput = document.getElementById('prompt');
const submitButton = document.getElementById('submit');
const responseElement = document.getElementById('response');
const chatHistoryElement = document.getElementById('chat-history');

let canSubmit = true; // Flag to track if a question can be submitted

submitButton.addEventListener('click', async() => {
    if (!canSubmit) return; // Prevent submitting if the flag is false

    const prompt = promptInput.value.trim();

    if (prompt !== '') {
        // Disable the submit button to prevent spamming
        submitButton.disabled = true;
        canSubmit = false; // Set the flag to false

        // Display user question immediately in the chat history
        const userQuestion = document.createElement('div');
        userQuestion.classList.add('message', 'user-message');
        userQuestion.textContent = `You: ${prompt}`;
        chatHistoryElement.appendChild(userQuestion);

        // Clear the input field
        promptInput.value = '';

        // Re-enable the submit button after a delay
        setTimeout(() => {
            submitButton.disabled = false;
            canSubmit = true; // Set the flag to true
        }, 3000); // 3-second delay

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

        // Scroll to the bottom of the chat history
        chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;

        responseElement.textContent = data.message;
        responseElement.style.display = 'block'; // Show the response
    } else {
        // If the input is empty, show an error message or handle it accordingly
        alert('Please enter a question.');
    }
});