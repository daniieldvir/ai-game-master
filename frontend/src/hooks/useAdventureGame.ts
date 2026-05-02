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
    const [scene, setScene] = useState({ text: "", options: [] as string[], hp: 100 });
    const [loading, setLoading] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);

    // Lock and current state tracking
    const isProcessing = useRef(false);

    const fetchNextScene = useCallback(async (action: string) => {
        if (isProcessing.current) return;
        isProcessing.current = true;
        setLoading(true);

        // Prepare context: if it's a user action, add current scene to log before requesting new one
        const updatedHistory = action
            ? [...history, { scene: scene.text, options: scene.options, userInput: action }]
            : history;

        const response = await generateScene(
            world,
            character.name,
            character.class,
            action,
            updatedHistory.slice(-5),
            { hp: scene.hp }
        );

        if (response.stats.isGameOver || response.stats.hp <= 0) {
            onGameOver?.(response.scene);
        } else {
            setScene({
                text: response.scene,
                options: response.options,
                hp: response.stats.hp
            });

            if (action) {
                setHistory(updatedHistory);
                onLogUpdate?.(updatedHistory);
                setUserInput("");
            }
        }

        setLoading(false);
        isProcessing.current = false;
    }, [world, character, scene, history, onGameOver, onLogUpdate]);

    // Initialize game
    useEffect(() => {
        if (!scene.text) fetchNextScene("");
    }, [fetchNextScene, scene.text]);

    const handleAction = (input: string, isTyping: boolean) => {
        if (!input.trim() || loading || isTyping) return;
        fetchNextScene(input);
    };

    return {
        fullSceneText: scene.text,
        options: scene.options,
        hp: scene.hp,
        loading,
        history,
        userInput,
        setUserInput,
        handleAction
    };
}
