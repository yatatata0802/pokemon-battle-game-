import React from 'react';
import { Pokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
  showStats?: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ 
  pokemon, 
  onClick, 
  showStats = true 
}) => {
  const hpPercentage = (pokemon.hp / pokemon.maxHp) * 100;
  
  return (
    <div 
      className={`pokemon-card cursor-pointer ${onClick ? 'hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="text-center mb-4">
        <div className="text-6xl mb-2 animate-bounce-slow">{pokemon.sprite}</div>
        <h3 className="text-xl font-bold text-gray-800">{pokemon.name}</h3>
        <p className="text-sm text-gray-600">レベル {pokemon.level}</p>
      </div>
      
      <div className="flex flex-wrap gap-1 justify-center mb-3">
        {pokemon.type.map((type, index) => (
          <span 
            key={index}
            className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
              type === 'fire' ? 'bg-red-500' :
              type === 'water' ? 'bg-blue-500' :
              type === 'grass' ? 'bg-green-500' :
              type === 'normal' ? 'bg-gray-500' :
              type === 'poison' ? 'bg-purple-500' :
              type === 'flying' ? 'bg-indigo-400' :
              type === 'bug' ? 'bg-yellow-600' :
              'bg-gray-400'
            }`}
          >
            {type}
          </span>
        ))}
      </div>
      
      {showStats && (
        <>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>HP</span>
              <span>{pokemon.hp}/{pokemon.maxHp}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  hpPercentage > 50 ? 'bg-green-500' :
                  hpPercentage > 25 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${hpPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
            <div className="text-center">
              <div className="font-semibold">攻撃</div>
              <div>{pokemon.attack}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">防御</div>
              <div>{pokemon.defense}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">素早さ</div>
              <div>{pokemon.speed}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};