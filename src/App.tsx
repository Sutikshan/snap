import React, { Component } from 'react';
import './App.css';
import { IAppState, COMPUTER, PLAYER } from './App.config';
import HiddenCardStack from './HiddenCardStack';
import OpenCardStack from './OpenCardStack';
import {
  getInitialState,
  onPlayerMove,
  onComputerMove,
  onComputerSnap,
  onPlayerSnap,
} from './AppLocalStateReducer';

const WAIT_FOR_COMPUTER = 400;
const SNAP_TIME_MULTIPLIER = 1000;

class App extends Component<{}, IAppState> {
  private snapTimeoutId: number = -1;

  public constructor() {
    super({});
    this.state = getInitialState();
  }

  private setTimerForComputerToPlay = () => {
    if (this.state.nextTurn === COMPUTER && !this.state.cardMatched) {
      window.setTimeout(() => {
        this.setState(onComputerMove, this.setSnapTimerWhenMatched);
      }, WAIT_FOR_COMPUTER);
    }
  }

  private setSnapTimerWhenMatched = () => {
    if (this.state.cardMatched) {
      this.snapTimeoutId = window.setTimeout(() => {
        this.setState(onComputerSnap, this.setTimerForComputerToPlay);
      }, this.state.snapWaitTime * SNAP_TIME_MULTIPLIER);
    }
  }

  private onCardPlay = () => {
    if (this.state.cardMatched || this.state.nextTurn === COMPUTER) {
      return;
    }

    this.setState(onPlayerMove, () => {
      this.setSnapTimerWhenMatched();
      this.setTimerForComputerToPlay();
    });
  }

  private onOpenCardClick = () => {
    if (!this.state.cardMatched) {
      return;
    }
    window.clearTimeout(this.snapTimeoutId);

    this.setState(onPlayerSnap, this.setTimerForComputerToPlay);
  }

  private onSnapTimeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const snapWaitTime = Number(event.currentTarget.value);
    this.setState({ snapWaitTime });
  }

  private reStart = () => {
    window.clearTimeout(this.snapTimeoutId);
    this.setState(getInitialState());
  }

  render() {
    const { openCards, nextTurn, cardMatched, finalWinner, currentRoundResult, computerCards, playerCards } = this.state;
    const currentCard = openCards[0];

    return (
      <div className="App">
        <div className="snapHeader">
          {cardMatched && <label aria-label="press snap">👉</label>}
          <h2 text-align="center">Snap</h2>
          {cardMatched && <label>👈</label>}
        </div>

        <div className="cardSetup">
          <HiddenCardStack
            cardStackBelongTo={COMPUTER}
            isNextTurn={nextTurn === COMPUTER}
            availableCardCount={computerCards.length}
            isCurrentRoundWinner={currentRoundResult === COMPUTER}
          />
          <OpenCardStack
            onClick={this.onOpenCardClick}
            currentCard={currentCard}
            availableCardCount={openCards.length}
          />
          <HiddenCardStack
            onClick={this.onCardPlay}
            cardStackBelongTo={PLAYER}
            isNextTurn={nextTurn === PLAYER}
            availableCardCount={playerCards.length}
            isCurrentRoundWinner={currentRoundResult === PLAYER}
          />
        </div>

        <div className="reactionTime">
          <label htmlFor="reactionTime">Reaction Time</label>
          <input
            onChange={this.onSnapTimeChange}
            value={this.state.snapWaitTime}
            type="range"
            id="reactionTimeInput"
            name="reactionTime"
            className="reversedRange"
            min="1" max="5" />
        </div>
        <button
          name="startButton"
          className="startButton"
          type="button"
          onClick={this.reStart}
        >
          Start
        </button>
        {finalWinner && <div className="winnerLabel">
          <label>👏</label>
          <label>{finalWinner} Won</label>
          <label>👏</label>
        </div>}
      </div>
    );
  }
}

export default App;
