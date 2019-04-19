import React, { StatelessComponent } from 'react';
import { ICard, getCardStackStyle } from './App.config';

interface IOpenCardStackProps {
  onClick: () => void;
  currentCard?: ICard;
  availableCardCount: number,
}

const OpenCardStack: StatelessComponent<IOpenCardStackProps> =
  ({ availableCardCount, onClick, currentCard }) => {
    const style = getCardStackStyle(availableCardCount);

    return (
      <div onClick={onClick} className="cardContainer openCardStack" style={style}>
        {currentCard && currentCard.cardRank}
        {currentCard && currentCard.cardSuit}
      </div>
    );
  }

export default OpenCardStack;
