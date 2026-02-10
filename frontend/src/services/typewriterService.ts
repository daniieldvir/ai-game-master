export type SceneResponse = {
    scene: string;
    options: string[];
    stats: {
        hp: number;
        isGameOver: boolean;
    };
};

import type { HistoryEntry } from "../types/gameTypes";

export async function generateScene(
    world: string,
    characterName: string,
    charClass: string,
    userInput: string,
    history: HistoryEntry[] = [],
    currentStats: { hp: number } = { hp: 100 }
): Promise<SceneResponse> {
    try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ world, characterName, charClass, userInput, history, currentStats }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Server error");
        }

        const data = await res.json();
        return {
            scene: data.scene || "Something mysterious happened...",
            options: data.options || [],
            stats: data.stats || { hp: currentStats.hp, isGameOver: false }
        };
    } catch (error) {
        console.error("Error generating scene:", error);
        return {
            scene: "⚠️ The magical connection was lost. Try again...",
            options: ["Try again"],
            stats: { hp: currentStats.hp, isGameOver: false }
        };
    }
}
