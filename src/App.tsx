import React, { Component } from 'react';
import './App.css';
import { IAppState, COMPUTER, PLAYER } from './App.config';
import HiddenCardStack from './HiddenCardStack';
import OpenCardStack from './OpenCardStack';
import { getInitialState, onPlayerMove, onComputerMove, onComputerSnap, onPlayerSnap } from './AppLocalStateReducer';

const WAIT_FOR_COMPUTER = 1000;
const SNAP_TIME_MULTIPLIER = 1000;

class App extends Component<{}, IAppState> {
  private snapTimeoutId: number = -1;
  // following flag is used as semaphore, as setState is an asynchronous operation.
  private computerWonCurrentRound: boolean = false;

  public constructor() {
    super({});

    this.state = getInitialState();
  }

  private onSnapTimeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const snapWaitTime = Number(event.currentTarget.value);
    this.setState({ snapWaitTime  });
  }

  private setTimerForComputerToSnap = () => {
    this.snapTimeoutId = window.setTimeout(() => {
      this.computerWonCurrentRound = true;
      this.setState(onComputerSnap, () => {
        this.computerWonCurrentRound = false;
        window.setTimeout(() => {
          this.setState(onComputerMove);
        }, WAIT_FOR_COMPUTER);
      });
    }, this.state.snapWaitTime * SNAP_TIME_MULTIPLIER);
  }

  private onCardPlay = () => {
    if (this.state.waitForComputer) {
      return;
    }

    this.setState(onPlayerMove, () => {
      if (this.state.cardMatched) {
        this.setTimerForComputerToSnap();
        return;
      }
      window.setTimeout(() => {
        this.setState(onComputerMove, () => {
          if (this.state.cardMatched) {
            this.setTimerForComputerToSnap();
          }
        });
      }, WAIT_FOR_COMPUTER);
    });
  }

  private onPlayerSnap = () => {
    window.clearTimeout(this.snapTimeoutId);
    if (!this.state.cardMatched || this.computerWonCurrentRound) {
      return;
    }

    this.computerWonCurrentRound = false;
    this.setState(onPlayerSnap);
  }

  private reStart = () => {
    this.setState(getInitialState());
  }

  render() {
    const { openCards } = this.state;
    const currentCard = openCards[0];

    return (
      <div className="App">
        <div className="CardSetup">
          <HiddenCardStack
            cardStackBelongTo={COMPUTER} />
          <OpenCardStack
            onClick={this.onPlayerSnap}
            currentCard={currentCard}
          />
          <HiddenCardStack
            onClick={this.onCardPlay}
            cardStackBelongTo={PLAYER} />
        </div>

        <div className="ReactionTime">
          <label htmlFor="reactionTime">Reaction Time</label>
          <input
            onChange={this.onSnapTimeChange}
            value={this.state.snapWaitTime}
            type="range"
            id="reactionTimeInput"
            name="reactionTime"
            min="0" max="5" />
        </div>
        <button
          name="startButton"
          className="StartButton"
          type="button"
          onClick={this.reStart}
        >
          Start
        </button>
      </div>
    );
  }
}

export default App;
