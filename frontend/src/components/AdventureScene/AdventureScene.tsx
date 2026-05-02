import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import { useAdventureGame } from "../../hooks/useAdventureGame";
import { useTypewriter } from "../../hooks/useTypewriter";
import type { Character, HistoryEntry } from '../../types/gameTypes';
import './AdventureScene.scss';
import AdventureControls from "./InternalComponents/AdventureControls";
import AdventureSidebar from "./InternalComponents/AdventureSidebar";

type Props = {
  character: Character;
  world: string;
  initialHistory?: HistoryEntry[];
  onLogUpdate?: (newLog: HistoryEntry[]) => void;
  onGameOver?: (summary: string) => void;
};

export default function AdventureScene({ character, world, initialHistory, onLogUpdate, onGameOver }: Props) {
  const {
    fullSceneText,
    options,
    loading,
    history,
    hp,
    userInput,
    setUserInput,
    handleAction
  } = useAdventureGame(character, world, initialHistory, onLogUpdate, onGameOver);

  const { displayedText, isTyping, skip } = useTypewriter(fullSceneText);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when it's user turn
  useEffect(() => {
    if (!loading && !isTyping) {
      // slight delay to ensure render
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [loading, isTyping]);

  const onSend = useCallback((input: string) => {
    if (isTyping) return skip();
    handleAction(input, false);
  }, [handleAction, skip, isTyping]);


  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSend(userInput);
  }, [onSend, userInput]);

  return (
    <div className="adventure-container">
      <div className="main-story-area">
        <div className="scene-card" onClick={isTyping ? skip : undefined}>
          <div className="scene-text">
            {displayedText}
            {isTyping && <span className="typewriter-cursor">|</span>}
          </div>
          {loading && (
            <div className="loading-indicator">
              The Master is narrating...
            </div>
          )}
        </div>

        {!loading && !isTyping && (
          <AdventureControls
            options={options}
            userInput={userInput}
            setUserInput={setUserInput}
            handleKeyDown={handleKeyDown}
            onSend={onSend}
            inputRef={inputRef}
          />
        )}
      </div>

      <AdventureSidebar
        character={character}
        hp={hp}
        world={world}
        history={history}
        onLeave={() => onGameOver?.("The hero decided to retire from adventuring.")}
      />
    </div >
  );
}
