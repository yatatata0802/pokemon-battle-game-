import React from 'react';
import { Trophy, RotateCcw, ChevronRight, Star, Zap } from 'lucide-react';

interface ResultModalProps {
  show: boolean;
  playerWon: boolean;
  experienceGained: number;
  leveledUp?: boolean;
  onNextBattle: () => void;
  onRestart: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({
  show,
  playerWon,
  experienceGained,
  leveledUp = false,
  onNextBattle,
  onRestart
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`bg-gradient-to-br ${playerWon ? 'from-green-400 to-blue-500' : 'from-red-400 to-pink-500'} rounded-3xl p-8 text-center shadow-2xl transform transition-all duration-300 scale-100`}>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
          {playerWon ? (
            <>
              <Trophy className="w-16 h-16 text-yellow-300 mx-auto mb-4 animate-pulse" />
              <h2 className="text-4xl font-bold text-white mb-2">しょうり！</h2>
              <p className="text-xl text-white/90">あいてを たおした！</p>
              {experienceGained > 0 && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <p className="text-lg text-white font-bold">けいけんち +{experienceGained}</p>
                  <Star className="w-6 h-6 text-yellow-300" />
                </div>
              )}
              {leveledUp && (
                <div className="mt-4 bg-yellow-400/20 rounded-xl p-4 border-2 border-yellow-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="w-8 h-8 text-yellow-300 animate-bounce" />
                    <h3 className="text-2xl font-bold text-yellow-100">レベルアップ！</h3>
                    <Zap className="w-8 h-8 text-yellow-300 animate-bounce" />
                  </div>
                  <p className="text-yellow-100 font-bold">ポケモンが つよくなった！</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">😢</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">まけちゃった...</h2>
              <p className="text-xl text-white/90">つぎは がんばろう！</p>
            </>
          )}
        </div>

        <div className="space-y-4">
          {playerWon ? (
            <button
              onClick={onNextBattle}
              className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
            >
              つぎのあいてへ！
              <ChevronRight className="w-6 h-6" />
            </button>
          ) : null}
          
          <button
            onClick={onRestart}
            className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-6 h-6" />
            {playerWon ? 'ポケモンを えらびなおす' : 'もういちど チャレンジ！'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;