const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// 🔑 Read the Gemini API key from secure Firebase config
const geminiKey = functions.config().gemini.key;
const genAI = new GoogleGenerativeAI(geminiKey);

// Define an HTTPS function to handle POST requests
exports.askGemini = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Only POST requests allowed' });
  }

  const prompt = req.body?.prompt || '';
  if (!prompt.trim()) {
    return res.status(400).send({ error: 'Prompt is empty' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const reply = result.response.text();
    res.status(200).send({ reply });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).send({ error: 'Failed to get response from Gemini' });
  }
});
