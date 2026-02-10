import { useEffect, useState, useCallback } from 'react';
import './App.scss';
import AdventureScene from './components/AdventureScene/AdventureScene';
import CharacterCreation from './components/CharacterCreation/CharacterCreation';
import LandingScreen from './components/LandingScreen/LandingScreen';
import SummaryScreen from './components/SummaryScreen/SummaryScreen';
import ThemeToggle from './components/UI/ThemeToggle/ThemeToggle';
import { GameStages, WorldsStages } from './types/gameEnums';
import type { Character, GameState } from './types/gameTypes';
import { getBackgroundImage, initGameState } from './utils/helpers';


function App() {
  const [gameState, setGameState] = useState<GameState>(initGameState());
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [showCharacterModal, setShowCharacterModal] = useState(false);

  useEffect(() => {
    setBgImage(gameState.world && getBackgroundImage(gameState.world));
  }, [gameState.world]);


  const startGame = (world: WorldsStages) => {
    setGameState((prev) => ({ ...prev, world: world }));
    setShowCharacterModal(true);
  };

  const createCharacter = (character: Character) => {
    setGameState((prev) => ({
      ...prev,
      stage: GameStages.ADVENTURE,
      character,
    }));
    setShowCharacterModal(false);
  };

  const restartGame = () => {
    setGameState(initGameState());
    setBgImage(null);
    setShowCharacterModal(false);
  };

  const retryPath = () => {
    setGameState((prev) => ({ ...prev, stage: GameStages.ADVENTURE }));
  };
  const handleCancelCharacterCreation = () => {
    setGameState((prev) => ({ ...prev, world: null }));
    setShowCharacterModal(false);
  };

  const handleLogUpdate = useCallback((newLog: any[]) => {
    setGameState(prev => {
      // Only update if length changed to avoid loops
      if (prev.adventureLog.length === newLog.length) return prev;
      return { ...prev, adventureLog: newLog };
    });
  }, []);

  return (
    <div className="app-container" style={{
      backgroundImage: bgImage ? `url(${bgImage})` : 'none',
    }}>
      <div className="app-overlay">
        <ThemeToggle />
        {gameState.stage === GameStages.LANDING && <LandingScreen onSelectWorld={startGame} />}
        {showCharacterModal && <CharacterCreation onCreateCharacter={createCharacter} onClose={handleCancelCharacterCreation} />}
        {gameState.stage === GameStages.ADVENTURE && gameState.world && (
          <AdventureScene
            character={gameState.character as Character}
            world={gameState.world as string}
            onGameOver={(summary) => setGameState(prev => ({ ...prev, stage: GameStages.SUMMARY, summary }))}
            initialHistory={gameState.adventureLog}
            onLogUpdate={handleLogUpdate}
          />
        )}
        {gameState.stage === GameStages.SUMMARY && gameState.summary && (
          <SummaryScreen summary={gameState.summary} onRetryPath={retryPath} onNewGame={restartGame} />
        )}
      </div>
    </div>
  );
}

export default App;
