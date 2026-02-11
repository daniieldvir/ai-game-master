import { WorldsStages, type World } from "../../types/gameEnums";
import { getWorldPicture } from "../../utils/worldsImages";
import Button from "../UI/Button/Button";
import './LandingScreen.scss';

type Props = {
  onSelectWorld: (world: WorldsStages) => void;
};

export default function LandingScreen({ onSelectWorld }: Props) {

  const worlds: World[] = [
    { name: WorldsStages.Fantasy },
    { name: WorldsStages.Space },
    { name: WorldsStages.Zombie },
    { name: WorldsStages.Mystery },
  ];


  return (
    <div className="landing-container">
      <h1>AI Game Master</h1>
      <p>Your portal to infinite adventures. Choose your realm:</p>
      <div className="world-buttons">
        {worlds.map((world) => (
          <div key={world.name} className="world-card" onClick={() => onSelectWorld(world.name)}>
            <div className="world-image-container">
              <img src={getWorldPicture(world.name)} alt={world.name} />
            </div>
            <h3>{world.name}</h3>
            <Button>Explore</Button>
          </div>
        ))}
      </div>
    </div>
  );
}