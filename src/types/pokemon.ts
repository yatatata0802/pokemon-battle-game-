export interface Move {
  name: string;
  jpName: string;
  type: string;
  power: number;
  accuracy: number;
  pp: number;
  currentPp: number;
  category: "physical" | "special" | "status";
  description: string;
}

export interface Pokemon {
  id: number;
  name: string;
  jpName: string;
  img: string;
  backImg?: string;
  types: string[];
  level: number;
  hp: number;
  maxHp: number;
  baseHp: number;
  attack: number;
  defense: number;
  speed: number;
  moves: Move[];
  experience: number;
  experienceToNext: number;
  statusEffect?: StatusEffect;
  statusTurns?: number;
  evolutionLevel?: number;
  evolutionId?: number;
  caught: boolean;
  shiny?: boolean;
  sprite: string;
  catchRate: number;
  isWild: boolean;
}

export interface StatusEffect {
  type: "burn" | "freeze" | "paralysis" | "poison" | "sleep" | "confusion";
  name: string;
  jpName: string;
}

export interface Badge {
  id: string;
  name: string;
  jpName: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: string;
}

export interface GameState {
  playerPokemon: Pokemon[];
  selectedPokemon?: Pokemon;
  opponent?: Pokemon;
  badges: Badge[];
  pokedexSeen: number[];
  pokedexCaught: number[];
  currentRegion: number;
  battleWins: number;
  gameMode: "story" | "wild" | "gym";
}

export interface MonsterBall {
  id: number;
  name: string;
  catchRate: number;
  sprite: string;
  count: number;
}

export interface PlayerInventory {
  monsterBalls: MonsterBall[];
  caughtPokemon: Pokemon[];
  maxPokemon: number;
}

export interface BattleState {
  isWildBattle: boolean;
  canCatch: boolean;
  canRun: boolean;
  catchAttempts: number;
  maxCatchAttempts: number;
}
