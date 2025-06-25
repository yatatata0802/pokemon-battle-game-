import React, { useState, useEffect } from 'react';
import { Pokemon, Battle, Move } from '../types/pokemon';
import { PokemonCard } from './PokemonCard';

interface BattleSceneProps {
  battle: Battle;
  onBattleEnd: (winner: 'player' | 'enemy') => void;
  onBattleAction: (action: { type: 'attack'; move: Move } | { type: 'run' }) => void;
}

export const BattleScene: React.FC<BattleSceneProps> = ({ 
  battle, 
  onBattleEnd, 
  onBattleAction 
}) => {
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [showMoves, setShowMoves] = useState(false);

  useEffect(() => {
    if (battle.isComplete && battle.winner) {
      setTimeout(() => {
        onBattleEnd(battle.winner!);
      }, 2000);
    }
  }, [battle.isComplete, battle.winner, onBattleEnd]);

  const handleAttack = (move: Move) => {
    if (battle.turn === 'player' && !battle.isComplete) {
      onBattleAction({ type: 'attack', move });
      setSelectedMove(null);
      setShowMoves(false);
    }
  };

  const handleRun = () => {
    onBattleAction({ type: 'run' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-green-400 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-6 animate-pulse-slow">
          バトル中！
        </h2>
        
        {/* バトルフィールド */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 敵のポケモン */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">あいての ポケモン</h3>
              <div className="transform scale-x-[-1]">
                <PokemonCard pokemon={battle.enemyPokemon} showStats={true} />
              </div>
            </div>
            
            {/* プレイヤーのポケモン */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">あなたの ポケモン</h3>
              <PokemonCard pokemon={battle.playerPokemon} showStats={true} />
            </div>
          </div>
        </div>
        
        {/* バトルログ */}
        <div className="bg-white rounded-2xl p-4 mb-6 h-32 overflow-y-auto">
          <div className="space-y-1">
            {battle.battleLog.slice(-4).map((log, index) => (
              <p key={index} className="text-sm text-gray-700">{log}</p>
            ))}
          </div>
        </div>
        
        {/* バトルコマンド */}
        {!battle.isComplete && battle.turn === 'player' && (
          <div className="bg-white rounded-2xl p-6">
            {!showMoves ? (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowMoves(true)}
                  className="pokemon-button"
                >
                  たたかう
                </button>
                <button
                  onClick={handleRun}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                >
                  にげる
                </button>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-bold mb-4 text-center">わざを えらんでください</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {battle.playerPokemon.moves.map((move, index) => (
                    <button
                      key={index}
                      onClick={() => handleAttack(move)}
                      disabled={move.pp <= 0}
                      className={`p-4 rounded-lg font-semibold transition-all duration-200 ${
                        move.pp > 0
                          ? 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-bold">{move.name}</div>
                        <div className="text-sm opacity-75">
                          威力: {move.power} | PP: {move.pp}/{move.maxPp}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowMoves(false)}
                  className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  もどる
                </button>
              </div>
            )}
          </div>
        )}
        
        {battle.isComplete && (
          <div className="bg-white rounded-2xl p-6 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {battle.winner === 'player' ? '🎉 しょうり！' : '😵 まけてしまった...'}
            </h3>
            <p className="text-gray-600">
              {battle.winner === 'player' 
                ? 'おめでとうございます！ けいけんちを かくとく しました！'
                : 'つぎは がんばりましょう！'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};