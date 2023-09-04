/* 
  Some Pokemon given by the pokeAPI have duplicate abilities, so this function will clean those pokemon's abilities
*/

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
