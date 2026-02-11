import { GameStages } from "../types/gameEnums";
import type { GameState } from '../types/gameTypes';


export const initGameState = (): GameState => {
    return {
        stage: GameStages.LANDING,
        world: null,
        character: null,
        adventureLog: [],
        summary: undefined,
    }
}