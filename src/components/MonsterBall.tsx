import React from "react";
import type { MonsterBall as MonsterBallType } from "../types/pokemon";

interface MonsterBallProps {
  monsterBall: MonsterBallType;
  onUse: () => void;
  disabled?: boolean;
}

const MonsterBall: React.FC<MonsterBallProps> = ({
  monsterBall,
  onUse,
  disabled = false,
}) => {
  const getBallColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "masterball":
        return "bg-purple-500";
      case "ultraball":
        return "bg-yellow-500";
      case "greatball":
        return "bg-blue-500";
      case "pokeball":
      default:
        return "bg-red-500";
    }
  };

  const getBallGlow = (name: string) => {
    switch (name.toLowerCase()) {
      case "masterball":
        return "shadow-purple-400";
      case "ultraball":
        return "shadow-yellow-400";
      case "greatball":
        return "shadow-blue-400";
      case "pokeball":
      default:
        return "shadow-red-400";
    }
  };

  return (
    <button
      onClick={onUse}
      disabled={disabled || monsterBall.count <= 0}
      className={`
        relative group p-4 rounded-full transition-all duration-300 transform hover:scale-110
        ${getBallColor(monsterBall.name)} ${getBallGlow(monsterBall.name)}
        shadow-lg hover:shadow-2xl border-4 border-white
        ${
          disabled || monsterBall.count <= 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:animate-pulse"
        }
      `}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${getBallColor(
          monsterBall.name
        ).replace("bg-", "")}, ${getBallColor(monsterBall.name).replace(
          "bg-",
          ""
        )}dd)`,
      }}
    >
      {/* ボールのデザイン */}
      <div className="w-12 h-12 relative">
        {/* 上部（赤い部分） */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full border-b-2 border-red-600"></div>

        {/* 下部（白い部分） */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full border-t-2 border-gray-200"></div>

        {/* 中央のボタン */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow-inner"></div>

        {/* 中央の線 */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-400"></div>
      </div>

      {/* ボール名 */}
      <div className="mt-2 text-xs font-bold text-white text-center">
        {monsterBall.name}
      </div>

      {/* 所持数 */}
      <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
        {monsterBall.count}
      </div>

      {/* ホバーエフェクト */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

      {/* キラキラエフェクト */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-pulse"></div>
      </div>
    </button>
  );
};

export default MonsterBall;
