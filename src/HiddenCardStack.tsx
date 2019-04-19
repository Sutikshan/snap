import React, { StatelessComponent } from 'react';
import './HiddenCardStack.css';
import classNames from 'classnames';

import { CARD_SIZE } from './App.config';

interface IHiddenCardsStackProps {
  cardStackBelongTo: string;
  onClick?: () => void;
  isNextTurn: boolean;
  availableCardCount: number,
}

const HIDDEN_CARD_DECK_STYLE = {
  backgroundColor: 'cornflowerblue',
  ...CARD_SIZE,
  border: '2px solid black',
  marginTop: '2em',
}

const HiddenCardsStack: StatelessComponent<IHiddenCardsStackProps> =
  ({ availableCardCount, onClick, cardStackBelongTo, isNextTurn }) => {
    const nextTurnLabel = `${cardStackBelongTo} turn`;
    let divStyle = HIDDEN_CARD_DECK_STYLE;
    if (!availableCardCount) {
      divStyle = { ...HIDDEN_CARD_DECK_STYLE, backgroundColor: 'white' };
    }

    return (
      <div className="hiddenCardContainer" onClick={onClick}>
        <label>{cardStackBelongTo}</label>
        <div style={divStyle}>
          {isNextTurn && <label aria-label={nextTurnLabel}>🙋‍♂️️</label>}
        </div>
      </div>
    );
  }

export default HiddenCardsStack;
