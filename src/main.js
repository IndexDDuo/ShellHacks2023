// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
// Additional imports as necessary

// Create the Express app
const app = express();

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a POST route for '/api/search'
app.post('/api/search', async (req, res) => {
    // Assuming 'req.body' might be missing or empty, add a check
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Request body is missing' });
    }

    // Your API logic here, for example:
    const { title, fieldOffices, race, weight, age } = req.body;
    // Fetch from an external API, process data, etc.

    // Send a JSON response with the results
    res.json({ results: 'Your search results' });
});

// Optionally, explicitly serve 'index.html' for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fallback route for handling 404 (Not Found)
// This should be the last route
app.use((req, res) => {
    res.status(404).send('404: Page Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
