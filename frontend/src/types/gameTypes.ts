import type { GameStages, WorldsStages } from "./gameEnums";

export type Character = {
  name: string;
  class: string;
};

export type HistoryEntry = {
  scene: string;
  options: string[];
  userInput: string;
};

export type GameState = {
  stage: GameStages;
  world: WorldsStages | null;
  character: Character | null;
  adventureLog: HistoryEntry[];
  summary?: string;
};
