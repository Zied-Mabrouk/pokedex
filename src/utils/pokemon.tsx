import { PokemonType } from '../types/pokemon';
import { SiNormalizedotcss } from 'react-icons/si';
import { LuSwords } from 'react-icons/lu';
import {
  GiBatWing,
  GiDoubleDragon,
  GiEarthAmerica,
  GiFairyWand,
  GiPoisonBottle,
  GiPsychicWaves,
  GiSteelClaws,
  GiStoneBlock,
} from 'react-icons/gi';
import { MdDarkMode, MdElectricBolt, MdGrass } from 'react-icons/md';
import {
  FaBug,
  FaDiceD6,
  FaFire,
  FaGhost,
  FaQuestion,
  FaWater,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

export type PokemonTypeColor = {
  icon: IconType;
  type: string;
};

export const getPokemonTypeColor = (typeColor: string): PokemonTypeColor => {
  switch (typeColor) {
    case 'normal':
      return {
        icon: SiNormalizedotcss,
        type: typeColor,
      };
    case 'fire':
      return {
        icon: FaFire,
        type: typeColor,
      };
    case 'water':
      return {
        icon: FaWater,
        type: typeColor,
      };
    case 'grass':
      return {
        icon: MdGrass,
        type: typeColor,
      };
    case 'ice':
      return {
        icon: FaDiceD6,
        type: typeColor,
      };
    case 'electric':
      return {
        icon: MdElectricBolt,
        type: typeColor,
      };
    case 'psychic':
      return {
        icon: GiPsychicWaves,
        type: typeColor,
      };
    case 'fighting':
      return {
        icon: LuSwords,
        type: typeColor,
      };
    case 'poison':
      return {
        icon: GiPoisonBottle,
        type: typeColor,
      };
    case 'ground':
      return {
        icon: GiEarthAmerica,
        type: typeColor,
      };
    case 'flying':
      return {
        icon: GiBatWing,
        type: typeColor,
      };
    case 'bug':
      return {
        icon: FaBug,
        type: typeColor,
      };
    case 'rock':
      return {
        icon: GiStoneBlock,
        type: typeColor,
      };
    case 'ghost':
      return {
        icon: FaGhost,
        type: typeColor,
      };
    case 'steel':
      return {
        icon: GiSteelClaws,
        type: typeColor,
      };
    case 'dragon':
      return {
        icon: GiDoubleDragon,
        type: typeColor,
      };
    case 'dark':
      return {
        icon: MdDarkMode,
        type: typeColor,
      };
    case 'fairy':
      return {
        icon: GiFairyWand,
        type: typeColor,
      };
    default:
      return {
        icon: FaQuestion,
        type: typeColor,
      };
  }
};
export const getPokemonTypeColors = (
  typeColors: PokemonType['types']
): PokemonTypeColor[] => {
  return (typeColors ?? []).map((typeColor) => getPokemonTypeColor(typeColor));
};
