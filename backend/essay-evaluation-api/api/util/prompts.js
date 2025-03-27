const ANALYSIS_PROMPT = `
You are an expert college admissions counselor with decades of experience evaluating essays for top universities including Ivy League schools. Analyze the following college application essay thoroughly.

Extract and rate these features on a scale of 1-10:
1. Personal authenticity (how genuine and unique the voice is)
2. Story coherence (logical flow and structure)
3. Writing quality (grammar, vocabulary, style)
4. Character development (personal growth shown)
5. Emotional impact (how moving the essay is)
6. Uniqueness (originality of perspective or experience)
7. Alignment with academic goals
8. Demonstration of values matching elite institutions

Format your response as JSON with these sections:
- features: detailed evaluation of each feature with score/10
- overallScore: numeric score out of 10
- strengths: list of essay's main strengths
- weaknesses: list of areas for improvement
- evaluation: one of ["LIKELY_ADMIT", "NEEDS_IMPROVEMENT", "UNLIKELY_ADMIT"]
- feedback: detailed constructive feedback for improvement

Evaluate honestly and thoroughly as this will help determine fit for top universities.
`;

const RECOMMENDATION_PROMPT = `
Based on the essay analysis results provided, recommend universities where this applicant would have a good chance of admission.

Consider the following:
1. The overall essay quality score
2. The specific strengths and weaknesses identified
3. The applicant's apparent interests and goals
4. Match between the student profile and university values

For each recommended university, provide:
1. University name
2. Why this university would be a good match
3. Estimated chance of admission (high/medium/low)
4. Any specific programs that might be particularly suitable

Return your response as a JSON object with an array of recommended universities.
`;

module.exports = {
  ANALYSIS_PROMPT,
  RECOMMENDATION_PROMPT
};