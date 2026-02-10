import fantasyBg from '../assets/backgroundPic/fantasy.png';
import mysteryBg from '../assets/backgroundPic/mystery.jpg';
import spaceBg from '../assets/backgroundPic/space.jpg';
import zombieBg from '../assets/backgroundPic/zombie.jpg';
import { GameStages, WorldsStages } from "../types/gameEnums";
import type { GameState } from '../types/gameTypes';

const backgroundByWorld: Record<WorldsStages, string> = {
    [WorldsStages.Fantasy]: fantasyBg,
    [WorldsStages.Space]: spaceBg,
    [WorldsStages.Zombie]: zombieBg,
    [WorldsStages.Mystery]: mysteryBg,
};

export const getBackgroundImage = (world: WorldsStages): string => {
    return backgroundByWorld[world];
};


export const initGameState = (): GameState => {
    return {
        stage: GameStages.LANDING,
        world: null,
        character: null,
        adventureLog: [],
        summary: undefined,
    }
}