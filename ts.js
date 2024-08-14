const express = require('express');
const Sentiment = require('sentiment');
var sentiment = new Sentiment();
// var result = sentiment.analyze('Cats are stupid.');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Endpoint to change sentiment and rewrite paragraph
app.post('/change-sentiment', (req, res) => {
    const originalText = req.body.text;

    // Analyze sentiment of the original text
    const sentimentScore =  sentiment.analyze(originalText).score;
    console.log(sentimentScore);
    // Change the sentiment by modifying the text
    const newText = changeSentiment(originalText, sentimentScore);

    res.json({ newText });
});

// Function to change sentiment of the text
function changeSentiment(text, sentimentScore) {
    const positiveEmojis = ['😄', '🌞', '🌈'];
    const negativeEmojis = ['😔', '🌧️', '😞'];

    // Determine the target sentiment
    const targetSentimentScore = -sentimentScore; // Invert sentiment

    // Select positive or negative emojis based on target sentiment
    const targetEmojis = targetSentimentScore >= 0 ? positiveEmojis : negativeEmojis;

    // Replace emojis in the text to change sentiment
    const newText = text.replace(/😄|🌞|🌈|😔|🌧️|😞/g, () => {
        return targetEmojis[Math.floor(Math.random() * targetEmojis.length)];
    });

    return newText;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
