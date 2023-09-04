import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  background-color: ${({ bgcolor }) => bgcolor};
  height: 450px;
  width: 380px;
  border: solid 3px black;
  border-radius: 5%;
  margin: 10px;
`;

export const Header = styled.div`
  height: 30px;
`;

export const Name = styled.h5`
  margin-right: auto;
  margin-left: 18px;
  width: fit-content;
`;

export const Types = styled.div`
  height: 100%;
  padding: 0;
  margin-left: auto;
  margin-right: 25px;
  width: fit-content;
`;

export const TypePic = styled.img`
  width: 30px;
  height: 30px;
`;

export const Thumbnail = styled.img`
  margin: 5px auto;
  width: 285px;
  height: 200px;
  background-color: rgb(138, 138, 138);
  border: solid black 2px;
  display: block;
`;

export const Abilities = styled.div`
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: fit-content;
`;

export const AbilitiesTitle = styled.h4`
  width: fit-content;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 12px;
  padding: 0;
`;

export const Ability = styled.h5`
  display: inline-flex;
  flex: none;
  width: fit-content;
  font-size: 12px;
  border: solid 1px black;
`;

export const HiddenAbility = styled(Ability)`
  color: rgb(148, 30, 30);
`;

export const Stats = styled.div`
  height: 120px;
  align-items: center;
  margin-top: 0;
`;

export const StatsTitle = styled.h5`
  width: fit-content;
  font-size: 18px;
  margin-top: auto;
  margin-bottom: auto;
`;

export const Stat = styled.div`
  height: 18px;
  margin-bottom: 1px;
`;

export const StatTitle = styled.h5`
  font-size: 16px;
`;

export const StatNumber = styled.p`
  font-size: 16px;
  position: absolute;
  margin-left: 70px;
  margin-top: 0;
  font-weight: bold;
`;

export const StatBar = styled.div`
  height: 100%;
  margin-right: auto;
  margin-left: 30px;
  background-color: ${({ barcolor }) => barcolor};
  width: ${({ stat }) => `${stat * 0.5}pt`};
`;
