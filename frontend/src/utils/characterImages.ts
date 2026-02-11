import druidF from '../assets/characters/druid_f.png';
import druidM from '../assets/characters/druid_m.png';
import mageF from '../assets/characters/mage_f.png';
import mageM from '../assets/characters/mage_m.png';
import paladinF from '../assets/characters/paladin_f.png';
import paladinM from '../assets/characters/paladin_m.png';
import rogueF from '../assets/characters/rogue_f.png';
import rogueM from '../assets/characters/rogue_m.png';
import warriorF from '../assets/characters/warrior_f.png';
import warriorM from '../assets/characters/warrior_m.png';

export type Gender = 'Male' | 'Female';

export type CharacterClass =
  | 'Druid'
  | 'Mage'
  | 'Paladin'
  | 'Rogue'
  | 'Warrior';

export const CHARACTER_IMAGES: Record<
  CharacterClass,
  Record<Gender, string>
> = {
  Druid: { Female: druidF, Male: druidM },
  Mage: { Female: mageF, Male: mageM },
  Paladin: { Female: paladinF, Male: paladinM },
  Rogue: { Female: rogueF, Male: rogueM },
  Warrior: { Female: warriorF, Male: warriorM },
};

export const getCharacterImage = (
  className: CharacterClass,
  gender: Gender = 'Female'
): string => {
  return CHARACTER_IMAGES[className][gender];
};
