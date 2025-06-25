import React from 'react';
import { GameState } from '../types/pokemon';

interface MainMenuProps {
  gameState: GameState;
  onStartAdventure: () => void;
  onViewPokemon: () => void;
  onStartNewGame: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  gameState,
  onStartAdventure,
  onViewPokemon,
  onStartNewGame
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 animate-pulse-slow">
            ⚡ ポケモン アドベンチャー ⚡
          </h1>
          <p className="text-2xl text-white/90">みんなで たのしもう！</p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-8">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">👋 こんにちは、{gameState.player.name}！</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
              <div className="bg-white/20 rounded-2xl p-4">
                <div className="text-3xl mb-2">🏆</div>
                <div>バッジ: {gameState.player.badges}</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4">
                <div className="text-3xl mb-2">⚡</div>
                <div>ポケモン: {gameState.player.pokemon.length}/6</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4">
                <div className="text-3xl mb-2">💰</div>
                <div>おかね: {gameState.player.money}円</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={onStartAdventure}
            className="pokemon-button text-2xl py-8 animate-bounce-slow"
            disabled={gameState.player.pokemon.length === 0}
          >
            🌟 ぼうけんに でかける
          </button>
          
          <button
            onClick={onViewPokemon}
            className="bg-gradient-to-r from-pokemon-blue to-pokemon-green text-white font-bold py-8 px-6 rounded-full transform transition-all duration-200 hover:scale-105 hover:shadow-lg text-2xl"
            disabled={gameState.player.pokemon.length === 0}
          >
            🎒 ポケモンを みる
          </button>
        </div>
        
        {gameState.player.pokemon.length === 0 && (
          <div className="bg-white rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">🎮 はじめての ぼうけん</h3>
            <p className="text-gray-600 mb-4">
              まずは パートナーの ポケモンを えらんでください！
            </p>
            <button
              onClick={onStartNewGame}
              className="pokemon-button text-xl"
            >
              ✨ ポケモンを えらぶ
            </button>
          </div>
        )}
        
        <div className="text-white/70 text-sm">
          <p>🎯 ヒント: ぼうけんで やせいの ポケモンを つかまえよう！</p>
        </div>
      </div>
    </div>
  );
};