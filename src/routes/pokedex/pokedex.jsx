// React
import { Fragment, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// Styles
import { Cards, LoadingSpinner } from './pokedex.styles';

// Components
import PokemonCard from '../../components/pokemon-card/pokemon-card';
import SearchBox from '../../components/search-box/search-box';
import SearchHelp from '../../components/search-help/search-help';

// UPDATE THIS AS MORE POKEMON ARE RELEASED
const MAX_COUNT = 1010;

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

async function getJSON(path) {
  const response = await fetch(path);
  const json = response.json();
  return json;
}

const Pokedex = () => {
  // Loading Screen States
  const [loading, setLoading] = useState(true);
  // Pokedex States
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(allPokemon);
  // Search States
  const [search, setSearch] = useState({ field: 'name', value: '' });
  const [showHelp, setShowHelp] = useState(false);

  const onSearchChange = (event) => {
    const input = event.target.value.toLowerCase();
    if (input.includes('=')) {
      const split = input.split(/(=)/);
      const field = split[0];
      const value = split.splice(2).join('');
      setSearch({ field: field, value: value });
    } else {
      const field = isNaN(input) ? 'name' : 'id';
      setSearch({ field: field, value: input });
    }
  };

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

  const searchPokemon = (pokemon) => {
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

  const searchClickHandler = () => {
    const newFilteredPokemon = allPokemon.filter((pokemon) => searchPokemon(pokemon));
    setFilteredPokemon(newFilteredPokemon);
  };

  useEffect(() => {
    document.title = 'Pokedex';

    // Pokedex Initialization
    const getAllPokemon = async () => {
      let allPokemon = [];
      for (let id = 1; id <= MAX_COUNT; id++) {
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
        allPokemon.push(entry);
      }
      setLoading(false);
      setAllPokemon(allPokemon);
    };
    getAllPokemon();
  }, []);

  useEffect(() => {
    setFilteredPokemon(allPokemon);
  }, [allPokemon]);

  return (
    <div className="bg-dark container-fluid justify-content-center align-items-center">
      {loading ? (
        <div className="row container-fluid">
          <div className="col-12 mt-4 text-center">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="container-fluid row">
            <div className="container-fluid text-center mt-4">
              <div className="input-group d-flex justify-content-center">
                <SearchBox
                  placeholder="Sort Pokemon by ID, Name, Ability, Type, etc."
                  onChangeHandler={onSearchChange}
                />
                <div className="input-group-append">
                  <ButtonGroup>
                    <Button
                      variant="primary"
                      className="ml-2 mr-2"
                      style={{ height: '50px' }}
                      onClick={searchClickHandler}
                    >
                      Search
                    </Button>
                    <Button variant="warning" onClick={() => setShowHelp(true)} style={{ height: '50px' }}>
                      Search Help
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
          <SearchHelp show={showHelp} onHide={() => setShowHelp(false)} />
          <Cards className="container-fluid row">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </Cards>
        </Fragment>
      )}
    </div>
  );
};

export default Pokedex;
