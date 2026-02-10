import { useState } from 'react';
import './App.scss';
import AdventureScene from './components/AdventureScene/AdventureScene';
import CharacterCreation from './components/CharacterCreation/CharacterCreation';
import LandingScreen from './components/LandingScreen/LandingScreen';
import SummaryScreen from './components/SummaryScreen/SummaryScreen';
import ThemeToggle from './components/UI/ThemeToggle/ThemeToggle';
import { GameStages } from './types/gameEnums';
import type { Character, GameState } from './types/gameTypes';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    stage: GameStages.LANDING,
    world: null,
    character: null,
    adventureLog: [],
    currentScene: null,
    summary: undefined,
  });

  const [showCharacterModal, setShowCharacterModal] = useState(false);

  const startGame = (world: string) => {
    setGameState((prev) => ({ ...prev, world }));
    setShowCharacterModal(true);
  };

  const createCharacter = (character: Character) => {
    setGameState((prev) => ({
      ...prev,
      stage: GameStages.ADVENTURE,
      character,
      currentScene: { sceneText: `Welcome to the adventure, ${character.name}!` },
    }));
    setShowCharacterModal(false);
  };

  const restartGame = () => {
    setGameState({
      stage: GameStages.LANDING,
      world: null,
      character: null,
      adventureLog: [],
      currentScene: null,
      summary: undefined,
    });
    setShowCharacterModal(false);
  };

  console.log(gameState, 'gameState');
  return (
    <>
      <ThemeToggle />
      {gameState.stage === GameStages.LANDING && <LandingScreen onSelectWorld={startGame} />}
      {showCharacterModal && <CharacterCreation onCreateCharacter={createCharacter} onClose={() => setShowCharacterModal(false)} />}
      {gameState.stage === GameStages.ADVENTURE && gameState.currentScene && (
        <AdventureScene
          character={gameState.character as Character}
          sceneText={gameState.currentScene.sceneText}
          options={gameState.currentScene.options}
          onUserInput={(input) => console.log('User input:', input)}
          loading={false}
        />
      )}
      {gameState.stage === 'summary' && gameState.summary && (
        <SummaryScreen summary={gameState.summary} onRestart={restartGame} onNewGame={restartGame} />
      )}
    </>
  );
}

export default App
