import React from 'react';
import { Pokemon } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';

interface PokemonTeamProps {
  pokemon: Pokemon[];
  activePokemon: number;
  onSelectPokemon: (index: number) => void;
  onBackToMenu: () => void;
}

export const PokemonTeam: React.FC<PokemonTeamProps> = ({
  pokemon,
  activePokemon,
  onSelectPokemon,
  onBackToMenu
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-400 p-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8">
          🎒 あなたの ポケモン
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pokemon.map((poke, index) => (
            <div key={index} className="relative">
              {index === activePokemon && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold z-10">
                  ✨ アクティブ
                </div>
              )}
              <PokemonCard
                pokemon={poke}
                onClick={() => onSelectPokemon(index)}
                showStats={true}
              />
            </div>
          ))}
          
          {/* 空のスロット */}
          {Array.from({ length: 6 - pokemon.length }).map((_, index) => (
            <div key={`empty-${index}`} className="pokemon-card opacity-50">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">❓</div>
                <p>からっぽ</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={onBackToMenu}
            className="pokemon-button text-xl"
          >
            🏠 メニューに もどる
          </button>
        </div>
      </div>
    </div>
  );
};