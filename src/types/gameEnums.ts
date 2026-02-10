export const GameStages = {
    LANDING: 'landing',
    CHARACTER_CREATION: 'characterCreation',
    ADVENTURE: 'adventure',
    SUMMARY: 'summary',
} as const;

export type GameStages = (typeof GameStages)[keyof typeof GameStages];
