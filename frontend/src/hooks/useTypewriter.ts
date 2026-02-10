import { useState, useEffect, useRef } from 'react';

export function useTypewriter(text: string, speed: number = 15) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const timerRef = useRef<any>(null);

    useEffect(() => {
        if (!text) return;

        setIsTyping(true);
        setDisplayedText("");
        let index = 0;

        if (timerRef.current) clearTimeout(timerRef.current);

        const typeNextChar = () => {
            // If we've reached the end of the text
            if (index >= text.length) {
                setIsTyping(false);
                return;
            }

            const char = text.charAt(index);
            setDisplayedText((prev) => prev + char);
            index++;

            let currentSpeed = speed;
            // Add pauses for punctuation
            if (char === '.' || char === '!' || char === '?') {
                currentSpeed = speed * 25; // Longer pause for sentence end
            } else if (char === ',' || char === ';') {
                currentSpeed = speed * 10; // Medium pause for clauses
            }

            timerRef.current = setTimeout(typeNextChar, currentSpeed);
        };

        timerRef.current = setTimeout(typeNextChar, speed);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [text, speed]);

    const skip = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setDisplayedText(text);
        setIsTyping(false);
    };

    return { displayedText, isTyping, skip };
}
