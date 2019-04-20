import deepFreeze from 'deep-freeze';
import {
  getInitialState, onPlayerMove, onComputerMove, onComputerSnap, onPlayerSnap
} from './AppLocalStateReducer';
import { PLAYER, IAppState, COMPUTER, CARD_SUIT } from './App.config';

describe('AppLocalStateReducer', () => {
  let initialState: IAppState;
  beforeEach(() => {
    initialState = getInitialState();
  });

  describe('getInitialState', () => {
    it('provides the initial state with dealt cards', () => {
      const initialState = getInitialState();

      expect(initialState.playerCards.length).toBe(26);
      expect(initialState.computerCards.length).toBe(26);
      expect(initialState.openCards.length).toBe(0);
    });
  });

  describe('onPlayerMove', () => {
    it('do not allow user to move if finalWinner is decided', () => {
      const testState = deepFreeze({ ...initialState, finalWinner: PLAYER }) as IAppState;
      const actualState = onPlayerMove(testState);

      expect(testState).toEqual(actualState);
    });

    it('if computer has no cards left declare yourself as finalWinner', () => {
      const testState = { ...initialState, computerCards: [] };
      const actualState = onPlayerMove(testState);

      expect(actualState.finalWinner).toEqual(PLAYER);
    });

    it('add first card of player stack to open cards', () => {
      const testState = { ...initialState };
      const actualState = onPlayerMove(testState);

      expect(actualState.openCards[0]).toEqual(testState.playerCards[0]);
      expect(actualState.playerCards.length).toEqual(testState.playerCards.length - 1);
    });

    it('sets the card as matched if new played card matches the top card of open stack', () => {
      const testState = {
        ...initialState,
        openCards: [{ cardRank: initialState.playerCards[0].cardRank, cardSuit: CARD_SUIT.club }],
      };
      const actualState = onPlayerMove(testState);

      expect(actualState.openCards[0]).toEqual(testState.playerCards[0]);
      expect(actualState.playerCards.length).toEqual(testState.playerCards.length - 1);
      expect(actualState.cardMatched).toEqual(true);
    });
  });

  describe('onComputerMove', () => {
    it('do not allow computer to move if finalWinner is decided', () => {
      const testState = deepFreeze({ ...initialState, finalWinner: PLAYER }) as IAppState;
      const actualState = onComputerMove(testState);

      expect(testState).toEqual(actualState);
    });

    it('if player has no cards left declare yourself as finalWinner', () => {
      const testState = { ...initialState, playerCards: [] };
      const actualState = onComputerMove(testState);

      expect(actualState.finalWinner).toEqual(COMPUTER);
    });

    it('add first card of computer stack to open cards', () => {
      const testState = { ...initialState };
      const actualState = onComputerMove(deepFreeze(testState) as IAppState);

      expect(actualState.openCards[0]).toEqual(testState.computerCards[0]);
      expect(actualState.computerCards.length).toEqual(testState.computerCards.length - 1);
    });
  });

  describe('onComputerSnap', () => {
    it('on cpmuter snap, give all the open cards to computer stack', () => {
      const testState = { ...initialState };
      const actualState = onComputerSnap(deepFreeze(testState) as IAppState);

      expect(actualState.computerCards.length).toEqual(testState.openCards.length + testState.computerCards.length);
      expect(actualState.cardMatched).toBeFalsy;
      expect(actualState.currentRoundResult).toBe(COMPUTER);
      expect(actualState.openCards.length).toBe(0);
    });
  });

  describe('onPlayerSnap', () => {
    it('on player snap, give all the open cards to player stack', () => {
      const testState = { ...initialState };
      const actualState = onPlayerSnap(deepFreeze(testState) as IAppState);

      expect(actualState.playerCards.length).toEqual(testState.openCards.length + testState.playerCards.length);
      expect(actualState.cardMatched).toBeFalsy;
      expect(actualState.currentRoundResult).toBe(PLAYER);
      expect(actualState.openCards.length).toBe(0);
    });
  })
});
