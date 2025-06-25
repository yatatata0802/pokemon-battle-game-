import React, { useState, useEffect, useRef } from "react";
import {
  Pokemon,
  Move,
  MonsterBall as MonsterBallType,
  BattleState,
} from "../types/pokemon";
import {
  typeColors,
  getTypeEffectiveness,
  getTypeEffectText,
} from "../data/typeChart";
import {
  Heart,
  Zap,
  Shield,
  Swords,
  Star,
  Sparkles,
  ArrowRight,
  Target,
} from "lucide-react";
import MonsterBallComponent from "./MonsterBall";

interface BattleScreenProps {
  playerPokemon: Pokemon;
  opponentPokemon: Pokemon;
  onBattleEnd: (playerWon: boolean, experience: number) => void;
  onBack: () => void;
  onAttackSound?: () => void;
  onCatchPokemon?: (pokemon: Pokemon) => void;
  playerInventory?: {
    monsterBalls: MonsterBallType[];
    caughtPokemon: Pokemon[];
    maxPokemon: number;
  };
  isWildBattle?: boolean;
}

interface DamageNumber {
  id: number;
  damage: number;
  x: number;
  y: number;
  critical: boolean;
  effectiveness: number;
  isPlayer: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  playerPokemon,
  opponentPokemon,
  onBattleEnd,
  onBack,
  onAttackSound,
  onCatchPokemon,
  playerInventory,
  isWildBattle,
}) => {
  const [player, setPlayer] = useState<Pokemon>(() => ({ ...playerPokemon }));
  const [opponent, setOpponent] = useState<Pokemon>(() => ({
    ...opponentPokemon,
  }));
  const [isBattling, setIsBattling] = useState(false);
  const [message, setMessage] = useState(`${opponent.jpName} が あらわれた！`);
  const [showAttackEffect, setShowAttackEffect] = useState(false);
  const [effectType, setEffectType] = useState("");
  const [playerAttacking, setPlayerAttacking] = useState(false);
  const [damageNumbers, setDamageNumbers] = useState<DamageNumber[]>([]);
  const [damageIdCounter, setDamageIdCounter] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleIdCounter, setParticleIdCounter] = useState(0);
  const [screenShake, setScreenShake] = useState(false);
  const [attackIntensity, setAttackIntensity] = useState(0);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [sparkleIdCounter, setSparkleIdCounter] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [pokemonEmotion, setPokemonEmotion] = useState<
    "normal" | "happy" | "sad" | "angry"
  >("normal");
  const [opponentEmotion, setOpponentEmotion] = useState<
    "normal" | "happy" | "sad" | "angry"
  >("normal");

  // 子供が喜ぶ感情表現とアニメーション
  const [pokemonDance, setPokemonDance] = useState(false);
  const [opponentDance, setOpponentDance] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [showRainbow, setShowRainbow] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [battleStreak, setBattleStreak] = useState(0);
  const [showStreak, setShowStreak] = useState(false);

  // モンスターボールシステム用の状態
  const [battleState, setBattleState] = useState<BattleState>({
    isWildBattle: isWildBattle || false,
    canCatch: isWildBattle || false,
    canRun: true,
    catchAttempts: 0,
    maxCatchAttempts: 10,
  });
  const [showCatchMenu, setShowCatchMenu] = useState(false);
  const [catchingPokemon, setCatchingPokemon] = useState(false);
  const [catchResult, setCatchResult] = useState<"success" | "failed" | null>(
    null
  );
  const [showCatchAnimation, setShowCatchAnimation] = useState(false);

  // Audio refs for sound effects
  const attackAudioRef = useRef<HTMLAudioElement | null>(null);
  const criticalAudioRef = useRef<HTMLAudioElement | null>(null);
  const victoryAudioRef = useRef<HTMLAudioElement | null>(null);
  const defeatAudioRef = useRef<HTMLAudioElement | null>(null);
  const catchAudioRef = useRef<HTMLAudioElement | null>(null);
  const levelUpAudioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("どの わざを つかう？");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // パーティクルアニメーション
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.2, // 重力
            life: particle.life - 1,
          }))
          .filter((particle) => particle.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles]);

  // キラキラエフェクトアニメーション
  useEffect(() => {
    if (sparkles.length === 0) return;

    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev
          .map((sparkle) => ({
            ...sparkle,
            life: sparkle.life - 1,
          }))
          .filter((sparkle) => sparkle.life > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, [sparkles]);

  // 子供が喜ぶ音響効果
  const playSound = (
    type:
      | "attack"
      | "critical"
      | "victory"
      | "defeat"
      | "catch"
      | "levelup"
      | "background"
  ) => {
    // Web Audio APIを使用した楽しい音響効果
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      switch (type) {
        case "attack":
          // 攻撃音 - 楽しいビープ音
          const attackOsc = audioContext.createOscillator();
          const attackGain = audioContext.createGain();
          attackOsc.connect(attackGain);
          attackGain.connect(audioContext.destination);
          attackOsc.frequency.setValueAtTime(800, audioContext.currentTime);
          attackOsc.frequency.exponentialRampToValueAtTime(
            400,
            audioContext.currentTime + 0.1
          );
          attackGain.gain.setValueAtTime(0.3, audioContext.currentTime);
          attackGain.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.1
          );
          attackOsc.start(audioContext.currentTime);
          attackOsc.stop(audioContext.currentTime + 0.1);
          break;

        case "critical":
          // クリティカル音 - 派手な音
          for (let i = 0; i < 3; i++) {
            setTimeout(() => {
              const critOsc = audioContext.createOscillator();
              const critGain = audioContext.createGain();
              critOsc.connect(critGain);
              critGain.connect(audioContext.destination);
              critOsc.frequency.setValueAtTime(
                1000 + i * 200,
                audioContext.currentTime
              );
              critGain.gain.setValueAtTime(0.4, audioContext.currentTime);
              critGain.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + 0.2
              );
              critOsc.start(audioContext.currentTime);
              critOsc.stop(audioContext.currentTime + 0.2);
            }, i * 100);
          }
          break;

        case "victory":
          // 勝利音 - 楽しいメロディ
          const victoryNotes = [523, 659, 784, 1047]; // C, E, G, C
          victoryNotes.forEach((note, index) => {
            setTimeout(() => {
              const vicOsc = audioContext.createOscillator();
              const vicGain = audioContext.createGain();
              vicOsc.connect(vicGain);
              vicGain.connect(audioContext.destination);
              vicOsc.frequency.setValueAtTime(note, audioContext.currentTime);
              vicGain.gain.setValueAtTime(0.3, audioContext.currentTime);
              vicGain.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + 0.3
              );
              vicOsc.start(audioContext.currentTime);
              vicOsc.stop(audioContext.currentTime + 0.3);
            }, index * 200);
          });
          break;

        case "catch":
          // 捕獲音 - ワクワクする音
          const catchOsc = audioContext.createOscillator();
          const catchGain = audioContext.createGain();
          catchOsc.connect(catchGain);
          catchGain.connect(audioContext.destination);
          catchOsc.frequency.setValueAtTime(600, audioContext.currentTime);
          catchOsc.frequency.exponentialRampToValueAtTime(
            1200,
            audioContext.currentTime + 0.5
          );
          catchGain.gain.setValueAtTime(0.3, audioContext.currentTime);
          catchGain.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.5
          );
          catchOsc.start(audioContext.currentTime);
          catchOsc.stop(audioContext.currentTime + 0.5);
          break;

        case "levelup":
          // レベルアップ音 - 特別な音
          const levelNotes = [523, 659, 784, 1047, 1319]; // C, E, G, C, E
          levelNotes.forEach((note, index) => {
            setTimeout(() => {
              const levelOsc = audioContext.createOscillator();
              const levelGain = audioContext.createGain();
              levelOsc.connect(levelGain);
              levelGain.connect(audioContext.destination);
              levelOsc.frequency.setValueAtTime(note, audioContext.currentTime);
              levelGain.gain.setValueAtTime(0.4, audioContext.currentTime);
              levelGain.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime + 0.2
              );
              levelOsc.start(audioContext.currentTime);
              levelOsc.stop(audioContext.currentTime + 0.2);
            }, index * 150);
          });
          break;
      }
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  const createSparkles = (x: number, y: number, count: number = 8) => {
    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < count; i++) {
      newSparkles.push({
        id: sparkleIdCounter + i,
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: 3 + Math.random() * 4,
        life: 60 + Math.random() * 30,
        maxLife: 60 + Math.random() * 30,
      });
    }
    setSparkles((prev) => [...prev, ...newSparkles]);
    setSparkleIdCounter((prev) => prev + count);
  };

  // 子供が喜ぶ特別なエフェクト
  const createHearts = (x: number, y: number, count: number = 5) => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 2000);
  };

  const createStars = (x: number, y: number, count: number = 8) => {
    setShowStars(true);
    setTimeout(() => setShowStars(false), 3000);
  };

  const createRainbow = () => {
    setShowRainbow(true);
    setTimeout(() => setShowRainbow(false), 4000);
  };

  const triggerPokemonDance = (isPlayer: boolean) => {
    if (isPlayer) {
      setPokemonDance(true);
      setTimeout(() => setPokemonDance(false), 2000);
    } else {
      setOpponentDance(true);
      setTimeout(() => setOpponentDance(false), 2000);
    }
  };

  const showComboEffect = () => {
    setComboCount((prev) => prev + 1);
    setShowCombo(true);
    setTimeout(() => setShowCombo(false), 2000);
  };

  const showStreakEffect = () => {
    setBattleStreak((prev) => prev + 1);
    setShowStreak(true);
    setTimeout(() => setShowStreak(false), 3000);
  };

  const createParticles = (
    x: number,
    y: number,
    color: string,
    count: number = 10
  ) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdCounter + i,
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 2,
        life: 60 + Math.random() * 30,
        maxLife: 60 + Math.random() * 30,
        color,
        size: 2 + Math.random() * 4,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
    setParticleIdCounter((prev) => prev + count);
  };

  const triggerScreenShake = (intensity: number = 1) => {
    setScreenShake(true);
    setAttackIntensity(intensity);
    setTimeout(() => setScreenShake(false), 500);
  };

  // 捕獲システムの関数
  const calculateCatchRate = (pokemon: Pokemon, ballType: string): number => {
    let baseRate = pokemon.catchRate || 45; // デフォルト捕獲率

    // HPが低いほど捕獲しやすい
    const hpRatio = pokemon.hp / pokemon.maxHp;
    if (hpRatio <= 0.1) baseRate *= 3;
    else if (hpRatio <= 0.2) baseRate *= 2.5;
    else if (hpRatio <= 0.5) baseRate *= 2;
    else if (hpRatio <= 0.8) baseRate *= 1.5;

    // ボールの種類による倍率
    switch (ballType.toLowerCase()) {
      case "masterball":
        return 100; // 必ず捕獲
      case "ultraball":
        return baseRate * 2;
      case "greatball":
        return baseRate * 1.5;
      case "pokeball":
      default:
        return baseRate;
    }
  };

  const attemptCatch = async (ballType: string) => {
    if (!playerInventory || !onCatchPokemon) return;

    const ball = playerInventory.monsterBalls.find(
      (b) => b.name.toLowerCase() === ballType.toLowerCase()
    );
    if (!ball || ball.count <= 0) return;

    setCatchingPokemon(true);
    setShowCatchAnimation(true);
    setMessage(`${ball.name} を なげた！`);

    // 子供が喜ぶ捕獲音
    playSound("catch");

    // ボールを減らす
    const updatedBalls = playerInventory.monsterBalls.map((b) =>
      b.id === ball.id ? { ...b, count: b.count - 1 } : b
    );

    // 捕獲率を計算
    const catchRate = calculateCatchRate(opponent, ballType);
    const random = Math.random() * 100;

    // ワクワクするアニメーション時間
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (random <= catchRate) {
      // 捕獲成功 - 子供が大喜び！
      setCatchResult("success");
      setMessage(`やった！${opponent.jpName} を つかまえた！🎉`);

      // 派手な成功エフェクト
      playSound("victory");
      createParticles(50, 50, "#FFD700", 50);
      createSparkles(50, 50, 30);
      createRainbow();
      createStars(50, 50, 25);
      createHearts(50, 50, 10);

      // ポケモンの感情表現
      setOpponentEmotion("happy");
      triggerPokemonDance(false);

      // 捕獲したポケモンを渡す
      const caughtPokemon = { ...opponent, caught: true, isWild: false };
      onCatchPokemon(caughtPokemon);

      setTimeout(() => {
        onBattleEnd(true, 100); // 捕獲成功で戦闘終了
      }, 4000);
    } else {
      // 捕獲失敗 - でも楽しい！
      setCatchResult("failed");
      setMessage(`${opponent.jpName} は にげだした！でも がんばったね！💪`);

      // 励ましエフェクト
      createHearts(50, 50, 5);

      setTimeout(() => {
        setCatchingPokemon(false);
        setShowCatchAnimation(false);
        setCatchResult(null);
        setMessage("どの わざを つかう？");
      }, 3000);
    }

    setBattleState((prev) => ({
      ...prev,
      catchAttempts: prev.catchAttempts + 1,
    }));
  };

  const runFromBattle = () => {
    setMessage("にげだした！");
    setTimeout(() => {
      onBattleEnd(false, 0);
    }, 1500);
  };

  const showDamageNumber = (
    damage: number,
    isPlayer: boolean,
    critical: boolean,
    effectiveness: number
  ) => {
    // Position damage numbers near the target Pokemon - 位置を調整
    const baseX = isPlayer ? 30 : 70; // より中央に近づける
    const baseY = isPlayer ? 60 : 40; // より中央に近づける

    // Add some randomness to avoid overlapping
    const randomOffsetX = (Math.random() - 0.5) * 8; // ランダム範囲を小さく
    const randomOffsetY = (Math.random() - 0.5) * 8; // ランダム範囲を小さく

    const newDamage: DamageNumber = {
      id: damageIdCounter,
      damage,
      x: baseX + randomOffsetX,
      y: baseY + randomOffsetY,
      critical,
      effectiveness,
      isPlayer,
    };

    setDamageNumbers((prev) => [...prev, newDamage]);
    setDamageIdCounter((prev) => prev + 1);

    // Create particles for damage effect
    const particleColor = critical
      ? "#FFD700"
      : effectiveness > 1
      ? "#FF4444"
      : effectiveness < 1
      ? "#4444FF"
      : "#FFFFFF";
    createParticles(
      baseX + randomOffsetX,
      baseY + randomOffsetY,
      particleColor,
      critical ? 20 : 10
    );

    // Create sparkles for critical hits
    if (critical) {
      createSparkles(baseX + randomOffsetX, baseY + randomOffsetY, 12);
    }

    // Remove damage number after animation
    setTimeout(() => {
      setDamageNumbers((prev) => prev.filter((d) => d.id !== newDamage.id));
    }, 2000);
  };

  const calculateDamage = (
    attacker: Pokemon,
    defender: Pokemon,
    move: Move
  ): { damage: number; critical: boolean } => {
    if (move.category === "status") return { damage: 0, critical: false };

    const baseDamage = move.power;
    const level = attacker.level;
    const attack =
      move.category === "physical" ? attacker.attack : attacker.attack; // Simplified
    const defense = defender.defense;

    // Type effectiveness
    const effectiveness = getTypeEffectiveness(move.type, defender.types);

    // STAB (Same Type Attack Bonus)
    const stab = attacker.types.includes(move.type) ? 1.5 : 1;

    // Critical hit (10% chance)
    const critical = Math.random() < 0.1;
    const criticalMultiplier = critical ? 1.5 : 1;

    // Random factor
    const random = 0.85 + Math.random() * 0.15;

    let damage = Math.floor(
      (((2 * level + 10) / 250) * (attack / defense) * baseDamage + 2) *
        stab *
        effectiveness *
        criticalMultiplier *
        random
    );

    return { damage: Math.max(1, damage), critical };
  };

  const handlePlayerAttack = async (move: Move) => {
    if (isBattling || player.hp <= 0 || opponent.hp <= 0 || move.currentPp <= 0)
      return;

    setIsBattling(true);
    setPlayerAttacking(true);
    setMessage(`${player.jpName} の ${move.jpName}！`);

    // PPを減らす
    const updatedMoves = player.moves.map((m) =>
      m.name === move.name ? { ...m, currentPp: m.currentPp - 1 } : m
    );
    setPlayer((prev) => ({ ...prev, moves: updatedMoves }));

    // 子供が喜ぶ音響効果
    playSound("attack");

    // 攻撃エフェクト
    setShowAttackEffect(true);
    setEffectType(move.type);
    triggerScreenShake(1);

    // ポケモンの感情表現
    setPokemonEmotion("angry");
    setOpponentEmotion("sad");

    // ダンスエフェクト
    triggerPokemonDance(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // ダメージ計算
    const { damage, critical } = calculateDamage(player, opponent, move);
    const effectiveness = getTypeEffectiveness(move.type, opponent.types);

    // 相手のHPを減らす
    const newOpponentHp = Math.max(0, opponent.hp - damage);
    setOpponent((prev) => ({ ...prev, hp: newOpponentHp }));

    // ダメージ数字を表示
    showDamageNumber(damage, false, critical, effectiveness);

    // 子供が喜ぶ特別エフェクト
    if (critical) {
      playSound("critical");
      createStars(70, 40, 12);
      showComboEffect();
    }

    if (effectiveness > 1) {
      createRainbow();
      showStreakEffect();
    }

    if (effectiveness < 1) {
      createHearts(70, 40, 3);
    }

    // 感情表現をリセット
    setTimeout(() => {
      setPokemonEmotion("normal");
      setOpponentEmotion("normal");
    }, 1000);

    setShowAttackEffect(false);
    setPlayerAttacking(false);

    // 相手が倒れた場合
    if (newOpponentHp <= 0) {
      setMessage(`${opponent.jpName} は たおれた！`);
      playSound("victory");
      createRainbow();
      createStars(50, 50, 20);
      setTimeout(() => {
        onBattleEnd(true, 50 + opponent.level * 10);
      }, 2000);
      return;
    }

    // 相手の攻撃
    setTimeout(() => {
      handleOpponentAttack();
    }, 1200);
  };

  const handleOpponentAttack = async () => {
    const availableMoves = opponent.moves.filter((m) => m.currentPp > 0);
    if (availableMoves.length === 0) {
      setMessage(`${opponent.jpName} は つかえる わざが ない！`);
      setTimeout(() => {
        setMessage("どの わざを つかう？");
        setIsBattling(false);
      }, 2000);
      return;
    }

    const move =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    setMessage(`${opponent.jpName} の ${move.jpName}！`);

    // 子供が喜ぶ音響効果
    playSound("attack");

    // 相手のPPを減らす
    const updatedMoves = opponent.moves.map((m) =>
      m.name === move.name ? { ...m, currentPp: m.currentPp - 1 } : m
    );
    setOpponent((prev) => ({ ...prev, moves: updatedMoves }));

    // 攻撃エフェクト
    setEffectType(move.type);
    setShowAttackEffect(true);
    triggerScreenShake(1);

    // ポケモンの感情表現
    setOpponentEmotion("angry");
    setPokemonEmotion("sad");

    // ダンスエフェクト
    triggerPokemonDance(false);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // ダメージ計算
    const { damage, critical } = calculateDamage(opponent, player, move);
    const effectiveness = getTypeEffectiveness(move.type, player.types);

    // プレイヤーのHPを減らす
    const newPlayerHp = Math.max(0, player.hp - damage);
    setPlayer((prev) => ({ ...prev, hp: newPlayerHp }));

    // ダメージ数字を表示
    showDamageNumber(damage, true, critical, effectiveness);

    // 子供が喜ぶ特別エフェクト
    if (critical) {
      playSound("critical");
      createStars(30, 60, 12);
    }

    if (effectiveness > 1) {
      createRainbow();
    }

    if (effectiveness < 1) {
      createHearts(30, 60, 3);
    }

    // 感情表現をリセット
    setTimeout(() => {
      setPokemonEmotion("normal");
      setOpponentEmotion("normal");
    }, 1000);

    setShowAttackEffect(false);

    // プレイヤーが倒れた場合
    if (newPlayerHp <= 0) {
      setMessage(`${player.jpName} は たおれた！`);
      playSound("defeat");
      setTimeout(() => {
        onBattleEnd(false, 0);
      }, 2000);
      return;
    }

    // 戦闘終了
    setTimeout(() => {
      setMessage("どの わざを つかう？");
      setIsBattling(false);
    }, 1200);
  };

  const getHpBarColor = (hp: number, maxHp: number) => {
    const percentage = hp / maxHp;
    if (percentage > 0.5) return "from-green-400 to-green-600";
    if (percentage > 0.25) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-red-600";
  };

  const getDamageColor = (effectiveness: number, critical: boolean) => {
    if (critical) return "text-yellow-300";
    if (effectiveness > 1) return "text-red-400";
    if (effectiveness < 1 && effectiveness > 0) return "text-blue-300";
    if (effectiveness === 0) return "text-gray-300";
    return "text-white";
  };

  const getDamageSize = (damage: number, critical: boolean) => {
    let baseSize = "text-7xl"; // 基本サイズを大きく
    if (damage > 150) baseSize = "text-9xl"; // さらに大きく
    else if (damage > 100) baseSize = "text-8xl";
    else if (damage > 50) baseSize = "text-7xl";
    else if (damage < 20) baseSize = "text-6xl"; // 最小サイズも大きく

    return baseSize;
  };

  const getDamageAnimation = (critical: boolean, effectiveness: number) => {
    if (critical) return "mother3-critical-damage";
    if (effectiveness > 1) return "mother3-super-effective";
    if (effectiveness < 1 && effectiveness > 0)
      return "mother3-not-very-effective";
    return "mother3-normal-damage";
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-orange-600 p-4 relative overflow-hidden ${
        screenShake ? "screen-shake" : ""
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none z-25"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animation: "sparkle-twinkle 1s ease-in-out infinite",
          }}
        >
          <Star
            size={sparkle.size}
            className="text-yellow-300 drop-shadow-lg"
            style={{
              opacity: sparkle.life / sparkle.maxLife,
              transform: `scale(${sparkle.life / sparkle.maxLife})`,
            }}
          />
        </div>
      ))}

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            transform: `scale(${particle.life / particle.maxLife})`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            zIndex: 20,
          }}
        />
      ))}

      {/* Level Up Effect */}
      {showLevelUp && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl font-bold text-yellow-300 mb-4 animate-bounce drop-shadow-2xl">
              LEVEL UP!
            </div>
            <div className="text-6xl text-white font-bold animate-pulse">
              🎉 🎊 🎉
            </div>
            <div className="text-4xl text-pink-300 font-bold animate-ping">
              ⭐ 🌟 ⭐
            </div>
          </div>
        </div>
      )}

      {/* MOTHER3-Style Damage Numbers */}
      {damageNumbers.map((damageNum) => (
        <div
          key={damageNum.id}
          className={`absolute pointer-events-none font-black z-30 ${getDamageColor(
            damageNum.effectiveness,
            damageNum.critical
          )} ${getDamageSize(damageNum.damage, damageNum.critical)}`}
          style={{
            left: `${damageNum.x}%`,
            top: `${damageNum.y}%`,
            textShadow: `
              6px 6px 0px #000,
              -6px -6px 0px #000,
              6px -6px 0px #000,
              -6px 6px 0px #000,
              0px 6px 0px #000,
              6px 0px 0px #000,
              0px -6px 0px #000,
              -6px 0px 0px #000,
              3px 3px 12px rgba(0,0,0,0.9),
              0 0 20px ${
                damageNum.critical
                  ? "#FFD700"
                  : damageNum.effectiveness > 1
                  ? "#FF4444"
                  : "#FFFFFF"
              }
            `,
            animation: `${getDamageAnimation(
              damageNum.critical,
              damageNum.effectiveness
            )} 3s ease-out forwards`,
            fontFamily: "monospace",
            letterSpacing: "3px",
            fontWeight: "900",
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
          }}
        >
          {damageNum.critical && (
            <span className="text-yellow-300 animate-pulse text-4xl block mb-2">
              ★CRITICAL★
            </span>
          )}
          <span className="block animate-pulse">{damageNum.damage}</span>
          {damageNum.effectiveness > 1 && (
            <span className="text-red-300 text-3xl block animate-bounce">
              SUPER EFFECTIVE!
            </span>
          )}
          {damageNum.effectiveness < 1 && damageNum.effectiveness > 0 && (
            <span className="text-blue-300 text-2xl block animate-pulse">
              Not very effective...
            </span>
          )}
          {damageNum.effectiveness === 0 && (
            <span className="text-gray-300 text-2xl block animate-pulse">
              NO EFFECT!
            </span>
          )}
        </div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Battle Field - Ultra Enhanced */}
        <div className="relative bg-gradient-to-b from-emerald-400 via-cyan-500 to-blue-600 rounded-3xl p-8 mb-6 shadow-2xl min-h-96 overflow-hidden border-4 border-yellow-400">
          {/* Animated Border */}
          <div
            className="absolute inset-0 rounded-3xl border-4 border-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>
          <div className="absolute inset-1 rounded-3xl bg-gradient-to-b from-emerald-400 via-cyan-500 to-blue-600"></div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-white/30 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Enhanced MOTHER3-Style Attack Effects */}
          {showAttackEffect && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Multiple layered effects for MOTHER3 style */}
              <div
                className={`w-40 h-40 rounded-full absolute ${
                  playerAttacking ? "bottom-4 left-4" : "top-4 right-4"
                } opacity-60`}
                style={{
                  backgroundColor: typeColors[effectType],
                  animation: "mother3-attack-pulse 0.8s ease-out",
                }}
              ></div>
              <div
                className={`w-24 h-24 rounded-full absolute ${
                  playerAttacking ? "bottom-12 left-12" : "top-12 right-12"
                } opacity-80`}
                style={{
                  backgroundColor: "#ffffff",
                  animation: "mother3-attack-flash 0.6s ease-out",
                }}
              ></div>
              <div
                className={`w-16 h-16 rounded-full absolute ${
                  playerAttacking ? "bottom-16 left-16" : "top-16 right-16"
                } opacity-90`}
                style={{
                  backgroundColor: typeColors[effectType],
                  animation: "mother3-attack-core 0.4s ease-out",
                }}
              ></div>

              {/* Additional energy waves */}
              <div
                className={`w-32 h-32 rounded-full absolute ${
                  playerAttacking ? "bottom-8 left-8" : "top-8 right-8"
                } opacity-40`}
                style={{
                  border: `4px solid ${typeColors[effectType]}`,
                  animation: "mother3-energy-wave 1.2s ease-out",
                }}
              ></div>
            </div>
          )}

          {/* Opponent Pokemon - Ultra Enhanced */}
          <div className="absolute top-8 right-8 text-center">
            <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-yellow-300 transform hover:scale-105 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-2 text-white drop-shadow-lg">
                {opponent.jpName}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <div className="flex-1 bg-gray-200 rounded-full h-3 border border-gray-400">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getHpBarColor(
                      opponent.hp,
                      opponent.maxHp
                    )} transition-all duration-500 shadow-lg`}
                    style={{
                      width: `${(opponent.hp / opponent.maxHp) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-white">
                  {opponent.hp}/{opponent.maxHp}
                </span>
              </div>
              <div className="text-sm text-yellow-200 font-bold">
                Lv.{opponent.level}
              </div>
            </div>

            {/* Emotion indicator */}
            <div className="absolute -top-2 -left-2 text-3xl animate-bounce">
              {opponentEmotion === "happy" && "😊"}
              {opponentEmotion === "sad" && "😢"}
              {opponentEmotion === "angry" && "😠"}
              {opponentEmotion === "normal" && "😐"}
            </div>

            <img
              src={opponent.img}
              alt={opponent.jpName}
              className={`w-32 h-32 mx-auto mt-4 filter drop-shadow-2xl transition-transform duration-300 ${
                showAttackEffect && !playerAttacking ? "mother3-hit-shake" : ""
              } ${opponentEmotion === "happy" ? "animate-bounce" : ""} ${
                opponentEmotion === "sad" ? "animate-pulse" : ""
              } hover:scale-110`}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/128x128/cccccc/666666?text=?";
              }}
            />
          </div>

          {/* Player Pokemon - Ultra Enhanced */}
          <div className="absolute bottom-8 left-8 text-center">
            {/* Emotion indicator */}
            <div className="absolute -top-2 -right-2 text-3xl animate-bounce">
              {pokemonEmotion === "happy" && "😊"}
              {pokemonEmotion === "sad" && "😢"}
              {pokemonEmotion === "angry" && "😠"}
              {pokemonEmotion === "normal" && "😐"}
            </div>

            <img
              src={player.backImg || player.img}
              alt={player.jpName}
              className={`w-32 h-32 mx-auto mb-4 filter drop-shadow-2xl transition-transform duration-300 ${
                showAttackEffect && playerAttacking
                  ? "mother3-attack-bounce"
                  : ""
              } ${
                showAttackEffect && !playerAttacking ? "mother3-hit-shake" : ""
              } ${pokemonEmotion === "happy" ? "animate-bounce" : ""} ${
                pokemonEmotion === "sad" ? "animate-pulse" : ""
              } hover:scale-110`}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/128x128/cccccc/666666?text=?";
              }}
            />
            <div className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-yellow-300 transform hover:scale-105 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-2 text-white drop-shadow-lg">
                {player.jpName}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <div className="flex-1 bg-gray-200 rounded-full h-3 border border-gray-400">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getHpBarColor(
                      player.hp,
                      player.maxHp
                    )} transition-all duration-500 shadow-lg`}
                    style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-white">
                  {player.hp}/{player.maxHp}
                </span>
              </div>
              <div className="text-sm text-yellow-200 font-bold">
                Lv.{player.level}
              </div>
            </div>
          </div>
        </div>

        {/* Battle Interface - Ultra Enhanced */}
        <div className="bg-gradient-to-r from-purple-600/95 via-pink-600/95 to-orange-600/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-yellow-400">
          {/* Message Box */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 mb-6 border-4 border-yellow-300 shadow-2xl">
            <p className="text-lg font-bold text-center text-white min-h-6 drop-shadow-lg animate-pulse">
              {message}
            </p>
          </div>

          {/* Move Buttons - Ultra Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {player.moves.slice(0, 6).map((move, index) => (
              <button
                key={index}
                onClick={() => handlePlayerAttack(move)}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = "scale(0.95)";
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                disabled={isBattling || move.currentPp <= 0}
                className={`relative p-4 rounded-2xl font-bold text-white shadow-2xl transform transition-all duration-200 touch-manipulation border-2 ${
                  isBattling || move.currentPp <= 0
                    ? "opacity-50 cursor-not-allowed border-gray-500"
                    : "hover:scale-105 hover:shadow-2xl active:scale-95 border-yellow-300 animate-pulse"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${
                    typeColors[move.type]
                  }, ${typeColors[move.type]}dd)`,
                  minHeight: "80px",
                  fontSize: "clamp(12px, 2.5vw, 16px)",
                }}
              >
                {/* 技のアイコン */}
                <div className="absolute top-2 right-2 text-white/80">
                  {move.category === "physical" && (
                    <Swords className="w-4 h-4" />
                  )}
                  {move.category === "special" && <Zap className="w-4 h-4" />}
                  {move.category === "status" && <Shield className="w-4 h-4" />}
                </div>

                <div className="flex flex-col h-full justify-between">
                  <span className="text-sm md:text-base truncate font-bold drop-shadow-lg">
                    {move.jpName}
                  </span>
                  <div className="flex justify-between text-xs opacity-90 mt-2">
                    <span>威力: {move.power || "—"}</span>
                    <span>
                      PP: {move.currentPp}/{move.pp}
                    </span>
                  </div>
                </div>

                {/* 使用可能時のキラキラエフェクト */}
                {!isBattling && move.currentPp > 0 && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Quick Action Buttons for Kids - Ultra Enhanced */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                const bestMove = player.moves
                  .filter((m) => m.currentPp > 0)
                  .sort((a, b) => (b.power || 0) - (a.power || 0))[0];
                if (bestMove) handlePlayerAttack(bestMove);
              }}
              disabled={isBattling}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 text-sm border-2 border-yellow-300 animate-pulse"
            >
              🚀 最強技！
            </button>
            <button
              onClick={() => {
                const availableMoves = player.moves.filter(
                  (m) => m.currentPp > 0
                );
                if (availableMoves.length > 0) {
                  const randomMove =
                    availableMoves[
                      Math.floor(Math.random() * availableMoves.length)
                    ];
                  handlePlayerAttack(randomMove);
                }
              }}
              disabled={isBattling}
              className="flex-1 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-2xl shadow-2xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 text-sm border-2 border-yellow-300 animate-pulse"
            >
              🎲 ランダム！
            </button>
          </div>

          {/* モンスターボールと逃走ボタン - 野生ポケモン戦闘時のみ表示 */}
          {battleState.isWildBattle && (
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowCatchMenu(!showCatchMenu)}
                disabled={isBattling || catchingPokemon}
                className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-2xl shadow-2xl hover:from-red-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 text-sm border-2 border-yellow-300 animate-pulse"
              >
                🎾 モンスターボール
              </button>
              <button
                onClick={runFromBattle}
                disabled={isBattling || catchingPokemon}
                className="flex-1 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-2xl shadow-2xl hover:from-gray-600 hover:to-gray-700 transition-all duration-200 disabled:opacity-50 text-sm border-2 border-yellow-300"
              >
                🏃 にげる
              </button>
            </div>
          )}

          {/* モンスターボール選択メニュー */}
          {showCatchMenu && battleState.isWildBattle && playerInventory && (
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl border-2 border-yellow-300 shadow-2xl">
              <h3 className="text-white font-bold text-center mb-3 text-lg">
                🎾 モンスターボールを選択
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {playerInventory.monsterBalls.map((ball) => (
                  <MonsterBallComponent
                    key={ball.id}
                    monsterBall={ball}
                    onUse={() => {
                      setShowCatchMenu(false);
                      attemptCatch(ball.name);
                    }}
                    disabled={isBattling || catchingPokemon || ball.count <= 0}
                  />
                ))}
              </div>
              <button
                onClick={() => setShowCatchMenu(false)}
                className="w-full mt-3 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl shadow-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200"
              >
                キャンセル
              </button>
            </div>
          )}

          {/* 捕獲アニメーション */}
          {showCatchAnimation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce">
                  {catchResult === "success" ? "🎉" : "💔"}
                </div>
                <div className="text-white text-2xl font-bold">
                  {catchResult === "success" ? "捕獲成功！" : "捕獲失敗..."}
                </div>
              </div>
            </div>
          )}

          {/* Back Button - Ultra Enhanced */}
          <button
            onClick={onBack}
            disabled={isBattling}
            className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-2xl shadow-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 disabled:opacity-50 border-2 border-yellow-300"
          >
            もどる
          </button>
        </div>
      </div>

      {/* 子供が喜ぶ特別エフェクト */}
      {showHearts && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: "2s",
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {showStars && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse text-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1.5s",
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      {showRainbow && (
        <div className="fixed inset-0 pointer-events-none z-30">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-pink-500 opacity-30 animate-pulse"></div>
        </div>
      )}

      {showCombo && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <div className="text-6xl font-black text-yellow-300 animate-bounce drop-shadow-2xl">
            COMBO x{comboCount}!
          </div>
        </div>
      )}

      {showStreak && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 pointer-events-none z-50">
          <div className="text-4xl font-black text-purple-300 animate-pulse drop-shadow-2xl">
            🔥 STREAK: {battleStreak} 🔥
          </div>
        </div>
      )}

      {/* ポケモンダンスエフェクト */}
      {pokemonDance && (
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-20">
          <div className="absolute bottom-10 left-10 text-6xl animate-bounce">
            💃
          </div>
        </div>
      )}

      {opponentDance && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
          <div className="absolute top-10 right-10 text-6xl animate-bounce">
            🕺
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes sparkle-twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
          }

          @keyframes mother3-normal-damage {
            0% {
              transform: translateY(0px) scale(0.3) rotate(-5deg);
              opacity: 0;
            }
            20% {
              transform: translateY(-30px) scale(1.3) rotate(2deg);
              opacity: 1;
            }
            40% {
              transform: translateY(-50px) scale(1.1) rotate(-1deg);
              opacity: 1;
            }
            60% {
              transform: translateY(-60px) scale(1.0) rotate(1deg);
              opacity: 1;
            }
            80% {
              transform: translateY(-70px) scale(0.9) rotate(0deg);
              opacity: 0.8;
            }
            100% {
              transform: translateY(-80px) scale(0.7) rotate(0deg);
              opacity: 0;
            }
          }

          @keyframes mother3-critical-damage {
            0% {
              transform: translateY(0px) scale(0.2) rotate(-10deg);
              opacity: 0;
            }
            15% {
              transform: translateY(-40px) scale(1.6) rotate(5deg);
              opacity: 1;
            }
            30% {
              transform: translateY(-60px) scale(1.4) rotate(-3deg);
              opacity: 1;
            }
            45% {
              transform: translateY(-70px) scale(1.3) rotate(2deg);
              opacity: 1;
            }
            60% {
              transform: translateY(-75px) scale(1.2) rotate(-1deg);
              opacity: 1;
            }
            75% {
              transform: translateY(-80px) scale(1.0) rotate(0deg);
              opacity: 0.9;
            }
            100% {
              transform: translateY(-90px) scale(0.8) rotate(0deg);
              opacity: 0;
            }
          }

          @keyframes mother3-super-effective {
            0% {
              transform: translateY(0px) scale(0.4) rotate(-8deg);
              opacity: 0;
            }
            25% {
              transform: translateY(-35px) scale(1.4) rotate(4deg);
              opacity: 1;
            }
            50% {
              transform: translateY(-55px) scale(1.2) rotate(-2deg);
              opacity: 1;
            }
            75% {
              transform: translateY(-70px) scale(1.0) rotate(1deg);
              opacity: 0.9;
            }
            100% {
              transform: translateY(-85px) scale(0.8) rotate(0deg);
              opacity: 0;
            }
          }

          @keyframes mother3-not-very-effective {
            0% {
              transform: translateY(0px) scale(0.5) rotate(-3deg);
              opacity: 0;
            }
            30% {
              transform: translateY(-20px) scale(1.0) rotate(1deg);
              opacity: 1;
            }
            60% {
              transform: translateY(-35px) scale(0.9) rotate(-1deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-50px) scale(0.7) rotate(0deg);
              opacity: 0;
            }
          }

          @keyframes mother3-attack-pulse {
            0% {
              transform: scale(0.1);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.4;
            }
            100% {
              transform: scale(2.0);
              opacity: 0;
            }
          }

          @keyframes mother3-attack-flash {
            0% {
              transform: scale(0.2);
              opacity: 1;
            }
            50% {
              transform: scale(1.0);
              opacity: 0.8;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }

          @keyframes mother3-attack-core {
            0% {
              transform: scale(0.5);
              opacity: 1;
            }
            100% {
              transform: scale(1.2);
              opacity: 0;
            }
          }

          @keyframes mother3-energy-wave {
            0% {
              transform: scale(0.5);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.5);
              opacity: 0.4;
            }
            100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }

          .mother3-hit-shake {
            animation: mother3-shake 0.3s ease-in-out;
          }

          .mother3-attack-bounce {
            animation: mother3-bounce 0.4s ease-out;
          }

          .screen-shake {
            animation: screen-shake 0.3s ease-in-out;
          }

          @keyframes mother3-shake {
            0%, 100% { transform: translateX(0); }
            10% { transform: translateX(-8px) rotate(-1deg); }
            20% { transform: translateX(8px) rotate(1deg); }
            30% { transform: translateX(-6px) rotate(-0.5deg); }
            40% { transform: translateX(6px) rotate(0.5deg); }
            50% { transform: translateX(-4px) rotate(-0.3deg); }
            60% { transform: translateX(4px) rotate(0.3deg); }
            70% { transform: translateX(-2px) rotate(-0.1deg); }
            80% { transform: translateX(2px) rotate(0.1deg); }
            90% { transform: translateX(-1px); }
          }

          @keyframes mother3-bounce {
            0% { transform: translateY(0) scale(1); }
            30% { transform: translateY(-20px) scale(1.1); }
            60% { transform: translateY(-10px) scale(1.05); }
            100% { transform: translateY(0) scale(1); }
          }

          @keyframes screen-shake {
            0%, 100% { transform: translateX(0) translateY(0); }
            10% { transform: translateX(-${
              attackIntensity * 2
            }px) translateY(-${attackIntensity}px); }
            20% { transform: translateX(${
              attackIntensity * 2
            }px) translateY(${attackIntensity}px); }
            30% { transform: translateX(-${attackIntensity}px) translateY(-${
            attackIntensity * 2
          }px); }
            40% { transform: translateX(${attackIntensity}px) translateY(${
            attackIntensity * 2
          }px); }
            50% { transform: translateX(-${attackIntensity}px) translateY(-${attackIntensity}px); }
            60% { transform: translateX(${attackIntensity}px) translateY(${attackIntensity}px); }
            70% { transform: translateX(-${
              attackIntensity / 2
            }px) translateY(-${attackIntensity / 2}px); }
            80% { transform: translateX(${attackIntensity / 2}px) translateY(${
            attackIntensity / 2
          }px); }
            90% { transform: translateX(-${
              attackIntensity / 4
            }px) translateY(-${attackIntensity / 4}px); }
          }
        `,
        }}
      />
    </div>
  );
};

export default BattleScreen;
