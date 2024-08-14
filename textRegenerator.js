const express = require('express');
const natural = require('natural');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to rewrite text
app.post('/rewrite', (req, res) => {
    const inputText = req.body.text;

    // Perform text manipulation using the natural library
    // This can include grammar correction, synonym replacement, etc.
    const rewrittenText = manipulateText(inputText);

    // Respond with the rewritten text
    res.json({ rewrittenText });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Function to manipulate the text
function manipulateText(text) {
    // Example: Using the Porter Stemmer algorithm for simple text manipulation
    const stemmer = natural.PorterStemmer;
    const words = text.split(' ');

    const manipulatedWords = words.map(word => stemmer.stem(word));
    const manipulatedText = manipulatedWords.join(' ');

    return manipulatedText;
}



