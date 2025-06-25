import { useState, useCallback } from 'react';
import { Pokemon, Battle, Move } from '../types/pokemon';

export const useBattle = () => {
  const [battle, setBattle] = useState<Battle | null>(null);

  const startBattle = useCallback((playerPokemon: Pokemon, enemyPokemon: Pokemon) => {
    const newBattle: Battle = {
      playerPokemon: { ...playerPokemon },
      enemyPokemon: { ...enemyPokemon },
      turn: 'player',
      battleLog: [`やせいの ${enemyPokemon.name} が あらわれた！`],
      isComplete: false,
      winner: null,
    };
    setBattle(newBattle);
  }, []);

  const calculateDamage = (attacker: Pokemon, defender: Pokemon, move: Move): number => {
    if (move.power === 0) return 0;
    
    // 簡単なダメージ計算
    const baseDamage = Math.floor(
      ((2 * attacker.level + 10) / 250) * 
      (attacker.attack / defender.defense) * 
      move.power + 2
    );
    
    // ランダム要素 (85-100%)
    const randomFactor = (Math.random() * 0.15) + 0.85;
    return Math.floor(baseDamage * randomFactor);
  };

  const executeBattleAction = useCallback((action: { type: 'attack'; move: Move } | { type: 'run' }) => {
    if (!battle || battle.isComplete) return;

    setBattle(prevBattle => {
      if (!prevBattle) return null;

      const newBattle = { ...prevBattle };

      if (action.type === 'run') {
        newBattle.battleLog.push('うまく にげきれた！');
        newBattle.isComplete = true;
        return newBattle;
      }

      if (action.type === 'attack' && newBattle.turn === 'player') {
        // プレイヤーの攻撃
        const damage = calculateDamage(newBattle.playerPokemon, newBattle.enemyPokemon, action.move);
        newBattle.enemyPokemon.hp = Math.max(0, newBattle.enemyPokemon.hp - damage);
        
        // PPを減らす
        const moveIndex = newBattle.playerPokemon.moves.findIndex(m => m.name === action.move.name);
        if (moveIndex !== -1) {
          newBattle.playerPokemon.moves[moveIndex].pp = Math.max(0, newBattle.playerPokemon.moves[moveIndex].pp - 1);
        }

        newBattle.battleLog.push(
          `${newBattle.playerPokemon.name} の ${action.move.name}！`
        );

        if (damage > 0) {
          newBattle.battleLog.push(`${damage} の ダメージ！`);
        }

        // 敵のHPチェック
        if (newBattle.enemyPokemon.hp <= 0) {
          newBattle.battleLog.push(`${newBattle.enemyPokemon.name} は たおれた！`);
          newBattle.isComplete = true;
          newBattle.winner = 'player';
          
          // 経験値獲得
          const expGained = Math.floor(newBattle.enemyPokemon.level * 10 + 20);
          newBattle.playerPokemon.exp += expGained;
          newBattle.battleLog.push(`${expGained} の けいけんちを かくとく！`);
          
          return newBattle;
        }

        // 敵のターン
        newBattle.turn = 'enemy';
        
        // 敵の攻撃（少し遅延させる）
        setTimeout(() => {
          setBattle(currentBattle => {
            if (!currentBattle || currentBattle.isComplete) return currentBattle;
            
            const enemyBattle = { ...currentBattle };
            const enemyMove = enemyBattle.enemyPokemon.moves[0]; // 最初の技を使用
            const enemyDamage = calculateDamage(enemyBattle.enemyPokemon, enemyBattle.playerPokemon, enemyMove);
            
            enemyBattle.playerPokemon.hp = Math.max(0, enemyBattle.playerPokemon.hp - enemyDamage);
            
            enemyBattle.battleLog.push(`${enemyBattle.enemyPokemon.name} の ${enemyMove.name}！`);
            
            if (enemyDamage > 0) {
              enemyBattle.battleLog.push(`${enemyDamage} の ダメージ！`);
            }

            // プレイヤーのHPチェック
            if (enemyBattle.playerPokemon.hp <= 0) {
              enemyBattle.battleLog.push(`${enemyBattle.playerPokemon.name} は たおれた！`);
              enemyBattle.isComplete = true;
              enemyBattle.winner = 'enemy';
            } else {
              enemyBattle.turn = 'player';
            }

            return enemyBattle;
          });
        }, 1500);
      }

      return newBattle;
    });
  }, [battle]);

  const endBattle = useCallback(() => {
    setBattle(null);
  }, []);

  return {
    battle,
    startBattle,
    executeBattleAction,
    endBattle,
  };
};