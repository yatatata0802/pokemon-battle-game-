import React from 'react';
import { Pokemon } from '../types/pokemon';
import { wildPokemon } from '../data/pokemonData';

interface AdventureSceneProps {
  onEncounter: (pokemon: Pokemon) => void;
  onBackToMenu: () => void;
}

export const AdventureScene: React.FC<AdventureSceneProps> = ({ 
  onEncounter, 
  onBackToMenu 
}) => {
  const handleExplore = () => {
    // ランダムに野生のポケモンと遭遇
    const randomPokemon = wildPokemon[Math.floor(Math.random() * wildPokemon.length)];
    // レベルをランダムに調整
    const adjustedPokemon = {
      ...randomPokemon,
      level: Math.floor(Math.random() * 5) + 2,
      hp: randomPokemon.maxHp,
    };
    onEncounter(adjustedPokemon);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8 animate-pulse-slow">
          🌲 ぼうけんの もり 🌲
        </h2>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-8">
          <div className="text-center text-white">
            <div className="text-6xl mb-6 animate-wiggle">🌳</div>
            <p className="text-xl mb-6">
              しんぴてきな もりを たんけん しています...
            </p>
            <p className="text-lg opacity-90">
              やせいの ポケモンが あらわれるかも しれません！
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={handleExplore}
            className="pokemon-button text-xl py-6 animate-bounce-slow"
          >
            🔍 たんけん する
          </button>
          
          <button
            onClick={onBackToMenu}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-6 px-6 rounded-full transform transition-all duration-200 hover:scale-105 text-xl"
          >
            🏠 メニューに もどる
          </button>
        </div>
        
        <div className="mt-8 bg-white rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4 text-center">🐾 であえる ポケモン</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wildPokemon.map((pokemon, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-2">{pokemon.sprite}</div>
                <div className="font-semibold">{pokemon.name}</div>
                <div className="text-sm text-gray-600">レベル 2-6</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};