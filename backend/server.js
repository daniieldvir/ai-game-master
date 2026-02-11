import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Health check endpoint for keep-alive services
app.get("/ping", (req, res) => {
    res.json({ status: "alive", timestamp: new Date().toISOString() });
});

app.post("/api/generate", async (req, res) => {
    try {
        const { world, characterName, charClass, userInput, history, currentStats } = req.body;

        if (!world || !characterName || !charClass) {
            return res.status(400).json({ error: "Missing required character or world information." });
        }

        const systemPrompt = `You are an expert Game Master (GM) in the world of "${world}".
Your goal is to provide an immersive, atmospheric, and reactive RPG experience for the player character "${characterName}", a ${charClass}.

STORYTELLING RULES:
- Style: Immersive, sensory-rich, yet concise (2-3 paragraphs). Use the atmosphere of ${world}.
- Continuity: Respect the provided history. Actions must have logical consequences.
- Agency: Always end by presenting exactly 3-4 structured options that reflect the situation.

MECHANICS:
- Health (HP): Max 100. Be fair but firm. High-risk actions should have HP consequences.
- Progress: Track if the story reaches a natural conclusion or character death.

RESPONSE FORMAT:
You MUST respond with a valid JSON object only:
{
  "scene": "Narrative description...",
  "options": ["Option 1", "Option 2", "Option 3"],
  "stats": {
    "hp": 100,
    "isGameOver": false
  }
}

Current Character HP: ${currentStats?.hp || 100}`;

        const messages = [{ role: "system", content: systemPrompt }];

        // Context Management: Only include relevant history to save tokens and maintain focus
        if (history && Array.isArray(history)) {
            const relevantHistory = history.slice(-5);
            relevantHistory.forEach(entry => {
                messages.push({ role: "assistant", content: JSON.stringify({ scene: entry.scene, options: entry.options }) });
                messages.push({ role: "user", content: entry.userInput });
            });
        }

        messages.push({
            role: "user",
            content: userInput || "The journey begins. Describe the opening scene and what happens first."
        });

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages,
            max_tokens: 1000,
            temperature: 0.8,
            response_format: { type: "json_object" },
        });

        const aiText = response.choices[0]?.message?.content ?? '{}';
        const parsed = JSON.parse(aiText);

        res.json({
            scene: parsed.scene || "The mists of destiny cloud your path. Try again.",
            options: parsed.options || ["Look around", "Check equipment", "Move forward"],
            stats: parsed.stats || { hp: currentStats?.hp || 100, isGameOver: false }
        });

    } catch (error) {
        console.error("GM Engine Error:", error);
        res.status(500).json({
            error: "The Game Master is momentarily lost in thought. Please try again.",
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
