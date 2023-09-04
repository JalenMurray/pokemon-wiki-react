import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './routes/home/home';
import Pokedex from './routes/pokedex/pokedex';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
}

html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}
`;

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
