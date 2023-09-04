// React
import { Fragment, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// Styles
import { Cards, LoadingSpinner } from './pokedex.styles';

// Utils
import { fetchAllPokemon } from '../../utils/pokemon';
import { searchPokemon } from '../../utils/search';

// Components
import PokemonCard from '../../components/pokemon-card/pokemon-card';
import SearchBox from '../../components/search-box/search-box';
import SearchHelp from '../../components/search-help/search-help';

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

  const searchClickHandler = () => {
    const newFilteredPokemon = allPokemon.filter((pokemon) => searchPokemon(pokemon, search));
    setFilteredPokemon(newFilteredPokemon);
  };

  useEffect(() => {
    document.title = 'Pokedex';

    // Pokedex Initialization
    const getAllPokemon = async () => {
      const allPokemon = await fetchAllPokemon();
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
