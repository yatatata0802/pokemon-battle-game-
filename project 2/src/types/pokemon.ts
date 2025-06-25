export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  level: number;
  exp: number;
  expToNext: number;
  sprite: string;
  moves: Move[];
}

export interface Move {
  name: string;
  power: number;
  type: string;
  accuracy: number;
  pp: number;
  maxPp: number;
}

export interface Battle {
  playerPokemon: Pokemon;
  enemyPokemon: Pokemon;
  turn: 'player' | 'enemy';
  battleLog: string[];
  isComplete: boolean;
  winner: 'player' | 'enemy' | null;
}

export interface GameState {
  player: {
    name: string;
    pokemon: Pokemon[];
    activePokemon: number;
    badges: number;
    money: number;
  };
  currentScene: 'menu' | 'adventure' | 'battle' | 'pokemon' | 'shop';
  battle: Battle | null;
}