const express = require('express');
const datamuse = require('datamuse');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to rewrite paragraphs
app.post('/rewrite', async (req, res) => {
    const inputParagraph = req.body.paragraph;

    try {
        const rewrittenParagraph = await rewriteParagraph(inputParagraph);
        res.json({ rewrittenParagraph });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while rewriting the paragraph.' });
    }
});

// Function to rewrite paragraph using synonyms
async function rewriteParagraph(paragraph) {
    const words = paragraph.split(' ');
    const rewrittenWords = await Promise.all(words.map(findSynonym));
    const rewrittenParagraph = rewrittenWords.join(' ');

    return rewrittenParagraph;
}

// Function to find a synonym for a word
async function findSynonym(word) {
    const synonyms = await datamuse.words({
        rel_syn: word,
    });

    return synonyms.length > 0 ? synonyms[0].word : word;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
