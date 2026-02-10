import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/generate", async (req, res) => {
    try {
        const { world, characterName, charClass, userInput, history, currentStats } = req.body;

        const systemPrompt = `You are a Game Master in the world of "${world}".
The player's character is "${characterName}", a ${charClass}.

RULES:
- Generate a short, exciting scene (2-3 paragraphs max).
- Always provide exactly 3-4 action options for the player.
- Track character Health (HP) out of 100.
- If an action should cause damage, decrease HP. If it should heal, increase HP.
- Respond ONLY in valid JSON format.

Current Status:
HP: ${currentStats?.hp || 100}

Response format:
{
  "scene": "The scene description here...",
  "options": ["Option 1", "Option 2", "Option 3"],
  "stats": {
    "hp": 85,
    "isGameOver": false
  }
}`;

        const messages = [
            { role: "system", content: systemPrompt },
        ];

        // Add conversation history for context
        if (history && Array.isArray(history)) {
            for (const entry of history) {
                messages.push({ role: "assistant", content: JSON.stringify({ scene: entry.scene, options: entry.options }) });
                messages.push({ role: "user", content: entry.userInput });
            }
        }

        // Add current user input
        messages.push({
            role: "user",
            content: userInput || "Start the adventure. Describe the opening scene."
        });

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages,
            max_tokens: 800,
            temperature: 0.9,
            response_format: { type: "json_object" },
        });

        const aiText = response.choices[0]?.message?.content ?? '{}';
        console.log("AI returned:", aiText);

        const parsed = JSON.parse(aiText);

        res.json({
            scene: parsed.scene || "Something mysterious happened...",
            options: parsed.options || [],
            stats: parsed.stats || { hp: currentStats?.hp || 100, isGameOver: false }
        });

    } catch (error) {
        console.error("Groq error details:", error?.message);
        const statusCode = error?.status || 500;
        const errorMessage = error?.error?.message || error?.message || "Unknown error";

        res.status(statusCode).json({
            error: errorMessage,
            status: statusCode
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
