import React from 'react';
import { Pokemon } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';
import { starterPokemon } from '../data/pokemonData';

interface StarterSelectionProps {
  onSelectStarter: (pokemon: Pokemon) => void;
}

export const StarterSelection: React.FC<StarterSelectionProps> = ({ onSelectStarter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 animate-pulse-slow">
            🌟 パートナーを えらぼう！ 🌟
          </h1>
          <p className="text-2xl text-white/90">
            あなたの さいしょの ポケモンを えらんでください
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {starterPokemon.map((pokemon, index) => (
            <div key={index} className="transform hover:scale-105 transition-all duration-300">
              <PokemonCard
                pokemon={pokemon}
                onClick={() => onSelectStarter(pokemon)}
                showStats={true}
              />
              <div className="text-center mt-4">
                <button
                  onClick={() => onSelectStarter(pokemon)}
                  className="pokemon-button text-lg"
                >
                  {pokemon.name}を えらぶ！
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white/20 backdrop-blur-sm rounded-3xl p-6">
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            📚 ポケモンの とくちょう
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🌱</div>
              <h4 className="font-bold mb-2">フシギダネ</h4>
              <p className="text-sm">くさタイプの わざが つよい！ぼうぎょも たかいよ</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🔥</div>
              <h4 className="font-bold mb-2">ヒトカゲ</h4>
              <p className="text-sm">ほのおタイプの わざが つよい！すばやさも はやいよ</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-2">💧</div>
              <h4 className="font-bold mb-2">ゼニガメ</h4>
              <p className="text-sm">みずタイプの わざが つよい！バランスが いいよ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};