const { analyzeEssay } = require('./utils/openai');
const { ANALYSIS_PROMPT, RECOMMENDATION_PROMPT } = require('./utils/prompts');

module.exports = async (req, res) => {
  // Set CORS headers for frontend integration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { essay } = req.body;
    
    if (!essay || typeof essay !== 'string') {
      return res.status(400).json({ error: 'Essay text is required' });
    }

    // Step 1: Analyze the essay
    const analysisResult = await analyzeEssay(essay, ANALYSIS_PROMPT);
    const analysisData = JSON.parse(analysisResult);
    
    // Step 2: Generate university recommendations based on the analysis
    const recommendationResult = await analyzeEssay(
      JSON.stringify(analysisData), 
      RECOMMENDATION_PROMPT
    );
    const recommendations = JSON.parse(recommendationResult);
    
    // Combine results
    const result = {
      analysis: analysisData,
      recommendations
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error processing essay:', error);
    return res.status(500).json({ 
      error: 'Failed to process essay', 
      details: error.message 
    });
  }
};