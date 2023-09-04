// React
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

// Styles
import { Cards, LoadingSpinner } from './pokedex.styles';

// Utils
import { MAX_COUNT, fetchAllPokemon } from '../../utils/pokemon';
import { searchPokemon } from '../../utils/search';

// Components
import PokemonCard from '../../components/pokemon-card/pokemon-card';
import SearchBox from '../../components/search-box/search-box';
import SearchHelp from '../../components/search-help/search-help';

const PAGE_SIZE = 300;

const Pokedex = () => {
  // Loading Screen States
  const [loading, setLoading] = useState(true);
  // Pokedex States
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(allPokemon);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [minId, setMinId] = useState(1); // For generating the range of a page
  // Search States
  const [search, setSearch] = useState({ field: 'name', value: '' });
  const [showHelp, setShowHelp] = useState(false);

  const loadPokemon = useCallback(
    async (loadAll) => {
      setLoading(true);
      if (loadAll) {
        const pokemon = await fetchAllPokemon([1, MAX_COUNT]);
        setAllPokemon(pokemon);
      } else {
        const pokemon = await fetchAllPokemon([minId, minId + PAGE_SIZE - 1]);
        setAllPokemon(pokemon);
      }
      setLoading(false);
    },
    [minId]
  );

  useEffect(() => {
    document.title = 'Pokedex';
    loadPokemon();
  }, []);

  useEffect(() => {
    setFilteredPokemon(allPokemon);
  }, [allPokemon]);

  useEffect(() => {
    loadPokemon();
  }, [minId]);

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

  const loadAllHandler = () => {
    loadPokemon(true);
    setAllLoaded(true);
  };

  const prevPageHandler = () => {
    setMinId(minId - PAGE_SIZE);
    setIsLastPage(false);
    if (minId == 1) setIsFirstPage(true);
  };

  const nextPageHandler = () => {
    setMinId(minId + PAGE_SIZE);
    setIsFirstPage(false);
    if (minId + PAGE_SIZE > MAX_COUNT) setIsLastPage(true);
  };

  return (
    <div className="bg-dark container-fluid justify-content-center align-items-center">
      {loading ? (
        <div className="row container-fluid">
          <div className="col-12 mt-4 text-center">
            <h2 className="text-light">
              Currently loading {allLoaded ? MAX_COUNT : PAGE_SIZE} Pokémon! Please wait{' '}
              <span role="img" aria-label="Smily Face">
                😊
              </span>
            </h2>
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
                    <Button variant="danger" onClick={loadAllHandler} style={{ height: '50px' }}>
                      Load All
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
          {!allLoaded && (
            <section className="bg-dark text-center">
              <Button variant="secondary" disabled={isFirstPage} onClick={prevPageHandler}>
                &#8249; Back
              </Button>
              <Button variant="primary" disabled={isLastPage} onClick={nextPageHandler}>
                Next &#8250;
              </Button>
            </section>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Pokedex;
