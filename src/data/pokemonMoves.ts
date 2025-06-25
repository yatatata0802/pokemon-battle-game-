import { Move } from '../types/pokemon';

export const pokemonMovesets: Record<number, Move[]> = {
  // Bulbasaur - フシギダネ
  1: [
    { name: 'tackle', jpName: 'たいあたり', type: 'normal', power: 40, accuracy: 100, pp: 35, currentPp: 35, category: 'physical', description: 'からだぜんたいで あいてに ぶつかっていく' },
    { name: 'vine-whip', jpName: 'つるのムチ', type: 'grass', power: 45, accuracy: 100, pp: 25, currentPp: 25, category: 'physical', description: 'つるのような ムチで あいてを たたく' },
    { name: 'razor-leaf', jpName: 'はっぱカッター', type: 'grass', power: 55, accuracy: 95, pp: 25, currentPp: 25, category: 'physical', description: 'するどい はっぱを とばして こうげきする' },
    { name: 'seed-bomb', jpName: 'タネばくだん', type: 'grass', power: 80, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'かたい タネを はっしゃして こうげき' },
    { name: 'solar-beam', jpName: 'ソーラービーム', type: 'grass', power: 120, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'たいようの ひかりを あつめて こうげき' },
    { name: 'poison-powder', jpName: 'どくのこな', type: 'poison', power: 0, accuracy: 75, pp: 35, currentPp: 35, category: 'status', description: 'どくの こなを まきちらす' }
  ],

  // Ivysaur - フシギソウ
  2: [
    { name: 'vine-whip', jpName: 'つるのムチ', type: 'grass', power: 45, accuracy: 100, pp: 25, currentPp: 25, category: 'physical', description: 'つるのような ムチで あいてを たたく' },
    { name: 'razor-leaf', jpName: 'はっぱカッター', type: 'grass', power: 55, accuracy: 95, pp: 25, currentPp: 25, category: 'physical', description: 'するどい はっぱを とばして こうげきする' },
    { name: 'seed-bomb', jpName: 'タネばくだん', type: 'grass', power: 80, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'かたい タネを はっしゃして こうげき' },
    { name: 'solar-beam', jpName: 'ソーラービーム', type: 'grass', power: 120, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'たいようの ひかりを あつめて こうげき' },
    { name: 'sludge-bomb', jpName: 'ヘドロばくだん', type: 'poison', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'きたない ヘドロを なげつける' },
    { name: 'sleep-powder', jpName: 'ねむりごな', type: 'grass', power: 0, accuracy: 75, pp: 15, currentPp: 15, category: 'status', description: 'ねむりの こなを まきちらす' }
  ],

  // Venusaur - フシギバナ
  3: [
    { name: 'petal-dance', jpName: 'はなびらのまい', type: 'grass', power: 120, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'はなびらで おどりながら こうげき' },
    { name: 'solar-beam', jpName: 'ソーラービーム', type: 'grass', power: 120, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'たいようの ひかりを あつめて こうげき' },
    { name: 'sludge-bomb', jpName: 'ヘドロばくだん', type: 'poison', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'きたない ヘドロを なげつける' },
    { name: 'earthquake', jpName: 'じしん', type: 'ground', power: 100, accuracy: 100, pp: 10, currentPp: 10, category: 'physical', description: 'じめんを ゆらして こうげき' },
    { name: 'frenzy-plant', jpName: 'ハードプラント', type: 'grass', power: 150, accuracy: 90, pp: 5, currentPp: 5, category: 'special', description: 'きょうりょくな くさの こうげき' },
    { name: 'synthesis', jpName: 'こうごうせい', type: 'grass', power: 0, accuracy: 100, pp: 5, currentPp: 5, category: 'status', description: 'たいようの ちからで かいふく' }
  ],
  
  // Charmander - ヒトカゲ
  4: [
    { name: 'scratch', jpName: 'ひっかく', type: 'normal', power: 40, accuracy: 100, pp: 35, currentPp: 35, category: 'physical', description: 'するどい ツメで ひっかいて こうげき' },
    { name: 'ember', jpName: 'ひのこ', type: 'fire', power: 40, accuracy: 100, pp: 25, currentPp: 25, category: 'special', description: 'ちいさな ほのおで あいてを やく' },
    { name: 'flamethrower', jpName: 'かえんほうしゃ', type: 'fire', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'はげしい ほのおで あいてを やく' },
    { name: 'fire-fang', jpName: 'かえんのキバ', type: 'fire', power: 65, accuracy: 95, pp: 15, currentPp: 15, category: 'physical', description: 'ほのおの キバで かみつく' },
    { name: 'dragon-rage', jpName: 'りゅうのいかり', type: 'dragon', power: 40, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'りゅうの いかりで こうげき' },
    { name: 'smokescreen', jpName: 'えんまく', type: 'normal', power: 0, accuracy: 100, pp: 20, currentPp: 20, category: 'status', description: 'けむりで めいちゅうりつを さげる' }
  ],

  // Charmeleon - リザード
  5: [
    { name: 'flamethrower', jpName: 'かえんほうしゃ', type: 'fire', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'はげしい ほのおで あいてを やく' },
    { name: 'fire-fang', jpName: 'かえんのキバ', type: 'fire', power: 65, accuracy: 95, pp: 15, currentPp: 15, category: 'physical', description: 'ほのおの キバで かみつく' },
    { name: 'dragon-claw', jpName: 'ドラゴンクロー', type: 'dragon', power: 80, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'するどい ツメで きりさく' },
    { name: 'slash', jpName: 'きりさく', type: 'normal', power: 70, accuracy: 100, pp: 20, currentPp: 20, category: 'physical', description: 'ツメで きりさいて こうげき' },
    { name: 'fire-punch', jpName: 'ほのおのパンチ', type: 'fire', power: 75, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'ほのおの こぶしで なぐる' },
    { name: 'scary-face', jpName: 'こわいかお', type: 'normal', power: 0, accuracy: 100, pp: 10, currentPp: 10, category: 'status', description: 'こわい かおで すばやさを さげる' }
  ],

  // Charizard - リザードン
  6: [
    { name: 'fire-blast', jpName: 'だいもんじ', type: 'fire', power: 110, accuracy: 85, pp: 5, currentPp: 5, category: 'special', description: 'だいの じの かたちの ほのお' },
    { name: 'dragon-claw', jpName: 'ドラゴンクロー', type: 'dragon', power: 80, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'するどい ツメで きりさく' },
    { name: 'air-slash', jpName: 'エアスラッシュ', type: 'flying', power: 75, accuracy: 95, pp: 15, currentPp: 15, category: 'special', description: 'くうきの やいばで こうげき' },
    { name: 'solar-beam', jpName: 'ソーラービーム', type: 'grass', power: 120, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'たいようの ひかりを あつめて こうげき' },
    { name: 'blast-burn', jpName: 'ブラストバーン', type: 'fire', power: 150, accuracy: 90, pp: 5, currentPp: 5, category: 'special', description: 'きょうりょくな ほのおの こうげき' },
    { name: 'roar', jpName: 'ほえる', type: 'normal', power: 0, accuracy: 100, pp: 20, currentPp: 20, category: 'status', description: 'おおきな こえで あいてを おどす' }
  ],

  // Squirtle - ゼニガメ
  7: [
    { name: 'tackle', jpName: 'たいあたり', type: 'normal', power: 40, accuracy: 100, pp: 35, currentPp: 35, category: 'physical', description: 'からだぜんたいで あいてに ぶつかる' },
    { name: 'water-gun', jpName: 'みずでっぽう', type: 'water', power: 40, accuracy: 100, pp: 25, currentPp: 25, category: 'special', description: 'みずを いきおいよく はっしゃ' },
    { name: 'bubble-beam', jpName: 'バブルこうせん', type: 'water', power: 65, accuracy: 100, pp: 20, currentPp: 20, category: 'special', description: 'あわの ビームで こうげき' },
    { name: 'bite', jpName: 'かみつく', type: 'dark', power: 60, accuracy: 100, pp: 25, currentPp: 25, category: 'physical', description: 'するどい はで かみつく' },
    { name: 'rapid-spin', jpName: 'こうそくスピン', type: 'normal', power: 50, accuracy: 100, pp: 40, currentPp: 40, category: 'physical', description: 'こうそくで かいてん こうげき' },
    { name: 'withdraw', jpName: 'からにこもる', type: 'water', power: 0, accuracy: 100, pp: 40, currentPp: 40, category: 'status', description: 'からに こもって ぼうぎょを あげる' }
  ],

  // Wartortle - カメール
  8: [
    { name: 'water-pulse', jpName: 'みずのはどう', type: 'water', power: 60, accuracy: 100, pp: 20, currentPp: 20, category: 'special', description: 'みずの はどうで こうげき' },
    { name: 'bubble-beam', jpName: 'バブルこうせん', type: 'water', power: 65, accuracy: 100, pp: 20, currentPp: 20, category: 'special', description: 'あわの ビームで こうげき' },
    { name: 'bite', jpName: 'かみつく', type: 'dark', power: 60, accuracy: 100, pp: 25, currentPp: 25, category: 'physical', description: 'するどい はで かみつく' },
    { name: 'aqua-tail', jpName: 'アクアテール', type: 'water', power: 90, accuracy: 90, pp: 10, currentPp: 10, category: 'physical', description: 'みずの しっぽで こうげき' },
    { name: 'ice-beam', jpName: 'れいとうビーム', type: 'ice', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'つめたい ビームで こうげき' },
    { name: 'protect', jpName: 'まもる', type: 'normal', power: 0, accuracy: 100, pp: 10, currentPp: 10, category: 'status', description: 'あいての こうげきを ふせぐ' }
  ],

  // Blastoise - カメックス
  9: [
    { name: 'hydro-pump', jpName: 'ハイドロポンプ', type: 'water', power: 110, accuracy: 80, pp: 5, currentPp: 5, category: 'special', description: 'たいりょうの みずを はっしゃ' },
    { name: 'ice-beam', jpName: 'れいとうビーム', type: 'ice', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'つめたい ビームで こうげき' },
    { name: 'earthquake', jpName: 'じしん', type: 'ground', power: 100, accuracy: 100, pp: 10, currentPp: 10, category: 'physical', description: 'じめんを ゆらして こうげき' },
    { name: 'focus-blast', jpName: 'きあいだま', type: 'fighting', power: 120, accuracy: 70, pp: 5, currentPp: 5, category: 'special', description: 'きあいを こめた たまを はっしゃ' },
    { name: 'hydro-cannon', jpName: 'ハイドロカノン', type: 'water', power: 150, accuracy: 90, pp: 5, currentPp: 5, category: 'special', description: 'きょうりょくな みずの こうげき' },
    { name: 'rain-dance', jpName: 'あまごい', type: 'water', power: 0, accuracy: 100, pp: 5, currentPp: 5, category: 'status', description: 'あめを ふらせて みずタイプを つよくする' }
  ],

  // Pikachu - ピカチュウ
  25: [
    { name: 'thunder-shock', jpName: 'でんきショック', type: 'electric', power: 40, accuracy: 100, pp: 30, currentPp: 30, category: 'special', description: 'でんきショックで こうげき' },
    { name: 'thunderbolt', jpName: '10まんボルト', type: 'electric', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'つよい でんきで こうげき' },
    { name: 'quick-attack', jpName: 'でんこうせっか', type: 'normal', power: 40, accuracy: 100, pp: 30, currentPp: 30, category: 'physical', description: 'すばやく とびかかる' },
    { name: 'iron-tail', jpName: 'アイアンテール', type: 'steel', power: 100, accuracy: 75, pp: 15, currentPp: 15, category: 'physical', description: 'てつのように かたい しっぽ' },
    { name: 'thunder', jpName: 'かみなり', type: 'electric', power: 110, accuracy: 70, pp: 10, currentPp: 10, category: 'special', description: 'つよい かみなりを おとす' },
    { name: 'double-team', jpName: 'かげぶんしん', type: 'normal', power: 0, accuracy: 100, pp: 15, currentPp: 15, category: 'status', description: 'ぶんしんで かいひりつを あげる' }
  ],

  // Raichu - ライチュウ
  26: [
    { name: 'thunderbolt', jpName: '10まんボルト', type: 'electric', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'つよい でんきで こうげき' },
    { name: 'thunder', jpName: 'かみなり', type: 'electric', power: 110, accuracy: 70, pp: 10, currentPp: 10, category: 'special', description: 'つよい かみなりを おとす' },
    { name: 'focus-blast', jpName: 'きあいだま', type: 'fighting', power: 120, accuracy: 70, pp: 5, currentPp: 5, category: 'special', description: 'きあいを こめた たまを はっしゃ' },
    { name: 'brick-break', jpName: 'かわらわり', type: 'fighting', power: 75, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'かわらを わって こうげき' },
    { name: 'thunder-punch', jpName: 'かみなりパンチ', type: 'electric', power: 75, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'でんきの こぶしで なぐる' },
    { name: 'agility', jpName: 'こうそくいどう', type: 'psychic', power: 0, accuracy: 100, pp: 30, currentPp: 30, category: 'status', description: 'すばやさを おおきく あげる' }
  ],

  // Mewtwo - ミュウツー
  150: [
    { name: 'psychic', jpName: 'サイコキネシス', type: 'psychic', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'つよい ねんりきで こうげき' },
    { name: 'aura-sphere', jpName: 'はどうだん', type: 'fighting', power: 80, accuracy: 100, pp: 20, currentPp: 20, category: 'special', description: 'はどうの ちからで こうげき' },
    { name: 'shadow-ball', jpName: 'シャドーボール', type: 'ghost', power: 80, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'かげの たまで こうげき' },
    { name: 'psystrike', jpName: 'サイコブレイク', type: 'psychic', power: 100, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'きょうりょくな ねんりき こうげき' },
    { name: 'ice-beam', jpName: 'れいとうビーム', type: 'ice', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'つめたい ビームで こうげき' },
    { name: 'thunderbolt', jpName: '10まんボルト', type: 'electric', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'つよい でんきで こうげき' },
    { name: 'flamethrower', jpName: 'かえんほうしゃ', type: 'fire', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'はげしい ほのおで あいてを やく' },
    { name: 'recover', jpName: 'じこさいせい', type: 'normal', power: 0, accuracy: 100, pp: 5, currentPp: 5, category: 'status', description: 'HPを はんぶん かいふくする' }
  ],

  // Mew - ミュウ
  151: [
    { name: 'psychic', jpName: 'サイコキネシス', type: 'psychic', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'つよい ねんりきで こうげき' },
    { name: 'ancient-power', jpName: 'げんしのちから', type: 'rock', power: 60, accuracy: 100, pp: 5, currentPp: 5, category: 'special', description: 'げんしの ちからで こうげき' },
    { name: 'transform', jpName: 'へんしん', type: 'normal', power: 0, accuracy: 100, pp: 10, currentPp: 10, category: 'status', description: 'あいての すがたに へんしん' },
    { name: 'metronome', jpName: 'ゆびをふる', type: 'normal', power: 0, accuracy: 100, pp: 10, currentPp: 10, category: 'status', description: 'ランダムな わざを つかう' },
    { name: 'aura-sphere', jpName: 'はどうだん', type: 'fighting', power: 80, accuracy: 100, pp: 20, currentPp: 20, category: 'special', description: 'はどうの ちからで こうげき' },
    { name: 'flamethrower', jpName: 'かえんほうしゃ', type: 'fire', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'はげしい ほのおで あいてを やく' },
    { name: 'ice-beam', jpName: 'れいとうビーム', type: 'ice', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'つめたい ビームで こうげき' },
    { name: 'thunderbolt', jpName: '10まんボルト', type: 'electric', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'つよい でんきで こうげき' }
  ],

  // Geodude - イシツブテ
  74: [
    { name: 'rock-throw', jpName: 'いわおとし', type: 'rock', power: 50, accuracy: 90, pp: 15, currentPp: 15, category: 'physical', description: 'いわを なげつけて こうげき' },
    { name: 'magnitude', jpName: 'マグニチュード', type: 'ground', power: 70, accuracy: 100, pp: 30, currentPp: 30, category: 'physical', description: 'じしんの つよさは ランダム' },
    { name: 'self-destruct', jpName: 'じばく', type: 'normal', power: 200, accuracy: 100, pp: 5, currentPp: 5, category: 'physical', description: 'じばくして おおダメージ' },
    { name: 'defense-curl', jpName: 'まるくなる', type: 'normal', power: 0, accuracy: 100, pp: 40, currentPp: 40, category: 'status', description: 'からだを まるめて ぼうぎょを あげる' },
    { name: 'rollout', jpName: 'ころがる', type: 'rock', power: 30, accuracy: 90, pp: 20, currentPp: 20, category: 'physical', description: 'ころがって れんぞく こうげき' },
    { name: 'earthquake', jpName: 'じしん', type: 'ground', power: 100, accuracy: 100, pp: 10, currentPp: 10, category: 'physical', description: 'じめんを ゆらして こうげき' }
  ],

  // Machop - ワンリキー
  66: [
    { name: 'karate-chop', jpName: 'からてチョップ', type: 'fighting', power: 50, accuracy: 100, pp: 25, currentPp: 25, category: 'physical', description: 'からての チョップで こうげき' },
    { name: 'low-kick', jpName: 'けたぐり', type: 'fighting', power: 65, accuracy: 100, pp: 20, currentPp: 20, category: 'physical', description: 'あしを かけて たおす' },
    { name: 'seismic-toss', jpName: 'ちきゅうなげ', type: 'fighting', power: 60, accuracy: 100, pp: 20, currentPp: 20, category: 'physical', description: 'ちきゅうの ちからで なげる' },
    { name: 'focus-energy', jpName: 'きあいだめ', type: 'normal', power: 0, accuracy: 100, pp: 30, currentPp: 30, category: 'status', description: 'きゅうしょに あたりやすくなる' },
    { name: 'bulk-up', jpName: 'ビルドアップ', type: 'fighting', power: 0, accuracy: 100, pp: 20, currentPp: 20, category: 'status', description: 'こうげきと ぼうぎょを あげる' },
    { name: 'cross-chop', jpName: 'クロスチョップ', type: 'fighting', power: 100, accuracy: 80, pp: 5, currentPp: 5, category: 'physical', description: 'りょうてで チョップ' }
  ]
};

// Default moves for Pokemon without specific movesets
export const getDefaultMoves = (types: string[]): Move[] => {
  const primaryType = types[0];
  const movesByType: Record<string, Move[]> = {
    normal: [
      { name: 'tackle', jpName: 'たいあたり', type: 'normal', power: 40, accuracy: 100, pp: 35, currentPp: 35, category: 'physical', description: 'からだで ぶつかる' },
      { name: 'scratch', jpName: 'ひっかく', type: 'normal', power: 40, accuracy: 100, pp: 35, currentPp: 35, category: 'physical', description: 'ツメで ひっかく' },
      { name: 'quick-attack', jpName: 'でんこうせっか', type: 'normal', power: 40, accuracy: 100, pp: 30, currentPp: 30, category: 'physical', description: 'すばやく とびかかる' },
      { name: 'hyper-beam', jpName: 'はかいこうせん', type: 'normal', power: 150, accuracy: 90, pp: 5, currentPp: 5, category: 'special', description: 'きょうりょくな ビーム' }
    ],
    fire: [
      { name: 'ember', jpName: 'ひのこ', type: 'fire', power: 40, accuracy: 100, pp: 25, currentPp: 25, category: 'special', description: 'ほのおで やく' },
      { name: 'flamethrower', jpName: 'かえんほうしゃ', type: 'fire', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'つよい ほのお' },
      { name: 'fire-blast', jpName: 'だいもんじ', type: 'fire', power: 110, accuracy: 85, pp: 5, currentPp: 5, category: 'special', description: 'だいの じの ほのお' },
      { name: 'fire-punch', jpName: 'ほのおのパンチ', type: 'fire', power: 75, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'ほのおの こぶし' }
    ],
    water: [
      { name: 'water-gun', jpName: 'みずでっぽう', type: 'water', power: 40, accuracy: 100, pp: 25, currentPp: 25, category: 'special', description: 'みずを はっしゃ' },
      { name: 'bubble-beam', jpName: 'バブルこうせん', type: 'water', power: 65, accuracy: 100, pp: 20, currentPp: 20, category: 'special', description: 'あわで こうげき' },
      { name: 'hydro-pump', jpName: 'ハイドロポンプ', type: 'water', power: 110, accuracy: 80, pp: 5, currentPp: 5, category: 'special', description: 'つよい みず' },
      { name: 'surf', jpName: 'なみのり', type: 'water', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'おおきな なみ' }
    ],
    grass: [
      { name: 'vine-whip', jpName: 'つるのムチ', type: 'grass', power: 45, accuracy: 100, pp: 25, currentPp: 25, category: 'physical', description: 'つるで たたく' },
      { name: 'razor-leaf', jpName: 'はっぱカッター', type: 'grass', power: 55, accuracy: 95, pp: 25, currentPp: 25, category: 'physical', description: 'はっぱで きる' },
      { name: 'solar-beam', jpName: 'ソーラービーム', type: 'grass', power: 120, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'たいようの ひかり' },
      { name: 'petal-dance', jpName: 'はなびらのまい', type: 'grass', power: 120, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'はなびらで おどる' }
    ],
    electric: [
      { name: 'thunder-shock', jpName: 'でんきショック', type: 'electric', power: 40, accuracy: 100, pp: 30, currentPp: 30, category: 'special', description: 'でんきで びりびり' },
      { name: 'thunderbolt', jpName: '10まんボルト', type: 'electric', power: 90, accuracy: 100, pp: 15, currentPp: 15, category: 'special', description: 'つよい でんき' },
      { name: 'thunder', jpName: 'かみなり', type: 'electric', power: 110, accuracy: 70, pp: 10, currentPp: 10, category: 'special', description: 'かみなりを おとす' },
      { name: 'thunder-punch', jpName: 'かみなりパンチ', type: 'electric', power: 75, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'でんきの こぶし' }
    ],
    psychic: [
      { name: 'confusion', jpName: 'ねんりき', type: 'psychic', power: 50, accuracy: 100, pp: 25, currentPp: 25, category: 'special', description: 'ねんりきで こうげき' },
      { name: 'psychic', jpName: 'サイコキネシス', type: 'psychic', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'つよい ねんりき' },
      { name: 'psybeam', jpName: 'サイコビーム', type: 'psychic', power: 65, accuracy: 100, pp: 20, currentPp: 20, category: 'special', description: 'ふしぎな ビーム' },
      { name: 'future-sight', jpName: 'みらいよち', type: 'psychic', power: 120, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'みらいを よちして こうげき' }
    ],
    fighting: [
      { name: 'karate-chop', jpName: 'からてチョップ', type: 'fighting', power: 50, accuracy: 100, pp: 25, currentPp: 25, category: 'physical', description: 'からての チョップ' },
      { name: 'brick-break', jpName: 'かわらわり', type: 'fighting', power: 75, accuracy: 100, pp: 15, currentPp: 15, category: 'physical', description: 'かわらを わる' },
      { name: 'close-combat', jpName: 'インファイト', type: 'fighting', power: 120, accuracy: 100, pp: 5, currentPp: 5, category: 'physical', description: 'せっきん せんとう' },
      { name: 'focus-blast', jpName: 'きあいだま', type: 'fighting', power: 120, accuracy: 70, pp: 5, currentPp: 5, category: 'special', description: 'きあいの たま' }
    ],
    rock: [
      { name: 'rock-throw', jpName: 'いわおとし', type: 'rock', power: 50, accuracy: 90, pp: 15, currentPp: 15, category: 'physical', description: 'いわを なげる' },
      { name: 'rock-slide', jpName: 'いわなだれ', type: 'rock', power: 75, accuracy: 90, pp: 10, currentPp: 10, category: 'physical', description: 'いわを おとす' },
      { name: 'stone-edge', jpName: 'ストーンエッジ', type: 'rock', power: 100, accuracy: 80, pp: 5, currentPp: 5, category: 'physical', description: 'するどい いわ' },
      { name: 'ancient-power', jpName: 'げんしのちから', type: 'rock', power: 60, accuracy: 100, pp: 5, currentPp: 5, category: 'special', description: 'げんしの ちから' }
    ],
    ground: [
      { name: 'mud-slap', jpName: 'どろかけ', type: 'ground', power: 20, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'どろを かける' },
      { name: 'dig', jpName: 'あなをほる', type: 'ground', power: 80, accuracy: 100, pp: 10, currentPp: 10, category: 'physical', description: 'あなを ほって こうげき' },
      { name: 'earthquake', jpName: 'じしん', type: 'ground', power: 100, accuracy: 100, pp: 10, currentPp: 10, category: 'physical', description: 'じめんを ゆらす' },
      { name: 'earth-power', jpName: 'だいちのちから', type: 'ground', power: 90, accuracy: 100, pp: 10, currentPp: 10, category: 'special', description: 'だいちの ちから' }
    ]
  };

  const baseMoves = movesByType[primaryType] || movesByType.normal;
  const secondaryMoves = types[1] ? movesByType[types[1]] || [] : [];
  
  return [...baseMoves, ...secondaryMoves].slice(0, 6);
};