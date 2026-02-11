export const GameStages = {
    LANDING: 'landing',
    CHARACTER_CREATION: 'characterCreation',
    ADVENTURE: 'adventure',
    SUMMARY: 'summary',
} as const;

export type GameStages = (typeof GameStages)[keyof typeof GameStages];

export type World = {
    name: WorldsStages;
  };

export const WorldsStages = {
    Fantasy: 'Fantasy',
    Space: 'Space',
    Zombie: 'Zombie',
    Mystery: 'Mystery',
} as const;

export type WorldsStages = (typeof WorldsStages)[keyof typeof WorldsStages];

