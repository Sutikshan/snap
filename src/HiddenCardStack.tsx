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
        <div className='cardContainer hiddenCardStack'
          style={style}>
          {isNextTurn && <label aria-label={nextTurnLabel}>🙋</label>}

          <div className="playerStatus">
            {isCurrentRoundWinner && <label aria-label={currentRoundWinner}>⭐</label>}
          </div>
        </div>
      </div>
    );
  }

export default HiddenCardsStack;
