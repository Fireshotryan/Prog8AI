// api.js

const baseUrl = 'http://localhost:3000'; // Update with your server URL

export async function getMotivated(prompt) {
    try {
        const response = await fetch(`${baseUrl}/motivate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error:', error);
        return 'Failed to get motivation. Please try again later.';
    }
}