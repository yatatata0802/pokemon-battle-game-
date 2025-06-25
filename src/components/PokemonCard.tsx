import React from 'react';
import { Pokemon } from '../types/pokemon';
import { typeColors } from '../data/typeChart';
import { Star, Zap } from 'lucide-react';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
  selected?: boolean;
  showStats?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ 
  pokemon, 
  onClick, 
  selected = false, 
  showStats = false 
}) => {
  const primaryTypeColor = typeColors[pokemon.types[0]] || '#A8A878';
  
  return (
    <div
      className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-lg transform transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl border-4 ${
        selected ? 'border-yellow-400 shadow-yellow-400/50' : 'border-transparent'
      }`}
      style={{
        boxShadow: selected ? `0 0 30px ${primaryTypeColor}50` : undefined
      }}
      onClick={onClick}
    >
      {pokemon.shiny && (
        <Star className="absolute top-2 right-2 w-6 h-6 text-yellow-400 animate-pulse" fill="currentColor" />
      )}
      
      <div className="relative">
        <img
          src={pokemon.img}
          alt={pokemon.jpName}
          className="w-24 h-24 mx-auto object-contain filter drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/96x96/cccccc/666666?text=?';
          }}
        />
        
        {pokemon.level > 1 && (
          <div className="absolute -top-2 -left-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
            {pokemon.level}
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <h3 className="font-bold text-lg text-gray-800 truncate">{pokemon.jpName}</h3>
        
        <div className="flex justify-center gap-1 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full text-white text-xs font-bold shadow-md"
              style={{ backgroundColor: typeColors[type] }}
            >
              {type.toUpperCase()}
            </span>
          ))}
        </div>

        {showStats && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">HP</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(pokemon.hp / pokemon.maxHp) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold">{pokemon.hp}/{pokemon.maxHp}</span>
            </div>
            
            {pokemon.experience > 0 && (
              <div className="flex items-center justify-between">
                <Zap className="w-4 h-4 text-yellow-500" />
                <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(pokemon.experience / pokemon.experienceToNext) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold">{pokemon.experience}/{pokemon.experienceToNext}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;