const statCheck = ({ title, stat }, statQuery) => {
  let split = statQuery.split(' ');
  const [toCheckTitle, toCheckOperation, toCheckStat] = split;
  // eslint-disable-next-line
  if (title.toLowerCase() != toCheckTitle.toLowerCase()) {
    return false;
  }
  switch (toCheckOperation) {
    case '=':
      // eslint-disable-next-line
      return stat == toCheckStat;
    case '>':
      return stat > toCheckStat;
    case '<':
      return stat < toCheckStat;
    case '>=':
      return stat >= toCheckStat;
    case '<=':
      return stat <= toCheckStat;
    default:
      return false;
  }
};

export const searchPokemon = (pokemon, search) => {
  switch (search.field) {
    case 'id':
      return pokemon.id.includes(search.value);
    case 'name':
      return pokemon.name.includes(search.value);
    case 'type':
      return pokemon.types.filter((type) => type.name.includes(search.value)).length;
    case 'ability':
      return pokemon.abilities.filter((ability) => ability.ability.name.includes(search.value)).length;
    case 'stat':
      return pokemon.stats.filter((statInfo) => statCheck(statInfo, search.value)).length;
    default:
      return pokemon.id.includes(search.value).length;
  }
};
