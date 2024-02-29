const promptInput = document.getElementById('prompt');
const submitButton = document.getElementById('submit');
const responseElement = document.getElementById('response');

submitButton.addEventListener('click', async() => {
    const prompt = promptInput.value.trim();

    if (prompt !== '') {
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

        // Display the response
        responseElement.textContent = data.message;
        responseElement.style.display = 'block'; // Show the response
    } else {
        // If the input is empty, show an error message or handle it accordingly
        alert('Please enter a question.');
    }
});