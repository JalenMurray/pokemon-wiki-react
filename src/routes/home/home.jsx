import { Link } from 'react-router-dom';
import PokemonLogo from '../../assets/PokemonLogo.png';

const Home = async () => {
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
          <h1>Will Be a Card</h1>
          <div className="mx-5">
            <h1>Pokedex</h1>
            <p>
              The pokedex is a page filled with cards that were created using javascript that showcase some information
              about the pokemon. You can select to see every pokemon or you can select to see pokemon from a specific
              generation
            </p>
            <Link to="/pokedex">
              <button className="btn btn-secondary btn-lg">Pokedex</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
