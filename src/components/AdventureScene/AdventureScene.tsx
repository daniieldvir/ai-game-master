import Button from '../UI/Button/Button';
import './AdventureScene.scss';
import type { Character } from '../../types/gameTypes';

type Props = {
  character: Character;
  sceneText: string;
  options?: string[];
  onUserInput: (input: string) => void;
  loading: boolean;
};

export default function AdventureScene({ character, sceneText, options, onUserInput, loading }: Props) {
  return (
    <div className="adventure-container">
      <div className="scene-card">
        <h2>The Journey Begins</h2>
        <div className="scene-text">
          {sceneText}
          <p className="character-info">You are a {character.class}.</p>
        </div>

        {loading && (
          <div className="loading-indicator">
            The AI is weaving your destiny...
          </div>
        )}
      </div>

      {options && options.length > 0 ? (
        <ul className="options-grid">
          {options.map((opt) => (
            <li key={opt}>
              <Button onClick={() => onUserInput(opt)} disabled={loading}>
                {opt}
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        !loading && (
          <div className="user-input-container">
            <input
              type="text"
              placeholder="What do you do next?..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onUserInput((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
            <Button onClick={() => {
              const input = document.querySelector('input');
              if (input) {
                onUserInput(input.value);
                input.value = '';
              }
            }}>Send</Button>
          </div>
        )
      )}
    </div>
  );
}