import React, { StatelessComponent } from 'react';
import { ICard, getCardStackStyle } from './App.config';
import './OpenCardStack.css';

interface IOpenCardStackProps {
  onClick: () => void;
  currentCard?: ICard;
  availableCardCount: number,
}

const OpenCardStack: StatelessComponent<IOpenCardStackProps> =
  ({ availableCardCount, onClick, currentCard }) => {
    const style = getCardStackStyle(availableCardCount, true);
    if (!currentCard) {
      return <div className="cardContainer openCardStack" />
    }
    return (
      <div onClick={onClick}
        className="cardContainer openCardStack"
        style={style}>
        <div className="cornerImage">{currentCard.cardRank}<div className={currentCard.cardSuit}/></div>
        <div className="cornerImage">{currentCard.cardRank}<div className={currentCard.cardSuit}/></div>
        <div className="cornerImage">{currentCard.cardRank}<div className={currentCard.cardSuit}/></div>
        <div className="cornerImage">{currentCard.cardRank}<div className={currentCard.cardSuit}/></div>
      </div>
    );
  }

export default OpenCardStack;
