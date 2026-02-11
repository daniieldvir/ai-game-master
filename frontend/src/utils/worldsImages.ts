import fantasyBg from '../assets/backgroundPic/fantasy.png';
import mysteryBg from '../assets/backgroundPic/mystery.jpg';
import spaceBg from '../assets/backgroundPic/space.jpg';
import zombieBg from '../assets/backgroundPic/zombie.jpg';
import fantasyPic from '../assets/worldsPic/fantasy.png';
import mysteryPic from '../assets/worldsPic/mystery.png';
import spacePic from '../assets/worldsPic/space.png';
import zombiePic from '../assets/worldsPic/zombie.png';
import { WorldsStages } from '../types/gameEnums';

const backgroundByWorld: Record<WorldsStages, string> = {
    [WorldsStages.Fantasy]: fantasyBg,
    [WorldsStages.Space]: spaceBg,
    [WorldsStages.Zombie]: zombieBg,
    [WorldsStages.Mystery]: mysteryBg,
};

export const getBackgroundImage = (world: WorldsStages): string => {
    return backgroundByWorld[world];
};


export const worldByPicture: Record<WorldsStages, string> = {
    [WorldsStages.Fantasy]: fantasyPic,
    [WorldsStages.Space]: spacePic,
    [WorldsStages.Zombie]: zombiePic,
    [WorldsStages.Mystery]: mysteryPic,
};


export const getWorldPicture = (world: WorldsStages): string => {
    return worldByPicture[world];
};
