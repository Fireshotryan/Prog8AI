import express from 'express';
import { ChatOpenAI } from "@langchain/openai";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(
    import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
});

app.use(express.json());

// Serve static files (like HTML, CSS, JS) from the client folder
app.use(express.static(path.join(__dirname, '../client')));

// Route to handle POST requests for motivational responses
app.post('/motivate', async(req, res) => {
    try {
        const { prompt } = req.body;

        // prompt engineering

        const response = await model.invoke(prompt);
        res.json({ message: response.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// For any other GET requests, serve the HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});