// UPDATE THIS AS MORE POKEMON ARE RELEASED
export const MAX_COUNT = 1010;
export const PAGE_SIZE = 200;

const getJSON = async (path) => {
  const response = await fetch(path);
  const json = response.json();
  return json;
};

/* 
  Some Pokemon given by the pokeAPI have duplicate abilities, so this function will clean those pokemon's abilities
*/
const cleanAbilities = (abilities) => {
  let addedAbilities = {};
  return abilities.filter((ability) => {
    if (addedAbilities[ability.ability.name]) {
      return false;
    } else {
      addedAbilities[ability.ability.name] = true;
      return true;
    }
  });
};

export const fetchAllPokemon = async () => {
  let allPokemon = [];
  for (let id = 1; id <= 50; id++) {
    allPokemon.push(await fetchPokemon(id));
  }
  return allPokemon;
};

export const fetchPokemon = async (id) => {
  const pokemon = await getJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let entry = {
    id: `${id}`,
    name: pokemon.name,
    speciesUrl: pokemon.species.url,
    thumbnail: pokemon.sprites.other['official-artwork'].front_default,
    sprite: pokemon.sprites.front_default,
    abilities: cleanAbilities(pokemon.abilities),
    types: [pokemon.types[0].type],
    stats: [
      { title: 'HP', stat: pokemon.stats[0].base_stat },
      { title: 'Att', stat: pokemon.stats[1].base_stat },
      { title: 'Def', stat: pokemon.stats[2].base_stat },
      { title: 'SpAtt', stat: pokemon.stats[3].base_stat },
      { title: 'SpDef', stat: pokemon.stats[4].base_stat },
      { title: 'Speed', stat: pokemon.stats[5].base_stat },
    ],
  };
  if (pokemon.types[1]) entry.types.push(pokemon.types[1].type);
  return entry;
};

const formatId = (id) => {
  if (id < 10) return `#000${id}`;
  if (id < 100) return `#00${id}`;
  if (id < 1000) return `#0${id}`;
  return `#${id}`;
};

export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const createHeader = (id, name) => `${formatId(id)} ${capitalize(name)}`;

export const getBarColor = (stat) => {
  if (stat < 55) return 'rgb(212, 118, 17)';
  if (stat < 65) return 'rgb(212, 164, 17)';
  if (stat < 75) return 'rgb(212,196,17)';
  if (stat < 85) return 'rgb(212,212,17)';
  if (stat < 95) return 'rgb(203,212,17)';
  if (stat < 100) return 'rgb(180, 212, 17)';
  if (stat < 110) return 'rgb(160,212,17)';
  if (stat < 120) return 'rgb(134,212,17)';
  if (stat < 130) return 'rgb(98,212,17)';
  return 'rgb(43,212,17)';
};

export const getBgColor = (type) => {
  if (type === 'grass') return 'rgb(192, 228, 181)';
  if (type === 'fire') return 'rgb(193,140,135)';
  if (type === 'water') return 'rgb(86,149,232)';
  if (type === 'bug') return 'rgb(123,154,86)';
  if (type === 'normal') return 'rgb(185,192,228)';
  if (type === 'flying') return 'rgb(168,187,242)';
  if (type === 'ghost') return 'rgb(120,63,134)';
  if (type === 'psychic') return 'rgb(210,126,139)';
  if (type === 'dark') return 'rgb(132,114,104)';
  if (type === 'poison') return 'rgb(121,106,166)';
  if (type === 'electric') return 'rgb(252,205,64)';
  if (type === 'fairy') return 'rgb(231,177,233)';
  if (type === 'rock') return 'rgb(138,78,32)';
  if (type === 'ground') return 'rgb(201,166,118)';
  if (type === 'steel') return 'rgb(147,148,158)';
  if (type === 'ice') return 'rgb(154,218,235)';
  if (type === 'dragon') return 'rgb(49,105,185)';
  if (type === 'fighting') return 'rgb(171,106,114)';
};
