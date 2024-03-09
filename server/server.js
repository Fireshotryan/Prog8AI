import express from 'express';
import { ChatOpenAI } from "@langchain/openai";
import path from 'path';
import fetch from 'node-fetch'; // Importeer de fetch-module voor het ophalen van gegevens van de ZenQuotes API
import { fileURLToPath } from 'url';

// Define constants
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Initialize the ChatOpenAI model
const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
});

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the client folder
app.use(express.static(path.join(__dirname, '../client')));

// Handle POST requests for motivational responses
app.post('/motivate', async (req, res) => {
    try {
        const { prompt } = req.body;

        // Refine the prompt based on user input
        let engineeredPrompt = refinePrompt(prompt);

        // Log the engineered prompt for debugging
        console.log('Engineered Prompt:', engineeredPrompt);

        // Fetch inspirational quote from ZenQuotes API
        const quote = await fetchZenQuote();
        console.log('Quote from ZenQuotes API:', quote);

        // Combine the quote with the engineered prompt
        let combinedPrompt = `${engineeredPrompt} ${quote}`;

        // Send the combined prompt to the AI model
        const response = await model.invoke(combinedPrompt);
        console.log('Response from AI:', response);

        // Send the response back to the client
        res.json({ message: response.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to refine the prompt based on user input
function refinePrompt(prompt) {
    // Add context or constraints to the prompt
    // You can customize this function based on your specific requirements
    return `Give me a motivational quote about ${prompt}`;
}

// Function to fetch inspirational quote from ZenQuotes API
async function fetchZenQuote() {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        return data[0].q;
    } catch (error) {
        console.error('Error fetching quote from ZenQuotes API:', error);
        return '';
    }
}

// Handle other GET requests by serving the HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
