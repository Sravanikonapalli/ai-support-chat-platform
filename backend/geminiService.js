const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

// Initialize Hugging Face API client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function getHuggingFaceResponse(prompt) {
  // Use Hugging Face's model to generate a response
  const response = await hf.textGeneration({
    model: 'gpt-2', // Replace with your desired model
    inputs: prompt,
  });

  return response.generated_text;
}

module.exports = { getHuggingFaceResponse };
