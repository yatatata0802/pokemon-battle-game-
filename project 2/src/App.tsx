import React, { useState, useCallback } from 'react';
import { GameState, Pokemon } from './types/pokemon';
import { MainMenu } from './components/MainMenu';
import { StarterSelection } from './components/StarterSelection';
import { AdventureScene } from './components/AdventureScene';
import { BattleScene } from './components/BattleScene';
import { PokemonTeam } from './components/PokemonTeam';
import { useBattle } from './hooks/useBattle';

const initialGameState: GameState = {
  player: {
    name: 'トレーナー',
    pokemon: [],
    activePokemon: 0,
    badges: 0,
    money: 500,
  },
  currentScene: 'menu',
  battle: null,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { battle, startBattle, executeBattleAction, endBattle } = useBattle();

  const handleSelectStarter = useCallback((pokemon: Pokemon) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        pokemon: [pokemon],
      },
      currentScene: 'menu',
    }));
  }, []);

  const handleStartAdventure = useCallback(() => {
    setGameState(prev => ({ ...prev, currentScene: 'adventure' }));
  }, []);

  const handleViewPokemon = useCallback(() => {
    setGameState(prev => ({ ...prev, currentScene: 'pokemon' }));
  }, []);

  const handleBackToMenu = useCallback(() => {
    setGameState(prev => ({ ...prev, currentScene: 'menu' }));
  }, []);

  const handleStartNewGame = useCallback(() => {
    setGameState(prev => ({ ...prev, currentScene: 'starter' }));
  }, []);

  const handleEncounter = useCallback((wildPokemon: Pokemon) => {
    const playerPokemon = gameState.player.pokemon[gameState.player.activePokemon];
    if (playerPokemon) {
      startBattle(playerPokemon, wildPokemon);
      setGameState(prev => ({ ...prev, currentScene: 'battle' }));
    }
  }, [gameState.player.pokemon, gameState.player.activePokemon, startBattle]);

  const handleBattleEnd = useCallback((winner: 'player' | 'enemy') => {
    if (winner === 'player' && battle) {
      // バトル勝利時の処理
      setGameState(prev => {
        const newPokemon = [...prev.player.pokemon];
        const activePokemonIndex = prev.player.activePokemon;
        
        if (battle.playerPokemon) {
          // 経験値とHPを更新
          newPokemon[activePokemonIndex] = {
            ...newPokemon[activePokemonIndex],
            exp: battle.playerPokemon.exp,
            hp: battle.playerPokemon.hp,
          };
        }

        return {
          ...prev,
          player: {
            ...prev.player,
            pokemon: newPokemon,
            money: prev.player.money + 100, // 勝利報酬
          },
          currentScene: 'adventure',
        };
      });
    } else {
      // バトル敗北時
      setGameState(prev => ({ ...prev, currentScene: 'adventure' }));
    }
    
    endBattle();
  }, [battle, endBattle]);

  const handleSelectPokemon = useCallback((index: number) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        activePokemon: index,
      },
    }));
  }, []);

  // シーンの描画
  const renderCurrentScene = () => {
    switch (gameState.currentScene) {
      case 'starter':
        return <StarterSelection onSelectStarter={handleSelectStarter} />;
      
      case 'adventure':
        return (
          <AdventureScene
            onEncounter={handleEncounter}
            onBackToMenu={handleBackToMenu}
          />
        );
      
      case 'battle':
        return battle ? (
          <BattleScene
            battle={battle}
            onBattleEnd={handleBattleEnd}
            onBattleAction={executeBattleAction}
          />
        ) : null;
      
      case 'pokemon':
        return (
          <PokemonTeam
            pokemon={gameState.player.pokemon}
            activePokemon={gameState.player.activePokemon}
            onSelectPokemon={handleSelectPokemon}
            onBackToMenu={handleBackToMenu}
          />
        );
      
      default:
        return (
          <MainMenu
            gameState={gameState}
            onStartAdventure={handleStartAdventure}
            onViewPokemon={handleViewPokemon}
            onStartNewGame={handleStartNewGame}
          />
        );
    }
  };

  return (
    <div className="font-pokemon">
      {renderCurrentScene()}
    </div>
  );
}

export default App;