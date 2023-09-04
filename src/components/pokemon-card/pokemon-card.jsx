import {
  Card,
  Name,
  StatBar,
  Types,
  TypePic,
  Abilities,
  AbilitiesTitle,
  Ability,
  StatsTitle,
  Stat,
  StatTitle,
  StatNumber,
  Stats,
  Thumbnail,
  Header,
  HiddenAbility,
} from './pokemon-card.styles';

import { getBgColor, getBarColor, createHeader, capitalize } from '../../utils/pokemon';

import { TYPES } from '../../utils/types';

const PokemonCard = ({ pokemon }) => {
  const { id, name, types, thumbnail, abilities, stats } = pokemon;
  return (
    <Card
      bgcolor={getBgColor(types[0].name)}
      className="container col-xs-12 col-sm-6 col-lg-4 col-xl-3 d-none d-md-block"
    >
      <Header className="row mt-2">
        <Name className="col-9 ">{createHeader(id, name)}</Name>
        <Types className="col-3">
          {types.map((type, i) => (
            <TypePic key={i} src={TYPES[type.name]} />
          ))}
        </Types>
      </Header>
      <Thumbnail src={thumbnail} />
      <Abilities className="row">
        <AbilitiesTitle className="col-auto">Abilities</AbilitiesTitle>
        {abilities.map((ability) => {
          const props = { key: ability.ability.name, className: 'col' };
          const name = capitalize(ability.ability.name);
          return ability.is_hidden ? (
            <HiddenAbility {...props}>{name}</HiddenAbility>
          ) : (
            <Ability {...props}>{name}</Ability>
          );
        })}
      </Abilities>
      <Stats className="row">
        <StatsTitle className="col-2">Stats:</StatsTitle>
        <div className="container-fluid col-9">
          {stats.map(({ title, stat }, i) => (
            <Stat key={i} className="row mt-1">
              <StatTitle className="col-4">{title}</StatTitle>
              <StatNumber>{stat}</StatNumber>
              <StatBar barcolor={getBarColor(stat)} stat={stat} />
            </Stat>
          ))}
        </div>
      </Stats>
    </Card>
  );
};

export default PokemonCard;
