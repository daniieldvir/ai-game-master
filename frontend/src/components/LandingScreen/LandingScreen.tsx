import { WorldsStages } from "../../types/gameEnums";
import Button from "../UI/Button/Button";
import './LandingScreen.scss';

type Props = {
  onSelectWorld: (world: WorldsStages) => void;
};

export default function LandingScreen({ onSelectWorld }: Props) {
  const worlds = [
    { name: WorldsStages.Fantasy, icon: '⚔️' },
    { name: WorldsStages.Space, icon: '🚀' },
    { name: WorldsStages.Zombie, icon: '🧟' },
    { name: WorldsStages.Mystery, icon: '🔍' }
  ];

  return (
    <div className="landing-container">
      <h1>AI Game Master</h1>
      <p>Your portal to infinite adventures. Choose your realm:</p>
      <div className="world-buttons">
        {worlds.map((world) => (
          <div key={world.name} className="world-card" onClick={() => onSelectWorld(world.name)}>
            <span style={{ fontSize: '3rem' }}>{world.icon}</span>
            <h3>{world.name}</h3>
            <Button>Explore</Button>
          </div>
        ))}
      </div>
    </div>
  );
}