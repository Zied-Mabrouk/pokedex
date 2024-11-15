import { PokemonType, PokemonTypeEnum } from '../types/pokemon';
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
    case PokemonTypeEnum.NORMAL:
      return {
        icon: SiNormalizedotcss,
        type: typeColor,
      };
    case PokemonTypeEnum.FIRE:
      return {
        icon: FaFire,
        type: typeColor,
      };
    case PokemonTypeEnum.WATER:
      return {
        icon: FaWater,
        type: typeColor,
      };
    case PokemonTypeEnum.GRASS:
      return {
        icon: MdGrass,
        type: typeColor,
      };
    case PokemonTypeEnum.ICE:
      return {
        icon: FaDiceD6,
        type: typeColor,
      };
    case PokemonTypeEnum.ELECTRIC:
      return {
        icon: MdElectricBolt,
        type: typeColor,
      };
    case PokemonTypeEnum.PSYCHIC:
      return {
        icon: GiPsychicWaves,
        type: typeColor,
      };
    case PokemonTypeEnum.FIGHTING:
      return {
        icon: LuSwords,
        type: typeColor,
      };
    case PokemonTypeEnum.POISON:
      return {
        icon: GiPoisonBottle,
        type: typeColor,
      };
    case PokemonTypeEnum.GROUND:
      return {
        icon: GiEarthAmerica,
        type: typeColor,
      };
    case PokemonTypeEnum.FLYING:
      return {
        icon: GiBatWing,
        type: typeColor,
      };
    case PokemonTypeEnum.BUG:
      return {
        icon: FaBug,
        type: typeColor,
      };
    case PokemonTypeEnum.ROCK:
      return {
        icon: GiStoneBlock,
        type: typeColor,
      };
    case PokemonTypeEnum.GHOST:
      return {
        icon: FaGhost,
        type: typeColor,
      };
    case PokemonTypeEnum.STEEL:
      return {
        icon: GiSteelClaws,
        type: typeColor,
      };
    case PokemonTypeEnum.DRAGON:
      return {
        icon: GiDoubleDragon,
        type: typeColor,
      };
    case PokemonTypeEnum.DARK:
      return {
        icon: MdDarkMode,
        type: typeColor,
      };
    case PokemonTypeEnum.FAIRY:
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
