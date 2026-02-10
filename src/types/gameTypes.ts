import type { GameStages } from "./gameEnums";

export type Character = {
    name: string;
    class: string;
    description?: string;
    stats?: Record<string, number>;
    inventory?: string[];
    health?: number;
  };
  
  export type GameState = {
    stage: GameStages;
    world: string | null;
    character: Character | null;
    adventureLog: Array<{ sceneText: string; userInput: string; aiResponse: string }>;
    currentScene: { sceneText: string; options?: string[] } | null;
    summary?: string;
  };
  