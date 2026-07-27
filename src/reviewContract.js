import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function reviewContract(contractText) {
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are a contract analyst specializing in creator economy agreements.
        
Your job is to review contracts and protect content creators.

You must respond in this exact JSON format and nothing else:
{
  "verdict": "GREEN LIGHT" or "CAUTION" or "DO NOT SIGN",
  "summary": "2-3 sentence plain English summary of the contract",
  "fishy": [
    {
      "clause": "clause name or section number",
      "issue": "plain English explanation of why this is a red flag"
    }
  ],
  "safe": [
    "list of clauses or sections that look fair and standard"
  ],
  "recommendation": "one clear actionable sentence telling the creator what to do next"
}`
      },
      {
        role: 'user',
        content: `Please review this contract:\n\n${contractText}`
      }
    ]
  })

  const raw = response.choices[0].message.content
  const parsed = JSON.parse(raw)
  return parsed
}