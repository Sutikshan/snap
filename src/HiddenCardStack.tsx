import React, { StatelessComponent } from 'react';
import './HiddenCardStack.css';
import { getCardStackStyle } from './App.config';

interface IHiddenCardsStackProps {
  cardStackBelongTo: string;
  isNextTurn: boolean;
  availableCardCount: number,
  isCurrentRoundWinner: boolean;
  onClick?: () => void;
}

const HiddenCardsStack: StatelessComponent<IHiddenCardsStackProps> =
  ({ availableCardCount, isCurrentRoundWinner, onClick,
    cardStackBelongTo, isNextTurn }) => {
    const nextTurnLabel = `${cardStackBelongTo} turn`;
    const currentRoundWinner = `${cardStackBelongTo} is winner of last round`;
    const style = getCardStackStyle(availableCardCount);

    return (
      <div className="hiddenCardContainer" onClick={onClick}>
        <label>{cardStackBelongTo}</label>
        <div className="cardContainer hiddenCardStack" style={style}>
          <span className="playerStatus">
            {isNextTurn && !!availableCardCount && <label aria-label={nextTurnLabel}>🙋</label>}
          </span>
          <span className="playerStatus">
            {isCurrentRoundWinner && <label  className="playerStatus" aria-label={currentRoundWinner}>⭐</label>}
          </span>
        </div>
      </div>
    );
  }

export default HiddenCardsStack;
