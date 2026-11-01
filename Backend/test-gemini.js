require("dotenv").config();

console.log("Step 1: Script started");

console.log(
  "Step 2: Gemini API key loaded:",
  Boolean(process.env.GEMINI_API_KEY),
);

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  console.log("Sending request...");

  const timeout = setTimeout(() => {
    console.log("Request is still pending after 15 seconds.");
  }, 15000);

  try {
    const start = Date.now();

    const response = await ai.interactions.create({
      model: "gemini-3.5-flash-lite",
      input: "Reply with only: Hello",
      store: false,
    });

    console.log("Response time:", (Date.now() - start) / 1000, "seconds");
    console.log("Gemini Response:", response.output_text);
  } catch (error) {
    console.error("Request failed:", error.message || error);
  } finally {
    clearTimeout(timeout);
  }
}

testGemini().catch(console.error);
