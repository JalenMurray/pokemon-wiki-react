import { Link } from 'react-router-dom';
import PokemonLogo from '../../assets/PokemonLogo.png';
import PokemonCard from '../../components/pokemon-card/pokemon-card';
import { useCallback, useEffect, useState } from 'react';
import { fetchPokemon, MAX_COUNT } from '../../utils/pokemon';
import { Button } from 'react-bootstrap';

const Home = () => {
  const [pokemon, setPokemon] = useState({});

  const getRandomID = () => {
    return Math.floor(Math.random() * (MAX_COUNT - 1)) + 1;
  };

  const getRandomPokemon = useCallback(async () => {
    const randomPokemon = await fetchPokemon(getRandomID(1, 151));
    setPokemon(randomPokemon);
  }, []);

  useEffect(() => {
    getRandomPokemon();
  }, [getRandomPokemon]);

  const randomizeClickHandler = () => {
    getRandomPokemon();
  };

  return (
    <div>
      <section className="bg-dark text-light p-5 text-center text-lg-start">
        <div className="container">
          <div className="d-md-flex align-items-center justify-content-center">
            <div>
              <h1>Pokemon Wiki</h1>
              <p className="lead my-5">
                This is a website I created that showcases information about every pokemon that is drawn from the
                pokeAPI API. There are various pages that can be explored below!
              </p>
            </div>
            <img className="img-fluid d-none d-lg-block mx-5 w-50" src={PokemonLogo} alt="Pokemon Logo" />
          </div>
        </div>
      </section>
      <section className="bg-primary text-light p-5 text-center">
        <div className="d-md-flex align-items-center justify-content-center">
          <div>
            <div className="row">{Object.keys(pokemon).length && <PokemonCard pokemon={pokemon} />}</div>
            <div className="row">
              <Button className="d-none d-md-block" variant="success" size="lg" onClick={randomizeClickHandler}>
                New Pokemon
              </Button>
            </div>
          </div>

          <div className="mx-5">
            <h1>Pokedex</h1>
            <p>
              The pokedex is a page filled with cards that were created using javascript that showcase some information
              about the pokemon. You can select to see every pokemon or you can filter through the list of cards.
            </p>
            <Link to="/pokedex">
              <Button variant="secondary" size="lg">
                Pokedex
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
