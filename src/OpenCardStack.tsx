import React, { StatelessComponent } from 'react';
import { ICard, CARD_SIZE } from './App.config';

interface IOpenCardStackProps {
  onClick: () => void;
  currentCard?: ICard;
}

const divStyle = {
  backgroundColor: 'cornflowerblue',
  ...CARD_SIZE,
  border: '2px solid red',
  marginTop: '5em',
}

const OpenCardStack: StatelessComponent<IOpenCardStackProps> =
({ onClick, currentCard })  => (
  <div style={divStyle} onClick={onClick}>
    {currentCard && currentCard.cardRank}
    {currentCard && currentCard.cardSuit}
  </div>
);

export default OpenCardStack;
