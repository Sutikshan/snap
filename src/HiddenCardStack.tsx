import React, { StatelessComponent } from 'react';
import { CARD_SIZE } from './App.config';

interface IHiddenCardsStackProps {
  cardStackBelongTo: string;
  onClick?: () => void;
}
const divStyle = {
  backgroundColor: 'cornflowerblue',
  ...CARD_SIZE,
  border: '2px solid black',
  marginTop: '1em',
}

const HiddenCardsStack: StatelessComponent<IHiddenCardsStackProps> =
({ onClick, cardStackBelongTo })  => (
  <div onClick={onClick}>
    {cardStackBelongTo}
    <div style={divStyle}>
    </div>
  </div>
);

export default HiddenCardsStack;
