import { useEffect, useState, useCallback, useRef } from 'react';
import { generateScene } from '../services/typewriterService';
import type { Character, HistoryEntry } from '../types/gameTypes';

export function useAdventureGame(
    character: Character,
    world: string,
    initialHistory: HistoryEntry[] = [],
    onLogUpdate?: (newLog: HistoryEntry[]) => void,
    onGameOver?: (summary: string) => void,
) {
    // Current scene state
    const [scene, setScene] = useState({
        text: "",
        options: [] as string[],
        hp: 100
    });

    // UI state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userInput, setUserInput] = useState("");

    // Game history state
    const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);

    // Lock for preventing duplicate requests
    const requestLock = useRef(false);

    // Helper function to call the API and update state
    const performSceneGeneration = useCallback(async (input: string, currentHistory: HistoryEntry[]) => {
        if (requestLock.current) return;
        requestLock.current = true;

        setLoading(true);
        setError(null);

        try {
            // Include current action in history for the API context
            // Note: For the initial scene (empty input), history is empty/initial
            const historyContext = input ? [...currentHistory, {
                scene: scene.text,
                options: scene.options,
                userInput: input
            }] : currentHistory;

            const response = await generateScene(
                world,
                character.name,
                character.class,
                input,
                historyContext.slice(-5), // Send last 5 entries for context
                { hp: scene.hp }
            );

            if (response.stats.isGameOver || response.stats.hp <= 0) {
                onGameOver?.(response.scene);
                return;
            }

            setScene({
                text: response.scene,
                options: response.options,
                hp: response.stats.hp
            });

            // If this was a user action, update the local history
            if (input) {
                setHistory(historyContext);
                onLogUpdate?.(historyContext);
                setUserInput("");
            }

        } catch (err) {
            console.error("Game Error:", err);
            setError(input
                ? "The Game Master is silent... Please try that action again."
                : "Failed to begin the adventure. Please check your connection."
            );
        } finally {
            setLoading(false);
            // Small delay to prevent double-clicks
            setTimeout(() => {
                requestLock.current = false;
            }, 250);
        }
    }, [world, character, scene, onGameOver, onLogUpdate]);

    // Initial game load
    useEffect(() => {
        // Only fetch if we don't have a scene yet (or just starting)
        performSceneGeneration("", []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on mount

    // Handle user submission
    const handleAction = async (input: string, isTyping: boolean) => {
        if (!input.trim() || loading || isTyping) return;
        await performSceneGeneration(input, history);
    };

    return {
        fullSceneText: scene.text,
        options: scene.options,
        hp: scene.hp,
        loading,
        error,
        history,
        userInput,
        setUserInput,
        handleAction
    };
}
