import express from 'express';
import { ChatOpenAI } from "@langchain/openai";
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import PromptTemplate from './prompttemplate.js';

// Define constants
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0'; // Allow connections from any network interface


// Initialize the ChatOpenAI model
const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
});

// Create an instance of the PromptTemplate class
const promptTemplate = new PromptTemplate();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

app.post('/motivate', async (req, res) => {
    try {
        const { prompt } = req.body;

        // Refine the prompt using the PromptTemplate class
        const engineeredPrompt = promptTemplate.refinePrompt(prompt);

        console.log('Engineered Prompt:', engineeredPrompt);

        // Check if the prompt is gibberish using the PromptTemplate class
        if (promptTemplate.isGibberish(prompt) || promptTemplate.isGibberish(engineeredPrompt)) {
            return res.status(400).json({ error: 'Gibberish or non-understandable input.' });
        }

        // Add motivational context to the prompt to bias the AI towards motivational responses
        const motivationalContext = ' motivational'; // Add more specific context if needed
        const biasedPrompt = `${engineeredPrompt}${motivationalContext}`;

        // Send the biased prompt to the AI model to get a motivational response
        let message = '';
        const useZenQuote = Math.random() < 0.15; // 15% chance to use a ZenQuote
        if (useZenQuote) {
            const quote = await fetchZenQuote();
            console.log('Quote from ZenQuotes API:', quote);
            message = quote;
        } else {
            const response = await model.invoke(biasedPrompt);
            console.log('Response from AI:', response);
            message = response.content;
        }

        // Send the message back to the client
        res.json({ message });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


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
app.listen(port, hostname, () => {
    console.log(`Server is running at https://didactic-umbrella-vrg94qwwrrqfpg55-3000.app.github.dev/`);
});
