const OPENAI = require('openai');



export const openai = new OPENAI({
    apiKey: process.env.OPENAI_API_KEY
  });