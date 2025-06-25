import { useState, useEffect } from 'react';
import { Pokemon } from '../types/pokemon';
import { pokemonMovesets, getDefaultMoves } from '../data/pokemonMoves';

export const usePokemonData = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createPokemon = (data: any): Pokemon => {
    const moves = pokemonMovesets[data.id] || getDefaultMoves(data.types.map((t: any) => t.type.name));
    const baseHp = Math.floor(data.stats[0].base_stat * 0.8) + 20;
    
    return {
      id: data.id,
      name: data.name,
      jpName: '', // Will be filled later
      img: data.sprites.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      backImg: data.sprites.back_default,
      types: data.types.map((t: any) => t.type.name),
      level: 5,
      hp: baseHp,
      maxHp: baseHp,
      baseHp: baseHp,
      attack: Math.floor(data.stats[1].base_stat * 0.5) + 10,
      defense: Math.floor(data.stats[2].base_stat * 0.5) + 10,
      speed: Math.floor(data.stats[5].base_stat * 0.5) + 10,
      moves: moves.map(move => ({ ...move })), // Deep copy to avoid reference issues
      experience: 0,
      experienceToNext: 100,
      caught: false,
      shiny: Math.random() < 0.001 // 0.1% chance for shiny
    };
  };

  const fetchJapaneseName = async (pokemonId: number): Promise<string> => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`);
      const data = await response.json();
      const jaName = data.names.find((name: any) => name.language.name === 'ja-Hrkt');
      return jaName ? jaName.name : '';
    } catch {
      return '';
    }
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        
        // Fetch first 151 Pokemon (Gen 1)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonList = await response.json();
        
        // Fetch detailed data for each Pokemon
        const pokemonDetails = await Promise.all(
          pokemonList.results.map(async (pokemon: any) => {
            const detailResponse = await fetch(pokemon.url);
            return detailResponse.json();
          })
        );

        // Create Pokemon objects
        const pokemonData = pokemonDetails.map(createPokemon);
        
        // Fetch Japanese names
        const japaneseNames = await Promise.all(
          pokemonData.map(p => fetchJapaneseName(p.id))
        );
        
        // Update with Japanese names
        const finalPokemonData = pokemonData.map((pokemon, index) => ({
          ...pokemon,
          jpName: japaneseNames[index] || pokemon.name
        }));

        setAllPokemon(finalPokemonData);
      } catch (err) {
        setError('ポケモンデータの読み込みに失敗しました');
        console.error('Error fetching Pokemon data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { allPokemon, loading, error };
};