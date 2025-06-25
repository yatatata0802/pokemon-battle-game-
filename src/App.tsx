import React, { useState, useEffect } from "react";
import { Pokemon, MonsterBall } from "./types/pokemon";
import { usePokemonData } from "./hooks/usePokemonData";
import LoadingScreen from "./components/LoadingScreen";
import PokemonCard from "./components/PokemonCard";
import BattleScreen from "./components/BattleScreen";
import ResultModal from "./components/ResultModal";
import { Sparkles, Trophy, Book, Heart, Zap } from "lucide-react";

type GameScreen =
  | "loading"
  | "menu"
  | "selection"
  | "battle"
  | "pokedex"
  | "inventory";

function App() {
  const { allPokemon, loading, error } = usePokemonData();
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("loading");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [battleResult, setBattleResult] = useState<{
    won: boolean;
    experience: number;
    leveledUp?: boolean;
  }>({ won: false, experience: 0 });
  const [playerTeam, setPlayerTeam] = useState<Pokemon[]>([]);
  const [battleCount, setBattleCount] = useState(0);

  // 子供が喜ぶ機能
  const [totalPokemonCaught, setTotalPokemonCaught] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementMessage, setAchievementMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // モンスターボールシステム
  const [playerInventory, setPlayerInventory] = useState({
    monsterBalls: [
      { id: 1, name: "Pokeball", catchRate: 1.0, sprite: "🎾", count: 10 },
      { id: 2, name: "Greatball", catchRate: 1.5, sprite: "🎾", count: 5 },
      { id: 3, name: "Ultraball", catchRate: 2.0, sprite: "🎾", count: 3 },
      { id: 4, name: "Masterball", catchRate: 100, sprite: "🎾", count: 1 },
    ] as MonsterBall[],
    caughtPokemon: [] as Pokemon[],
    maxPokemon: 30,
  });
  const [isWildBattle, setIsWildBattle] = useState(false);

  // Audio context for sound effects
  const playSound = (
    frequency: number,
    duration: number,
    type: OscillatorType = "square"
  ) => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  const playVictorySound = () => {
    setTimeout(() => playSound(523, 0.2), 0); // C
    setTimeout(() => playSound(659, 0.2), 200); // E
    setTimeout(() => playSound(784, 0.2), 400); // G
    setTimeout(() => playSound(1047, 0.4), 600); // C (higher)
  };

  const playDefeatSound = () => {
    setTimeout(() => playSound(392, 0.3), 0); // G
    setTimeout(() => playSound(349, 0.3), 300); // F
    setTimeout(() => playSound(294, 0.5), 600); // D
  };

  const playAttackSound = () => {
    playSound(800 + Math.random() * 400, 0.1, "sawtooth");
  };

  const playLevelUpSound = () => {
    setTimeout(() => playSound(523, 0.15), 0); // C
    setTimeout(() => playSound(659, 0.15), 150); // E
    setTimeout(() => playSound(784, 0.15), 300); // G
    setTimeout(() => playSound(1047, 0.15), 450); // C
    setTimeout(() => playSound(1319, 0.3), 600); // E (higher)
  };

  useEffect(() => {
    if (!loading && allPokemon.length > 0) {
      setCurrentScreen("menu");
    }
  }, [loading, allPokemon]);

  const generateRandomOpponent = (excludePokemonId?: number) => {
    if (allPokemon.length === 0) return null;

    console.log("🎯 Generating new opponent, excluding ID:", excludePokemonId);
    console.log("📋 Available Pokemon count:", allPokemon.length);

    const availablePokemon = allPokemon.filter(
      (p) => p.id !== excludePokemonId
    );
    console.log("✅ Filtered Pokemon count:", availablePokemon.length);

    const randomIndex = Math.floor(Math.random() * availablePokemon.length);
    const randomPokemon = availablePokemon[randomIndex];

    console.log(
      "🎲 Selected random Pokemon:",
      randomPokemon.jpName,
      "ID:",
      randomPokemon.id
    );

    const opponent = {
      ...randomPokemon,
      level: Math.max(
        3,
        (selectedPokemon?.level || 5) + Math.floor(Math.random() * 3) - 1
      ),
      hp: randomPokemon.maxHp,
      moves: randomPokemon.moves.map((move) => ({ ...move })), // Fresh PP
      isWild: true, // 野生ポケモンとして設定
      catchRate: Math.floor(Math.random() * 30) + 20, // 20-50の捕獲率
    };

    console.log(
      "⚔️ Created opponent:",
      opponent.jpName,
      "Level:",
      opponent.level
    );
    return opponent;
  };

  const generateWildPokemon = () => {
    if (allPokemon.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * allPokemon.length);
    const randomPokemon = allPokemon[randomIndex];

    const wildPokemon = {
      ...randomPokemon,
      level: Math.floor(Math.random() * 20) + 5, // レベル5-25
      hp: randomPokemon.maxHp,
      moves: randomPokemon.moves.map((move) => ({ ...move })),
      isWild: true,
      catchRate: Math.floor(Math.random() * 40) + 15, // 15-55の捕獲率
    };

    return wildPokemon;
  };

  const handleCatchPokemon = (caughtPokemon: Pokemon) => {
    console.log("🎾 Pokemon caught:", caughtPokemon.jpName);

    // 捕獲数を更新
    setTotalPokemonCaught((prev) => prev + 1);

    // 実績チェック
    checkAchievements();

    // 捕獲したポケモンをインベントリに追加
    if (playerInventory.caughtPokemon.length < playerInventory.maxPokemon) {
      setPlayerInventory((prev) => ({
        ...prev,
        caughtPokemon: [...prev.caughtPokemon, caughtPokemon],
      }));

      // チームにも追加（空きがあれば）
      if (playerTeam.length < 6) {
        setPlayerTeam((prev) => [...prev, caughtPokemon]);
      }
    }
  };

  const checkAchievements = () => {
    // 捕獲数実績
    if (totalPokemonCaught === 5) {
      showAchievementPopup(
        "🎉 ポケモンコレクター！",
        "5匹のポケモンを捕獲しました！"
      );
    } else if (totalPokemonCaught === 10) {
      showAchievementPopup(
        "🏆 ポケモンマスター！",
        "10匹のポケモンを捕獲しました！"
      );
    } else if (totalPokemonCaught === 20) {
      showAchievementPopup(
        "👑 伝説のトレーナー！",
        "20匹のポケモンを捕獲しました！"
      );
    }
  };

  const checkStreakAchievements = () => {
    // 連勝実績
    if (currentStreak === 5) {
      showAchievementPopup("🔥 連勝王！", "5連勝達成！");
    } else if (currentStreak === 10) {
      showAchievementPopup("⚡ 無敵の戦士！", "10連勝達成！");
    }
  };

  const showAchievementPopup = (title: string, message: string) => {
    setAchievementMessage(`${title}\n${message}`);
    setShowAchievement(true);
    setShowConfetti(true);

    // 特別な音響効果
    playLevelUpSound();

    setTimeout(() => {
      setShowAchievement(false);
      setShowConfetti(false);
    }, 4000);
  };

  const startWildBattle = () => {
    const wildPokemon = generateWildPokemon();
    if (wildPokemon) {
      setOpponentPokemon(wildPokemon);
      setIsWildBattle(true);
      setCurrentScreen("battle");
    } else {
      console.error("❌ Failed to generate wild Pokemon!");
      // エラー時のフォールバック
      alert("野生ポケモンが見つかりませんでした。もう一度試してください。");
    }
  };

  const handlePokemonSelect = (pokemon: Pokemon) => {
    console.log("🔥 Pokemon selected:", pokemon.jpName);

    const playerPokemon = {
      ...pokemon,
      level: Math.max(5, Math.floor(Math.random() * 10) + 5),
      caught: true,
    };
    playerPokemon.hp = playerPokemon.maxHp;
    setSelectedPokemon(playerPokemon);

    // Add to team if not already there
    if (!playerTeam.find((p) => p.id === pokemon.id)) {
      setPlayerTeam((prev) => [...prev, playerPokemon].slice(0, 6)); // Max 6 Pokemon
    }

    // Generate opponent immediately
    const newOpponent = generateRandomOpponent(pokemon.id);
    if (newOpponent) {
      console.log("🆚 Setting opponent:", newOpponent.jpName);
      setOpponentPokemon(newOpponent);
      setCurrentScreen("battle");
    }
  };

  const handleBattleEnd = (playerWon: boolean, experience: number) => {
    console.log(
      "🏁 Battle ended. Player won:",
      playerWon,
      "Experience:",
      experience
    );

    let leveledUp = false;

    if (playerWon) {
      playVictorySound();
      setBattleCount((prev) => prev + 1);

      // 連勝を更新
      setCurrentStreak((prev) => {
        const newStreak = prev + 1;
        // 最長連勝記録を更新
        if (newStreak > longestStreak) {
          setLongestStreak(newStreak);
        }
        // 連勝実績をチェック
        setTimeout(() => checkStreakAchievements(), 100);
        return newStreak;
      });

      // Level up logic
      if (selectedPokemon && experience > 0) {
        const updatedPokemon = { ...selectedPokemon };
        updatedPokemon.experience += experience;

        if (updatedPokemon.experience >= updatedPokemon.experienceToNext) {
          leveledUp = true;
          updatedPokemon.level += 1;
          updatedPokemon.experience = 0;
          updatedPokemon.experienceToNext = Math.floor(
            updatedPokemon.experienceToNext * 1.2
          );

          // Stat increases
          const hpIncrease = Math.floor(Math.random() * 5) + 3;
          updatedPokemon.maxHp += hpIncrease;
          updatedPokemon.hp = updatedPokemon.maxHp; // Full heal on level up
          updatedPokemon.attack += Math.floor(Math.random() * 3) + 1;
          updatedPokemon.defense += Math.floor(Math.random() * 3) + 1;
          updatedPokemon.speed += Math.floor(Math.random() * 3) + 1;

          // Play level up sound after victory sound
          setTimeout(playLevelUpSound, 1000);

          console.log(
            "📈 Pokemon leveled up!",
            updatedPokemon.jpName,
            "New level:",
            updatedPokemon.level
          );
        }

        setSelectedPokemon(updatedPokemon);

        // Update team
        setPlayerTeam((prev) =>
          prev.map((p) => (p.id === updatedPokemon.id ? updatedPokemon : p))
        );
      }
    } else {
      playDefeatSound();
      setCurrentStreak(0); // 連勝リセット
    }

    // 野生ポケモン戦闘フラグをリセット
    setIsWildBattle(false);

    setBattleResult({ won: playerWon, experience, leveledUp });
    setShowResultModal(true);
  };

  const handleNextBattle = () => {
    console.log("🚀 NEXT BATTLE CLICKED!");
    console.log("Current selected Pokemon:", selectedPokemon?.jpName);
    console.log("Current opponent:", opponentPokemon?.jpName);

    setShowResultModal(false);

    if (selectedPokemon) {
      // Create a fully healed version of the Pokemon
      const healedPokemon = {
        ...selectedPokemon,
        hp: selectedPokemon.maxHp,
        moves: selectedPokemon.moves.map((move) => ({
          ...move,
          currentPp: move.pp,
        })),
      };

      console.log(
        "🔄 Healing Pokemon:",
        healedPokemon.jpName,
        "HP:",
        healedPokemon.hp,
        "/",
        healedPokemon.maxHp
      );
      setSelectedPokemon(healedPokemon);

      // Update team with healed Pokemon
      setPlayerTeam((prev) =>
        prev.map((p) => (p.id === healedPokemon.id ? healedPokemon : p))
      );

      // Generate completely new opponent
      const newOpponent = generateRandomOpponent(healedPokemon.id);
      if (newOpponent) {
        console.log(
          "🆚 NEW OPPONENT GENERATED:",
          newOpponent.jpName,
          "Level:",
          newOpponent.level
        );
        setOpponentPokemon(newOpponent);

        // Force re-render by briefly going to a different screen
        setTimeout(() => {
          console.log("⚡ Forcing battle screen refresh");
          setCurrentScreen("battle");
        }, 100);
      } else {
        console.error("❌ Failed to generate new opponent!");
      }
    } else {
      console.error("❌ No selected Pokemon found!");
    }
  };

  const handleRestart = () => {
    console.log("🔄 Restarting game");
    setShowResultModal(false);
    setCurrentScreen("menu");
    setSelectedPokemon(null);
    setOpponentPokemon(null);
  };

  const renderMainMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl mb-4 animate-pulse">
          ポケモン
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 drop-shadow-lg mb-6">
          アドベンチャー！
        </h2>
        <div className="flex justify-center space-x-4 mb-8">
          <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce" />
          <Heart className="w-8 h-8 text-red-400 animate-pulse" />
          <Zap
            className="w-8 h-8 text-yellow-300 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          />
        </div>
      </div>

      <div className="space-y-6 w-full max-w-md">
        <button
          onClick={() => setCurrentScreen("selection")}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-6 px-8 rounded-3xl text-2xl shadow-2xl transform transition-all duration-200 hover:scale-105"
        >
          ✨ ぼうけんを はじめる！
        </button>

        <button
          onClick={startWildBattle}
          className="w-full bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white font-bold py-6 px-8 rounded-3xl text-2xl shadow-2xl transform transition-all duration-200 hover:scale-105"
        >
          🌿 やせいポケモンと たたかう！
        </button>

        <button
          onClick={() => setCurrentScreen("pokedex")}
          className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-6 px-8 rounded-3xl text-2xl shadow-2xl transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3"
        >
          <Book className="w-8 h-8" />
          ポケモンずかん
        </button>

        <button
          onClick={() => setCurrentScreen("inventory")}
          className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-6 px-8 rounded-3xl text-2xl shadow-2xl transform transition-all duration-200 hover:scale-105"
        >
          🎒 インベントリ
        </button>

        {playerTeam.length > 0 && (
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-6 h-6 text-yellow-300" />
              <h3 className="text-xl font-bold text-white">きみのチーム</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {playerTeam.slice(0, 6).map((pokemon) => (
                <div key={pokemon.id} className="text-center">
                  <img
                    src={pokemon.img}
                    alt={pokemon.jpName}
                    className="w-12 h-12 mx-auto"
                  />
                  <p className="text-xs text-white font-bold truncate">
                    {pokemon.jpName}
                  </p>
                  <p className="text-xs text-yellow-200">Lv.{pokemon.level}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center space-y-2">
              <p className="text-white font-bold">
                バトル勝利数: {battleCount}
              </p>
              <p className="text-green-300 font-bold">
                捕獲ポケモン: {totalPokemonCaught}匹
              </p>
              <p className="text-purple-300 font-bold">
                現在連勝: {currentStreak}回
              </p>
              <p className="text-orange-300 font-bold">
                最長連勝: {longestStreak}回
              </p>
            </div>
          </div>
        )}

        {/* 実績ポップアップ */}
        {showAchievement && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-3xl text-center shadow-2xl border-4 border-white animate-bounce">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-2xl font-black text-white mb-2">
                実績達成！
              </h2>
              <p className="text-white font-bold text-lg whitespace-pre-line">
                {achievementMessage}
              </p>
            </div>
          </div>
        )}

        {/* 紙吹雪エフェクト */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "3s",
                }}
              >
                {
                  ["🎉", "🎊", "⭐", "💫", "✨", "🎈", "🎁"][
                    Math.floor(Math.random() * 7)
                  ]
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderPokemonSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl mb-4">
            すきな ポケモンを えらんでね！
          </h1>
          <button
            onClick={() => setCurrentScreen("menu")}
            className="bg-white/20 backdrop-blur-sm text-white font-bold py-2 px-6 rounded-full hover:bg-white/30 transition-all duration-200"
          >
            ← もどる
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {allPokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handlePokemonSelect(pokemon)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderPokedex = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl mb-4">
            ポケモンずかん
          </h1>
          <button
            onClick={() => setCurrentScreen("menu")}
            className="bg-white/20 backdrop-blur-sm text-white font-bold py-2 px-6 rounded-full hover:bg-white/30 transition-all duration-200"
          >
            ← もどる
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {allPokemon.map((pokemon) => {
            const caught = playerTeam.some((p) => p.id === pokemon.id);
            return (
              <div
                key={pokemon.id}
                className={`relative ${!caught ? "opacity-50" : ""}`}
              >
                <PokemonCard pokemon={pokemon} showStats={caught} />
                {!caught && (
                  <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                    <p className="text-white font-bold">？？？</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-600 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl mb-4">
            🎒 インベントリ
          </h1>
          <button
            onClick={() => setCurrentScreen("menu")}
            className="bg-white/20 backdrop-blur-sm text-white font-bold py-2 px-6 rounded-full hover:bg-white/30 transition-all duration-200"
          >
            ← もどる
          </button>
        </div>

        {/* モンスターボール */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            🎾 モンスターボール
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playerInventory.monsterBalls.map((ball) => (
              <div
                key={ball.id}
                className="bg-white/10 rounded-2xl p-4 text-center"
              >
                <div className="text-4xl mb-2">{ball.sprite}</div>
                <h3 className="text-white font-bold">{ball.name}</h3>
                <p className="text-yellow-200">所持数: {ball.count}</p>
                <p className="text-sm text-gray-200">
                  捕獲率: {ball.catchRate}x
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 捕獲したポケモン */}
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            🐾 捕獲したポケモン ({playerInventory.caughtPokemon.length}/
            {playerInventory.maxPokemon})
          </h2>
          {playerInventory.caughtPokemon.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {playerInventory.caughtPokemon.map((pokemon) => (
                <div
                  key={pokemon.id}
                  className="bg-white/10 rounded-2xl p-4 text-center"
                >
                  <img
                    src={pokemon.img}
                    alt={pokemon.jpName}
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <h3 className="text-white font-bold text-sm">
                    {pokemon.jpName}
                  </h3>
                  <p className="text-yellow-200 text-xs">Lv.{pokemon.level}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white">
              <p className="text-xl">まだポケモンを捕獲していません</p>
              <p className="text-sm text-gray-200 mt-2">
                野生ポケモンと戦って捕獲してみましょう！
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen bg-red-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            もう一度試す
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-['M_PLUS_Rounded_1c']">
      <LoadingScreen isLoading={loading} />

      {!loading && (
        <>
          {currentScreen === "menu" && renderMainMenu()}
          {currentScreen === "selection" && renderPokemonSelection()}
          {currentScreen === "pokedex" && renderPokedex()}
          {currentScreen === "inventory" && renderInventory()}
          {currentScreen === "battle" && selectedPokemon && opponentPokemon && (
            <BattleScreen
              playerPokemon={selectedPokemon}
              opponentPokemon={opponentPokemon}
              onBattleEnd={handleBattleEnd}
              onBack={() => setCurrentScreen("menu")}
              onAttackSound={playAttackSound}
              onCatchPokemon={handleCatchPokemon}
              playerInventory={playerInventory}
              isWildBattle={isWildBattle}
            />
          )}

          <ResultModal
            show={showResultModal}
            playerWon={battleResult.won}
            experienceGained={battleResult.experience}
            leveledUp={battleResult.leveledUp}
            onNextBattle={handleNextBattle}
            onRestart={handleRestart}
          />
        </>
      )}
    </div>
  );
}

export default App;
