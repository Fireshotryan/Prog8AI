const baseUrl = 'http://localhost:3000';

export async function getMotivated(prompt) {
    try {
        const response = await fetch(`${baseUrl}/motivate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data from the server.');
        }

        const data = await response.json();
        console.log('Response from server:', data); // Add this line to log the response
        return data;
    } catch (error) {
        console.error('Error:', error);
        return 'Failed to get motivation. Please try again later.';
    }
}
